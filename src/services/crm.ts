import { supabase } from '@/lib/supabase/client'

export interface Contact {
  id: string
  organization_id: string
  first_name: string
  last_name: string
  email?: string
  phone?: string
  company?: string
  job_title?: string
  type: 'prospect' | 'client' | 'partner' | 'vendor'
  status: 'active' | 'inactive' | 'lead'
  source?: string
  address?: any
  social_media?: any
  notes?: string
  tags?: string[]
  assigned_to?: string
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  organization_id: string
  contact_id: string
  title: string
  description?: string
  status: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'won' | 'lost'
  source?: string
  value?: number
  currency: string
  probability: number
  assigned_to?: string
  expected_close_date?: string
  notes?: string
  tags?: string[]
  converted_to_deal: boolean
  deal_id?: string
  created_at: string
  updated_at: string
}

export interface Deal {
  id: string
  organization_id: string
  lead_id?: string
  title: string
  description?: string
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost'
  value: number
  currency: string
  probability: number
  expected_close_date?: string
  actual_close_date?: string
  assigned_to?: string
  notes?: string
  tags?: string[]
  created_at: string
  updated_at: string
}

export interface Property {
  id: string
  organization_id: string
  title: string
  description?: string
  type: 'residential' | 'commercial' | 'industrial' | 'land'
  status: 'available' | 'under_contract' | 'sold' | 'rented' | 'off_market'
  price?: number
  currency: string
  address?: any
  features?: any
  images?: string[]
  documents?: string[]
  assigned_to?: string
  notes?: string
  tags?: string[]
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  organization_id: string
  title: string
  description?: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'deferred'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assigned_to?: string
  assigned_by?: string
  due_date?: string
  completed_date?: string
  related_to_type?: string
  related_to_id?: string
  tags?: string[]
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

// Contacts Service
export const contactsService = {
  // Get all contacts for the organization
  async getContacts(): Promise<Contact[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching contacts:', error)
      return []
    }

    return data || []
  },

  // Get contact by ID
  async getContactById(id: string): Promise<Contact | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', id)
      .eq('organization_id', organizationId)
      .single()

    if (error) {
      console.error('Error fetching contact:', error)
      return null
    }

