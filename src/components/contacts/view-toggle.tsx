"use client"

import { useState } from "react"
import { LayoutGrid, LayoutList, Table2 } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

type ViewMode = "list" | "grid" | "table"

export function ViewToggle() {
  const [view, setView] = useState<ViewMode>("table")

  return (
    <ToggleGroup type="single" value={view} onValueChange={(value) => value && setView(value as ViewMode)}>
      <ToggleGroupItem 
        value="table" 
        aria-label="Table view"
        className="data-[state=on]:bg-flame data-[state=on]:text-white"
      >
        <Table2 className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="list" 
        aria-label="List view"
        className="data-[state=on]:bg-flame data-[state=on]:text-white"
      >
        <LayoutList className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="grid" 
        aria-label="Grid view"
        className="data-[state=on]:bg-flame data-[state=on]:text-white"
      >
        <LayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
