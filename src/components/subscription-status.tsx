"use client"

import { Crown, Lock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSettingsSubscription } from "@/store/use-settings-store"
import { SUBSCRIPTION_PLAN_OPTIONS } from "@/types/settings"

interface SubscriptionStatusProps {
  showUpgradePrompt?: boolean
  className?: string
}

export function SubscriptionStatus({ showUpgradePrompt = false, className }: SubscriptionStatusProps) {
  const { subscriptionPlan, subscriptionStatus, accessPermissions } = useSettingsSubscription()

  const currentPlan = SUBSCRIPTION_PLAN_OPTIONS.find(plan => plan.value === subscriptionPlan)
  const isActive = subscriptionStatus === 'active'
  const hasBothAccess = accessPermissions.includes('crm') && accessPermissions.includes('ams')

  if (!currentPlan) {
    return null
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-yellow-500" />
          <CardTitle className="text-sm">Subscription Status</CardTitle>
        </div>
        <CardDescription className="text-xs">
          {currentPlan.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Current Plan:</span>
          <Badge variant={isActive ? "default" : "secondary"}>
            {currentPlan.label}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status:</span>
          <Badge variant={isActive ? "default" : "destructive"}>
            {subscriptionStatus}
          </Badge>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">Access:</span>
          <div className="flex gap-2">
            <Badge variant={accessPermissions.includes('crm') ? "default" : "secondary"}>
              Real Estate CRM
            </Badge>
            <Badge variant={accessPermissions.includes('ams') ? "default" : "secondary"}>
              Trade Association
            </Badge>
          </div>
        </div>

        {showUpgradePrompt && !hasBothAccess && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg border">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Upgrade to access both solutions
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Get access to both Real Estate CRM and Trade Association Management with our premium plans.
                </p>
                <Button size="sm" className="mt-2">
                  View Plans
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface AccessRestrictedProps {
  requiredSolution: 'crm' | 'ams'
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AccessRestricted({ requiredSolution, children, fallback }: AccessRestrictedProps) {
  const { hasAccess } = useSettingsSubscription()

  if (hasAccess(requiredSolution)) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  const solutionName = requiredSolution === 'crm' ? 'Real Estate CRM' : 'Trade Association Management'

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Lock className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
      <p className="text-muted-foreground mb-4 max-w-md">
        Your current plan doesn't include {solutionName}. Please upgrade your subscription to access this feature.
      </p>
      <Button>
        Upgrade Plan
      </Button>
    </div>
  )
}
