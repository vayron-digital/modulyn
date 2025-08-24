import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

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

export async function signInWithGoogle() {
  console.log('Starting Google sign-in...')
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      }
    })

    if (error) {
      console.error('OAuth error:', error)
      throw error
    }

    console.log('Sign-in response:', { data })
    return { data, error }
  } catch (e) {
    console.error('Sign-in error:', e)
    throw e
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
