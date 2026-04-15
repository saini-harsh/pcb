import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  console.log('--- Admin Setup Route Started ---')
  try {
    console.log('Initializing Payload...')
    const payload = await getPayload({ config })
    console.log('Payload initialized successfully')

    // Check if any admin exists
    console.log('Checking for existing admins...')
    const existingAdmins = await payload.find({
      collection: 'admins',
      limit: 1,
    })
    console.log(`Found ${existingAdmins.totalDocs} existing admins`)

    if (existingAdmins.totalDocs > 0) {
      console.log('Admin already exists, skipping creation')
      return NextResponse.json({ message: 'Admin already exists' }, { status: 400 })
    }

    console.log('Creating new admin user...')
    const newAdmin = await payload.create({
      collection: 'admins',
      data: {
        email: 'admin@pcbglobe.com',
        password: 'adminpassword123',
        name: 'Site Admin',
      },
    })
    console.log('Admin created successfully:', newAdmin.email)

    return NextResponse.json({ 
      success: true, 
      message: 'Admin created successfully',
      credentials: {
        email: 'admin@pcbglobe.com',
        password: 'adminpassword123'
      }
    })
  } catch (error: any) {
    console.error('--- Admin Setup Error ---')
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
