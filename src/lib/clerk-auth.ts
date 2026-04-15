import { auth, clerkClient, verifyToken } from '@clerk/nextjs/server'

/**
 * Robust helper to get the current Clerk user from an incoming request.
 * Supports both standard session cookies (default in Next.js App Router)
 * and Bearer token fallback (often needed for cross-origin or local development).
 */
export async function getClerkUserFromRequest(request: any) {
  // 1) Cookie-based auth (works when session cookie is readable server-side)
  console.log('[clerk-auth] Checking session via auth()...')
  try {
    const authData = await auth()
    const userId = authData?.userId
    
    console.log('[clerk-auth] auth() userId identify:', userId)
    if (userId) {
       const client = await clerkClient()
       return await client.users.getUser(userId)
    }
  } catch (error) {
    console.log('[clerk-auth] cookie auth attempt failed:', error)
  }

  // 2) Bearer token fallback (works reliably on localhost/cross-origin)
  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : null
  
  if (!token) {
    console.log('[clerk-auth] No Bearer token found in headers.')
    return null
  }

  console.log('[clerk-auth] Bearer token found. Length:', token.length)

  let verified: Awaited<ReturnType<typeof verifyToken>> | null = null
  try {
    const opts: any = {
      secretKey: process.env.CLERK_SECRET_KEY,
      clockSkewInMs: 7_200_000, // 2 HOURS - Loose tolerance for system clock mismatches
    }
    if (process.env.CLERK_JWT_KEY) {
      opts.jwtKey = process.env.CLERK_JWT_KEY
    }

    verified = await verifyToken(token, opts)
    console.log('[clerk-auth] Token verify success, sub:', verified?.sub)
  } catch (error: any) {
    console.log('[clerk-auth] token verify failed. error:', error?.message || error)
    return null
  }

  const userId = verified?.sub
  if (!userId) return null

  try {
    const client = await clerkClient()
    return await client.users.getUser(userId)
  } catch (error) {
    console.log('[clerk-auth] client.users.getUser failed for sub:', userId, error)
    return null
  }
}
