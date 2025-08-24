import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/lib/store'

export function useEmailTemplates() {
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()

  const {
    data: templates,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['email-templates', user?.organizationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .eq('tenant_id', user?.organizationId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },
    enabled: !!user?.organizationId,
  })

  const createTemplate = useMutation({
    mutationFn: async (template: any) => {
      const { data, error } = await supabase
        .from('email_templates')
        .insert({ ...template, tenant_id: user?.organizationId, created_by: user?.id })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-templates'] })
    },
  })

  const updateTemplate = useMutation({
    mutationFn: async ({ id, ...template }: any) => {
      const { data, error } = await supabase
        .from('email_templates')
        .update(template)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-templates'] })
    },
  })

  return {
    templates,
    isLoading,
    error,
    createTemplate,
    updateTemplate,
  }
}

export function useEmailCampaigns() {
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()

  const {
    data: campaigns,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['email-campaigns', user?.organizationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_campaigns')
        .select(`
          *,
          email_campaign_recipients (
            id,
            email,
            name,
            status,
            sent_at,
            opened_at,
            clicked_at
          )
        `)
        .eq('tenant_id', user?.organizationId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },
    enabled: !!user?.organizationId,
  })

  const createCampaign = useMutation({
    mutationFn: async (campaign: any) => {
      const { data, error } = await supabase
        .from('email_campaigns')
        .insert({ ...campaign, tenant_id: user?.organizationId, created_by: user?.id })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] })
    },
  })

  const updateCampaign = useMutation({
    mutationFn: async ({ id, ...campaign }: any) => {
      const { data, error } = await supabase
        .from('email_campaigns')
        .update(campaign)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] })
    },
  })

  const sendCampaign = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('email_campaigns')
        .update({
          status: 'sending',
          sent_date: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] })
    },
  })

  return {
    campaigns,
    isLoading,
    error,
    createCampaign,
    updateCampaign,
    sendCampaign,
  }
}
