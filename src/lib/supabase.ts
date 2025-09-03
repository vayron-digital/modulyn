import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export async function signInWithGoogle(retryCount = 0): Promise<{ data: any; error: any }> {
  const maxRetries = 2
  const baseDelay = 1000 // 1 second
  
  console.log(`Starting Google sign-in (attempt ${retryCount + 1}/${maxRetries + 1})...`)
  
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      throw new Error('Google sign-in is only available in browser environment')
    }

    // Validate environment variables
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing')
    }

    // Test Supabase connection first
    try {
      const { data: testData, error: testError } = await supabase.auth.getSession()
      if (testError) {
        console.warn('Supabase connection test failed:', testError)
      }
    } catch (testErr) {
      console.warn('Supabase connection test error:', testErr)
    }

    // Get current origin for redirect
    const currentOrigin = window.location.origin
    const redirectUrl = `${currentOrigin}/auth/callback`
    
    console.log('OAuth configuration:', {
      provider: 'google',
      redirectTo: redirectUrl,
      currentOrigin,
      supabaseUrl
    })

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        // Add PKCE flow for better security
        flowType: 'pkce'
      }
    })

    if (error) {
      console.error('OAuth error:', error)
      
      // Handle specific error types
      if (error.message?.includes('network') || error.message?.includes('fetch')) {
        throw new Error('Network error - please check your connection')
      }
      
      if (error.message?.includes('popup')) {
        throw new Error('Popup blocked - please allow popups for this site')
      }
      
      if (error.message?.includes('redirect')) {
        throw new Error('Redirect URL configuration error - please check OAuth settings')
      }
      
      throw error
    }

    console.log('Sign-in response:', { data })
    
    // Check if we have a URL to redirect to
    if (data?.url) {
      console.log('Redirecting to:', data.url)
      // The redirect will happen automatically via the OAuth flow
    } else {
      console.warn('No redirect URL received from OAuth')
    }
    
    return { data, error }
    
  } catch (e: any) {
    console.error('Sign-in error:', e)
    
    // Retry logic for network-related errors
    if (retryCount < maxRetries && (
      e.message?.includes('network') || 
      e.message?.includes('fetch') ||
      e.message?.includes('timeout')
    )) {
      const delay = baseDelay * Math.pow(2, retryCount) // Exponential backoff
      console.log(`Retrying in ${delay}ms...`)
      
      await new Promise(resolve => setTimeout(resolve, delay))
      return signInWithGoogle(retryCount + 1)
    }
    
    // Enhanced error messages
    let userFriendlyError = 'Failed to sign in with Google'
    
    if (e.message?.includes('network')) {
      userFriendlyError = 'Network error - please check your internet connection'
    } else if (e.message?.includes('popup')) {
      userFriendlyError = 'Popup blocked - please allow popups and try again'
    } else if (e.message?.includes('timeout')) {
      userFriendlyError = 'Request timed out - please try again'
    } else if (e.message?.includes('cors')) {
      userFriendlyError = 'Cross-origin error - please refresh the page'
    } else if (e.message?.includes('supabase')) {
      userFriendlyError = 'Authentication service error - please try again later'
    } else if (e.message?.includes('redirect')) {
      userFriendlyError = 'OAuth configuration error - please contact support'
    }
    
    throw new Error(userFriendlyError)
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export async function getOrganization(id: string) {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}

export async function createOrganization(organization: any) {
  const { data, error } = await supabase
    .from('organizations')
    .insert(organization)
    .select()
    .single()
  return { data, error }
}

export async function updateOrganization(id: string, organization: any) {
  const { data, error } = await supabase
    .from('organizations')
    .update(organization)
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

export async function getEvents(organizationId: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('organization_id', organizationId)
    .order('start_date', { ascending: true })
  return { data, error }
}

export async function createEvent(event: any) {
  const { data, error } = await supabase
    .from('events')
    .insert(event)
    .select()
    .single()
  return { data, error }
}

export async function updateEvent(id: string, event: any) {
  const { data, error } = await supabase
    .from('events')
    .update(event)
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

export async function getRegistrations(eventId: string) {
  const { data, error } = await supabase
    .from('registrations')
    .select('*, users(*)')
    .eq('event_id', eventId)
  return { data, error }
}

export async function createRegistration(registration: any) {
  const { data, error } = await supabase
    .from('registrations')
    .insert(registration)
    .select()
    .single()
  return { data, error }
}

export async function updateRegistration(id: string, registration: any) {
  const { data, error } = await supabase
    .from('registrations')
    .update(registration)
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}
