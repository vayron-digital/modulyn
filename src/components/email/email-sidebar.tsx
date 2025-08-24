"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Inbox,
  Send,
  File,
  Trash2,
  AlertOctagon,
  Star,
  Mail,
  Paperclip,
  Tag,
  Users,
  Archive,
  Clock,
} from "lucide-react"

interface EmailSidebarProps {
  view: string
  onViewChange: (view: string) => void
  filter: string
  onFilterChange: (filter: string) => void
}

// This would normally come from an API
const folders = [
  {
    id: "inbox",
    name: "Inbox",
    icon: Inbox,
    count: 12,
  },
  {
    id: "sent",
    name: "Sent",
    icon: Send,
    count: 0,
  },
  {
    id: "drafts",
    name: "Drafts",
    icon: File,
    count: 3,
  },
  {
    id: "trash",
    name: "Trash",
    icon: Trash2,
    count: 0,
  },
  {
    id: "spam",
    name: "Spam",
    icon: AlertOctagon,
    count: 1,
  },
]

const filters = [
  {
    id: "all",
    name: "All",
    icon: Mail,
  },
  {
    id: "unread",
    name: "Unread",
    icon: Mail,
    count: 8,
  },
  {
    id: "flagged",
    name: "Flagged",
    icon: Star,
    count: 3,
  },
  {
    id: "attachments",
    name: "With Attachments",
    icon: Paperclip,
    count: 5,
  },
]

const labels = [
  {
    id: "clients",
    name: "Clients",
    color: "bg-blue-500",
  },
  {
    id: "properties",
    name: "Properties",
    color: "bg-green-500",
  },
  {
    id: "deals",
    name: "Deals",
    color: "bg-orange-500",
  },
  {
    id: "team",
    name: "Team",
    color: "bg-purple-500",
  },
]

export function EmailSidebar({
  view,
  onViewChange,
  filter,
  onFilterChange,
}: EmailSidebarProps) {
  return (
    <div className="flex flex-col gap-2 p-4 pt-0">
      <div className="space-y-1">
        <h3 className="px-2 text-lg font-semibold tracking-tight">Folders</h3>
        <div className="space-y-1">
          {folders.map((folder) => (
            <Button
              key={folder.id}
              variant={view === folder.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => onViewChange(folder.id)}
            >
              <folder.icon className="mr-2 h-4 w-4" />
              {folder.name}
              {folder.count > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-auto flex h-6 w-6 items-center justify-center rounded-full"
                >
                  {folder.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-1">
        <h3 className="px-2 text-lg font-semibold tracking-tight">Filters</h3>
        <div className="space-y-1">
          {filters.map((f) => (
            <Button
              key={f.id}
              variant={filter === f.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => onFilterChange(f.id)}
            >
              <f.icon className="mr-2 h-4 w-4" />
              {f.name}
              {f.count !== undefined && f.count > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-auto flex h-6 w-6 items-center justify-center rounded-full"
                >
                  {f.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-1">
        <h3 className="px-2 text-lg font-semibold tracking-tight">Labels</h3>
        <div className="space-y-1">
          {labels.map((label) => (
            <Button
              key={label.id}
              variant="ghost"
              className="w-full justify-start"
            >
              <span
                className={cn(
                  "mr-2 h-2 w-2 rounded-full",
                  label.color
                )}
              />
              {label.name}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-1">
        <h3 className="px-2 text-lg font-semibold tracking-tight">Views</h3>
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Team Inbox
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Archive className="mr-2 h-4 w-4" />
            Archived
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Clock className="mr-2 h-4 w-4" />
            Scheduled
          </Button>
        </div>
      </div>
    </div>
  )
}
