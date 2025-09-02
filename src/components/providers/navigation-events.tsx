"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ""}`
    
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: "smooth" })

    // You can add analytics tracking here
    console.log(`📍 Navigation to: ${url}`)
  }, [pathname, searchParams])

  return null
}
