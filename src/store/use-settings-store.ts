// =====================================================
// US Associate SaaS - Settings Store (Zustand)
// =====================================================

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserSettings, Theme, ColorScheme, UserMode, SolutionAccess, SubscriptionPlan } from '@/types/settings'

interface SettingsState {
  // Settings data
  settings: UserSettings | null
  isLoading: boolean
  error: string | null
  
  // Quick access to common settings
  theme: Theme
  colorScheme: ColorScheme
  userMode: UserMode
  sidebarCollapsed: boolean
  compactMode: boolean
  fontSize: 'small' | 'medium' | 'large'
  timezone: string
  language: string
  currency: string
  
  // Subscription and Access Control
  subscriptionPlan?: SubscriptionPlan
  accessPermissions: SolutionAccess[]
  subscriptionStatus?: 'active' | 'inactive' | 'suspended' | 'cancelled'
  
  // Internal flags
  hasUserChangedMode: boolean
  
  // Actions
  setSettings: (settings: UserSettings) => void
  updateSettings: (updates: Partial<UserSettings>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // Quick actions
  setTheme: (theme: Theme) => void
  setColorScheme: (colorScheme: ColorScheme) => void
  setUserMode: (mode: UserMode) => void
  toggleSidebar: () => void
  toggleCompactMode: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setCompactMode: (compact: boolean) => void
  
  // Access Control
  hasAccess: (solution: SolutionAccess) => boolean
  canSwitchToMode: (mode: UserMode) => boolean
  
  // Reset
  reset: () => void
}

const defaultSettings: Partial<UserSettings> = {
  theme: 'system',
  color_scheme: 'indigo',
  mode: 'trade',
  sidebar_collapsed: false,
  compact_mode: false,
  font_size: 'medium',
  timezone: 'UTC',
  language: 'en',
  default_currency: 'USD',
  email_notifications: true,
  push_notifications: true,
  marketing_emails: false,
  two_factor_enabled: false,
  dashboard_layout: 'default',
  default_view: 'overview',
  show_welcome_message: true,
  auto_refresh_interval: 300,
  email_frequency: 'immediate',
  notification_sound: true,
  desktop_notifications: true,
  mobile_notifications: true,
  profile_visibility: 'private',
  activity_visibility: 'team',
  data_sharing: false,
  session_timeout: 3600,
  password_expiry_days: 90,
  failed_login_attempts: 0,
  account_locked: false,
  google_calendar_sync: false,
  outlook_calendar_sync: false,
  slack_integration: false,
  zapier_integration: false,
  date_format: 'MM/DD/YYYY',
  time_format: '12h',
  auto_save_interval: 30,
  auto_backup_enabled: true,
  backup_frequency: 'daily',
  custom_preferences: {},
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      // Initial state
      settings: null,
      isLoading: false,
      error: null,
      theme: 'system',
      colorScheme: 'indigo',
      userMode: 'trade',
      sidebarCollapsed: false,
      compactMode: false,
      fontSize: 'medium',
      timezone: 'UTC',
      language: 'en',
      currency: 'USD',
      accessPermissions: ['crm'],
      hasUserChangedMode: false,

      // Actions
      setSettings: (settings) => {
        const currentState = get()
        set({
          settings,
          theme: settings.theme,
          colorScheme: settings.color_scheme,
          // Preserve user's manual mode selection unless it's the first load
          userMode: currentState.settings === null || !currentState.hasUserChangedMode ? settings.mode : currentState.userMode,
          sidebarCollapsed: settings.sidebar_collapsed,
          compactMode: settings.compact_mode,
          fontSize: settings.font_size,
          timezone: settings.timezone,
          language: settings.language,
          currency: settings.default_currency,
          subscriptionPlan: settings.subscription_plan,
          accessPermissions: settings.access_permissions || ['crm'],
          subscriptionStatus: settings.subscription_status,
          error: null,
        })
      },

      updateSettings: (updates) => {
        const currentSettings = get().settings
        if (currentSettings) {
          const newSettings = { ...currentSettings, ...updates }
          set({
            settings: newSettings,
            theme: newSettings.theme,
            colorScheme: newSettings.color_scheme,
            userMode: newSettings.mode,
            sidebarCollapsed: newSettings.sidebar_collapsed,
            compactMode: newSettings.compact_mode,
            fontSize: newSettings.font_size,
            timezone: newSettings.timezone,
            language: newSettings.language,
            currency: newSettings.default_currency,
          })
        } else {
          // If no settings exist yet, just update the store state directly
          if (updates.mode) set({ userMode: updates.mode })
          if (updates.theme) set({ theme: updates.theme })
          if (updates.color_scheme) set({ colorScheme: updates.color_scheme })
          if (updates.sidebar_collapsed !== undefined) set({ sidebarCollapsed: updates.sidebar_collapsed })
          if (updates.compact_mode !== undefined) set({ compactMode: updates.compact_mode })
          if (updates.font_size) set({ fontSize: updates.font_size })
          if (updates.timezone) set({ timezone: updates.timezone })
          if (updates.language) set({ language: updates.language })
          if (updates.default_currency) set({ currency: updates.default_currency })
        }
      },

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // Quick actions
      setTheme: (theme) => {
        get().updateSettings({ theme })
      },

      setColorScheme: (colorScheme) => {
        // Update both the store state and the settings object
        set({ colorScheme })
        get().updateSettings({ color_scheme: colorScheme })
      },

      setUserMode: (mode) => {
        // Update both the store state and the settings object
        set({ userMode: mode, hasUserChangedMode: true })
        get().updateSettings({ mode })
      },

      toggleSidebar: () => {
        const current = get().sidebarCollapsed
        get().setSidebarCollapsed(!current)
      },

      toggleCompactMode: () => {
        const current = get().compactMode
        get().setCompactMode(!current)
      },

      setSidebarCollapsed: (collapsed) => {
        get().updateSettings({ sidebar_collapsed: collapsed })
      },

      setCompactMode: (compact) => {
        get().updateSettings({ compact_mode: compact })
      },

      // Access Control
      hasAccess: (solution) => {
        const state = get()
        return state.accessPermissions.includes(solution) && state.subscriptionStatus === 'active'
      },

      canSwitchToMode: (mode) => {
        const state = get()
        const solutionMap: Record<UserMode, SolutionAccess> = {
          'crm': 'crm',
          'trade': 'ams'
        }
        return state.hasAccess(solutionMap[mode])
      },

      // Reset
      reset: () => {
        set({
          settings: null,
          isLoading: false,
          error: null,
          theme: 'system',
          colorScheme: 'indigo',
          userMode: 'trade',
          sidebarCollapsed: false,
          compactMode: false,
          fontSize: 'medium',
          timezone: 'UTC',
          language: 'en',
          currency: 'USD',
          hasUserChangedMode: false,
        })
      },
    }),
    {
      name: 'settings-storage',
      partialize: (state) => ({
        theme: state.theme,
        colorScheme: state.colorScheme,
        userMode: state.userMode,
        sidebarCollapsed: state.sidebarCollapsed,
        compactMode: state.compactMode,
        fontSize: state.fontSize,
        timezone: state.timezone,
        language: state.language,
        currency: state.currency,
        hasUserChangedMode: state.hasUserChangedMode,
      }),
    }
  )
)

