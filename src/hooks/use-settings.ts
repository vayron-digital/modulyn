// =====================================================
// US Associate SaaS - Settings Hooks
// =====================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import type {
  UserSettings,
  UserSettingsUpdate,
  Organization,
  OrganizationUpdate,
  UserOrganization,
  UserOrganizationUpdate,
  UserPreference,
  NotificationSetting,
  NotificationSettingUpdate,
} from '@/types/settings'
import {
  getUserSettings,
  updateUserSettings,
  upsertUserSettings,
  getUserOrganizations,
  getOrganization,
  updateOrganization,
  createOrganization,
  getUserOrganizationMemberships,
  updateUserOrganization,
  getUserPreference,
  setUserPreference,
  getAllUserPreferences,
  getNotificationSettings,
  updateNotificationSetting,
  updateNotificationSettings,
  getPrimaryOrganization,
  setPrimaryOrganization,
  hasOrganizationPermission,
} from '@/lib/supabase/settings'

// =====================================================
// USER SETTINGS HOOKS
// =====================================================

/**
 * Hook to get user settings
 */
export function useUserSettings() {
  return useQuery({
    queryKey: ['user-settings'],
    queryFn: getUserSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Hook to update user settings
 */
export function useUpdateUserSettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUserSettings,
    onSuccess: (response) => {
      if (response.data) {
        queryClient.setQueryData(['user-settings'], response)
        toast.success('Settings updated successfully')
      } else if (response.error) {
        toast.error(response.error)
      }
    },
    onError: (error) => {
      toast.error('Failed to update settings')
      console.error('Settings update error:', error)
    },
  })
}

/**
 * Hook to upsert user settings
 */
export function useUpsertUserSettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: upsertUserSettings,
    onSuccess: (response) => {
      if (response.data) {
        queryClient.setQueryData(['user-settings'], response)
        toast.success('Settings saved successfully')
      } else if (response.error) {
        toast.error(response.error)
      }
    },
    onError: (error) => {
      toast.error('Failed to save settings')
      console.error('Settings upsert error:', error)
    },
  })
}

// =====================================================
// ORGANIZATION HOOKS
// =====================================================

/**
 * Hook to get user organizations
 */
export function useUserOrganizations() {
  return useQuery({
    queryKey: ['user-organizations'],
    queryFn: getUserOrganizations,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Hook to get a specific organization
 */
export function useOrganization(organizationId: string) {
  return useQuery({
    queryKey: ['organization', organizationId],
    queryFn: () => getOrganization(organizationId),
    enabled: !!organizationId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Hook to update organization
 */
export function useUpdateOrganization() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ organizationId, updates }: { organizationId: string; updates: OrganizationUpdate }) =>
      updateOrganization(organizationId, updates),
    onSuccess: (response, { organizationId }) => {
      if (response.data) {
        queryClient.setQueryData(['organization', organizationId], response)
        queryClient.invalidateQueries({ queryKey: ['user-organizations'] })
        toast.success('Organization updated successfully')
      } else if (response.error) {
        toast.error(response.error)
      }
    },
    onError: (error) => {
      toast.error('Failed to update organization')
      console.error('Organization update error:', error)
    },
  })
}

/**
 * Hook to create organization
 */
export function useCreateOrganization() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createOrganization,
    onSuccess: (response) => {
      if (response.data) {
        queryClient.invalidateQueries({ queryKey: ['user-organizations'] })
        toast.success('Organization created successfully')
      } else if (response.error) {
        toast.error(response.error)
      }
    },
    onError: (error) => {
      toast.error('Failed to create organization')
      console.error('Organization creation error:', error)
    },
  })
}

// =====================================================
// USER ORGANIZATION HOOKS
// =====================================================

/**
 * Hook to get user organization memberships
 */
