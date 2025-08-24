// =====================================================
// US Associate SaaS - Settings Supabase Client
// =====================================================

import { createClient } from '@/lib/supabase/client'
import type {
  UserSettings,
  UserSettingsUpdate,
  Organization,
  OrganizationUpdate,
  UserOrganization,
  UserOrganizationUpdate,
  UserPreference,
  UserPreferenceUpdate,
  NotificationSetting,
  NotificationSettingUpdate,
  SettingsApiResponse,
  SettingsListResponse,
} from '@/types/settings'

const supabase = createClient()

// =====================================================
// USER SETTINGS FUNCTIONS
// =====================================================

/**
 * Get user settings for the current user
 */
export async function getUserSettings(): Promise<SettingsApiResponse<UserSettings | null>> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { data: null, error: 'User not authenticated' }
    }

    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error) {
      return { data: null, error: error.message }
    }

    return { data }
  } catch (error) {
    return { data: null, error: 'Failed to fetch user settings' }
  }
}

/**
 * Update user settings
 */
export async function updateUserSettings(updates: UserSettingsUpdate): Promise<SettingsApiResponse<UserSettings>> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { data: null as any, error: 'User not authenticated' }
    }

    const { data, error } = await supabase
      .from('user_settings')
      .update(updates)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      return { data: null as any, error: error.message }
    }

    return { data }
  } catch (error) {
    return { data: null as any, error: 'Failed to update user settings' }
  }
}

/**
 * Create or update user settings (upsert)
 */
export async function upsertUserSettings(settings: Partial<UserSettings>): Promise<SettingsApiResponse<UserSettings>> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { data: null as any, error: 'User not authenticated' }
    }

    const { data, error } = await supabase
      .from('user_settings')
      .upsert({ ...settings, user_id: user.id })
      .select()
      .single()

    if (error) {
      return { data: null as any, error: error.message }
    }

    return { data }
  } catch (error) {
    return { data: null as any, error: 'Failed to upsert user settings' }
  }
}

// =====================================================
// ORGANIZATION FUNCTIONS
// =====================================================

/**
 * Get organizations for the current user
 */
export async function getUserOrganizations(): Promise<SettingsListResponse<Organization>> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { data: [], count: 0, error: 'User not authenticated' }
    }

    const { data, error, count } = await supabase
      .from('organizations')
      .select(`
        *,
        user_organizations!inner(user_id)
      `, { count: 'exact' })
      .eq('user_organizations.user_id', user.id)

    if (error) {
      return { data: [], count: 0, error: error.message }
    }

    return { data: data || [], count: count || 0 }
  } catch (error) {
    return { data: [], count: 0, error: 'Failed to fetch organizations' }
  }
}

/**
 * Get a specific organization
 */
export async function getOrganization(organizationId: string): Promise<SettingsApiResponse<Organization | null>> {
  try {
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', organizationId)
      .single()

    if (error) {
      return { data: null, error: error.message }
    }

    return { data }
  } catch (error) {
    return { data: null, error: 'Failed to fetch organization' }
  }
}

/**
 * Update organization
 */
export async function updateOrganization(
  organizationId: string, 
  updates: OrganizationUpdate
): Promise<SettingsApiResponse<Organization>> {
  try {
    const { data, error } = await supabase
      .from('organizations')
      .update(updates)
      .eq('id', organizationId)
      .select()
      .single()

    if (error) {
      return { data: null as any, error: error.message }
    }

    return { data }
  } catch (error) {
    return { data: null as any, error: 'Failed to update organization' }
  }
}

/**
 * Create new organization
 */
export async function createOrganization(organization: Partial<Organization>): Promise<SettingsApiResponse<Organization>> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { data: null as any, error: 'User not authenticated' }
    }

    // Create organization
    const { data: orgData, error: orgError } = await supabase
      .from('organizations')
      .insert(organization)
      .select()
      .single()

    if (orgError) {
      return { data: null as any, error: orgError.message }
    }

    // Create user-organization relationship
    const { error: relError } = await supabase
      .from('user_organizations')
      .insert({
        user_id: user.id,
        organization_id: orgData.id,
        role: 'owner',
        is_primary: true
      })

    if (relError) {
      return { data: null as any, error: relError.message }
    }

    return { data: orgData }
  } catch (error) {
    return { data: null as any, error: 'Failed to create organization' }
  }
}

