"use client"

import { Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSettingsColorScheme } from "@/store/use-settings-store"
import { COLOR_SCHEME_OPTIONS } from "@/types/settings"
import { toast } from "react-hot-toast"

export function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useSettingsColorScheme()

  const handleColorSchemeChange = (newColorScheme: string) => {
    setColorScheme(newColorScheme as any)
    toast.success(`Color scheme changed to ${newColorScheme}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            <div 
              className="h-3 w-3 rounded-full border border-border"
              style={{ backgroundColor: COLOR_SCHEME_OPTIONS.find(opt => opt.value === colorScheme)?.color }}
            />
          </div>
          <span className="sr-only">Toggle color scheme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {COLOR_SCHEME_OPTIONS.map((option) => (
          <DropdownMenuItem 
            key={option.value}
            onClick={() => handleColorSchemeChange(option.value)}
            className="flex items-center gap-2"
          >
            <div 
              className="h-3 w-3 rounded-full border border-border"
              style={{ backgroundColor: option.color }}
            />
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
