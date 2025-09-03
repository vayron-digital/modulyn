'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export interface User {
  id: string
  email: string
  role: string
  first_name?: string
  last_name?: string
  avatar_url?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  })
  
  const router = useRouter()

  // Check initial auth state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
        
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session check error:', error)
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: error.message,
          })
          return
        }

        if (session?.user) {
          // Get user profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Profile fetch error:', profileError)
          }

          const user: User = {
            id: session.user.id,
            email: session.user.email || '',
            role: profile?.role || 'member',
            first_name: profile?.first_name,
            last_name: profile?.last_name,
            avatar_url: profile?.avatar_url,
          }

          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          })
        } else {
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
          })
        }
      } catch (err: any) {
        console.error('Auth check error:', err)
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: err.message || 'Authentication check failed',
        })
      }
    }

    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.id)
        
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            // Get user profile
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()

            if (profileError && profileError.code !== 'PGRST116') {
              console.error('Profile fetch error:', profileError)
            }

            const user: User = {
              id: session.user.id,
              email: session.user.email || '',
              role: profile?.role || 'member',
              first_name: profile?.first_name,
              last_name: profile?.last_name,
              avatar_url: profile?.avatar_url,
            }

            setAuthState({
              user,
              isLoading: false,
              isAuthenticated: true,
              error: null,
            })

            toast.success('Successfully signed in!')
          } catch (err: any) {
            console.error('Profile fetch error on sign in:', err)
            // Still set user as authenticated even if profile fetch fails
            const user: User = {
              id: session.user.id,
              email: session.user.email || '',
              role: 'member',
            }

            setAuthState({
              user,
              isLoading: false,
              isAuthenticated: true,
              error: null,
            })
          }
        } else if (event === 'SIGNED_OUT') {
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
          })
          
          toast.success('Successfully signed out!')
          router.push('/login')
        } else if (event === 'TOKEN_REFRESHED') {
          // Token refreshed, update user state if needed
          if (session?.user) {
            setAuthState(prev => ({
              ...prev,
              user: prev.user ? {
                ...prev.user,
                id: session.user.id,
                email: session.user.email || prev.user.email,
              } : null,
            }))
          }
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  const signOut = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        throw error
      }

      // State will be updated by the auth state change listener
    } catch (err: any) {
      console.error('Sign out error:', err)
      setAuthState(prev => ({ ...prev, error: err.message }))
      toast.error('Failed to sign out')
    }
  }, [])

  const refreshUser = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
      
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error) throw error
      
      if (user) {
        // Get updated profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Profile refresh error:', profileError)
        }

        const updatedUser: User = {
          id: user.id,
          email: user.email || '',
          role: profile?.role || 'member',
          first_name: profile?.first_name,
          last_name: profile?.last_name,
          avatar_url: profile?.avatar_url,
        }

        setAuthState({
          user: updatedUser,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        })
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: null,
        })
      }
    } catch (err: any) {
      console.error('User refresh error:', err)
      setAuthState(prev => ({ ...prev, error: err.message }))
    }
  }, [])

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }))
  }, [])

  return {
    ...authState,
    signOut,
    refreshUser,
    clearError,
  }
}
