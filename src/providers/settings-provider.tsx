// =====================================================
// US Associate SaaS - Settings Provider
// =====================================================

"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useUserSettings, useUpdateUserSettings } from '@/hooks/use-settings'
import type { UserSettings, Theme, ColorScheme, UserMode } from '@/types/settings'

interface SettingsContextType {
  // Current settings
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
  
  // Actions
  updateSettings: (updates: Partial<UserSettings>) => Promise<void>
  setTheme: (theme: Theme) => Promise<void>
  setColorScheme: (colorScheme: ColorScheme) => Promise<void>
  setUserMode: (mode: UserMode) => Promise<void>
  toggleSidebar: () => Promise<void>
  toggleCompactMode: () => Promise<void>
  setSidebarCollapsed: (collapsed: boolean) => Promise<void>
  setCompactMode: (compact: boolean) => Promise<void>
  
  // Utility
  refreshSettings: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

interface SettingsProviderProps {
  children: React.ReactNode
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const { setTheme: setNextTheme } = useTheme()
  const { data: settingsResponse, isLoading, error, refetch } = useUserSettings()
  const updateSettingsMutation = useUpdateUserSettings()
  
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [localError, setLocalError] = useState<string | null>(null)

  // Update local state when settings change
  useEffect(() => {
    if (settingsResponse?.data) {
      setSettings(settingsResponse.data)
      setLocalError(null)
    } else if (settingsResponse?.error) {
      setLocalError(settingsResponse.error)
    }
  }, [settingsResponse])

  // Sync theme with next-themes
  useEffect(() => {
    if (settings?.theme) {
      setNextTheme(settings.theme)
    }
  }, [settings?.theme, setNextTheme])

  // Update settings function
  const updateSettings = async (updates: Partial<UserSettings>) => {
    try {
      await updateSettingsMutation.mutateAsync(updates)
      
      // Update local state immediately for better UX
      if (settings) {
        setSettings({ ...settings, ...updates })
      }
    } catch (error) {
      console.error('Failed to update settings:', error)
      throw error
    }
  }

  // Theme actions
  const setTheme = async (theme: Theme) => {
    await updateSettings({ theme })
  }

  // Color scheme actions
  const setColorScheme = async (colorScheme: ColorScheme) => {
    await updateSettings({ color_scheme: colorScheme })
  }

  // User mode actions
  const setUserMode = async (mode: UserMode) => {
    await updateSettings({ mode })
  }

  // Sidebar actions
  const toggleSidebar = async () => {
    if (settings) {
      await updateSettings({ sidebar_collapsed: !settings.sidebar_collapsed })
    }
  }

  const setSidebarCollapsed = async (collapsed: boolean) => {
    await updateSettings({ sidebar_collapsed: collapsed })
  }

  // Compact mode actions
  const toggleCompactMode = async () => {
    if (settings) {
      await updateSettings({ compact_mode: !settings.compact_mode })
    }
  }

  const setCompactMode = async (compact: boolean) => {
    await updateSettings({ compact_mode: compact })
  }

  // Refresh settings
  const refreshSettings = () => {
    refetch()
  }

  // Context value
  const contextValue: SettingsContextType = {
    // Current settings
    settings,
    isLoading,
    error: localError || error?.message || null,
    
    // Quick access to common settings
    theme: settings?.theme || 'system',
    colorScheme: settings?.color_scheme || 'indigo',
    userMode: settings?.mode || 'trade',
    sidebarCollapsed: settings?.sidebar_collapsed || false,
    compactMode: settings?.compact_mode || false,
    fontSize: settings?.font_size || 'medium',
    timezone: settings?.timezone || 'UTC',
    language: settings?.language || 'en',
    currency: settings?.default_currency || 'USD',
    
    // Actions
    updateSettings,
    setTheme,
    setColorScheme,
    setUserMode,
    toggleSidebar,
    toggleCompactMode,
    setSidebarCollapsed,
    setCompactMode,
    
    // Utility
    refreshSettings,
  }

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  )
}

// Hook to use settings context
export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

// Hook to get theme from settings
export function useSettingsTheme() {
  const { theme, setTheme } = useSettings()
  return { theme, setTheme }
}

// Hook to get color scheme from settings
export function useSettingsColorScheme() {
  const { colorScheme, setColorScheme } = useSettings()
  return { colorScheme, setColorScheme }
}

// Hook to get user mode from settings
export function useSettingsUserMode() {
  const { userMode, setUserMode } = useSettings()
  return { userMode, setUserMode }
}

// Hook to get sidebar state from settings
export function useSettingsSidebar() {
  const { sidebarCollapsed, toggleSidebar, setSidebarCollapsed } = useSettings()
  return { sidebarCollapsed, toggleSidebar, setSidebarCollapsed }
}

// Hook to get compact mode from settings
export function useSettingsCompactMode() {
  const { compactMode, toggleCompactMode, setCompactMode } = useSettings()
  return { compactMode, toggleCompactMode, setCompactMode }
}
