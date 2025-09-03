import { supabase } from '@/lib/supabase/client'

export interface EmailTemplate {
  id: string
  organization_id: string
  name: string
  subject: string
  content: string
  variables: string[]
  category: string
  is_active: boolean
  created_by: string
  created_at: string
  updated_at: string
}

export interface EmailCampaign {
  id: string
  organization_id: string
  name: string
  subject: string
  content: string
  template_id?: string
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'cancelled'
  target_audience: any[]
  scheduled_date?: string
  sent_date?: string
  metrics: {
    sent: number
    delivered: number
    opened: number
    clicked: number
    bounced: number
    unsubscribed: number
  }
  created_by: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  organization_id: string
  user_id: string
  title: string
  message: string
  type: 'email' | 'sms' | 'push' | 'in_app'
  is_read: boolean
  action_url?: string
  metadata?: any
  created_at: string
}

export interface MessageTemplate {
  id: string
  organization_id: string
  name: string
  type: 'email' | 'sms' | 'push' | 'in_app'
  subject?: string
  content: string
  variables: string[]
  category: string
  is_active: boolean
  created_by: string
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

// Email Templates Service
export const emailTemplatesService = {
  // Get all email templates for the organization
  async getEmailTemplates(): Promise<EmailTemplate[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('is_active', true)
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching email templates:', error)
      return []
    }

    return data || []
  },

  // Get email template by ID
  async getEmailTemplateById(id: string): Promise<EmailTemplate | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('id', id)
      .eq('organization_id', organizationId)
      .single()

    if (error) {
      console.error('Error fetching email template:', error)
      return null
    }

    return data
  },

  // Create new email template
  async createEmailTemplate(templateData: Omit<EmailTemplate, 'id' | 'organization_id' | 'created_at' | 'updated_at'>): Promise<EmailTemplate | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('email_templates')
      .insert({
        ...templateData,
        organization_id: organizationId,
        created_by: user.id
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating email template:', error)
      return null
    }

    return data
  },

  // Update email template
  async updateEmailTemplate(id: string, updates: Partial<EmailTemplate>): Promise<EmailTemplate | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('email_templates')
      .update(updates)
      .eq('id', id)
      .eq('organization_id', organizationId)
      .select()
      .single()

    if (error) {
      console.error('Error updating email template:', error)
      return null
    }

    return data
  },

  // Delete email template
  async deleteEmailTemplate(id: string): Promise<boolean> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return false

    const { error } = await supabase
      .from('email_templates')
      .delete()
      .eq('id', id)
      .eq('organization_id', organizationId)

    if (error) {
      console.error('Error deleting email template:', error)
      return false
    }

    return true
  },

  // Get email templates by category
  async getEmailTemplatesByCategory(category: string): Promise<EmailTemplate[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('category', category)
      .eq('is_active', true)
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching email templates by category:', error)
      return []
    }

    return data || []
  },

  // Search email templates
  async searchEmailTemplates(query: string): Promise<EmailTemplate[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('is_active', true)
      .or(`name.ilike.%${query}%,subject.ilike.%${query}%,content.ilike.%${query}%`)
      .order('name', { ascending: true })

    if (error) {
      console.error('Error searching email templates:', error)
      return []
    }

    return data || []
  }
}

