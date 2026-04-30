import { getPayload as getPayloadLocal } from 'payload'
import config from '@/payload.config'

let cachedPayload: any = (global as any).payload

if (!cachedPayload) {
  cachedPayload = (global as any).payload = { client: null, promise: null }
}

export const getPayload = async () => {
  if (cachedPayload.client) {
    return cachedPayload.client
  }

  if (!cachedPayload.promise) {
    cachedPayload.promise = getPayloadLocal({ config })
  }

  try {
    cachedPayload.client = await cachedPayload.promise
  } catch (e: any) {
    cachedPayload.promise = null
    throw e
  }

  return cachedPayload.client
}
