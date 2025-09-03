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

    // Handle OAuth errors from Google
    if (error) {
      console.error('Auth error:', error, error_description)
      
      let userFriendlyError = 'Authentication failed'
      
      // Map common OAuth errors to user-friendly messages
      switch (error) {
        case 'access_denied':
          userFriendlyError = 'Access denied - you cancelled the sign-in process'
          break
        case 'invalid_request':
          userFriendlyError = 'Invalid request - please try again'
          break
        case 'unauthorized_client':
          userFriendlyError = 'Unauthorized client - please contact support'
          break
        case 'unsupported_response_type':
          userFriendlyError = 'Unsupported response type - please try again'
          break
        case 'server_error':
          userFriendlyError = 'Server error - please try again later'
          break
        case 'temporarily_unavailable':
          userFriendlyError = 'Service temporarily unavailable - please try again later'
          break
        default:
          userFriendlyError = error_description || error
      }
      
      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent(userFriendlyError)}`
      )
    }

    if (code) {
      const supabase = createRouteHandlerClient()
      
      console.log('Exchanging code for session...')
      
      // Add timeout to prevent hanging
      const sessionPromise = supabase.auth.exchangeCodeForSession(code)
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Session exchange timeout')), 30000)
      )
      
      const { data: { session }, error: sessionError } = await Promise.race([
        sessionPromise,
        timeoutPromise
      ]) as any
      
      console.log('Session exchange result:', { hasSession: !!session, error: sessionError })
      
      if (sessionError) {
        console.error('Session error:', sessionError)
        
        let userFriendlyError = 'Failed to create session'
        
        if (sessionError.message?.includes('timeout')) {
          userFriendlyError = 'Authentication timed out - please try again'
        } else if (sessionError.message?.includes('network')) {
          userFriendlyError = 'Network error - please check your connection and try again'
        } else if (sessionError.message?.includes('invalid')) {
          userFriendlyError = 'Invalid authentication code - please try signing in again'
        }
        
        return NextResponse.redirect(
          `${origin}/login?error=${encodeURIComponent(userFriendlyError)}`
        )
      }

      if (session) {
        // Create response with redirect
        const response = NextResponse.redirect(`${origin}/dashboard`)

        // Get or create profile with retry logic
        let profile = null
        let profileError = null
        let retryCount = 0
        const maxRetries = 3
        
        try {
          
          while (retryCount < maxRetries) {
            try {
              const { data: profileData, error: profileErr } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()
              
              if (profileErr && profileErr.code === 'PGRST116') {
                // Profile doesn't exist, create it
                console.log('Creating new profile for user:', session.user.id)
                
                const { data: newProfile, error: createError } = await supabase
                  .from('profiles')
                  .insert({
                    id: session.user.id,
                    email: session.user.email,
                    first_name: session.user.user_metadata?.full_name?.split(' ')[0] || '',
                    last_name: session.user.user_metadata?.full_name?.slice(1).join(' ') || '',
                    avatar_url: session.user.user_metadata?.avatar_url,
                    role: 'member',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                  })
                  .select()
                  .single()

                if (createError) {
                  console.error('Profile creation error:', createError)
                  throw createError
                }
                
                profile = newProfile
                console.log('Profile created successfully:', profile)
                break
              } else if (profileErr) {
                throw profileErr
              } else {
                profile = profileData
                console.log('Profile found:', profile)
                break
              }
            } catch (err: any) {
              retryCount++
              console.error(`Profile operation attempt ${retryCount} failed:`, err)
              
              if (retryCount >= maxRetries) {
                profileError = err
                break
              }
              
              // Wait before retry with exponential backoff
              await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000))
            }
          }
          
          if (profileError) {
            console.error('Profile operation failed after retries:', profileError)
            return NextResponse.redirect(`${origin}/login?error=Failed to create profile - please try again`)
          }
          
        } catch (profileErr) {
          console.error('Profile operation error:', profileErr)
          // Don't fail the entire auth flow for profile issues
          // User can still access the app and profile can be created later
        }

        // Set auth cookies with enhanced security
        const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax' as const,
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        }

        response.cookies.set(
          'sb-access-token',
          session.access_token,
          cookieOptions
        )

        response.cookies.set(
          'sb-refresh-token',
          session.refresh_token,
          cookieOptions
        )

        // Set user info cookie for quick access
        response.cookies.set(
          'sb-user-info',
          JSON.stringify({
            id: session.user.id,
            email: session.user.email,
            role: profile?.role || 'member'
          }),
          { ...cookieOptions, maxAge: 60 * 60 * 24 } // 1 day
        )

        console.log('Auth callback completed successfully')
        return response
      }
    }

    // No code or session found
    console.warn('No session found in callback')
    return NextResponse.redirect(`${origin}/login?error=Authentication incomplete - please try again`)
    
  } catch (e: any) {
    console.error('Callback error:', e)
    
    let userFriendlyError = 'An unexpected error occurred'
    
    if (e.message?.includes('timeout')) {
      userFriendlyError = 'Authentication timed out - please try again'
    } else if (e.message?.includes('network')) {
      userFriendlyError = 'Network error - please check your connection'
    } else if (e.message?.includes('supabase')) {
      userFriendlyError = 'Authentication service error - please try again later'
    }
    
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${encodeURIComponent(userFriendlyError)}`
    )
  }
}
