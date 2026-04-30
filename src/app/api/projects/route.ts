import { getPayload } from '@/lib/get-payload'
import { NextResponse } from 'next/server'
import { getClerkUserFromRequest } from '@/lib/clerk-auth'

export async function POST(req: Request) {
  try {
    const payload = await getPayload()
    const body = await req.json()
    const clerkUser = await getClerkUserFromRequest(req)

    if (!clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find the Payload user
    const users = await payload.find({
      collection: 'users',
      where: {
        clerkId: { equals: clerkUser.id },
      },
    })

    if (users.docs.length === 0) {
      return NextResponse.json({ error: 'User not found in system' }, { status: 404 })
    }

    const userId = users.docs[0].id
    const { name, specs, gerberFileId } = body

    const project = await payload.create({
      collection: 'projects',
      data: {
        name,
        user: userId,
        specs,
        gerberFile: gerberFileId,
        status: 'draft',
      },
    })

    return NextResponse.json({ success: true, project })
  } catch (error: any) {
    console.error('[api/projects] error:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const payload = await getPayload()
    const clerkUser = await getClerkUserFromRequest(req)

    if (!clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find the Payload user
    const users = await payload.find({
      collection: 'users',
      where: {
        clerkId: { equals: clerkUser.id },
      },
    })

    if (users.docs.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userId = users.docs[0].id

    const projects = await payload.find({
      collection: 'projects',
      where: {
        user: { equals: userId },
      },
      sort: '-createdAt',
      depth: 1,
    })

    return NextResponse.json({ success: true, data: projects.docs })
  } catch (error: any) {
    console.error('[api/projects GET] error:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
