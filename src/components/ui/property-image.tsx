"use client"

import { Building2 } from "lucide-react"

interface PropertyImageProps {
  className?: string
}

export function PropertyImage({ className = "" }: PropertyImageProps) {
  return (
    <div className={`relative w-full h-full bg-timberwolf/20 ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <Building2 className="h-12 w-12 text-black_olive/20" />
      </div>
    </div>
  )
}
