"use client"

import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  )
}
