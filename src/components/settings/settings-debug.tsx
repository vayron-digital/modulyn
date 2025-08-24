"use client"

import { useSettingsStore } from '@/store/use-settings-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SUBSCRIPTION_PLAN_OPTIONS } from '@/types/settings'

export function SettingsDebug() {
  const settings = useSettingsStore()

  if (process.env.NODE_ENV === 'production') {
    return null
  }

  const currentPlan = SUBSCRIPTION_PLAN_OPTIONS.find(plan => plan.value === settings.subscriptionPlan)

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 bg-background/95 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Settings Debug</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <span>Theme:</span>
          <Badge variant="outline">{settings.theme}</Badge>
        </div>
                  <div className="flex items-center gap-2">
            <span>Color Scheme:</span>
            <Badge variant="outline">{settings.colorScheme}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span>Theme:</span>
            <Badge variant="outline">{settings.theme}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span>User Mode:</span>
            <Badge variant="outline">{settings.userMode}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span>Sidebar:</span>
          <Badge variant="outline">{settings.sidebarCollapsed ? 'Collapsed' : 'Expanded'}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span>Compact Mode:</span>
          <Badge variant="outline">{settings.compactMode ? 'On' : 'Off'}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span>Subscription Plan:</span>
          <Badge variant="outline">{currentPlan?.label || settings.subscriptionPlan || 'None'}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span>Subscription Status:</span>
          <Badge variant="outline">{settings.subscriptionStatus || 'None'}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span>Access Permissions:</span>
          <Badge variant="outline">{settings.accessPermissions?.join(', ') || 'None'}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span>Loading:</span>
          <Badge variant="outline">{settings.isLoading ? 'Yes' : 'No'}</Badge>
        </div>
        {settings.error && (
          <div className="flex items-center gap-2">
            <span>Error:</span>
            <Badge variant="destructive">{settings.error}</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
