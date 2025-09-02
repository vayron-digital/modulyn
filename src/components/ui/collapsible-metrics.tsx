"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CollapsibleMetricsProps {
  children: React.ReactNode
  title?: string
  description?: string
  isCollapsed: boolean
  onToggle: () => void
  className?: string
}

export function CollapsibleMetrics({
  children,
  title = "Metrics Overview",
  description,
  isCollapsed,
  onToggle,
  className
}: CollapsibleMetricsProps) {
  const [isClient, setIsClient] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className={cn("rounded-lg border border-timberwolf bg-floral_white overflow-hidden", className)}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-black_olive">{title}</h2>
            {description && (
              <p className="mt-1 text-sm text-black_olive/60">{description}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-black_olive/60 hover:text-black_olive hover:bg-timberwolf/20"
          >
            {isCollapsed ? (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                <span className="text-sm">Show Metrics</span>
              </>
            ) : (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                <span className="text-sm">Hide Metrics</span>
              </>
            )}
          </Button>
        </div>
        
        <div
          className={cn(
            "grid transition-all duration-200",
            isCollapsed ? "hidden" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
