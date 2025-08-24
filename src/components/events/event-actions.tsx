"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Upload, Download, MoreVertical } from "lucide-react"

export function EventActions() {
  const router = useRouter()

  return (
    <div className="flex items-center gap-2">
      <Button
        className="gap-2"
        onClick={() => router.push("/dashboard/events/new")}
      >
        <Plus className="h-4 w-4" />
        Create Event
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <MoreVertical className="h-4 w-4" />
            More Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="gap-2">
            <Upload className="h-4 w-4" />
            Import Events
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Download className="h-4 w-4" />
            Export Events
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
