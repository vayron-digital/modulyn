'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store'
import { supabase } from '@/lib/supabase'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)
  const isLoading = useAuthStore((state) => state.isLoading)
  const setIsLoading = useAuthStore((state) => state.setIsLoading)

  useEffect(() => {
    let mounted = true

    const checkSession = async () => {
      try {
        console.log('Checking initial session...')
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error

        if (session?.user && mounted) {
          console.log('Found existing session, getting profile...')
          // Get user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (mounted) {
            console.log('Setting initial user state:', { session, profile })
            setUser({
              id: session.user.id,
              email: session.user.email!,
              firstName: profile?.first_name || session.user.user_metadata?.full_name?.split(' ')[0] || '',
              lastName: profile?.last_name || session.user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
              organizationId: profile?.tenant_id || '',
              role: profile?.role || 'member',
              createdAt: new Date(session.user.created_at),
              updatedAt: new Date(profile?.updated_at || session.user.created_at),
            })

            // If we're on the login page and have a session, redirect to dashboard
            if (window.location.pathname === '/login') {
              router.push('/dashboard')
            }
          }
        }
      } catch (error) {
        console.error('Session check error:', error)
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, 'Session:', !!session)
      
      if (event === 'SIGNED_IN' && session?.user) {
        console.log('Signed in, getting profile...')
        
        // Try to get existing profile
        let userProfile = null
        const { data: existingProfile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profileError) {
          console.error('Error getting profile:', profileError)
          // If profile doesn't exist, create it
          if (profileError.code === 'PGRST116') {
            console.log('Creating new profile...')
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
              console.error('Error creating profile:', createError)
            } else {
              console.log('Profile created:', newProfile)
              userProfile = newProfile
            }
          }
        } else {
          userProfile = existingProfile
        }

        console.log('Setting user with profile:', userProfile)
        setUser({
          id: session.user.id,
          email: session.user.email!,
          firstName: userProfile?.first_name || session.user.user_metadata?.full_name?.split(' ')[0] || '',
          lastName: userProfile?.last_name || session.user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
          organizationId: userProfile?.tenant_id || '',
          role: userProfile?.role || 'member',
          createdAt: new Date(session.user.created_at),
          updatedAt: new Date(userProfile?.updated_at || session.user.created_at),
        })
        router.push('/dashboard')
      } else if (event === 'SIGNED_OUT') {
        console.log('Signed out, clearing user...')
        setUser(null)
        router.push('/login')
      }
    })

    checkSession()

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [setUser, setIsLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return <>{children}</>
}
