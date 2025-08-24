"use client"

import { NavLink } from "@/components/ui/nav-link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSettingsUserMode, useSettingsSidebar } from "@/store/use-settings-store"
import {
  BarChart,
  Building2,
  Calendar,
  Contact2,
  FileText,
  Home,
  LayoutDashboard,
  Mail,
  MessageSquare,
  PieChart,
  Settings,
  Users,
} from "lucide-react"

const tradeNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Members",
    href: "/dashboard/members",
    icon: Users,
  },
  {
    title: "Events",
    href: "/dashboard/events",
    icon: Calendar,
  },
  {
    title: "Tasks",
    href: "/dashboard/tasks",
    icon: MessageSquare,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Email",
    href: "/dashboard/email",
    icon: Mail,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: PieChart,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

const crmNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Properties",
    href: "/dashboard/properties",
    icon: Home,
  },
  {
    title: "Contacts",
    href: "/dashboard/contacts",
    icon: Contact2,
  },
  {
    title: "Leads",
    href: "/dashboard/leads",
    icon: Users,
  },
  {
    title: "Deals",
    href: "/dashboard/deals",
    icon: FileText,
  },
  {
    title: "Tasks",
    href: "/dashboard/tasks",
    icon: MessageSquare,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Email",
    href: "/dashboard/email",
    icon: Mail,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: PieChart,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function SideNav() {
  const pathname = usePathname()
  const { userMode } = useSettingsUserMode()
  const { sidebarCollapsed } = useSettingsSidebar()

  const navItems = userMode === "trade" ? tradeNavItems : crmNavItems

  return (
    <ScrollArea className={cn(
      "border-r bg-muted/10 transition-all duration-300",
      sidebarCollapsed ? "w-16" : "w-64",
      "hidden lg:block"
    )}>
      <div className="flex h-full flex-col justify-between py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className={cn(
              "mb-2 px-4 text-lg font-semibold tracking-tight transition-all duration-300",
              sidebarCollapsed && "text-center text-sm"
            )}>
              {sidebarCollapsed ? (
                userMode === "trade" ? "TA" : "CRM"
              ) : (
                userMode === "trade" ? "Trade Association" : "Real Estate CRM"
              )}
            </h2>
                          {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  prefetch
                >
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={cn(
                      "w-full transition-all duration-200",
                      sidebarCollapsed ? "justify-center px-2" : "justify-start",
                      pathname === item.href
                        ? "bg-muted hover:bg-muted/80"
                        : "hover:bg-muted/50 hover:translate-x-1"
                    )}
                    title={sidebarCollapsed ? item.title : undefined}
                  >
                    <item.icon className={cn(
                      "h-4 w-4",
                      sidebarCollapsed ? "" : "mr-2"
                    )} />
                    {!sidebarCollapsed && item.title}
                  </Button>
                </NavLink>
              ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}