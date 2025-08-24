import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/lib/store'

export function useEvents() {
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()

  const {
    data: events,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['events', user?.organizationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          event_speakers (*),
          event_sessions (*),
          event_registrations (
            *,
            profiles (
              id,
              first_name,
              last_name,
              email
            )
          )
        `)
        .eq('tenant_id', user?.organizationId)
        .order('start_date', { ascending: true })

      if (error) throw error
      return data
    },
    enabled: !!user?.organizationId,
  })

  const createEvent = useMutation({
    mutationFn: async (event: any) => {
      const { data, error } = await supabase
        .from('events')
        .insert({ ...event, tenant_id: user?.organizationId, created_by: user?.id })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  const updateEvent = useMutation({
    mutationFn: async ({ id, ...event }: any) => {
      const { data, error } = await supabase
        .from('events')
        .update(event)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  const deleteEvent = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('events').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  const registerForEvent = useMutation({
    mutationFn: async ({ eventId, ...registration }: any) => {
      const { data, error } = await supabase
        .from('event_registrations')
        .insert({
          ...registration,
          event_id: eventId,
          user_id: user?.id,
          status: 'confirmed',
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  return {
    events,
    isLoading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
  }
}