import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { sendPaymentSuccessEmail, sendOrderConfirmationEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const body = await req.json()
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature, 
      payload_order_id,
      amount 
    } = body

    console.log('[api/payments/verify] Received body:', JSON.stringify(body))

    // 1. Verify Razorpay Signature
    // Format: order_id|payment_id
    const secret = process.env.RAZORPAY_KEY_SECRET || 'YOUR_RAZORPAY_SECRET';
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        console.error('[api/payments/verify] Missing verification parameters')
        return NextResponse.json({ success: false, error: 'Missing parameters' }, { status: 400 })
    }

    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isVerified = generated_signature === razorpay_signature;

    if (!isVerified) {
        console.error('[api/payments/verify] Invalid signature mismatch')
        return NextResponse.json({ success: false, error: 'Invalid payment signature' }, { status: 400 });
    }

    // 2. Find the order
    const order = await payload.findByID({
      collection: 'orders',
      id: payload_order_id,
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // 3. Create the payment record
    const payment = await payload.create({
      collection: 'payments',
      data: {
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        amount: amount / 100, // Razorpay amount is in paise
        status: 'success',
        user: order.user as any,
        order: order.id,
      },
    })

    // 4. Update the order status
    await payload.update({
      collection: 'orders',
      id: order.id,
      data: {
        status: 'payment_success',
        payment: payment.id,
        razorpayOrderId: razorpay_order_id,
      },
    })

    // 5. Send Email Notifications (Async)
    const users = await payload.find({
      collection: 'users',
      where: {
        id: { equals: order.user as any }
      }
    })
    
    if (users.docs.length > 0) {
      const user = users.docs[0]
      // Run in background or wait, user wants email so we should at least trigger them
      try {
        await sendPaymentSuccessEmail(order, user, payment.amount)
        await sendOrderConfirmationEmail(order, user)
      } catch (err) {
        console.error('Failed to send emails after payment verify', err)
      }
    }

    return NextResponse.json({ success: true, paymentId: payment.id })
  } catch (error: any) {
    console.error('[api/payments/verify] error:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
