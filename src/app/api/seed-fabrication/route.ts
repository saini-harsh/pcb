import { getPayload } from 'payload'
import config from '@/payload.config'
import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    console.log('--- Seeding Fabrication Rates ---')
    
    // We need to read the file from the root
    const filePath = path.resolve(process.cwd(), 'fabrication_data.json')
    if (!fs.existsSync(filePath)) {
        return NextResponse.json({ error: 'fabrication_data.json not found' }, { status: 404 })
    }

    const rawData = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(rawData)

    // Skip the first 2 rows (headers)
    const rateRows = data.slice(2)
    const results = []

    for (const row of rateRows) {
      if (!row['__EMPTY'] || !row['__EMPTY'].startsWith('ITEM NO')) continue

      const itemData = {
        itemNo: row['__EMPTY'],
        rangeStart: Number(row['RANGE']) || 0,
        price3WD: Number(row['__EMPTY_4']) || 0,
        price5WD: Number(row['__EMPTY_6']) || 0,
        price7WD: Number(row['__EMPTY_8']) || 0,
      }

      if (itemData.price3WD === 0 && itemData.price5WD === 0 && itemData.price7WD === 0) {
          continue
      }

      let existing = await payload.find({
        collection: 'fabrication-rates',
        where: { itemNo: { equals: itemData.itemNo } },
      })

      if (existing.totalDocs === 0) {
        await payload.create({
          collection: 'fabrication-rates',
          data: itemData,
        })
        results.push(`Created: ${itemData.itemNo}`)
      } else {
        await payload.update({
          collection: 'fabrication-rates',
          id: existing.docs[0].id,
          data: itemData,
        })
        results.push(`Updated: ${itemData.itemNo}`)
      }
    }

    return NextResponse.json({ message: 'Seeding completed', results })
  } catch (error: any) {
    console.error('Seed failed:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
