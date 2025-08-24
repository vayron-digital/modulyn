"use client"

import { useSettingsStore } from "@/store/use-settings-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { COLOR_SCHEME_OPTIONS } from "@/types/settings"

export default function SettingsTestPage() {
  const settings = useSettingsStore()

  const toggleMode = () => {
    const newMode = settings.userMode === 'trade' ? 'crm' : 'trade'
    settings.setUserMode(newMode)
  }

  const cycleColorScheme = () => {
    const currentIndex = COLOR_SCHEME_OPTIONS.findIndex(option => option.value === settings.colorScheme)
    const nextIndex = (currentIndex + 1) % COLOR_SCHEME_OPTIONS.length
    const nextScheme = COLOR_SCHEME_OPTIONS[nextIndex].value
    settings.setColorScheme(nextScheme)
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings Test</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Theme:</span>
            <Badge>{settings.theme}</Badge>
          </div>
          <div className="flex justify-between">
            <span>Color Scheme:</span>
            <Badge>{settings.colorScheme}</Badge>
          </div>
          <div className="flex justify-between">
            <span>User Mode:</span>
            <Badge>{settings.userMode}</Badge>
          </div>
          <div className="flex justify-between">
            <span>Sidebar:</span>
            <Badge>{settings.sidebarCollapsed ? 'Collapsed' : 'Expanded'}</Badge>
          </div>
          <div className="flex justify-between">
            <span>User Changed Mode:</span>
            <Badge>{settings.hasUserChangedMode ? 'Yes' : 'No'}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Color Scheme Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button className="flex-1">Primary Button</Button>
            <Button variant="secondary" className="flex-1">Secondary</Button>
            <Button variant="outline" className="flex-1">Outline</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="destructive" className="flex-1">Destructive</Button>
            <Button variant="ghost" className="flex-1">Ghost</Button>
            <Button variant="link" className="flex-1">Link</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-medium">Primary</span>
              </div>
              <p className="text-xs text-muted-foreground">Primary Button Color</p>
            </div>
            <div className="space-y-2">
              <div className="h-8 bg-secondary rounded flex items-center justify-center">
                <span className="text-secondary-foreground text-xs font-medium">Secondary</span>
              </div>
              <p className="text-xs text-muted-foreground">Secondary Button Color</p>
            </div>
            <div className="space-y-2">
              <div className="h-8 bg-accent rounded flex items-center justify-center">
                <span className="text-accent-foreground text-xs font-medium">Accent</span>
              </div>
              <p className="text-xs text-muted-foreground">Accent Color</p>
            </div>
            <div className="space-y-2">
              <div className="h-8 bg-muted rounded flex items-center justify-center">
                <span className="text-muted-foreground text-xs font-medium">Muted</span>
              </div>
              <p className="text-xs text-muted-foreground">Muted Background</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={toggleMode} className="w-full">
            Toggle Mode (Current: {settings.userMode})
          </Button>
          <Button onClick={cycleColorScheme} className="w-full">
            Cycle Color Scheme (Current: {settings.colorScheme})
          </Button>
          <div className="grid grid-cols-3 gap-2">
            {COLOR_SCHEME_OPTIONS.map((option) => (
              <Button
                key={option.value}
                onClick={() => settings.setColorScheme(option.value)}
                className="flex flex-col items-center gap-1 h-auto py-3"
                variant={settings.colorScheme === option.value ? "default" : "outline"}
                style={{ 
                  backgroundColor: settings.colorScheme === option.value ? option.color : undefined,
                  borderColor: option.color 
                }}
              >
                <div 
                  className="w-4 h-4 rounded-full border-2 border-white"
                  style={{ backgroundColor: option.color }}
                />
                <span className="text-xs">{option.label}</span>
              </Button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Click the buttons above to change mode and color scheme, then navigate to another page and come back to see if they persist.
          </p>
        </CardContent>
      </Card>

             <Card>
         <CardHeader>
           <CardTitle>Primary Color Debug (Only Primary Colors Applied)</CardTitle>
         </CardHeader>
         <CardContent className="space-y-2">
           <div className="grid grid-cols-2 gap-4 text-xs">
             <div>
               <p className="font-medium">Primary:</p>
               <p className="text-muted-foreground" style={{ color: 'var(--primary)' }}>
                 {typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--primary') || 'Not set' : 'Loading...'}
               </p>
             </div>
             <div>
               <p className="font-medium">Primary Foreground:</p>
               <p className="text-muted-foreground" style={{ color: 'var(--primary-foreground)' }}>
                 {typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--primary-foreground') || 'Not set' : 'Loading...'}
               </p>
             </div>
           </div>
           <p className="text-xs text-muted-foreground mt-2">
             Note: Only primary colors are applied to avoid conflicts with shadcn/ui styling
           </p>
         </CardContent>
       </Card>
    </div>
  )
}
