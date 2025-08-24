import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/lib/store'
import { toast } from 'sonner'

export function useRealtimeSubscription() {
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!user?.organizationId) return

    // Subscribe to activity log changes
    const activitySub = supabase
      .channel('activity_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'activity_log',
          filter: `tenant_id=eq.${user.organizationId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['activities'] })
        }
      )
      .subscribe()

    // Subscribe to event changes
    const eventSub = supabase
      .channel('event_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events',
          filter: `tenant_id=eq.${user.organizationId}`,
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ['events'] })
          if (payload.eventType === 'INSERT') {
            toast.info('New event created')
          }
        }
      )
      .subscribe()

    // Subscribe to registration changes
    const registrationSub = supabase
      .channel('registration_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'event_registrations',
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ['events'] })
          if (payload.eventType === 'INSERT') {
            toast.info('New event registration')
          }
        }
      )
      .subscribe()

    // Subscribe to member changes
    const memberSub = supabase
      .channel('member_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `tenant_id=eq.${user.organizationId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['members'] })
        }
      )
      .subscribe()

    // Subscribe to notification changes
    const notificationSub = supabase
      .channel('notification_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload: any) => {
          queryClient.invalidateQueries({ queryKey: ['notifications'] })
          toast.info(payload.new.title)
        }
      )
      .subscribe()

    // Subscribe to presence updates
    const presenceSub = supabase
      .channel('online_users')
      .on('presence', { event: 'sync' }, () => {
        queryClient.invalidateQueries({ queryKey: ['online-users'] })
      })
      .subscribe()

    // Track user's presence
    presenceSub.track({
      user_id: user.id,
      online_at: new Date().toISOString(),
    })

    return () => {
      supabase.removeChannel(activitySub)
      supabase.removeChannel(eventSub)
      supabase.removeChannel(registrationSub)
      supabase.removeChannel(memberSub)
      supabase.removeChannel(notificationSub)
      supabase.removeChannel(presenceSub)
    }
  }, [user?.organizationId, user?.id, queryClient])
}
