import { NextResponse } from 'next/server'
import { getClerkUserFromRequest } from '@/lib/clerk-auth'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

async function getAuthenticatedClerkId(request: Request) {
  const user = await getClerkUserFromRequest(request)
  return user?.id || null
}

export async function GET(request: Request) {
  const clerkId = await getAuthenticatedClerkId(request)
  if (!clerkId) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
  }

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'users',
    where: {
      clerkId: { equals: clerkId },
    },
    limit: 1,
  })

  if (result.totalDocs === 0) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
  }

  const user = result.docs[0]
  return NextResponse.json({ success: true, data: user })
}

export async function POST(request: Request) {
  const clerkId = await getAuthenticatedClerkId(request)
  if (!clerkId) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
  }

  const body = await request.json()
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'users',
    where: {
      clerkId: { equals: clerkId },
    },
    limit: 1,
  })

  if (result.totalDocs === 0) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
  }

  try {
    const updated = await payload.update({
      collection: 'users',
      id: result.docs[0].id,
      data: body,
    })
    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    console.error("[api/user/address] Update failed:", error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to update user',
      details: error.data || null
    }, { status: 500 })
  }
}
