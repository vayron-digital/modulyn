import { supabase } from '@/lib/supabase/client'

export interface Event {
  id: string
  organization_id: string
  title: string
  description?: string
  type: 'conference' | 'webinar' | 'workshop' | 'networking' | 'training' | 'exhibition'
  status: 'draft' | 'published' | 'registration_open' | 'registration_closed' | 'ongoing' | 'completed' | 'cancelled'
  start_date: string
  end_date: string
  venue?: string
  address?: any
  capacity?: number
  current_registrations: number
  price: number
  currency: string
  registration_deadline?: string
  max_attendees?: number
  tags?: string[]
  image_url?: string
  created_at: string
  updated_at: string
}

export interface EventRegistration {
  id: string
  event_id: string
  user_id: string
  organization_id: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'waitlist' | 'attended'
  payment_status: 'pending' | 'paid' | 'refunded' | 'failed'
  registration_date: string
  ticket_type?: string
  amount?: number
  notes?: string
  dietary_restrictions?: string
  special_requirements?: string
  created_at: string
  updated_at: string
}

export interface Speaker {
  id: string
  organization_id: string
  name: string
  bio?: string
  company?: string
  title?: string
  image_url?: string
  topics?: string[]
  contact_email?: string
  contact_phone?: string
  linkedin_url?: string
  created_at: string
  updated_at: string
}

export interface EventSpeaker {
  id: string
  event_id: string
  speaker_id: string
  session_title?: string
  session_description?: string
  start_time?: string
  end_time?: string
  location?: string
  created_at: string
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

// Events Service
export const eventsService = {
  // Get all events for the current organization
  async getEvents(): Promise<Event[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('organization_id', organizationId)
      .order('start_date', { ascending: true })

    if (error) {
      console.error('Error fetching events:', error)
      return []
    }

    return data || []
  },

  // Get event by ID
  async getEventById(id: string): Promise<Event | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .eq('organization_id', organizationId)
      .single()

    if (error) {
      console.error('Error fetching event:', error)
      return null
    }

    return data
  },

  // Create new event
  async createEvent(eventData: Omit<Event, 'id' | 'organization_id' | 'created_at' | 'updated_at' | 'current_registrations'>): Promise<Event | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('events')
      .insert({
        ...eventData,
        organization_id: organizationId,
        current_registrations: 0
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating event:', error)
      return null
    }

    return data
  },

  // Update event
  async updateEvent(id: string, updates: Partial<Event>): Promise<Event | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .eq('organization_id', organizationId)
      .select()
      .single()

    if (error) {
      console.error('Error updating event:', error)
      return null
    }