// =====================================================
// USER ORGANIZATION FUNCTIONS
// =====================================================

/**
 * Get user organization memberships
 */
export async function getUserOrganizationMemberships(): Promise<SettingsListResponse<UserOrganization>> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { data: [], count: 0, error: 'User not authenticated' }
    }

    const { data, error, count } = await supabase
      .from('user_organizations')
      .select(`
        *,
        organizations(*)
      `, { count: 'exact' })
      .eq('user_id', user.id)

    if (error) {
      return { data: [], count: 0, error: error.message }
    }

    return { data: data || [], count: count || 0 }
  } catch (error) {
    return { data: [], count: 0, error: 'Failed to fetch organization memberships' }
  }
}

/**
 * Update user organization membership
 */
export async function updateUserOrganization(
  organizationId: string,
  updates: UserOrganizationUpdate
): Promise<SettingsApiResponse<UserOrganization>> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { data: null as any, error: 'User not authenticated' }
    }

    const { data, error } = await supabase
      .from('user_organizations')
      .update(updates)
      .eq('user_id', user.id)
      .eq('organization_id', organizationId)
      .select()
      .single()

    if (error) {
      return { data: null as any, error: error.message }
    }

    return { data }
  } catch (error) {
    return { data: null as any, error: 'Failed to update organization membership' }
  }
}

// =====================================================
// USER PREFERENCES FUNCTIONS
// =====================================================

/**
 * Get user preference by key
 */
export async function getUserPreference(key: string): Promise<SettingsApiResponse<UserPreference | null>> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { data: null, error: 'User not authenticated' }
    }

    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', user.id)
      .eq('preference_key', key)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      return { data: null, error: error.message }
    }

    return { data }
  } catch (error) {
    return { data: null, error: 'Failed to fetch user preference' }
  }
}

/**
 * Set user preference
 */
export async function setUserPreference(
  key: string, 
  value: any
): Promise<SettingsApiResponse<UserPreference>> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { data: null as any, error: 'User not authenticated' }
    }

    const { data, error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: user.id,
        preference_key: key,
        preference_value: value
      })
      .select()
      .single()

    if (error) {
      return { data: null as any, error: error.message }
    }

    return { data }
  } catch (error) {
    return { data: null as any, error: 'Failed to set user preference' }
  }
}

/**
 * Get all user preferences
 */
export async function getAllUserPreferences(): Promise<SettingsListResponse<UserPreference>> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { data: [], count: 0, error: 'User not authenticated' }
    }

    const { data, error, count } = await supabase
      .from('user_preferences')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)

    if (error) {
      return { data: [], count: 0, error: error.message }
    }

    return { data: data || [], count: count || 0 }
  } catch (error) {
    return { data: [], count: 0, error: 'Failed to fetch user preferences' }
  }
}

// =====================================================
// NOTIFICATION SETTINGS FUNCTIONS
// =====================================================

/**
 * Get notification settings for the current user
 */
export async function getNotificationSettings(): Promise<SettingsListResponse<NotificationSetting>> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { data: [], count: 0, error: 'User not authenticated' }
    }

    const { data, error, count } = await supabase
      .from('notification_settings')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)

    if (error) {
      return { data: [], count: 0, error: error.message }
    }

    return { data: data || [], count: count || 0 }
  } catch (error) {
    return { data: [], count: 0, error: 'Failed to fetch notification settings' }
  }
}

/**
 * Update notification setting
 */
export async function updateNotificationSetting(
  notificationType: string,
  updates: NotificationSettingUpdate
): Promise<SettingsApiResponse<NotificationSetting>> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { data: null as any, error: 'User not authenticated' }
    }

    const { data, error } = await supabase
      .from('notification_settings')
      .update(updates)
      .eq('user_id', user.id)
      .eq('notification_type', notificationType)
      .select()
      .single()

    if (error) {
      return { data: null as any, error: error.message }
    }

    return { data }
  } catch (error) {
    return { data: null as any, error: 'Failed to update notification setting' }
  }
}

