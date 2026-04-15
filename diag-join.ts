import { getPayload } from 'payload'
import config from './src/payload.config'

async function run() {
  try {
    const payload = await getPayload({ config })
    
    console.log('Testing find result structure...')
    const admins = await payload.find({
      collection: 'admins',
    })
    
    const admin = admins.docs[0]
    console.log('Admin found:', !!admin)
    if (admin) {
        console.log('Keys in admin doc:', Object.keys(admin))
    }
    
    process.exit(0)
  } catch (error: any) {
    console.error('Diagnostic failed:', error.message)
    console.error('Stack:', error.stack)
    process.exit(1)
  }
}

run()
