"use client"

import { Providers } from "@/components/providers/providers"
import { SideNav } from "@/components/dashboard/side-nav"
import { TopNav } from "@/components/dashboard/top-nav"
import { NavigationWrapper } from "@/components/navigation/navigation-wrapper"
import { SettingsDebug } from "@/components/settings/settings-debug"
import { useSettingsSidebar } from "@/store/use-settings-store"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { sidebarCollapsed } = useSettingsSidebar()

  return (
    <Providers>
      <NavigationWrapper>
        <div className="flex min-h-screen">
          <SideNav />
          <div className={cn(
            "flex-1 flex flex-col transition-all duration-300",
            sidebarCollapsed ? "lg:ml-8" : "lg:ml-8"
          )}>
            <TopNav />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
        <SettingsDebug />
      </NavigationWrapper>
    </Providers>
  )
}