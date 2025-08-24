"use client"

import { Building2, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSettingsUserMode, useSettingsAccess } from "@/store/use-settings-store"
import { toast } from "react-hot-toast"

export function ModeToggle() {
  const { userMode, setUserMode } = useSettingsUserMode()
  const { canSwitchToMode, hasAccess } = useSettingsAccess()

  const handleModeChange = (newMode: 'trade' | 'crm') => {
    if (canSwitchToMode(newMode)) {
      setUserMode(newMode)
      toast.success(`Switched to ${newMode === 'trade' ? 'Trade Association Management' : 'Real Estate CRM'}`)
    } else {
      const solutionName = newMode === 'trade' ? 'Trade Association Management' : 'Real Estate CRM'
      toast.error(`Your plan doesn't include ${solutionName}. Please upgrade to access this feature.`)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {userMode === "trade" ? (
            <Building2 className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Home className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle mode</span>
        </Button>
      </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleModeChange("trade")}
                      className={!canSwitchToMode("trade") ? "opacity-50 cursor-not-allowed" : ""}
                    >
                      <Building2 className="mr-2 h-4 w-4" />
                      <span>Trade Association</span>
                      {!canSwitchToMode("trade") && (
                        <span className="ml-auto text-xs text-muted-foreground">
                          Not included in your plan
                        </span>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleModeChange("crm")}
                      className={!canSwitchToMode("crm") ? "opacity-50 cursor-not-allowed" : ""}
                    >
                      <Home className="mr-2 h-4 w-4" />
                      <span>Real Estate CRM</span>
                      {!canSwitchToMode("crm") && (
                        <span className="ml-auto text-xs text-muted-foreground">
                          Not included in your plan
                        </span>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
    </DropdownMenu>
  )
}
