"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { useLoadingStore } from "@/store/use-loading-store"
import { usePathname } from "next/navigation"

export function LoadingScreen() {
  const { isLoading, setIsLoading } = useLoadingStore()
  const pathname = usePathname()
  const [show, setShow] = useState(false)

  // Listen for route changes
  useEffect(() => {
    if (isLoading) {
      setShow(true)
    } else {
      // When loading stops, hide the loading screen after a short delay
      const timer = setTimeout(() => {
        setShow(false)
      }, 300) // Shorter delay for better UX

      return () => clearTimeout(timer)
    }
  }, [isLoading, pathname])

  // Auto-hide loading screen after 3 seconds maximum
  useEffect(() => {
    if (show) {
      const maxTimer = setTimeout(() => {
        setShow(false)
        setIsLoading(false)
      }, 3000) // Maximum 3 seconds

      return () => clearTimeout(maxTimer)
    }
  }, [show, setIsLoading])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative flex flex-col items-center gap-6">
        {/* Main loader */}
        <div className="relative">
          <div className="relative animate-spin">
            <Loader2 className="h-12 w-12 text-primary" />
          </div>
          <div
            className="absolute inset-0 rounded-full animate-spin"
            style={{
              border: "2px solid transparent",
              borderTopColor: "hsl(var(--primary))",
              borderRightColor: "hsl(var(--primary))",
              animationDirection: "reverse",
              animationDuration: "2s",
            }}
          />
        </div>

        {/* Progress bar */}
        <div className="relative h-1 w-48 overflow-hidden rounded-full bg-muted">
          <div
            className="absolute inset-0 bg-primary animate-pulse"
            style={{
              animationDuration: "1s",
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse"
            style={{
              width: "50%",
              animationDuration: "1.5s",
            }}
          />
        </div>
      </div>
    </div>
  )
}