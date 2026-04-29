import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const specs = await req.json()
        const { width, height, layers, quantity, finish, copperThickness, shippingMethod } = specs

        const payload = await getPayload({ config })

        // Default calculations - rounded down to 3 decimal places to match reference tables
        const calculations = Math.floor((width * height / 1000000) * quantity * 1000) / 1000

        let basePrices: any = {
            price3WD: 0,
            price5WD: 0,
            price7WD: 0
        }

        if (layers === 1 || layers === 2 || layers === 4 || layers === 6 || layers === 8) {
            // Find matching fabrication rate row from database
            const rates = await payload.find({
                collection: 'fabrication-rates',
                where: {
                    layers: { equals: layers }
                },
                sort: 'rangeStart',
                limit: 1000,
            })

            if (rates.docs.length > 0) {
                // Find the correct row: largest rangeStart <= calculations (with small epsilon)
                let matchingRate = rates.docs[0]
                for (const rate of rates.docs) {
                    if (rate.rangeStart <= (calculations + 0.00001)) {
                        matchingRate = rate
                    } else {
                        break
                    }
                }

                if (matchingRate) {
                    console.log(`Matching rate for calculations ${calculations}:`, matchingRate.itemNo, matchingRate.price7WD)
                    basePrices = {
                        price1WD: matchingRate.price1WD || 0,
                        price3WD: matchingRate.price3WD || 0,
                        price5WD: matchingRate.price5WD || 0,
                        price7WD: matchingRate.price7WD || 0,
                        price10WD: matchingRate.price10WD_PG || matchingRate.price10WD || 0
                    }
                }
            } else {
                console.log(`No rates found for layer ${layers}`)
            }
        }

        const calculateResult = (basePrice: number) => {
            if (!basePrice || basePrice === 0) return null

            const nreCost = layers > 8 ? 1500 : 0

            // Adjustments (ENIG, Copper thickness, etc) apply to the base subtotal
            let subtotalWithExtras = basePrice
            if (finish === 'ENIG') subtotalWithExtras *= 1.4
            if (finish === 'Lead Free HASL') subtotalWithExtras *= 1.1

            if (copperThickness === '2 oz (70 um)' || String(copperThickness) === '70') subtotalWithExtras *= 1.3
            if (copperThickness === '3 oz (105 um)' || String(copperThickness) === '105') subtotalWithExtras *= 1.6

            const subTotal = Math.round(subtotalWithExtras + nreCost)
            const gstAmount = Math.round(subTotal * 0.18)
            const shippingCost = shippingMethod === 'DTDC Plus' ? 250 : 0
            const grandTotal = subTotal + gstAmount + shippingCost

            return {
                unitPrice: Number((subTotal / quantity).toFixed(2)),
                nreCost,
                subTotal: subTotal,
                gst: gstAmount,
                shippingCost,
                totalCost: grandTotal
            }
        }

        const quotes: any = {
            '3 WD': calculateResult(basePrices.price3WD),
            '5 WD': calculateResult(basePrices.price5WD),
            '7 WD': calculateResult(basePrices.price7WD),
        }

        if (layers === 1 && basePrices.price1WD) {
            quotes['1 WD'] = calculateResult(basePrices.price1WD)
        }

        if (basePrices.price10WD) {
            quotes['10 WD'] = calculateResult(basePrices.price10WD)
        }

        return NextResponse.json({
            calculations,
            quotes
        })

    } catch (error: any) {
        console.error('Quote calculation failed:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
