import { getPayload } from 'payload'
import config from './src/payload.config'

async function run() {
  const payload = await getPayload({ config })
  
  const email = 'admin@pcbglobe.com'
  const password = 'adminpassword123'
  
  console.log('Checking for existing admins...')
  const existingAdmins = await payload.find({
    collection: 'admins',
    where: {
      email: {
        equals: email,
      },
    },
  })

  if (existingAdmins.totalDocs > 0) {
    console.log('Admin already exists.')
  } else {
    console.log('Creating admin...')
    await payload.create({
      collection: 'admins',
      data: {
        email,
        password,
        name: 'Manual Admin',
        roles: ['admin'],
      },
    })
    console.log(`Successfully created admin: ${email}`)
  }
  process.exit(0)
}

run()
