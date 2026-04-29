import ratesData from './rates.json'

const rates: Record<number, any[]> = ratesData

export type PCBSpecs = {
  width: number
  height: number
  layers: number
  quantity: number
  thickness: number
  baseMaterial: string
  discreteDesign: number
  deliveryFormat: string
  maskColor: string
  finish: string
  copperThickness: string
  buildTime: string
  shippingMethod: string
}

export type PricingResult = {
  unitPrice: number
  nreCost: number
  subTotal: number
  gst: number
  shippingCost: number
  totalCost: number
  currency: string
}



export const calculatePrice = (specs: PCBSpecs): PricingResult => {
  const { width, height, layers, quantity, buildTime, finish, copperThickness } = specs
  const sqmtr = (width * height * quantity) / 1000000
    
  let baseSubTotal = 0
  let nreCost = 0
  
  if (layers === 1 || layers === 2) {
    const layerKey = layers.toString();
    const layerRates = (rates as any)[layerKey];

    if (layerRates && Array.isArray(layerRates)) {
      // Find the closest SQ.MTR range from the rate sheet
      // Using a small epsilon for floating point comparison
      const rateRow = layerRates.find(r => r.sqmtr >= (sqmtr - 0.00001)) || layerRates[layerRates.length - 1];
      
      if (rateRow) {
        // Try to find the exact build time, fallback to '7 WD'
        baseSubTotal = rateRow[buildTime] || rateRow['7 WD'] || 0;
      }
    }
  } else {
    // Current placeholder logic for 4+ layers
    const area = width * height
    const layerFactors: Record<number, number> = { 4: 1.5, 6: 2.5, 8: 4.0, 10: 6.0 }
    const baseFactor = layerFactors[layers] || 10.0
    let areaPrice = (area / 100) * baseFactor
    baseSubTotal = areaPrice * quantity
    nreCost = 1500
  }

  // Adjustments for non-standard specs (Baselines: FR4, 1.6mm, 35um, HASL)
  let adjustment = 1.0
  if (finish === 'ENIG') adjustment += 0.4
  if (finish === 'Lead Free HASL') adjustment += 0.1
  
  if (copperThickness === '2 oz (70 um)' || copperThickness === '70') adjustment += 0.3
  if (copperThickness === '3 oz (105 um)' || copperThickness === '105') adjustment += 0.6

  const subTotal = (baseSubTotal + nreCost) * adjustment
  const gst = subTotal * 0.18
  const shippingCost = specs.shippingMethod === 'DTDC Plus' ? 250 : 0

  return {
    unitPrice: Number((subTotal / quantity).toFixed(2)),
    nreCost,
    subTotal: Number(subTotal.toFixed(2)),
    gst: Number(gst.toFixed(2)),
    shippingCost,
    totalCost: Number((subTotal + gst + shippingCost).toFixed(2)),
    currency: 'INR'
  }
}
