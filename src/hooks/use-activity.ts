import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/lib/store'

export function useActivity() {
  const user = useAuthStore((state) => state.user)

  const {
    data: activities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['activities', user?.organizationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activity_log')
        .select(`
          *,
          profiles (
            id,
            first_name,
            last_name,
            email
          )
        `)
        .eq('tenant_id', user?.organizationId)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error
      return data
    },
    enabled: !!user?.organizationId,
  })

  return {
    activities,
    isLoading,
    error,
  }
}

export function useStats() {
  const user = useAuthStore((state) => state.user)

  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['stats', user?.organizationId],
    queryFn: async () => {
      // Get total members
      const { count: totalMembers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', user?.organizationId)

      // Get active events
      const { count: activeEvents } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', user?.organizationId)
        .eq('status', 'upcoming')

      // Get total revenue
      const { data: revenue } = await supabase
        .from('events')
        .select('price')
        .eq('tenant_id', user?.organizationId)

      const totalRevenue = revenue?.reduce((sum, event) => sum + (event.price || 0), 0) || 0

      // Get member engagement (based on event registrations)
      const { count: totalRegistrations } = await supabase
        .from('event_registrations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'confirmed')

      const memberEngagement = totalMembers ? Math.round((totalRegistrations / totalMembers) * 100) : 0

      return {
        totalMembers: totalMembers || 0,
        activeEvents: activeEvents || 0,
        totalRevenue,
        memberEngagement: `${memberEngagement}%`,
      }
    },
    enabled: !!user?.organizationId,
  })

  return {
    stats,
    isLoading,
    error,
  }
}
