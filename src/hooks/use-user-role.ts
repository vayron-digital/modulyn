"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export type UserRole = 'admin' | 'manager' | 'employee'

interface UseUserRoleReturn {
  role: UserRole | null
  isLoading: boolean
  canViewMarketing: boolean
  canViewDetailedStats: boolean
  isAdmin: boolean
  isManager: boolean
  isEmployee: boolean
}

export function useUserRole(): UseUserRoleReturn {
  const [role, setRole] = useState<UserRole | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getUserRole() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          setRole(null)
          return
        }

        // Get user's role from user_settings table
        const { data: userSettings, error } = await supabase
          .from('user_settings')
          .select('role')
          .eq('user_id', user.id)
          .single()

        if (error) {
          console.error('Error fetching user role:', error)
          return
        }

        setRole(userSettings?.role as UserRole || 'employee')
      } catch (error) {
        console.error('Error in getUserRole:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getUserRole()
  }, [])

  return {
    role,
    isLoading,
    canViewMarketing: role === 'admin' || role === 'manager',
    canViewDetailedStats: role === 'admin' || role === 'manager',
    isAdmin: role === 'admin',
    isManager: role === 'manager',
    isEmployee: role === 'employee',
  }
}
