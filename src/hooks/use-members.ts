import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/lib/store'

export function useMembers() {
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()

  const {
    data: members,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['members', user?.organizationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('tenant_id', user?.organizationId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },
    enabled: !!user?.organizationId,
  })

  const createMember = useMutation({
    mutationFn: async (member: any) => {
      const { data, error } = await supabase
        .from('profiles')
        .insert({ ...member, tenant_id: user?.organizationId })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] })
    },
  })

  const updateMember = useMutation({
    mutationFn: async ({ id, ...member }: any) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(member)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] })
    },
  })

  const deleteMember = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('profiles').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] })
    },
  })

  return {
    members,
    isLoading,
    error,
    createMember,
    updateMember,
    deleteMember,
  }
}