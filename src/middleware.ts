import type { NextRequest } from 'next/server'
import { createClient } from './lib/supabase/server'

export async function middleware(req: NextRequest) {
  const { supabase, response } = createClient(req)

  // Skip auth check for callback route
  if (req.nextUrl.pathname === '/auth/callback') {
    return response
  }

  // Check if auth is disabled
  if (process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true') {
    return response
  }

  const { data: { session } } = await supabase.auth.getSession()

  if (!session && req.nextUrl.pathname.includes('/dashboard')) {
    return Response.redirect(new URL('/login', req.url))
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
    '/auth/callback'
  ]
}
