import { getPayload } from 'payload'
import config from './src/payload.config'

async function run() {
  try {
    const payload = await getPayload({ config })
    
    console.log('Attempting manual login via Payload API...')
    const result = await payload.login({
      collection: 'admins',
      data: {
        email: 'admin@pcbglobe.com',
        password: 'adminpassword123',
      },
    })
    
    console.log('Login successful:', !!result.user)
    process.exit(0)
  } catch (error: any) {
    console.error('Login failed with error:', error.message)
    console.error('Stack:', error.stack)
    process.exit(1)
  }
}

run()
