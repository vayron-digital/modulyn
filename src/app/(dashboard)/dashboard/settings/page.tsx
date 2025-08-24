"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { AccountSettings } from "@/components/settings/account-settings"
import { NewAppearanceSettings as AppearanceSettings } from "@/components/settings/new-appearance-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { SecuritySettings } from "@/components/settings/security-settings"
import { BillingSettings } from "@/components/settings/billing-settings"
import { IntegrationSettings } from "@/components/settings/integration-settings"
import { TeamSettings } from "@/components/settings/team-settings"
import {
  User,
  Settings2,
  Palette,
  Bell,
  Shield,
  CreditCard,
  Link,
  Users,
} from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
      component: ProfileSettings,
    },
    {
      id: "account",
      label: "Account",
      icon: Settings2,
      component: AccountSettings,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: Palette,
      component: AppearanceSettings,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      component: NotificationSettings,
    },
    {
      id: "security",
      label: "Security",
      icon: Shield,
      component: SecuritySettings,
    },
    {
      id: "billing",
      label: "Billing",
      icon: CreditCard,
      component: BillingSettings,
    },
    {
      id: "integrations",
      label: "Integrations",
      icon: Link,
      component: IntegrationSettings,
    },
    {
      id: "team",
      label: "Team",
      icon: Users,
      component: TeamSettings,
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      <Separator />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <Tabs
            defaultValue={activeTab}
            onValueChange={setActiveTab}
            orientation="vertical"
            className="w-full"
          >
            <TabsList className="flex flex-col items-start justify-start">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="w-full justify-start"
                >
                  <tab.icon className="mr-2 h-4 w-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </aside>
        <div className="flex-1">
          <Tabs value={activeTab} orientation="horizontal">
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">{tab.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your {tab.label.toLowerCase()} settings and preferences
                  </p>
                </div>
                <Separator />
                <tab.component />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