// Email Campaigns Service
export const emailCampaignsService = {
  // Get all email campaigns for the organization
  async getEmailCampaigns(): Promise<EmailCampaign[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('email_campaigns')
      .select(`
        *,
        email_templates (
          id,
          name,
          subject
        )
      `)
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching email campaigns:', error)
      return []
    }

    return data || []
  },

  // Get email campaign by ID
  async getEmailCampaignById(id: string): Promise<EmailCampaign | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('email_campaigns')
      .select(`
        *,
        email_templates (
          id,
          name,
          subject
        )
      `)
      .eq('id', id)
      .eq('organization_id', organizationId)
      .single()

    if (error) {
      console.error('Error fetching email campaign:', error)
      return null
    }

    return data
  },

  // Create new email campaign
  async createEmailCampaign(campaignData: Omit<EmailCampaign, 'id' | 'organization_id' | 'created_at' | 'updated_at' | 'metrics' | 'created_by'>): Promise<EmailCampaign | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('email_campaigns')
      .insert({
        ...campaignData,
        organization_id: organizationId,
        created_by: user.id,
        metrics: {
          sent: 0,
          delivered: 0,
          opened: 0,
          clicked: 0,
          bounced: 0,
          unsubscribed: 0
        }
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating email campaign:', error)
      return null
    }

    return data
  },

  // Update email campaign
  async updateEmailCampaign(id: string, updates: Partial<EmailCampaign>): Promise<EmailCampaign | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('email_campaigns')
      .update(updates)
      .eq('id', id)
      .eq('organization_id', organizationId)
      .select()
      .single()

    if (error) {
      console.error('Error updating email campaign:', error)
      return null
    }

    return data
  },

  // Delete email campaign
  async deleteEmailCampaign(id: string): Promise<boolean> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return false

    const { error } = await supabase
      .from('email_campaigns')
      .delete()
      .eq('id', id)
      .eq('organization_id', organizationId)

    if (error) {
      console.error('Error deleting email campaign:', error)
      return false
    }

    return true
  },

  // Get email campaigns by status
  async getEmailCampaignsByStatus(status: EmailCampaign['status']): Promise<EmailCampaign[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('email_campaigns')
      .select(`
        *,
        email_templates (
          id,
          name,
          subject
        )
      `)
      .eq('organization_id', organizationId)
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching email campaigns by status:', error)
      return []
    }

    return data || []
  },

  // Schedule email campaign
  async scheduleEmailCampaign(id: string, scheduledDate: string): Promise<EmailCampaign | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('email_campaigns')
      .update({
        status: 'scheduled',
        scheduled_date: scheduledDate
      })
      .eq('id', id)
      .eq('organization_id', organizationId)
      .select()
      .single()

    if (error) {
      console.error('Error scheduling email campaign:', error)
      return null
    }

    return data
  },

  // Send email campaign immediately
  async sendEmailCampaign(id: string): Promise<EmailCampaign | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('email_campaigns')
      .update({
        status: 'sending',
        sent_date: new Date().toISOString()
      })
      .eq('id', id)
      .eq('organization_id', organizationId)
      .select()
      .single()

    if (error) {
      console.error('Error sending email campaign:', error)
      return null
    }

    // Here you would typically integrate with an email service provider
    // For now, we'll just mark it as sent
    setTimeout(async () => {
      await this.updateEmailCampaign(id, { status: 'sent' })
    }, 1000)

    return data
  },

  // Update campaign metrics
  async updateCampaignMetrics(id: string, metrics: Partial<EmailCampaign['metrics']>): Promise<EmailCampaign | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('email_campaigns')
      .update({
        metrics: metrics
      })
      .eq('id', id)
      .eq('organization_id', organizationId)
      .select()
      .single()

    if (error) {
      console.error('Error updating campaign metrics:', error)
      return null
    }

    return data
  }
}

// Notifications Service
export const notificationsService = {
  // Get all notifications for the current user
  async getNotifications(): Promise<Notification[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching notifications:', error)
      return []
    }

    return data || []
  },

  // Get unread notifications count
  async getUnreadNotificationsCount(): Promise<number> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return 0

    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('is_read', false)

    if (error) {
      console.error('Error fetching unread notifications count:', error)
      return 0
    }

    return count || 0
  },

  // Mark notification as read
  async markNotificationAsRead(id: string): Promise<Notification | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error marking notification as read:', error)
      return null
    }

    return data
  },

  // Mark all notifications as read
  async markAllNotificationsAsRead(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false)

    if (error) {
      console.error('Error marking all notifications as read:', error)
      return false
    }

    return true
  },

  // Delete notification
  async deleteNotification(id: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error deleting notification:', error)
      return false
    }

    return true
  },

  // Create notification
  async createNotification(notificationData: Omit<Notification, 'id' | 'organization_id' | 'created_at' | 'is_read'>): Promise<Notification | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('notifications')
      .insert({
        ...notificationData,
        organization_id: organizationId,
        is_read: false
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating notification:', error)
      return null
    }

    return data
  }
}

