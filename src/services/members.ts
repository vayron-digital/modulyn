import { supabase } from '@/lib/supabase/client'

export interface Member {
  id: string
  organization_id: string
  email: string
  first_name: string
  last_name: string
  role: 'admin' | 'member' | 'viewer'
  membership_type: string
  member_since: string
  subscription_status: 'active' | 'expired' | 'pending' | 'cancelled'
  profile_image_url?: string
  phone?: string
  certifications: string[]
  specializations: string[]
  committees: string[]
  company?: string
  job_title?: string
  industry?: string
  address?: any
  social_media?: any
  bio?: string
  created_at: string
  updated_at: string
}

export interface MemberProfile {
  id: string
  user_id: string
  organization_id: string
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

export interface MembershipTier {
  id: string
  organization_id: string
  name: string
  description?: string
  price: number
  currency: string
  billing_cycle: 'monthly' | 'quarterly' | 'annually'
  features: string[]
  max_members?: number
  max_events?: number
  max_storage_gb?: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Certification {
  id: string
  organization_id: string
  name: string
  description?: string
  validity_period: number // in months
  requirements: string[]
  status: 'active' | 'archived'
  created_at: string
  updated_at: string
}

export interface MemberCertification {
  id: string
  member_id: string
  certification_id: string
  status: 'in_progress' | 'completed' | 'expired'
  completed_requirements: string[]
  start_date: string
  completion_date?: string
  expiry_date?: string
  created_at: string
  updated_at: string
}

// Get current user's organization ID
async function getCurrentOrganizationId(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: userSettings } = await supabase
    .from('user_settings')
    .select('organization_id')
    .eq('user_id', user.id)
    .single()

  return userSettings?.organization_id || null
}

// Members Service
export const membersService = {
  // Get all members for the organization
  async getMembers(): Promise<Member[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching members:', error)
      return []
    }

    return data || []
  },

  // Get member by ID
  async getMemberById(id: string): Promise<Member | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .eq('organization_id', organizationId)
      .single()

    if (error) {
      console.error('Error fetching member:', error)
      return null
    }

