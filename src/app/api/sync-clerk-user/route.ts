import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'
import { getClerkUserFromRequest } from '@/lib/clerk-auth'

export async function POST(request: Request) {
  try {
    console.log('[sync-clerk-user] Fetching Clerk user...')
    const clerkUser = await getClerkUserFromRequest(request)
    
    if (!clerkUser) {
      console.log('[sync-clerk-user] No authenticated Clerk user found.')
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    console.log('[sync-clerk-user] Found Clerk user ID:', clerkUser.id)

    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'users',
      where: {
        clerkId: { equals: clerkUser.id },
      },
      limit: 1,
    })

    const userData = {
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl,
    }

    if (result.docs.length > 0) {
      console.log('[sync-clerk-user] User already exists. Updating...')
      await payload.update({
        collection: 'users',
        id: result.docs[0].id,
        data: userData,
      })
    } else {
      console.log('[sync-clerk-user] New user. Creating...')
      await payload.create({
        collection: 'users',
        data: userData,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[sync-clerk-user] Error syncing user:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
