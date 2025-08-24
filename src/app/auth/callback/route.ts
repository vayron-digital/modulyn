import { createRouteHandlerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  // Parse URL outside try-catch so it's available in catch block
  const requestUrl = new URL(request.url)

  try {
    console.log('Auth callback started')
    const code = requestUrl.searchParams.get('code')
    const error = requestUrl.searchParams.get('error')
    const error_description = requestUrl.searchParams.get('error_description')
    const origin = requestUrl.origin
    
    console.log('Auth callback params:', { code: !!code, error, error_description })

    if (error) {
      console.error('Auth error:', error, error_description)
      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent(error_description || error)}`
      )
    }

    if (code) {
      const supabase = createRouteHandlerClient()
      
      console.log('Exchanging code for session...')
      const { data: { session }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
      console.log('Session exchange result:', { hasSession: !!session, error: sessionError })
      
      if (sessionError) {
        console.error('Session error:', sessionError)
        return NextResponse.redirect(
          `${origin}/login?error=${encodeURIComponent(sessionError.message)}`
        )
      }

      if (session) {
        // Create response with redirect
        const response = NextResponse.redirect(`${origin}/dashboard`)

        // Get or create profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profileError && profileError.code === 'PGRST116') {
          // Profile doesn't exist, create it
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: session.user.id,
              email: session.user.email,
              first_name: session.user.user_metadata?.full_name?.split(' ')[0] || '',
              last_name: session.user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
              avatar_url: session.user.user_metadata?.avatar_url,
              role: 'member',
            })
            .select()
            .single()

          if (createError) {
            console.error('Profile creation error:', createError)
            return NextResponse.redirect(`${origin}/login?error=Failed to create profile`)
          }
        }

        // Set auth cookie
        response.cookies.set(
          'sb-access-token',
          session.access_token,
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
          }
        )

        response.cookies.set(
          'sb-refresh-token',
          session.refresh_token,
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
          }
        )

        return response
      }
    }

    return NextResponse.redirect(`${origin}/login?error=No session found`)
  } catch (e) {
    console.error('Callback error:', e)
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=An unexpected error occurred`
    )
  }
}