// Message Templates Service
export const messageTemplatesService = {
  // Get all message templates for the organization
  async getMessageTemplates(): Promise<MessageTemplate[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('message_templates')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('is_active', true)
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching message templates:', error)
      return []
    }

    return data || []
  },

  // Get message template by ID
  async getMessageTemplateById(id: string): Promise<MessageTemplate | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('message_templates')
      .select('*')
      .eq('id', id)
      .eq('organization_id', organizationId)
      .single()

    if (error) {
      console.error('Error fetching message template:', error)
      return null
    }

    return data
  },

  // Create new message template
  async createMessageTemplate(templateData: Omit<MessageTemplate, 'id' | 'organization_id' | 'created_at' | 'updated_at'>): Promise<MessageTemplate | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('message_templates')
      .insert({
        ...templateData,
        organization_id: organizationId,
        created_by: user.id
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating message template:', error)
      return null
    }

    return data
  },

  // Update message template
  async updateMessageTemplate(id: string, updates: Partial<MessageTemplate>): Promise<MessageTemplate | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('message_templates')
      .update(updates)
      .eq('id', id)
      .eq('organization_id', organizationId)
      .select()
      .single()

    if (error) {
      console.error('Error updating message template:', error)
      return null
    }

    return data
  },

  // Delete message template
  async deleteMessageTemplate(id: string): Promise<boolean> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return false

    const { error } = await supabase
      .from('message_templates')
      .delete()
      .eq('id', id)
      .eq('organization_id', organizationId)

    if (error) {
      console.error('Error deleting message template:', error)
      return false
    }

    return true
  },

  // Get message templates by type
  async getMessageTemplatesByType(type: MessageTemplate['type']): Promise<MessageTemplate[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('message_templates')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('type', type)
      .eq('is_active', true)
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching message templates by type:', error)
      return []
    }

    return data || []
  }
}

// Utility functions for email content processing
export const emailUtils = {
  // Replace variables in email content
  replaceVariables(content: string, variables: Record<string, string>): string {
    let processedContent = content
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g')
      processedContent = processedContent.replace(regex, value)
    })
    return processedContent
  },

  // Validate email template variables
  validateTemplateVariables(content: string, requiredVariables: string[]): string[] {
    const missingVariables: string[] = []
    requiredVariables.forEach(variable => {
      if (!content.includes(`{{${variable}}}`)) {
        missingVariables.push(variable)
      }
    })
    return missingVariables
  },

  // Generate preview content
  generatePreviewContent(template: EmailTemplate, sampleVariables: Record<string, string> = {}): string {
    // Use sample variables or generate defaults
    const variables = sampleVariables || this.generateSampleVariables(template.variables)
    return this.replaceVariables(template.content, variables)
  },

  // Generate sample variables for preview
  generateSampleVariables(variables: string[]): Record<string, string> {
    const sampleData: Record<string, string> = {}
    variables.forEach(variable => {
      switch (variable.toLowerCase()) {
        case 'first_name':
          sampleData[variable] = 'John'
          break
        case 'last_name':
          sampleData[variable] = 'Doe'
          break
        case 'company':
          sampleData[variable] = 'Sample Company'
          break
        case 'event_title':
          sampleData[variable] = 'Sample Event'
          break
        case 'event_date':
          sampleData[variable] = 'December 15, 2024'
          break
        default:
          sampleData[variable] = `[${variable}]`
      }
    })
    return sampleData
  }
}

// Real-time subscriptions for communications
export const communicationsRealtime = {
  // Subscribe to email templates changes
  subscribeToEmailTemplates(callback: (payload: any) => void) {
    return supabase
      .channel('email_templates_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'email_templates'
        },
        callback
      )
      .subscribe()
  },

  // Subscribe to email campaigns changes
  subscribeToEmailCampaigns(callback: (payload: any) => void) {
    return supabase
      .channel('email_campaigns_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'email_campaigns'
        },
        callback
      )
      .subscribe()
  },

  // Subscribe to notifications changes
  subscribeToNotifications(callback: (payload: any) => void) {
    const { data: { user } } = supabase.auth.getUser()
    if (!user) return null

    return supabase
      .channel(`notifications_${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        callback
      )
      .subscribe()
  }
}
