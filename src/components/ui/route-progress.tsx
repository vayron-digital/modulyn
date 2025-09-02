"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export function RouteProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    // Start loading
    setIsLoading(true)
    setProgress(0)
    setShowLoader(true)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 100)

    // Complete loading
    const completeTimeout = setTimeout(() => {
      setProgress(100)
      setIsLoading(false)

      // Hide after completion
      const hideTimeout = setTimeout(() => {
        setShowLoader(false)
        setProgress(0)
      }, 200)

      return () => clearTimeout(hideTimeout)
    }, 500)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(completeTimeout)
    }
  }, [pathname, searchParams])

  if (!showLoader) return null

  return (
    <>
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-flame/10">
        <div
          className={cn(
            "h-full bg-flame transition-all duration-300 ease-in-out",
            isLoading ? "opacity-100" : "opacity-0"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Centered Loader */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm transition-opacity duration-300",
          isLoading && progress < 90 ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="relative flex flex-col items-center gap-4">
          <div className="relative">
            <Loader2 className="h-8 w-8 animate-spin text-flame" />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid transparent",
                borderTopColor: "var(--flame)",
                borderRightColor: "var(--flame)",
                animation: "spin 1s linear infinite reverse",
              }}
            />
          </div>
          <div className="text-sm font-medium text-flame/80">
            Loading...
          </div>
        </div>
      </div>
    </>
  )
}
