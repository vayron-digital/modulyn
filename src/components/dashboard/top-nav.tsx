"use client"

import { Bell, Menu, Search, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/dashboard/user-nav"
import { useSettingsSidebar } from "@/store/use-settings-store"

export function TopNav() {
  const { sidebarCollapsed, toggleSidebar } = useSettingsSidebar()

  return (
    <header className="border-b bg-card px-4 lg:px-6">
      <div className="flex h-16 items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="hidden lg:flex"
          onClick={toggleSidebar}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen className="h-6 w-6" />
          ) : (
            <PanelLeftClose className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <div className="flex-1 flex gap-4 lg:gap-6">
          <form className="hidden lg:flex-1 lg:flex max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8"
              />
            </div>
          </form>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>

          <UserNav />
        </div>
      </div>
    </header>
  )
}