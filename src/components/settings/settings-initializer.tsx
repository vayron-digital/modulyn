"use client"

import { useEffect } from 'react'
import { useUserSettings } from '@/hooks/use-settings'
import { useSettingsStore } from '@/store/use-settings-store'
import { toast } from 'react-hot-toast'

export function SettingsInitializer() {
  const { data: settingsResponse, isLoading, error } = useUserSettings()
  const { setSettings, setLoading, setError } = useSettingsStore()

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  useEffect(() => {
    if (settingsResponse?.data) {
      setSettings(settingsResponse.data)
      setError(null)
    } else if (settingsResponse?.error) {
      setError(settingsResponse.error)
      toast.error('Failed to load settings')
    }
  }, [settingsResponse, setSettings, setError])



  useEffect(() => {
    if (error) {
      setError(error.message || 'Failed to load settings')
      toast.error('Failed to load settings')
    }
  }, [error, setError])

  // This component doesn't render anything
  return null
}
