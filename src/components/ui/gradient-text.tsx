"use client"

import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  from?: string
  via?: string
  to?: string
}

export function GradientText({
  children,
  className,
  from = "from-indigo-500",
  via = "via-purple-500",
  to = "to-pink-500",
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        from,
        via,
        to,
        className
      )}
    >
      {children}
    </span>
  )
}
