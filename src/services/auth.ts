import { supabase } from '@/lib/supabase/client'
import { createClient } from '@/lib/supabase/server'

export interface AuthUser {
  id: string
  email: string
  first_name?: string
  last_name?: string
  role?: string
  organization_id?: string
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  organization_id?: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  company?: string
  job_title?: string
  industry?: string
  address?: any
  social_media?: any
  bio?: string
  profile_image_url?: string
  created_at: string
  updated_at: string
}

export interface UserSettings {
  id: string
  user_id: string
  organization_id?: string
  user_mode: 'trade' | 'crm'
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
  notifications: any
  preferences: any
  created_at: string
  updated_at: string
}

export interface Organization {
  id: string
  name: string
  type: 'trade_association' | 'chamber_of_commerce' | 'professional_association' | 'industry_group'
  description?: string
  website?: string
  phone?: string
  email: string
  address?: any
  social_media?: any
  primary_contact?: any
  subscription_tier: 'basic' | 'professional' | 'enterprise'
  industry?: string
  size?: string
  founded_year?: number
  logo_url?: string
  created_at: string
  updated_at: string
}

// Authentication Service
export const authService = {
  // Sign up with email and password
  async signUp(email: string, password: string, userData: Partial<UserProfile>): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            company: userData.company,
            job_title: userData.job_title
          }
        }
      })

      if (error) {
        return { user: null, error: error.message }
      }

      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: data.user.id,
            first_name: userData.first_name || '',
            last_name: userData.last_name || '',
            email: email,
            company: userData.company,
            job_title: userData.job_title,
            industry: userData.industry
          })

        if (profileError) {
          console.error('Error creating user profile:', profileError)
        }
      }

      return { user: data.user, error: null }
    } catch (error) {
      return { user: null, error: 'An unexpected error occurred' }
    }
  },

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        return { user: null, error: error.message }
      }

      return { user: data.user, error: null }
    } catch (error) {
      return { user: null, error: 'An unexpected error occurred' }
    }
  },

  // Sign in with Google OAuth
  async signInWithGoogle(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        return { error: error.message }
      }

      return { error: null }
    } catch (error) {
      return { error: 'An unexpected error occurred' }
    }
  },

  // Sign out
  async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        return { error: error.message }
      }

      return { error: null }
    } catch (error) {
      return { error: 'An unexpected error occurred' }
    }
  },

  // Get current user
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error || !user) {
        return null
      }

      return user
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  },

  // Get current user profile
  async getCurrentUserProfile(): Promise<UserProfile | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error getting current user profile:', error)
      return null
    }
  },

  // Update user profile
  async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating user profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error updating user profile:', error)
      return null
    }
  },

  // Get user settings
  async getUserSettings(): Promise<UserSettings | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) {
        // If no settings exist, create default settings
        if (error.code === 'PGRST116') {
          return await this.createDefaultUserSettings()
        }
        console.error('Error fetching user settings:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error getting user settings:', error)
      return null
    }
  },

  // Update user settings
  async updateUserSettings(updates: Partial<UserSettings>): Promise<UserSettings | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      const { data, error } = await supabase
        .from('user_settings')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating user settings:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error updating user settings:', error)
      return null
    }
  },

  // Create default user settings
  async createDefaultUserSettings(): Promise<UserSettings | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      const { data, error } = await supabase
        .from('user_settings')
        .insert({
          user_id: user.id,
          user_mode: 'trade',
          theme: 'system',
          language: 'en',
          timezone: 'UTC',
          notifications: {},
          preferences: {}
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating default user settings:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error creating default user settings:', error)
      return null
    }
  },

  // Reset password
  async resetPassword(email: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      })

      if (error) {
        return { error: error.message }
      }

      return { error: null }
    } catch (error) {
      return { error: 'An unexpected error occurred' }
    }
  },

  // Update password
  async updatePassword(newPassword: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        return { error: error.message }
      }

      return { error: null }
    } catch (error) {
      return { error: 'An unexpected error occurred' }
    }
  }
}