// Selector hooks for better performance
export const useSettingsTheme = () => useSettingsStore((state) => ({
  theme: state.theme,
  setTheme: state.setTheme,
}))

export const useSettingsColorScheme = () => useSettingsStore((state) => ({
  colorScheme: state.colorScheme,
  setColorScheme: state.setColorScheme,
}))

export const useSettingsUserMode = () => useSettingsStore((state) => ({
  userMode: state.userMode,
  setUserMode: state.setUserMode,
}))

export const useSettingsSidebar = () => useSettingsStore((state) => ({
  sidebarCollapsed: state.sidebarCollapsed,
  toggleSidebar: state.toggleSidebar,
  setSidebarCollapsed: state.setSidebarCollapsed,
}))

export const useSettingsCompactMode = () => useSettingsStore((state) => ({
  compactMode: state.compactMode,
  toggleCompactMode: state.toggleCompactMode,
  setCompactMode: state.setCompactMode,
}))

export const useSettingsFontSize = () => useSettingsStore((state) => state.fontSize)

export const useSettingsTimezone = () => useSettingsStore((state) => state.timezone)

export const useSettingsLanguage = () => useSettingsStore((state) => state.language)

export const useSettingsCurrency = () => useSettingsStore((state) => state.currency)

export const useSettingsLoading = () => useSettingsStore((state) => state.isLoading)

export const useSettingsError = () => useSettingsStore((state) => state.error)

// Access Control Hooks
export const useSettingsAccess = () => useSettingsStore((state) => ({
  hasAccess: state.hasAccess,
  canSwitchToMode: state.canSwitchToMode,
  accessPermissions: state.accessPermissions,
  subscriptionPlan: state.subscriptionPlan,
  subscriptionStatus: state.subscriptionStatus,
}))

export const useSettingsSubscription = () => useSettingsStore((state) => ({
  subscriptionPlan: state.subscriptionPlan,
  subscriptionStatus: state.subscriptionStatus,
  accessPermissions: state.accessPermissions,
}))
