import { NextResponse } from 'next/server'
import { clerkClient, currentUser, verifyToken } from '@clerk/nextjs/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

type ProfilePayload = {
  firstName?: string
  lastName?: string
}

async function getClerkUserFromRequest(request: Request) {
  const cookieUser = await currentUser().catch(() => null)
  if (cookieUser) return cookieUser

  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : null
  if (!token) return null

  let verified: Awaited<ReturnType<typeof verifyToken>> | null = null
  try {
    verified = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
      jwtKey: process.env.CLERK_JWT_KEY,
      clockSkewInMs: 60_000,
    })
  } catch {
    return null
  }

  const userId = verified?.sub
  if (!userId) return null

  const client = await clerkClient()
  return client.users.getUser(userId)
}

function normalizeName(value: unknown): string {
  return String(value ?? '').trim()
}

export async function GET(request: Request) {
  const clerkUser = await getClerkUserFromRequest(request)
  if (!clerkUser) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cu: any = clerkUser
  const email: string | undefined =
    cu?.primaryEmailAddress?.emailAddress ?? cu?.emailAddresses?.[0]?.emailAddress

  if (!email) {
    return NextResponse.json({ success: false, error: 'No email found on user' }, { status: 400 })
  }

  return NextResponse.json({
    success: true,
    data: {
      email,
      firstName: cu?.firstName ?? '',
      lastName: cu?.lastName ?? '',
      phoneNumber: cu?.phoneNumbers?.[0]?.phoneNumber ?? '',
      imageUrl: cu?.imageUrl ?? '',
    },
  })
}

export async function PUT(request: Request) {
  const clerkUser = await getClerkUserFromRequest(request)
  if (!clerkUser) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
  }

  const body = (await request.json().catch(() => ({}))) as ProfilePayload

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cu: any = clerkUser
  const clerkId: string = cu.id
  const email: string | undefined =
    cu?.primaryEmailAddress?.emailAddress ?? cu?.emailAddresses?.[0]?.emailAddress

  if (!email) {
    return NextResponse.json({ success: false, error: 'No email found on user' }, { status: 400 })
  }

  const firstName = normalizeName(body.firstName)
  const lastName = normalizeName(body.lastName)

  const client = await clerkClient()
  await client.users.updateUser(clerkId, {
    firstName,
    lastName,
  })

  const payload = await getPayload({ config })
  const data = {
    clerkId,
    email,
    firstName,
    lastName,
    imageUrl: cu?.imageUrl ?? '',
  }

  // User update is matched through email as requested.
  const existingByEmail = await payload.find({
    collection: 'users',
    where: {
      email: { equals: email },
    },
    limit: 1,
  })

  if (existingByEmail.totalDocs > 0) {
    await payload.update({
      collection: 'users',
      id: existingByEmail.docs[0].id,
      data,
    })
  } else {
    await payload.create({
      collection: 'users',
      data,
    })
  }

  return NextResponse.json({ success: true })
}