// Organization Service
export const organizationService = {
  // Get current user's organization
  async getCurrentOrganization(): Promise<Organization | null> {
    try {
      const userSettings = await authService.getUserSettings()
      if (!userSettings?.organization_id) return null

      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', userSettings.organization_id)
        .single()

      if (error) {
        console.error('Error fetching organization:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error getting current organization:', error)
      return null
    }
  },

  // Create new organization
  async createOrganization(orgData: Omit<Organization, 'id' | 'created_at' | 'updated_at'>): Promise<Organization | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      // Create organization
      const { data: org, error: orgError } = await supabase
        .from('organizations')
        .insert(orgData)
        .select()
        .single()

      if (orgError) {
        console.error('Error creating organization:', orgError)
        return null
      }

      // Update user settings with organization ID
      await authService.updateUserSettings({
        organization_id: org.id
      })

      // Update user profile with organization ID
      await authService.updateUserProfile({
        organization_id: org.id
      })

      return org
    } catch (error) {
      console.error('Error creating organization:', error)
      return null
    }
  },

  // Update organization
  async updateOrganization(updates: Partial<Organization>): Promise<Organization | null> {
    try {
      const userSettings = await authService.getUserSettings()
      if (!userSettings?.organization_id) return null

      const { data, error } = await supabase
        .from('organizations')
        .update(updates)
        .eq('id', userSettings.organization_id)
        .select()
        .single()

      if (error) {
        console.error('Error updating organization:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error updating organization:', error)
      return null
    }
  },

  // Get organization by ID
  async getOrganizationById(id: string): Promise<Organization | null> {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching organization:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error getting organization by ID:', error)
      return null
    }
  },

  // Search organizations
  async searchOrganizations(query: string): Promise<Organization[]> {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,industry.ilike.%${query}%`)
        .order('name', { ascending: true })

      if (error) {
        console.error('Error searching organizations:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error searching organizations:', error)
      return []
    }
  }
}

// User Management Service
export const userManagementService = {
  // Get all users in the organization
  async getOrganizationUsers(): Promise<UserProfile[]> {
    try {
      const userSettings = await authService.getUserSettings()
      if (!userSettings?.organization_id) return []

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('organization_id', userSettings.organization_id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching organization users:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error getting organization users:', error)
      return []
    }
  },

  // Invite user to organization
  async inviteUser(email: string, role: string = 'member'): Promise<{ success: boolean; error: string | null }> {
    try {
      // This would typically integrate with an email service
      // For now, we'll just return success
      console.log(`Inviting user ${email} with role ${role}`)
      
      return { success: true, error: null }
    } catch (error) {
      return { success: false, error: 'Failed to invite user' }
    }
  },

  // Update user role
  async updateUserRole(userId: string, role: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('user_id', userId)

      if (error) {
        console.error('Error updating user role:', error)
        return { success: false, error: error.message }
      }

      return { success: true, error: null }
    } catch (error) {
      return { success: false, error: 'Failed to update user role' }
    }
  },

  // Remove user from organization
  async removeUserFromOrganization(userId: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ organization_id: null })
        .eq('user_id', userId)

      if (error) {
        console.error('Error removing user from organization:', error)
        return { success: false, error: error.message }
      }

      return { success: true, error: null }
    } catch (error) {
      return { success: false, error: 'Failed to remove user from organization' }
    }
  }
}

// Session Management
export const sessionService = {
  // Get current session
  async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Error getting session:', error)
        return null
      }

      return session
    } catch (error) {
      console.error('Error getting current session:', error)
      return null
    }
  },

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const session = await this.getCurrentSession()
      return !!session
    } catch (error) {
      return false
    }
  },

  // Check if user has specific role
  async hasRole(requiredRole: string): Promise<boolean> {
    try {
      const profile = await authService.getCurrentUserProfile()
      if (!profile) return false

      return profile.role === requiredRole
    } catch (error) {
      return false
    }
  },

  // Check if user is admin
  async isAdmin(): Promise<boolean> {
    return this.hasRole('admin')
  },

  // Check if user is member
  async isMember(): Promise<boolean> {
    return this.hasRole('member')
  }
}

// Real-time authentication subscriptions
export const authRealtime = {
  // Subscribe to auth state changes
  subscribeToAuthChanges(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  },

  // Subscribe to user profile changes
  subscribeToUserProfileChanges(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`user_profile_${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  },

  // Subscribe to user settings changes
  subscribeToUserSettingsChanges(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`user_settings_${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_settings',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  }
}