    return data
  },

  // Delete event
  async deleteEvent(id: string): Promise<boolean> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return false

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)
      .eq('organization_id', organizationId)

    if (error) {
      console.error('Error deleting event:', error)
      return false
    }

    return true
  },

  // Get upcoming events
  async getUpcomingEvents(limit: number = 5): Promise<Event[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const now = new Date().toISOString()

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('organization_id', organizationId)
      .gte('start_date', now)
      .order('start_date', { ascending: true })
      .limit(limit)

    if (error) {
      console.error('Error fetching upcoming events:', error)
      return []
    }

    return data || []
  },

  // Get events by type
  async getEventsByType(type: Event['type']): Promise<Event[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('type', type)
      .order('start_date', { ascending: true })

    if (error) {
      console.error('Error fetching events by type:', error)
      return []
    }

    return data || []
  },

  // Search events
  async searchEvents(query: string): Promise<Event[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('organization_id', organizationId)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,venue.ilike.%${query}%`)
      .order('start_date', { ascending: true })

    if (error) {
      console.error('Error searching events:', error)
      return []
    }

    return data || []
  }
}

// Event Registrations Service
export const eventRegistrationsService = {
  // Get registrations for an event
  async getEventRegistrations(eventId: string): Promise<EventRegistration[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('event_registrations')
      .select('*')
      .eq('event_id', eventId)
      .eq('organization_id', organizationId)
      .order('registration_date', { ascending: false })

    if (error) {
      console.error('Error fetching event registrations:', error)
      return []
    }

    return data || []
  },

  // Register for an event
  async registerForEvent(eventId: string, registrationData: Partial<EventRegistration>): Promise<EventRegistration | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    // Check if user is already registered
    const existingRegistration = await supabase
      .from('event_registrations')
      .select('id')
      .eq('event_id', eventId)
      .eq('user_id', user.id)
      .single()

    if (existingRegistration.data) {
      throw new Error('User is already registered for this event')
    }

    const { data, error } = await supabase
      .from('event_registrations')
      .insert({
        event_id: eventId,
        user_id: user.id,
        organization_id: organizationId,
        ...registrationData
      })
      .select()
      .single()

    if (error) {
      console.error('Error registering for event:', error)
      return null
    }

    // Update event registration count
    await supabase.rpc('increment_event_registrations', { event_id: eventId })

    return data
  },

  // Update registration status
  async updateRegistrationStatus(registrationId: string, status: EventRegistration['status']): Promise<EventRegistration | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('event_registrations')
      .update({ status })
      .eq('id', registrationId)
      .eq('organization_id', organizationId)
      .select()
      .single()

    if (error) {
      console.error('Error updating registration status:', error)
      return null
    }

    return data
  },

  // Cancel registration
  async cancelRegistration(registrationId: string): Promise<boolean> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return false

    const { error } = await supabase
      .from('event_registrations')
      .delete()
      .eq('id', registrationId)
      .eq('organization_id', organizationId)

    if (error) {
      console.error('Error canceling registration:', error)
      return false
    }

    return true
  },

  // Get user's registrations
  async getUserRegistrations(): Promise<EventRegistration[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('event_registrations')
      .select('*')
      .eq('user_id', user.id)
      .eq('organization_id', organizationId)
      .order('registration_date', { ascending: false })

    if (error) {
      console.error('Error fetching user registrations:', error)
      return []
    }

    return data || []
  }
}

// Speakers Service
export const speakersService = {
  // Get all speakers for the organization
  async getSpeakers(): Promise<Speaker[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('speakers')
      .select('*')
      .eq('organization_id', organizationId)
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching speakers:', error)
      return []
    }

    return data || []
  },

  // Get speaker by ID
  async getSpeakerById(id: string): Promise<Speaker | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('speakers')
      .select('*')
      .eq('id', id)
      .eq('organization_id', organizationId)
      .single()

    if (error) {
      console.error('Error fetching speaker:', error)
      return null
    }

    return data
  },

  // Create new speaker
  async createSpeaker(speakerData: Omit<Speaker, 'id' | 'organization_id' | 'created_at' | 'updated_at'>): Promise<Speaker | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('speakers')
      .insert({
        ...speakerData,
        organization_id: organizationId
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating speaker:', error)
      return null
    }

    return data
  },

  // Update speaker
  async updateSpeaker(id: string, updates: Partial<Speaker>): Promise<Speaker | null> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return null

    const { data, error } = await supabase
      .from('speakers')
      .update(updates)
      .eq('id', id)
      .eq('organization_id', organizationId)
      .select()
      .single()

    if (error) {
      console.error('Error updating speaker:', error)
      return null
    }

    return data
  },

  // Delete speaker
  async deleteSpeaker(id: string): Promise<boolean> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return false

    const { error } = await supabase
      .from('speakers')
      .delete()
      .eq('id', id)
      .eq('organization_id', organizationId)

    if (error) {
      console.error('Error deleting speaker:', error)
      return false
    }

    return true
  },

  // Get speakers for an event
  async getEventSpeakers(eventId: string): Promise<Speaker[]> {
    const organizationId = await getCurrentOrganizationId()
    if (!organizationId) return []

    const { data, error } = await supabase
      .from('event_speakers')
      .select(`
        speaker_id,
        speakers (
          id,
          name,
          bio,
          company,
          title,
          image_url,
          topics,
          contact_email,
          contact_phone,
          linkedin_url
        )
      `)
      .eq('event_id', eventId)

    if (error) {
      console.error('Error fetching event speakers:', error)
      return []
    }

    return data?.map(item => item.speakers).filter(Boolean) || []
  }
}

// Real-time subscriptions
export const eventsRealtime = {
  // Subscribe to events changes
  subscribeToEvents(callback: (payload: any) => void) {
    const organizationId = getCurrentOrganizationId()
    
    return supabase
      .channel('events_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events',
          filter: `organization_id=eq.${organizationId}`
        },
        callback
      )
      .subscribe()
  },

  // Subscribe to event registrations changes
  subscribeToEventRegistrations(eventId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`event_registrations_${eventId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'event_registrations',
          filter: `event_id=eq.${eventId}`
        },
        callback
      )
      .subscribe()
  }
}
