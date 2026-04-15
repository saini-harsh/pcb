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
  const area = width * height // in mm^2
  
  // Base cost per layer factor in INR
  const layerFactors: Record<number, number> = {
    1: 0.5,
    2: 0.8,
    4: 1.5,
    6: 2.5,
    8: 4.0,
    10: 6.0,
  }

  const baseFactor = layerFactors[layers] || 10.0
  let areaPrice = (area / 100) * baseFactor // Price per unit based on area

  // Finish premium
  if (finish === 'ENIG') areaPrice *= 1.4
  if (finish === 'Lead Free HASL') areaPrice *= 1.1

  // Copper thickness premium
  if (copperThickness === '2 oz (70 um)') areaPrice *= 1.3
  if (copperThickness === '3 oz (105 um)') areaPrice *= 1.6

  // Quantity discount
  let qtyFactor = 1.0
  if (quantity > 10) qtyFactor = 0.9
  if (quantity > 50) qtyFactor = 0.8
  if (quantity > 100) qtyFactor = 0.7

  const unitPrice = areaPrice * qtyFactor
  const subTotal = unitPrice * quantity
  
  // NRE / Setup Fee
  const nreCost = layers > 2 ? 1500 : 0 // Free tooling for 1-2 layers usually

  // Build time multiplier
  let buildTimeMultiplier = 1.0
  if (buildTime === '4-5 Days') buildTimeMultiplier = 1.2
  if (buildTime === '2-3 Days') buildTimeMultiplier = 1.5
  if (buildTime === '1-2 Days') buildTimeMultiplier = 2.0

  const adjustedSubTotal = (subTotal + nreCost) * buildTimeMultiplier
  const gst = adjustedSubTotal * 0.18
  const shippingCost = specs.shippingMethod === 'DTDC Plus' ? 250 : 0

  return {
    unitPrice: Number(unitPrice.toFixed(2)),
    nreCost,
    subTotal: Number(adjustedSubTotal.toFixed(2)),
    gst: Number(gst.toFixed(2)),
    shippingCost,
    totalCost: Number((adjustedSubTotal + gst + shippingCost).toFixed(2)),
    currency: 'INR'
  }
}