    return data
  },

  // Get current user's member profile
  async getCurrentMemberProfile(): Promise<Member | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .eq('organization_id', organizationId)
      .single()

    if (error) {
      console.error('Error fetching current member profile:', error)
      return null
    }

    return data
  },

  // Update member profile
  async updateMemberProfile(updates: Partial<Member>): Promise<Member | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .eq('organization_id', organizationId)
      .select()
      .single()

    if (error) {
      console.error('Error updating member profile:', error)
      return null
    }

    return data
  },

  // Get members by membership type
  async getMembersByMembershipType(type: string): Promise<Member[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('membership_type', type)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching members by membership type:', error)
      return []
    }

    return data || []
  },

  // Get members by subscription status
  async getMembersBySubscriptionStatus(status: Member['subscription_status']): Promise<Member[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('subscription_status', status)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching members by subscription status:', error)
      return []
    }

    return data || []
  },

  // Search members
  async searchMembers(query: string): Promise<Member[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('organization_id', organizationId)
      .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,company.ilike.%${query}%,email.ilike.%${query}%`)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error searching members:', error)
      return []
    }

    return data || []
  },

  // Get members by committee
  async getMembersByCommittee(committee: string): Promise<Member[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('organization_id', organizationId)
      .contains('committees', [committee])
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching members by committee:', error)
      return []
    }

    return data || []
  },

  // Get members by specialization
  async getMembersBySpecialization(specialization: string): Promise<Member[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('organization_id', organizationId)
      .contains('specializations', [specialization])
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching members by specialization:', error)
      return []
    }

    return data || []
  },

  // Get member statistics
  async getMemberStatistics(): Promise<{
    totalMembers: number
    activeMembers: number
    newMembersThisMonth: number
    membersByType: Record<string, number>
    membersByStatus: Record<string, number>
  }> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) {
      return {
        totalMembers: 0,
        activeMembers: 0,
        newMembersThisMonth: 0,
        membersByType: {},
        membersByStatus: {}
      }
    }

    try {
      // Total members
      const { count: totalMembers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', organizationId)

      // Active members
      const { count: activeMembers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', organizationId)
        .eq('subscription_status', 'active')

      // New members this month
      const startOfMonth = new Date()
      startOfMonth.setDate(1)
      startOfMonth.setHours(0, 0, 0, 0)

      const { count: newMembersThisMonth } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', organizationId)
        .gte('created_at', startOfMonth.toISOString())

      // Members by type
      const { data: membersByTypeData } = await supabase
        .from('profiles')
        .select('membership_type')
        .eq('organization_id', organizationId)

      const membersByType: Record<string, number> = {}
      membersByTypeData?.forEach(member => {
        const type = member.membership_type || 'unknown'
        membersByType[type] = (membersByType[type] || 0) + 1
      })

      // Members by status
      const { data: membersByStatusData } = await supabase
        .from('profiles')
        .select('subscription_status')
        .eq('organization_id', organizationId)

      const membersByStatus: Record<string, number> = {}
      membersByStatusData?.forEach(member => {
        const status = member.subscription_status || 'unknown'
        membersByStatus[status] = (membersByStatus[status] || 0) + 1
      })

      return {
        totalMembers: totalMembers || 0,
        activeMembers: activeMembers || 0,
        newMembersThisMonth: newMembersThisMonth || 0,
        membersByType,
        membersByStatus
      }
    } catch (error) {
      console.error('Error fetching member statistics:', error)
      return {
        totalMembers: 0,
        activeMembers: 0,
        newMembersThisMonth: 0,
        membersByType: {},
        membersByStatus: {}
      }
    }
  }
}

// Membership Tiers Service
export const membershipTiersService = {
  // Get all membership tiers for the organization
  async getMembershipTiers(): Promise<MembershipTier[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('membership_tiers')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('is_active', true)
      .order('price', { ascending: true })

    if (error) {
      console.error('Error fetching membership tiers:', error)
      return []
    }

    return data || []
  },

  // Get membership tier by ID
  async getMembershipTierById(id: string): Promise<MembershipTier | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('membership_tiers')
      .select('*')
      .eq('id', id)
      .eq('organization_id', organizationId)
      .single()

    if (error) {
      console.error('Error fetching membership tier:', error)
      return null
    }

    return data
  },

  // Create new membership tier
  async createMembershipTier(tierData: Omit<MembershipTier, 'id' | 'organization_id' | 'created_at' | 'updated_at'>): Promise<MembershipTier | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('membership_tiers')
      .insert({
        ...tierData,
        organization_id: organizationId
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating membership tier:', error)
      return null
    }

    return data
  },

  // Update membership tier
  async updateMembershipTier(id: string, updates: Partial<MembershipTier>): Promise<MembershipTier | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('membership_tiers')
      .update(updates)
      .eq('id', id)
      .eq('organization_id', organizationId)
      .select()
      .single()

    if (error) {
      console.error('Error updating membership tier:', error)
      return null
    }

    return data
  },

  // Delete membership tier
  async deleteMembershipTier(id: string): Promise<boolean> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return false

    const { error } = await supabase
      .from('membership_tiers')
      .delete()
      .eq('id', id)
      .eq('organization_id', organizationId)

    if (error) {
      console.error('Error deleting membership tier:', error)
      return false
    }

    return true
  }
}

// Certifications Service
export const certificationsService = {
  // Get all certifications for the organization
  async getCertifications(): Promise<Certification[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('status', 'active')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching certifications:', error)
      return []
    }

    return data || []
  },

  // Get certification by ID
  async getCertificationById(id: string): Promise<Certification | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .eq('id', id)
      .eq('organization_id', organizationId)
      .single()

    if (error) {
      console.error('Error fetching certification:', error)
      return null
    }

    return data
  },

  // Create new certification
  async createCertification(certificationData: Omit<Certification, 'id' | 'organization_id' | 'created_at' | 'updated_at'>): Promise<Certification | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('certifications')
      .insert({
        ...certificationData,
        organization_id: organizationId
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating certification:', error)
      return null
    }

    return data
  },

  // Update certification
  async updateCertification(id: string, updates: Partial<Certification>): Promise<Certification | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('certifications')
      .update(updates)
      .eq('id', id)
      .eq('organization_id', organizationId)
      .select()
      .single()

    if (error) {
      console.error('Error updating certification:', error)
      return null
    }

    return data
  },

  // Delete certification
  async deleteCertification(id: string): Promise<boolean> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return false

    const { error } = await supabase
      .from('certifications')
      .delete()
      .eq('id', id)
      .eq('organization_id', organizationId)

    if (error) {
      console.error('Error deleting certification:', error)
      return false
    }

    return true
  },

  // Get member certifications
  async getMemberCertifications(memberId: string): Promise<MemberCertification[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('member_certifications')
      .select(`
        *,
        certifications (
          id,
          name,
          description,
          validity_period,
          requirements
        )
      `)
      .eq('member_id', memberId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching member certifications:', error)
      return []
    }

    return data || []
  },

  // Update member certification progress
  async updateMemberCertification(memberId: string, certificationId: string, updates: Partial<MemberCertification>): Promise<MemberCertification | null> {
    const { data, error } = await supabase
      .from('member_certifications')
      .update(updates)
      .eq('member_id', memberId)
      .eq('certification_id', certificationId)
      .select()
      .single()

    if (error) {
      console.error('Error updating member certification:', error)
      return null
    }

    return data
  }
}

// Real-time subscriptions for members
export const membersRealtime = {
  // Subscribe to members changes
  subscribeToMembers(callback: (payload: any) => void) {
    return supabase
      .channel('members_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        callback
      )
      .subscribe()
  },

  // Subscribe to membership tiers changes
  subscribeToMembershipTiers(callback: (payload: any) => void) {
    return supabase
      .channel('membership_tiers_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'membership_tiers'
        },
        callback
      )
      .subscribe()
  },

  // Subscribe to certifications changes
  subscribeToCertifications(callback: (payload: any) => void) {
    return supabase
      .channel('certifications_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'certifications'
        },
        callback
      )
      .subscribe()
  }
}
