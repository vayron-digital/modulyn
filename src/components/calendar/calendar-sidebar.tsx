"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  Building2,
  Home,
  Users,
  FileText,
  ChevronRight,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface CalendarSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

// This would normally come from an API
const upcomingEvents = [
  {
    id: "1",
    title: "Property Viewing",
    type: "property",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    location: "123 Main Street",
    icon: Home,
    color: "text-green-500",
  },
  {
    id: "2",
    title: "Contract Review",
    type: "deal",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    location: "Office",
    icon: Building2,
    color: "text-blue-500",
  },
  {
    id: "3",
    title: "Client Meeting",
    type: "client",
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    location: "Virtual",
    icon: Users,
    color: "text-orange-500",
  },
]

const upcomingTasks = [
  {
    id: "1",
    title: "Update Listing Photos",
    type: "task",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    priority: "high",
    icon: FileText,
    color: "text-destructive",
  },
  {
    id: "2",
    title: "Follow up with Client",
    type: "task",
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    priority: "medium",
    icon: FileText,
    color: "text-warning",
  },
]

const reminders = [
  {
    id: "1",
    title: "Prepare Property Documents",
    description: "Get all documents ready for the viewing",
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
  },
  {
    id: "2",
    title: "Send Follow-up Emails",
    description: "Check in with potential buyers",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  },
]

export function CalendarSidebar({
  className,
  ...props
}: CalendarSidebarProps) {
  return (
    <div className={cn("pb-12", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Calendar</h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Month View
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Week View
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Day View
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              Agenda View
            </Button>
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Upcoming Events</h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1">
              {upcomingEvents.map((event) => (
                <Button
                  key={event.id}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <div className="flex w-full items-center">
                    <event.icon className={`mr-2 h-4 w-4 ${event.color}`} />
                    <div className="flex-1 truncate">
                      <div className="truncate">{event.title}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{event.location}</span>
                        <span>•</span>
                        <span>
                          {formatDistanceToNow(event.date, { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="ml-2 h-4 w-4 text-muted-foreground" />
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Upcoming Tasks</h2>
          <ScrollArea className="h-[200px] px-1">
            <div className="space-y-1">
              {upcomingTasks.map((task) => (
                <Button
                  key={task.id}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <div className="flex w-full items-center">
                    <task.icon className={`mr-2 h-4 w-4 ${task.color}`} />
                    <div className="flex-1 truncate">
                      <div className="truncate">{task.title}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge
                          variant="outline"
                          className={task.color}
                        >
                          {task.priority}
                        </Badge>
                        <span>
                          {formatDistanceToNow(task.dueDate, { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="ml-2 h-4 w-4 text-muted-foreground" />
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Reminders</h2>
          <ScrollArea className="h-[200px] px-1">
            <div className="space-y-1">
              {reminders.map((reminder) => (
                <Button
                  key={reminder.id}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <div className="flex w-full items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div className="flex-1 truncate">
                      <div className="truncate">{reminder.title}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="truncate">{reminder.description}</span>
                        <span>•</span>
                        <span>
                          {formatDistanceToNow(reminder.date, { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="ml-2 h-4 w-4 text-muted-foreground" />
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
