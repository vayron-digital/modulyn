"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function ActiveFilters() {
  // This would be managed by your filter state management
  const activeFilters = [
    { id: 1, type: "status", value: "Active" },
    { id: 2, type: "tag", value: "VIP" },
    { id: 3, type: "location", value: "New York" },
  ]

  return (
    <div className="flex items-center gap-2">
      {activeFilters.map((filter) => (
        <Badge
          key={filter.id}
          variant="secondary"
          className="bg-timberwolf/30 text-black_olive hover:bg-timberwolf/40"
        >
          {filter.type}: {filter.value}
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 ml-2 hover:bg-transparent"
            onClick={() => {
              // Remove filter logic here
            }}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove {filter.type} filter</span>
          </Button>
        </Badge>
      ))}
      {activeFilters.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="text-black_olive/60 hover:text-black_olive hover:bg-transparent"
          onClick={() => {
            // Clear all filters logic here
          }}
        >
          Clear all
        </Button>
      )}
    </div>
  )
}
