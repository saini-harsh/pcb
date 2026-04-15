'use client'

import React, { useState } from 'react'
import { useDocumentInfo, Button } from '@payloadcms/ui'

export const ShipmentButtons: React.FC = () => {
  const [loading, setLoading] = useState(false)

  // Use useDocumentInfo to get the current document ID reliably
  const { id: orderId } = useDocumentInfo()

  const handleShiprocket = async () => {
    if (!orderId) return alert('Order ID not found')
    setLoading(true)
    try {
      const res = await fetch('/api/shipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, method: 'shiprocket' })
      })
      const data = await res.json()
      if (data.success) {
        alert('Ordered pushed to Shiprocket successfully!')
        window.location.reload()
      } else {
        alert('Error: ' + data.error)
      }
    } catch (err) {
      console.error(err)
      alert('Failed to connect to shipment API')
    } finally {
      setLoading(false)
    }
  }

  const handleCustomDelivery = async () => {
    if (!orderId) return alert('Order ID not found')
    const tracking = prompt('Enter Tracking Number:')
    if (!tracking) return
    const courier = prompt('Enter Courier Name:', 'Delhivery')
    if (!courier) return

    setLoading(true)
    try {
      const res = await fetch('/api/shipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, method: 'custom', trackingNumber: tracking, courierName: courier })
      })
      const data = await res.json()
      if (data.success) {
        alert('Custom delivery marked successfully!')
        window.location.reload()
      } else {
        alert('Error: ' + data.error)
      }
    } catch (err) {
      console.error(err)
      alert('Failed to connect to shipment API')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h4 style={{ margin: 0, textTransform: 'uppercase', fontSize: '12px', color: '#999' }}>Shipment Actions</h4>
      <Button
        type="button"
        buttonStyle="primary"
        onClick={handleShiprocket}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Ready to Ship with Shiprocket'}
      </Button>
      <Button
        type="button"
        buttonStyle="secondary"
        onClick={handleCustomDelivery}
        disabled={loading}
      >
        Mark Custom Delivery
      </Button>
    </div>
  )
}
