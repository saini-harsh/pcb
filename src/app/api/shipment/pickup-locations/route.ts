import { NextResponse } from 'next/server'
import axios from 'axios'

/**
 * GET /api/shipment/pickup-locations
 * Diagnostic route — lists all pickup locations configured in your Shiprocket account.
 * Use this to find the correct pickup_location name to use in shipment creation.
 */
export async function GET() {
  try {
    const srEmail = process.env.SHIPROCKET_EMAIL
    const srPass = process.env.SHIPROCKET_PASSWORD

    if (!srEmail || !srPass) {
      return NextResponse.json({ error: 'Shiprocket credentials missing in .env' }, { status: 500 })
    }

    // Auth
    const authRes = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
      email: srEmail,
      password: srPass,
    })
    const srToken = authRes.data.token

    // Fetch pickup locations
    const pickupRes = await axios.get(
      'https://apiv2.shiprocket.in/v1/external/settings/company/pickup',
      { headers: { Authorization: `Bearer ${srToken}` } }
    )

    return NextResponse.json({
      pickup_locations: pickupRes.data,
    })
  } catch (err: any) {
    console.error('[pickup-locations]', err.response?.data || err.message)
    return NextResponse.json({
      error: err.response?.data || err.message,
    }, { status: 500 })
  }
}
