import { getPayload } from '@/lib/get-payload'
import { NextResponse } from 'next/server'
import { getClerkUserFromRequest } from '@/lib/clerk-auth'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_SKKXmjhckTA1L8',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'YOUR_SECRET_HERE',
})

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

    const user = users.docs[0]
    const { items, total, shippingAddress, billingAddress, projectName, gerberFile, specs } = body

    // 1. Create Razorpay Order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total * 100), // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        projectName: projectName || "New Order"
      }
    });

    // 2. Create the Payload order
    const order = await payload.create({
      collection: 'orders',
      data: {
        projectName: projectName || `Order by ${user.firstName || 'User'}`,
        user: user.id,
        status: 'pending_payment',
        total,
        items,
        shippingAddress,
        billingAddress,
        razorpayOrderId: razorpayOrder.id, // Link them
        gerberFile,
        fullSpecs: specs,
      },
    })

    return NextResponse.json({
      success: true,
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount
    })
  } catch (error: any) {
    console.error('[api/orders] error:', error)
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
      return NextResponse.json({ error: 'User not found in system' }, { status: 404 })
    }

    const userId = users.docs[0].id

    // Find orders for this user
    const orders = await payload.find({
      collection: 'orders',
      where: {
        user: { equals: userId }
      },
      sort: '-createdAt', // newest first
    })

    return NextResponse.json({ success: true, data: orders.docs })
  } catch (error: any) {
    console.error('[api/orders GET] error:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
