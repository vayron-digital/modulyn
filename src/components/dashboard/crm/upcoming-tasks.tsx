"use client"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { CalendarClock, Home, Phone, Users } from "lucide-react"

const tasks = [
  {
    id: "1",
    title: "Property Viewing",
    description: "123 Main Street with the Smith family",
    dueDate: new Date(2024, 2, 15, 14, 30),
    priority: "high",
    type: "viewing",
    completed: false,
  },
  {
    id: "2",
    title: "Follow-up Call",
    description: "Discuss offer with potential buyer",
    dueDate: new Date(2024, 2, 15, 16, 0),
    priority: "medium",
    type: "call",
    completed: false,
  },
  {
    id: "3",
    title: "Open House",
    description: "456 Park Avenue",
    dueDate: new Date(2024, 2, 16, 13, 0),
    priority: "high",
    type: "open-house",
    completed: false,
  },
  {
    id: "4",
    title: "Client Meeting",
    description: "Review market analysis with the Johnsons",
    dueDate: new Date(2024, 2, 16, 15, 30),
    priority: "medium",
    type: "meeting",
    completed: false,
  },
]

export function UpcomingTasks() {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-start space-x-4 rounded-md border p-3"
        >
          <Checkbox
            id={task.id}
            className="mt-1"
            checked={task.completed}
          />
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              {task.type === "viewing" && (
                <Home className="h-4 w-4 text-blue-500" />
              )}
              {task.type === "call" && (
                <Phone className="h-4 w-4 text-green-500" />
              )}
              {task.type === "open-house" && (
                <Home className="h-4 w-4 text-purple-500" />
              )}
              {task.type === "meeting" && (
                <Users className="h-4 w-4 text-orange-500" />
              )}
              <p className="text-sm font-medium leading-none">
                {task.title}
              </p>
              <Badge
                variant={
                  task.priority === "high"
                    ? "destructive"
                    : task.priority === "medium"
                    ? "warning"
                    : "secondary"
                }
              >
                {task.priority}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {task.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarClock className="h-3 w-3" />
              <span>
                {format(task.dueDate, "MMM d, h:mm a")}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