/**
 * Update multiple notification settings
 */
export async function updateNotificationSettings(
  updates: Array<{ notification_type: string } & NotificationSettingUpdate>
): Promise<SettingsApiResponse<NotificationSetting[]>> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { data: [], error: 'User not authenticated' }
    }

    const results = await Promise.all(
      updates.map(update => updateNotificationSetting(update.notification_type, update))
    )

    const errors = results.filter(result => result.error)
    if (errors.length > 0) {
      return { data: [], error: `Failed to update some settings: ${errors[0].error}` }
    }

    const data = results.map(result => result.data).filter(Boolean) as NotificationSetting[]
    return { data }
  } catch (error) {
    return { data: [], error: 'Failed to update notification settings' }
  }
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

/**
 * Get user's primary organization
 */
export async function getPrimaryOrganization(): Promise<SettingsApiResponse<Organization | null>> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { data: null, error: 'User not authenticated' }
    }

    const { data, error } = await supabase
      .from('user_organizations')
      .select(`
        organizations(*)
      `)
      .eq('user_id', user.id)
      .eq('is_primary', true)
      .single()

    if (error) {
      return { data: null, error: error.message }
    }

    return { data: data?.organizations || null }
  } catch (error) {
    return { data: null, error: 'Failed to fetch primary organization' }
  }
}

/**
 * Set primary organization
 */
export async function setPrimaryOrganization(organizationId: string): Promise<SettingsApiResponse<void>> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { data: undefined, error: 'User not authenticated' }
    }

    // First, unset all primary flags
    const { error: unsetError } = await supabase
      .from('user_organizations')
      .update({ is_primary: false })
      .eq('user_id', user.id)

    if (unsetError) {
      return { data: undefined, error: unsetError.message }
    }

    // Then set the new primary
    const { error: setError } = await supabase
      .from('user_organizations')
      .update({ is_primary: true })
      .eq('user_id', user.id)
      .eq('organization_id', organizationId)

    if (setError) {
      return { data: undefined, error: setError.message }
    }

    return { data: undefined }
  } catch (error) {
    return { data: undefined, error: 'Failed to set primary organization' }
  }
}

/**
 * Check if user has permission for organization
 */
export async function hasOrganizationPermission(
  organizationId: string,
  requiredRole: string
): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return false
    }

    const { data } = await supabase
      .from('user_organizations')
      .select('role')
      .eq('user_id', user.id)
      .eq('organization_id', organizationId)
      .single()

    if (!data) {
      return false
    }

    const roleHierarchy = {
      'owner': 4,
      'admin': 3,
      'manager': 2,
      'member': 1,
      'viewer': 0
    }

    const userRoleLevel = roleHierarchy[data.role as keyof typeof roleHierarchy] || 0
    const requiredRoleLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0

    return userRoleLevel >= requiredRoleLevel
  } catch (error) {
    return false
  }
}

// =====================================================
// REALTIME SUBSCRIPTIONS
// =====================================================

/**
 * Subscribe to user settings changes
 */
export function subscribeToUserSettings(
  callback: (payload: any) => void
) {
  const { data: { user } } = supabase.auth.getUser()
  if (!user) return null

  return supabase
    .channel('user_settings_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'user_settings',
        filter: `user_id=eq.${user.id}`
      },
      callback
    )
    .subscribe()
}

/**
 * Subscribe to organization changes
 */
export function subscribeToOrganizationChanges(
  organizationId: string,
  callback: (payload: any) => void
) {
  return supabase
    .channel(`organization_${organizationId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'organizations',
        filter: `id=eq.${organizationId}`
      },
      callback
    )
    .subscribe()
}

/**
 * Unsubscribe from all channels
 */
export function unsubscribeFromAll() {
  supabase.removeAllChannels()
}