    return data
  },

  // Create new contact
  async createContact(contactData: Omit<Contact, 'id' | 'organization_id' | 'created_at' | 'updated_at'>): Promise<Contact | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('contacts')
      .insert({
        ...contactData,
        organization_id: organizationId
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating contact:', error)
      return null
    }

    return data
  },

  // Update contact
  async updateContact(id: string, updates: Partial<Contact>): Promise<Contact | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('contacts')
      .update(updates)
      .eq('id', id)
      .eq('organization_id', organizationId)
      .select()
      .single()

    if (error) {
      console.error('Error updating contact:', error)
      return null
    }

    return data
  },

  // Delete contact
  async deleteContact(id: string): Promise<boolean> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return false

    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id)
      .eq('organization_id', organizationId)

    if (error) {
      console.error('Error deleting contact:', error)
      return false
    }

    return true
  },

  // Search contacts
  async searchContacts(query: string): Promise<Contact[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('organization_id', organizationId)
      .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,company.ilike.%${query}%,email.ilike.%${query}%`)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error searching contacts:', error)
      return []
    }

    return data || []
  },

  // Get contacts by type
  async getContactsByType(type: Contact['type']): Promise<Contact[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('type', type)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching contacts by type:', error)
      return []
    }

    return data || []
  },

  // Get contacts by status
  async getContactsByStatus(status: Contact['status']): Promise<Contact[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching contacts by status:', error)
      return []
    }

    return data || []
  }
}

// Leads Service
export const leadsService = {
  // Get all leads for the organization
  async getLeads(): Promise<Lead[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('leads')
      .select(`
        *,
        contacts (
          id,
          first_name,
          last_name,
          email,
          company,
          phone
        )
      `)
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching leads:', error)
      return []
    }

    return data || []
  },

  // Get lead by ID
  async getLeadById(id: string): Promise<Lead | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('leads')
      .select(`
        *,
        contacts (
          id,
          first_name,
          last_name,
          email,
          company,
          phone
        )
      `)
      .eq('id', id)
      .eq('organization_id', organizationId)
      .single()

    if (error) {
      console.error('Error fetching lead:', error)
      return null
    }

    return data
  },

  // Create new lead
  async createLead(leadData: Omit<Lead, 'id' | 'organization_id' | 'created_at' | 'updated_at' | 'converted_to_deal'>): Promise<Lead | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('leads')
      .insert({
        ...leadData,
        organization_id: organizationId,
        converted_to_deal: false
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating lead:', error)
      return null
    }

    return data
  },

  // Update lead
  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', id)
      .eq('organization_id', organizationId)
      .select()
      .single()

    if (error) {
      console.error('Error updating lead:', error)
      return null
    }

    return data
  },

  // Delete lead
  async deleteLead(id: string): Promise<boolean> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return false

    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id)
      .eq('organization_id', organizationId)

    if (error) {
      console.error('Error deleting lead:', error)
      return false
    }

    return true
  },

  // Convert lead to deal
  async convertLeadToDeal(leadId: string, dealData: Omit<Deal, 'id' | 'organization_id' | 'created_at' | 'updated_at'>): Promise<Deal | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    // Start a transaction
    const { data: deal, error: dealError } = await supabase
      .from('deals')
      .insert({
        ...dealData,
        organization_id: organizationId
      })
      .select()
      .single()

    if (dealError) {
      console.error('Error creating deal:', dealError)
      return null
    }

    // Update lead to mark as converted
    const { error: leadError } = await supabase
      .from('leads')
      .update({
        converted_to_deal: true,
        deal_id: deal.id
      })
      .eq('id', leadId)

    if (leadError) {
      console.error('Error updating lead:', leadError)
      return null
    }

    return deal
  },

  // Get leads by status
  async getLeadsByStatus(status: Lead['status']): Promise<Lead[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('leads')
      .select(`
        *,
        contacts (
          id,
          first_name,
          last_name,
          email,
          company,
          phone
        )
      `)
      .eq('organization_id', organizationId)
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching leads by status:', error)
      return []
    }

    return data || []
  },

  // Get leads by source
  async getLeadsBySource(source: string): Promise<Lead[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('leads')
      .select(`
        *,
        contacts (
          id,
          first_name,
          last_name,
          email,
          company,
          phone
        )
      `)
      .eq('organization_id', organizationId)
      .eq('source', source)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching leads by source:', error)
      return []
    }

    return data || []
  }
}

// Deals Service
export const dealsService = {
  // Get all deals for the organization
  async getDeals(): Promise<Deal[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('deals')
      .select(`
        *,
        leads (
          id,
          title,
          contacts (
            id,
            first_name,
            last_name,
            company
          )
        )
      `)
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching deals:', error)
      return []
    }

    return data || []
  },

  // Get deal by ID
  async getDealById(id: string): Promise<Deal | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('deals')
      .select(`
        *,
        leads (
          id,
          title,
          contacts (
            id,
            first_name,
            last_name,
            company
          )
        )
      `)
      .eq('id', id)
      .eq('organization_id', organizationId)
      .single()

    if (error) {
      console.error('Error fetching deal:', error)
      return null
    }

    return data
  },

  // Create new deal
  async createDeal(dealData: Omit<Deal, 'id' | 'organization_id' | 'created_at' | 'updated_at'>): Promise<Deal | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('deals')
      .insert({
        ...dealData,
        organization_id: organizationId
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating deal:', error)
      return null
    }

    return data
  },

  // Update deal
  async updateDeal(id: string, updates: Partial<Deal>): Promise<Deal | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('deals')
      .update(updates)
      .eq('id', id)
      .eq('organization_id', organizationId)
      .select()
      .single()

    if (error) {
      console.error('Error updating deal:', error)
      return null
    }

    return data
  },

  // Delete deal
  async deleteDeal(id: string): Promise<boolean> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return false

    const { error } = await supabase
      .from('deals')
      .delete()
      .eq('id', id)
      .eq('organization_id', organizationId)

    if (error) {
      console.error('Error deleting deal:', error)
      return false
    }

    return true
  },

  // Get deals by stage
  async getDealsByStage(stage: Deal['stage']): Promise<Deal[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('deals')
      .select(`
        *,
        leads (
          id,
          title,
          contacts (
            id,
            first_name,
            last_name,
            company
          )
        )
      `)
      .eq('organization_id', organizationId)
      .eq('stage', stage)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching deals by stage:', error)
      return []
    }

    return data || []
  },

  // Get deals by value range
  async getDealsByValueRange(minValue: number, maxValue: number): Promise<Deal[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('deals')
      .select(`
        *,
        leads (
          id,
          title,
          contacts (
            id,
            first_name,
            last_name,
            company
          )
        )
      `)
      .eq('organization_id', organizationId)
      .gte('value', minValue)
      .lte('value', maxValue)
      .order('value', { ascending: false })

    if (error) {
      console.error('Error fetching deals by value range:', error)
      return []
    }

    return data || []
  }
}

// Properties Service
export const propertiesService = {
  // Get all properties for the organization
  async getProperties(): Promise<Property[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching properties:', error)
      return []
    }

    return data || []
  },

  // Get property by ID
  async getPropertyById(id: string): Promise<Property | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .eq('organization_id', organizationId)
      .single()

    if (error) {
      console.error('Error fetching property:', error)
      return null
    }

    return data
  },

  // Create new property
  async createProperty(propertyData: Omit<Property, 'id' | 'organization_id' | 'created_at' | 'updated_at'>): Promise<Property | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('properties')
      .insert({
        ...propertyData,
        organization_id: organizationId
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating property:', error)
      return null
    }

    return data
  },

  // Update property
  async updateProperty(id: string, updates: Partial<Property>): Promise<Property | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .eq('organization_id', organizationId)
      .select()
      .single()

    if (error) {
      console.error('Error updating property:', error)
      return null
    }

    return data
  },

  // Delete property
  async deleteProperty(id: string): Promise<boolean> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return false

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)
      .eq('organization_id', organizationId)

    if (error) {
      console.error('Error deleting property:', error)
      return false
    }

    return true
  },

  // Get properties by type
  async getPropertiesByType(type: Property['type']): Promise<Property[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('type', type)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching properties by type:', error)
      return []
    }

    return data || []
  },

  // Get properties by status
  async getPropertiesByStatus(status: Property['status']): Promise<Property[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching properties by status:', error)
      return []
    }

    return data || []
  },

  // Search properties
  async searchProperties(query: string): Promise<Property[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('organization_id', organizationId)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error searching properties:', error)
      return []
    }

    return data || []
  }
}

// Tasks Service
export const tasksService = {
  // Get all tasks for the organization
  async getTasks(): Promise<Task[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('organization_id', organizationId)
      .order('due_date', { ascending: true })

    if (error) {
      console.error('Error fetching tasks:', error)
      return []
    }

    return data || []
  },

  // Get task by ID
  async getTaskById(id: string): Promise<Task | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .eq('organization_id', organizationId)
      .single()

    if (error) {
      console.error('Error fetching task:', error)
      return null
    }

    return data
  },

  // Create new task
  async createTask(taskData: Omit<Task, 'id' | 'organization_id' | 'created_at' | 'updated_at'>): Promise<Task | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        ...taskData,
        organization_id: organizationId
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating task:', error)
      return null
    }

    return data
  },

  // Update task
  async updateTask(id: string, updates: Partial<Task>): Promise<Task | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .eq('organization_id', organizationId)
      .select()
      .single()

    if (error) {
      console.error('Error updating task:', error)
      return null
    }

    return data
  },

  // Delete task
  async deleteTask(id: string): Promise<boolean> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return false

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .eq('organization_id', organizationId)

    if (error) {
      console.error('Error deleting task:', error)
      return false
    }

    return true
  },

  // Get tasks by status
  async getTasksByStatus(status: Task['status']): Promise<Task[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('status', status)
      .order('due_date', { ascending: true })

    if (error) {
      console.error('Error fetching tasks by status:', error)
      return []
    }

    return data || []
  },

  // Get tasks by priority
  async getTasksByPriority(priority: Task['priority']): Promise<Task[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('priority', priority)
      .order('due_date', { ascending: true })

    if (error) {
      console.error('Error fetching tasks by priority:', error)
      return []
    }

    return data || []
  },

  // Get overdue tasks
  async getOverdueTasks(): Promise<Task[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const today = new Date().toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('organization_id', organizationId)
      .in('status', ['pending', 'in_progress'])
      .lt('due_date', today)
      .order('due_date', { ascending: true })

    if (error) {
      console.error('Error fetching overdue tasks:', error)
      return []
    }

    return data || []
  },

  // Get tasks due this week
  async getTasksDueThisWeek(): Promise<Task[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const today = new Date()
    const endOfWeek = new Date(today)
    endOfWeek.setDate(today.getDate() + 7)

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('organization_id', organizationId)
      .in('status', ['pending', 'in_progress'])
      .gte('due_date', today.toISOString().split('T')[0])
      .lte('due_date', endOfWeek.toISOString().split('T')[0])
      .order('due_date', { ascending: true })

    if (error) {
      console.error('Error fetching tasks due this week:', error)
      return []
    }

    return data || []
  }
}

// Real-time subscriptions for CRM
export const crmRealtime = {
  // Subscribe to contacts changes
  subscribeToContacts(callback: (payload: any) => void) {
    return supabase
      .channel('contacts_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contacts'
        },
        callback
      )
      .subscribe()
  },

  // Subscribe to leads changes
  subscribeToLeads(callback: (payload: any) => void) {
    return supabase
      .channel('leads_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads'
        },
        callback
      )
      .subscribe()
  },

  // Subscribe to deals changes
  subscribeToDeals(callback: (payload: any) => void) {
    return supabase
      .channel('deals_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'deals'
        },
        callback
      )
      .subscribe()
  },

  // Subscribe to properties changes
  subscribeToProperties(callback: (payload: any) => void) {
    return supabase
      .channel('properties_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'properties'
        },
        callback
      )
      .subscribe()
  },

  // Subscribe to tasks changes
  subscribeToTasks(callback: (payload: any) => void) {
    return supabase
      .channel('tasks_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks'
        },
        callback
      )
      .subscribe()
  }
}
