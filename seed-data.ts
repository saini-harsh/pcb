import { getPayload } from 'payload'
import config from './src/payload.config'

async function run() {
  const payload = await getPayload({ config })

  console.log('--- Seeding Categories ---')
  const categoriesData = [
    { name: 'Microcontrollers', count: 1240 },
    { name: 'Passive Components', count: 8500 },
    { name: 'Integrated Circuits', count: 4200 },
    { name: 'Modules & Boards', count: 960 },
    { name: 'Connectors & Cables', count: 2100 },
    { name: 'Power Management', count: 1800 },
    { name: 'Sensors & Wireless', count: 1100 },
    { name: 'Tools & Storage', count: 450 }
  ]

  const categoryMap: Record<string, number> = {}

  for (const cat of categoriesData) {
    let existing = await payload.find({
      collection: 'categories',
      where: { name: { equals: cat.name } },
    })

    let categoryId
    if (existing.totalDocs === 0) {
      const created = await payload.create({
        collection: 'categories',
        data: cat,
      })
      categoryId = created.id
      console.log(`Created category: ${cat.name}`)
    } else {
      categoryId = existing.docs[0].id
      console.log(`Category already exists: ${cat.name}`)
    }
    categoryMap[cat.name] = categoryId
  }

  console.log('--- Seeding Products & Media ---')
  const productsData = [
    { name: 'Atmega328P-AU MCU', brand: 'Microchip', price: 280, rating: 4.8, img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop', cat: 'Microcontrollers' },
    { name: 'Neo-6M GPS Module', brand: 'U-blox', price: 1250, rating: 4.9, img: 'https://images.unsplash.com/photo-1558450146-5452f36ce381?q=80&w=2070&auto=format&fit=crop', cat: 'Modules & Boards' },
    { name: 'OLED 0.96" Display', brand: 'Waveshare', price: 450, rating: 4.7, img: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069&auto=format&fit=crop', cat: 'Modules & Boards' },
    { name: 'Relay 5V 1-Channel', brand: 'Omron', price: 85, rating: 4.5, img: 'https://images.unsplash.com/photo-1563770660941-20978e87081b?q=80&w=2070&auto=format&fit=crop', cat: 'Passive Components' },
    { name: 'Arduino Nano V3', brand: 'Gravitech', price: 650, rating: 4.8, img: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?q=80&w=2021&auto=format&fit=crop', cat: 'Microcontrollers' },
    { name: 'MPU6050 Gyro Sensor', brand: 'InvenSense', price: 320, rating: 4.9, img: 'https://images.unsplash.com/photo-1591405351990-4726e33df48b?q=80&w=2070&auto=format&fit=crop', cat: 'Sensors & Wireless' },
    { name: 'NodeMCU V3 Lua', brand: 'Espressif', price: 420, rating: 4.8, img: 'https://images.unsplash.com/photo-1550009158-9ebf661706da?q=80&w=2012&auto=format&fit=crop', cat: 'Microcontrollers' },
    { name: 'HC-SR04 Ultrasonic', brand: 'Elegoo', price: 180, rating: 4.6, img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop', cat: 'Sensors & Wireless' }
  ]

  for (const prod of productsData) {
    const existingProduct = await payload.find({
      collection: 'products',
      where: { name: { equals: prod.name } }
    })

    if (existingProduct.totalDocs > 0) {
      console.log(`Product already exists: ${prod.name}`)
      continue
    }

    // Handle Image Upload
    console.log(`Uploading image for: ${prod.name}...`)
    try {
      const response = await fetch(prod.img)
      if (!response.ok) {
        throw new Error(`Failed to fetch image. status=${response.status}`)
      }
      const buffer = Buffer.from(await response.arrayBuffer())

      const contentType = response.headers.get('content-type') ?? ''
      const mimeType = contentType || 'image/jpeg'
      const ext =
        mimeType.includes('png') ? 'png'
        : mimeType.includes('webp') ? 'webp'
        : mimeType.includes('gif') ? 'gif'
        : 'jpg'
      
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: prod.name,
        },
        file: {
          data: buffer,
          name: `${prod.name.replace(/\s+/g, '-').toLowerCase()}.${ext}`,
          mimetype: mimeType,
          size: buffer.length,
        },
      })

      // Create Product
      await payload.create({
        collection: 'products',
        data: {
          name: prod.name,
          brand: prod.brand,
          mpn: prod.name,
          manufacturer: prod.brand,
          price: prod.price,
          rating: prod.rating,
          images: [media.id as any],
          category: (categoryMap[prod.cat] || categoryMap['Microcontrollers']) as any,
        },
      })
      console.log(`Successfully seeded product: ${prod.name}`)
    } catch (error) {
      console.error(`Failed to seed product ${prod.name}:`, error)
    }
  }

  console.log('--- Seeding Admin ---')
  const adminEmail = 'admin@pcbglobe.com'
  const existingAdmins = await payload.find({
    collection: 'admins',
    where: { email: { equals: adminEmail } }
  })

  if (existingAdmins.totalDocs === 0) {
    await payload.create({
      collection: 'admins',
      data: {
        email: adminEmail,
        password: 'adminpassword123',
        name: 'Seed Admin',
        roles: ['admin'],
      },
    })
    console.log(`Created admin: ${adminEmail}`)
  }

  console.log('Seed completed successfully!')
  process.exit(0)
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
