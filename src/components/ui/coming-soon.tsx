"use client"

import { LucideIcon, Construction } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface ComingSoonProps {
  title: string
  description?: string
  icon?: LucideIcon
  className?: string
}

export function ComingSoon({
  title,
  description = "This feature is coming soon. Stay tuned for updates!",
  icon: Icon,
  className
}: ComingSoonProps) {
  return (
    <div className={cn(
      "flex items-center justify-center min-h-[400px] p-4",
      className
    )}>
      <Card className="w-full max-w-lg border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-6">
          <div className="relative">
            {Icon && (
              <Icon className="h-12 w-12 text-muted-foreground/50" />
            )}
            <Construction className="h-5 w-5 text-primary absolute -right-2 -top-2" />
          </div>
          <div className="space-y-2 max-w-sm">
            <h2 className="text-xl font-medium tracking-tight text-muted-foreground">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground/80">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
