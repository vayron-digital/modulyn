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

export function AppearanceSettings() {
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

  // Apply font size
  useEffect(() => {
    if (mounted) {
      document.documentElement.style.fontSize = {
        small: "14px",
        medium: "16px",
        large: "18px",
      }[fontSize] || "16px"
    }
  }, [fontSize, mounted])

  // Apply compact mode
  useEffect(() => {
    if (mounted) {
      if (compactMode) {
        document.documentElement.classList.add('compact-mode')
      } else {
        document.documentElement.classList.remove('compact-mode')
      }
    }
  }, [compactMode, mounted])

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

  const handleFontSizeChange = async (newFontSize: string) => {
    try {
      // Update in database
      await updateSettingsMutation.mutateAsync({
        font_size: newFontSize as any
      })
      
      toast.success(`Font size changed to ${newFontSize}`)
    } catch (error) {
      toast.error('Failed to update font size')
      console.error('Font size update error:', error)
    }
  }

  const handleCompactModeChange = async (newCompactMode: boolean) => {
    try {
      toggleCompactMode()
      
      // Update in database
      await updateSettingsMutation.mutateAsync({
        compact_mode: newCompactMode
      })
      
      toast.success(`Compact mode ${newCompactMode ? 'enabled' : 'disabled'}`)
    } catch (error) {
      toast.error('Failed to update compact mode')
      console.error('Compact mode update error:', error)
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

      {/* Font Size Section */}
      <Card>
        <CardHeader>
          <CardTitle>Font Size</CardTitle>
          <CardDescription>
            Adjust the text size throughout the application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={fontSize}
            onValueChange={handleFontSizeChange}
            className="grid grid-cols-3 gap-3"
          >
            {FONT_SIZE_OPTIONS.map((option) => (
              <div key={option.value}>
                <RadioGroupItem
                  value={option.value}
                  id={`fontSize-${option.value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`fontSize-${option.value}`}
                  className="flex cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all"
                >
                  <span className={option.value === 'small' ? 'text-sm' : option.value === 'large' ? 'text-lg' : 'text-base'}>
                    {option.label}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">Current: {fontSize}</Badge>
            {updateSettingsMutation.isPending && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Compact Mode Section */}
      <Card>
        <CardHeader>
          <CardTitle>Layout</CardTitle>
          <CardDescription>
            Customize the layout and spacing of the interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Compact Mode</Label>
              <p className="text-sm text-muted-foreground">
                Reduce spacing and padding for a more compact interface
              </p>
            </div>
            <Switch
              checked={compactMode}
              onCheckedChange={handleCompactModeChange}
              disabled={updateSettingsMutation.isPending}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">
              {compactMode ? 'Compact' : 'Standard'} Layout
            </Badge>
            {updateSettingsMutation.isPending && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            See how your current settings look
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 p-4 border rounded-lg bg-card">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Sample Content</h4>
              <Badge variant="secondary">Preview</Badge>
            </div>
            <p className="text-muted-foreground">
              This is how your text will appear with the current font size and theme settings.
            </p>
            <div className="flex gap-2">
              <Button size="sm">Primary Button</Button>
              <Button size="sm" variant="outline">Secondary Button</Button>
            </div>
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
