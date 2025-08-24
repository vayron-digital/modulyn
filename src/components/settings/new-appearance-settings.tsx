"use client"

import { useEffect, useState } from "react"
import { Check, Loader2, Monitor, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSettingsTheme, useSettingsColorScheme, useSettingsFontSize, useSettingsCompactMode } from "@/store/use-settings-store"
import { useUpdateUserSettings } from "@/hooks/use-settings"
import { 
  THEME_OPTIONS, 
  COLOR_SCHEME_OPTIONS, 
  FONT_SIZE_OPTIONS 
} from "@/types/settings"
import { toast } from "react-hot-toast"

export function NewAppearanceSettings() {
  const [mounted, setMounted] = useState(false)
  
  // Settings hooks
  const { theme, setTheme } = useSettingsTheme()
  const { colorScheme, setColorScheme } = useSettingsColorScheme()
  const fontSize = useSettingsFontSize()
  const { compactMode, toggleCompactMode } = useSettingsCompactMode()
  
  // API mutation
  const updateSettingsMutation = useUpdateUserSettings()

  // Handle mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = async (newTheme: 'light' | 'dark' | 'system') => {
    try {
      setTheme(newTheme)
      
      // Update in database
      await updateSettingsMutation.mutateAsync({
        theme: newTheme
      })
      
      toast.success(`Theme changed to ${newTheme}`)
    } catch (error) {
      toast.error('Failed to update theme')
      console.error('Theme update error:', error)
    }
  }

  const handleColorSchemeChange = async (newColorScheme: string) => {
    try {
      setColorScheme(newColorScheme as any)
      
      // Update in database
      await updateSettingsMutation.mutateAsync({
        color_scheme: newColorScheme
      })
      
      toast.success(`Color scheme changed to ${newColorScheme}`)
    } catch (error) {
      toast.error('Failed to update color scheme')
      console.error('Color scheme update error:', error)
    }
  }

  const getThemeIcon = (themeValue: string) => {
    switch (themeValue) {
      case 'light':
        return <Sun className="h-4 w-4" />
      case 'dark':
        return <Moon className="h-4 w-4" />
      case 'system':
        return <Monitor className="h-4 w-4" />
      default:
        return <Sun className="h-4 w-4" />
    }
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Theme Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5" />
            Theme
          </CardTitle>
          <CardDescription>
            Choose your preferred theme for the application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {THEME_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={theme === option.value ? "default" : "outline"}
                onClick={() => handleThemeChange(option.value)}
                className="justify-start h-auto p-4"
                disabled={updateSettingsMutation.isPending}
              >
                <div className="flex items-center gap-2">
                  {getThemeIcon(option.value)}
                  <span>{option.label}</span>
                  {theme === option.value && (
                    <Check className="h-4 w-4 ml-auto" />
                  )}
                </div>
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">Current: {theme}</Badge>
            {updateSettingsMutation.isPending && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Color Scheme Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
            Color Scheme
          </CardTitle>
          <CardDescription>
            Select your preferred color scheme for the interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {COLOR_SCHEME_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={colorScheme === option.value ? "default" : "outline"}
                onClick={() => handleColorSchemeChange(option.value)}
                className="justify-start h-auto p-4"
                disabled={updateSettingsMutation.isPending}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-4 w-4 rounded-full border border-border"
                    style={{ backgroundColor: option.color }}
                  />
                  <span>{option.label}</span>
                  {colorScheme === option.value && (
                    <Check className="h-4 w-4 ml-auto" />
                  )}
                </div>
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">Current: {colorScheme}</Badge>
            {updateSettingsMutation.isPending && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      {updateSettingsMutation.isPending && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving changes...
        </div>
      )}
    </div>
  )
}
