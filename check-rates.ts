import { getPayload } from 'payload'
import config from './src/payload.config'

async function run() {
  const payload = await getPayload({ config })

  console.log('Checking for fabrication rates for layer 1...')
  const layer1Rates = await payload.find({
    collection: 'fabrication-rates',
    where: {
      layers: {
        equals: 1,
      },
    },
    limit: 10,
  })

  console.log(`Found ${layer1Rates.totalDocs} records for layer 1.`)
  if (layer1Rates.totalDocs > 0) {
    console.log('First few records:', JSON.stringify(layer1Rates.docs, null, 2))
  }

  console.log('Checking for fabrication rates for layer 2...')
  const layer2Rates = await payload.find({
    collection: 'fabrication-rates',
    where: {
      layers: {
        equals: 2,
      },
    },
    limit: 10,
  })
  console.log(`Found ${layer2Rates.totalDocs} records for layer 2.`)

  process.exit(0)
}

run()
