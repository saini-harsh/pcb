try {
  console.log('Testing Payload import...')
  const payload = require('payload')
  console.log('Payload imported successfully')
  process.exit(0)
} catch (e) {
  console.error('Payload import failed:')
  console.error(e)
  process.exit(1)
}