export function useUserOrganizationMemberships() {
  return useQuery({
    queryKey: ['user-organization-memberships'],
    queryFn: getUserOrganizationMemberships,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Hook to update user organization membership
 */
export function useUpdateUserOrganization() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ organizationId, updates }: { organizationId: string; updates: UserOrganizationUpdate }) =>
      updateUserOrganization(organizationId, updates),
    onSuccess: (response) => {
      if (response.data) {
        queryClient.invalidateQueries({ queryKey: ['user-organization-memberships'] })
        queryClient.invalidateQueries({ queryKey: ['user-organizations'] })
        toast.success('Membership updated successfully')
      } else if (response.error) {
        toast.error(response.error)
      }
    },
    onError: (error) => {
      toast.error('Failed to update membership')
      console.error('Membership update error:', error)
    },
  })
}

// =====================================================
// USER PREFERENCES HOOKS
// =====================================================

/**
 * Hook to get user preference by key
 */
export function useUserPreference(key: string) {
  return useQuery({
    queryKey: ['user-preference', key],
    queryFn: () => getUserPreference(key),
    enabled: !!key,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Hook to set user preference
 */
export function useSetUserPreference() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ key, value }: { key: string; value: any }) => setUserPreference(key, value),
    onSuccess: (response, { key }) => {
      if (response.data) {
        queryClient.setQueryData(['user-preference', key], response)
        toast.success('Preference saved successfully')
      } else if (response.error) {
        toast.error(response.error)
      }
    },
    onError: (error) => {
      toast.error('Failed to save preference')
      console.error('Preference save error:', error)
    },
  })
}

/**
 * Hook to get all user preferences
 */
export function useAllUserPreferences() {
  return useQuery({
    queryKey: ['user-preferences'],
    queryFn: getAllUserPreferences,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

// =====================================================
// NOTIFICATION SETTINGS HOOKS
// =====================================================

/**
 * Hook to get notification settings
 */
export function useNotificationSettings() {
  return useQuery({
    queryKey: ['notification-settings'],
    queryFn: getNotificationSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Hook to update notification setting
 */
export function useUpdateNotificationSetting() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ notificationType, updates }: { notificationType: string; updates: NotificationSettingUpdate }) =>
      updateNotificationSetting(notificationType, updates),
    onSuccess: (response) => {
      if (response.data) {
        queryClient.invalidateQueries({ queryKey: ['notification-settings'] })
        toast.success('Notification setting updated')
      } else if (response.error) {
        toast.error(response.error)
      }
    },
    onError: (error) => {
      toast.error('Failed to update notification setting')
      console.error('Notification setting update error:', error)
    },
  })
}

/**
 * Hook to update multiple notification settings
 */
export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateNotificationSettings,
    onSuccess: (response) => {
      if (response.data) {
        queryClient.invalidateQueries({ queryKey: ['notification-settings'] })
        toast.success('Notification settings updated')
      } else if (response.error) {
        toast.error(response.error)
      }
    },
    onError: (error) => {
      toast.error('Failed to update notification settings')
      console.error('Notification settings update error:', error)
    },
  })
}

// =====================================================
// UTILITY HOOKS
// =====================================================

/**
 * Hook to get primary organization
 */
export function usePrimaryOrganization() {
  return useQuery({
    queryKey: ['primary-organization'],
    queryFn: getPrimaryOrganization,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Hook to set primary organization
 */
export function useSetPrimaryOrganization() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: setPrimaryOrganization,
    onSuccess: (response) => {
      if (response.data !== undefined) {
        queryClient.invalidateQueries({ queryKey: ['primary-organization'] })
        queryClient.invalidateQueries({ queryKey: ['user-organization-memberships'] })
        toast.success('Primary organization updated')
      } else if (response.error) {
        toast.error(response.error)
      }
    },
    onError: (error) => {
      toast.error('Failed to update primary organization')
      console.error('Primary organization update error:', error)
    },
  })
}

/**
 * Hook to check organization permission
 */
