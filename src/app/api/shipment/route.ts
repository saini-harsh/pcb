import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'
import { sendShipmentEmail } from '@/lib/email'
import axios from 'axios'

/** Strip non-digits and return last 10 digits (Indian mobile format) */
function sanitizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return digits.slice(-10)
}

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const { orderId, method, trackingNumber, courierName } = await req.json()

    if (!orderId) {
      return NextResponse.json({ success: false, error: 'Order ID is required' }, { status: 400 })
    }

    const order = await payload.findByID({
      collection: 'orders',
      id: orderId,
      depth: 1,
    })

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 })
    }

    let resultTracking = trackingNumber
    let resultCourier = courierName

    if (method === 'shiprocket') {
      try {
        const srEmail = process.env.SHIPROCKET_EMAIL
        const srPass = process.env.SHIPROCKET_PASSWORD
        const srChannelId = process.env.SHIPROCKET_CHANNEL_ID || '10517312'

        if (!srEmail || !srPass) {
          throw new Error('Shiprocket credentials missing in .env')
        }

        // Fetch user profile for fallback address data
        let userProfile: any = null
        if (order.user && typeof order.user === 'object') {
          userProfile = order.user
        } else if (order.user) {
          userProfile = await payload.findByID({
            collection: 'users',
            id: String(order.user),
            depth: 0,
          })
        }

        // --- Shipping Address: order fields first, then user profile fallback ---
        const shipObj: any = order.shippingAddress || {}
        const shipName    = shipObj.name     || userProfile?.shippingAttentionTo || userProfile?.firstName || ''
        const shipAddr1   = shipObj.address1 || userProfile?.shippingAddress1   || ''
        const shipAddr2   = shipObj.address2 || userProfile?.shippingAddress2   || ''
        const shipCity    = shipObj.city     || userProfile?.shippingCity       || ''
        const shipState   = shipObj.state    || userProfile?.shippingState      || ''
        const shipPincode = shipObj.pincode  || userProfile?.shippingPincode    || ''
        const shipEmail   = shipObj.email    || userProfile?.shippingEmail      || userProfile?.email || ''
        const shipPhoneRaw = shipObj.phone   || userProfile?.shippingPhone      || ''
        const shipPhone   = sanitizePhone(shipPhoneRaw)

        // --- Billing Address: order fields first, then user profile, then shipping fallback ---
        const billObj: any = order.billingAddress || {}
        const billName    = billObj.name     || userProfile?.billingAttentionTo || userProfile?.firstName || shipName
        const billAddr1   = billObj.address1 || userProfile?.billingAddress1   || shipAddr1
        const billAddr2   = billObj.address2 || userProfile?.billingAddress2   || shipAddr2
        const billCity    = billObj.city     || userProfile?.billingCity       || shipCity
        const billState   = billObj.state    || userProfile?.billingState      || shipState
        const billPincode = billObj.pincode  || userProfile?.billingPincode    || shipPincode
        const billEmail   = billObj.email    || userProfile?.billingEmail      || shipEmail
        const billPhoneRaw = billObj.phone   || userProfile?.billingPhone      || shipPhoneRaw
        const billPhone   = sanitizePhone(billPhoneRaw)

        // --- Validate required fields before calling Shiprocket ---
        const missingFields: string[] = []
        if (!shipName)          missingFields.push('Shipping: Name')
        if (!shipAddr1)         missingFields.push('Shipping: Address Line 1')
        if (!shipCity)          missingFields.push('Shipping: City')
        if (!shipState)         missingFields.push('Shipping: State')
        if (!shipPincode)       missingFields.push('Shipping: Pincode')
        if (shipPhone.length < 10) missingFields.push('Shipping: Phone (need 10-digit Indian number)')
        if (!billAddr1)         missingFields.push('Billing: Address Line 1')
        if (!billCity)          missingFields.push('Billing: City')
        if (!billState)         missingFields.push('Billing: State')
        if (!billPincode)       missingFields.push('Billing: Pincode')

        if (missingFields.length > 0) {
          return NextResponse.json({
            success: false,
            error: `Cannot ship — missing required fields:\n${missingFields.join('\n')}\n\nPlease fill these in the order's Shipping/Billing Address section.`,
          }, { status: 400 })
        }

        // 1. SHIPROCKET AUTH
        const authRes = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
          email: srEmail,
          password: srPass,
        })
        const srToken = authRes.data.token

        // 2. VERIFY PICKUP LOCATION EXISTS
        const pickupRes = await axios.get(
          'https://apiv2.shiprocket.in/v1/external/settings/company/pickup',
          { headers: { Authorization: `Bearer ${srToken}` } }
        )
        const pickupAddresses: any[] = pickupRes.data?.data?.shipping_address || []
        if (!pickupAddresses || pickupAddresses.length === 0) {
          return NextResponse.json({
            success: false,
            error: 'No pickup location configured in your Shiprocket account. Please go to https://app.shiprocket.in/settings/manage-warehouses and add a pickup location named "Primary" before shipping.',
          }, { status: 400 })
        }
        // Find a matching pickup location name
        const pickupLocationName = pickupAddresses[0]?.pickup_location || 'Primary'

        // Use a unique order_id to avoid "duplicate order" rejections from Shiprocket.
        // If shiprocketOrderId already exists, append a timestamp suffix.
        const existingSrOrderId = (order as any).shiprocketOrderId
        const srOrderId = existingSrOrderId
          ? `${order.id}-${Date.now()}`
          : String(order.id)

        // 2. CREATE ORDER
        const srOrderData = {
          order_id: srOrderId,
          order_date: new Date(String(order.createdAt)).toISOString().split('T')[0],
          pickup_location: pickupLocationName,
          channel_id: srChannelId,
          billing_customer_name: billName,
          billing_last_name: '',
          billing_address: billAddr1,
          billing_address_2: billAddr2,
          billing_city: billCity,
          billing_pincode: billPincode,
          billing_state: billState,
          billing_country: 'India',
          billing_email: billEmail,
          billing_phone: billPhone,
          shipping_is_billing: false,
          shipping_customer_name: shipName,
          shipping_last_name: '',
          shipping_address: shipAddr1,
          shipping_address_2: shipAddr2,
          shipping_city: shipCity,
          shipping_pincode: shipPincode,
          shipping_country: 'India',
          shipping_state: shipState,
          shipping_email: shipEmail,
          shipping_phone: shipPhone,
          order_items: (order.items as any[]).map((item) => ({
            name: item.name,
            sku: item.productId || item.name,
            units: item.quantity,
            selling_price: item.price,
          })),
          payment_method: 'Prepaid',
          sub_total: order.total,
          length: 10,
          breadth: 10,
          height: 10,
          weight: 0.5,
        }

        console.log('[shipment] Sending to Shiprocket:', JSON.stringify(srOrderData, null, 2))

        const createRes = await axios.post(
          'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
          srOrderData,
          { headers: { Authorization: `Bearer ${srToken}` } }
        )

        console.log('[shipment] Shiprocket response:', JSON.stringify(createRes.data, null, 2))

        if (createRes.data && createRes.data.order_id) {
          resultTracking = createRes.data.shipment_id || `SR-${createRes.data.order_id}`
          resultCourier = 'Shiprocket'

          await payload.update({
            collection: 'orders',
            id: orderId,
            data: {
              status: 'shipped',
              deliveryMethod: 'shiprocket',
              deliveryStatus: 'ready_to_ship',
              trackingNumber: resultTracking,
              courierName: resultCourier,
              shiprocketOrderId: String(createRes.data.order_id),
            },
          })
        } else {
          throw new Error('Failed to create order in Shiprocket API: ' + JSON.stringify(createRes.data))
        }
      } catch (srErr: any) {
        const errData = srErr.response?.data || srErr.message
        console.error('Shiprocket API Error:', JSON.stringify(errData, null, 2))
        return NextResponse.json({
          success: false,
          error: `Shiprocket Error: ${JSON.stringify(errData)}`,
        }, { status: 500 })
      }
    } else {
      // Custom Delivery
      await payload.update({
        collection: 'orders',
        id: orderId,
        data: {
          status: 'shipped',
          deliveryMethod: 'custom',
          deliveryStatus: 'in_transit',
          trackingNumber,
          courierName,
        },
      })
    }

    // Send shipment email
    const userRelation = order.user
    if (userRelation && typeof userRelation === 'object') {
      const user: any = userRelation
      await sendShipmentEmail(order, user, resultTracking, resultCourier)
    }

    return NextResponse.json({ success: true, trackingNumber: resultTracking })
  } catch (error: any) {
    console.error('[api/shipment] error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
