import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error('Missing CLERK_WEBHOOK_SECRET')
    return new Response('Webhook secret not configured', { status: 500 })
  }

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred during verification', {
      status: 400,
    })
  }

  const payloadClient = await getPayload({ config })
  const eventType = evt.type

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data
    const email = email_addresses[0]?.email_address

    if (!email) {
      return new Response('No email address found', { status: 400 })
    }

    const userData = {
      clerkId: id,
      email: email,
      firstName: first_name || '',
      lastName: last_name || '',
      imageUrl: image_url || '',
    }

    try {
      // Find existing user by clerkId
      const existingUsers = await payloadClient.find({
        collection: 'users',
        where: {
          clerkId: { equals: id },
        },
      })

      if (existingUsers.docs.length > 0) {
        await payloadClient.update({
          collection: 'users',
          id: existingUsers.docs[0].id,
          data: userData,
        })
        console.log(`User ${id} updated in Payload`)
      } else {
        await payloadClient.create({
          collection: 'users',
          data: userData,
        })
        console.log(`User ${id} created in Payload`)
      }
    } catch (dbError) {
      console.error('Database Error during sync:', dbError)
      return new Response('Database Error', { status: 500 })
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data
    try {
      const existingUsers = await payloadClient.find({
        collection: 'users',
        where: {
          clerkId: { equals: id },
        },
      })

      if (existingUsers.docs.length > 0) {
        await payloadClient.delete({
          collection: 'users',
          id: existingUsers.docs[0].id,
        })
        console.log(`User ${id} deleted from Payload`)
      }
    } catch (dbError) {
      console.error('Database Error during deletion:', dbError)
      return new Response('Database Error', { status: 500 })
    }
  }

  return new Response('Successfully processed', { status: 200 })
}