export function useOrganizationPermission(organizationId: string, requiredRole: string) {
  return useQuery({
    queryKey: ['organization-permission', organizationId, requiredRole],
    queryFn: () => hasOrganizationPermission(organizationId, requiredRole),
    enabled: !!organizationId && !!requiredRole,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

// =====================================================
// SETTINGS UTILITY HOOKS
// =====================================================

/**
 * Hook to get theme from settings
 */
export function useTheme() {
  const { data: settingsResponse } = useUserSettings()
  return settingsResponse?.data?.theme || 'system'
}

/**
 * Hook to get color scheme from settings
 */
export function useColorScheme() {
  const { data: settingsResponse } = useUserSettings()
  return settingsResponse?.data?.color_scheme || 'indigo'
}

/**
 * Hook to get user mode from settings
 */
export function useUserMode() {
  const { data: settingsResponse } = useUserSettings()
  return settingsResponse?.data?.mode || 'trade'
}

/**
 * Hook to get sidebar collapsed state from settings
 */
export function useSidebarCollapsed() {
  const { data: settingsResponse } = useUserSettings()
  return settingsResponse?.data?.sidebar_collapsed || false
}

/**
 * Hook to get compact mode from settings
 */
export function useCompactMode() {
  const { data: settingsResponse } = useUserSettings()
  return settingsResponse?.data?.compact_mode || false
}

/**
 * Hook to get font size from settings
 */
export function useFontSize() {
  const { data: settingsResponse } = useUserSettings()
  return settingsResponse?.data?.font_size || 'medium'
}

/**
 * Hook to get timezone from settings
 */
export function useTimezone() {
  const { data: settingsResponse } = useUserSettings()
  return settingsResponse?.data?.timezone || 'UTC'
}

/**
 * Hook to get language from settings
 */
export function useLanguage() {
  const { data: settingsResponse } = useUserSettings()
  return settingsResponse?.data?.language || 'en'
}

/**
 * Hook to get currency from settings
 */
export function useCurrency() {
  const { data: settingsResponse } = useUserSettings()
  return settingsResponse?.data?.default_currency || 'USD'
}

/**
 * Hook to get date format from settings
 */
export function useDateFormat() {
  const { data: settingsResponse } = useUserSettings()
  return settingsResponse?.data?.date_format || 'MM/DD/YYYY'
}

/**
 * Hook to get time format from settings
 */
export function useTimeFormat() {
  const { data: settingsResponse } = useUserSettings()
  return settingsResponse?.data?.time_format || '12h'
}

// =====================================================
// SETTINGS ACTIONS HOOKS
// =====================================================

/**
 * Hook for theme actions
 */
export function useThemeActions() {
  const updateSettings = useUpdateUserSettings()

  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    updateSettings.mutate({ theme })
  }

  return { setTheme }
}

/**
 * Hook for color scheme actions
 */
export function useColorSchemeActions() {
  const updateSettings = useUpdateUserSettings()

  const setColorScheme = (colorScheme: 'indigo' | 'blue' | 'green' | 'purple' | 'orange' | 'red') => {
    updateSettings.mutate({ color_scheme: colorScheme })
  }

  return { setColorScheme }
}

/**
 * Hook for user mode actions
 */
export function useUserModeActions() {
  const updateSettings = useUpdateUserSettings()

  const setUserMode = (mode: 'trade' | 'crm') => {
    updateSettings.mutate({ mode })
  }

  return { setUserMode }
}

/**
 * Hook for sidebar actions
 */
export function useSidebarActions() {
  const updateSettings = useUpdateUserSettings()

  const toggleSidebar = () => {
    const { data: settingsResponse } = useUserSettings()
    const currentState = settingsResponse?.data?.sidebar_collapsed || false
    updateSettings.mutate({ sidebar_collapsed: !currentState })
  }

  const setSidebarCollapsed = (collapsed: boolean) => {
    updateSettings.mutate({ sidebar_collapsed: collapsed })
  }

  return { toggleSidebar, setSidebarCollapsed }
}

/**
 * Hook for compact mode actions
 */
export function useCompactModeActions() {
  const updateSettings = useUpdateUserSettings()

  const toggleCompactMode = () => {
    const { data: settingsResponse } = useUserSettings()
    const currentState = settingsResponse?.data?.compact_mode || false
    updateSettings.mutate({ compact_mode: !currentState })
  }

  const setCompactMode = (compact: boolean) => {
    updateSettings.mutate({ compact_mode: compact })
  }

  return { toggleCompactMode, setCompactMode }
}
