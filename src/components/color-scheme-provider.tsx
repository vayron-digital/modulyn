"use client"

import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useSettingsColorScheme } from '@/store/use-settings-store'
import { applyColorScheme } from '@/lib/color-schemes'

export function ColorSchemeProvider() {
  const { theme, resolvedTheme } = useTheme()
  const { colorScheme } = useSettingsColorScheme()

  useEffect(() => {
    // Use default color scheme if none is set
    const schemeToApply = colorScheme || 'indigo'

    // Determine the actual theme (light/dark)
    const currentTheme = resolvedTheme || theme || 'light'
    const actualTheme = currentTheme === 'system' ? 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : 
      currentTheme

    // Apply the color scheme
    applyColorScheme(schemeToApply, actualTheme as 'light' | 'dark')
  }, [colorScheme, theme, resolvedTheme])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      if (theme === 'system') {
        const schemeToApply = colorScheme || 'indigo'
        const actualTheme = mediaQuery.matches ? 'dark' : 'light'
        applyColorScheme(schemeToApply, actualTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, colorScheme])

  return null
}
