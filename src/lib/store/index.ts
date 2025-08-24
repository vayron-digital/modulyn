import { create } from 'zustand'
import { User, Organization } from '@/types'
import { supabase } from '@/lib/supabase'

interface AuthState {
  user: User | null
  organization: Organization | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setOrganization: (organization: Organization | null) => void
  setIsLoading: (isLoading: boolean) => void
  logout: () => Promise<void>
  checkSession: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  organization: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setOrganization: (organization) => set({ organization }),
  setIsLoading: (isLoading) => set({ isLoading }),
  logout: async () => {
    await supabase.auth.signOut()
    set({ user: null, organization: null })
  },
  checkSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profile) {
          const { data: org } = await supabase
            .from('tenants')
            .select('*')
            .eq('id', profile.tenant_id)
            .single()

          set({
            user: {
              id: session.user.id,
              email: session.user.email!,
              firstName: profile.first_name || '',
              lastName: profile.last_name || '',
              organizationId: profile.tenant_id,
              role: profile.role,
              createdAt: new Date(session.user.created_at),
              updatedAt: new Date(profile.updated_at),
            },
            organization: org ? {
              id: org.id,
              name: org.name,
              type: org.organization_type,
              billingEmail: org.billing_email,
              address: org.address,
              subscriptionTier: org.subscription_tier,
              industry: org.industry,
              size: org.size,
              foundedYear: org.founded_year,
              website: org.website,
              socialMedia: org.social_media,
              primaryContact: org.primary_contact,
            } : null
          })
        }
      }
    } catch (error) {
      console.error('Error checking session:', error)
    } finally {
      set({ isLoading: false })
    }
  }
}))

interface UIState {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}))
