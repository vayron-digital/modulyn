import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Skip auth check for callback route
  if (req.nextUrl.pathname === '/auth/callback') {
    return res
  }

  // Temporarily disable auth redirects to test
  return res
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
    '/auth/callback'
  ]
}
