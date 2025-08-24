"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Calendar,
  Clock,
  MoreHorizontal,
  Plus,
  AlertCircle,
  CheckCircle2,
  Circle,
  Edit,
  Trash,
  User,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface LeadTasksProps {
  id: string
}

// This would normally come from an API
const tasks = [
  {
    id: "1",
    title: "Schedule property viewing",
    description: "Arrange viewing for 123 Main Street",
    status: "pending",
    priority: "high",
    dueDate: new Date(2024, 3, 1),
    assignedTo: {
      name: "Sarah Johnson",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
    },
  },
  {
    id: "2",
    title: "Follow up on mortgage pre-approval",
    description: "Check status with ABC Bank",
    status: "in_progress",
    priority: "medium",
    dueDate: new Date(2024, 3, 5),
    assignedTo: {
      name: "Michael Brown",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Michael",
    },
  },
  {
    id: "3",
    title: "Send property recommendations",
    description: "Based on updated criteria",
    status: "completed",
    priority: "low",
    dueDate: new Date(2024, 2, 15),
    completedAt: new Date(2024, 2, 14),
    assignedTo: {
      name: "Emily Davis",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Emily",
    },
  },
]

export function LeadTasks({ id }: LeadTasksProps) {
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Tasks</h3>
          <p className="text-sm text-muted-foreground">
            Manage tasks related to this lead
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`rounded-lg border p-4 ${
              task.status === "completed" || completedTasks.includes(task.id)
                ? "bg-muted"
                : ""
            }`}
          >
            <div className="flex items-start gap-4">
              <Checkbox
                checked={
                  task.status === "completed" || completedTasks.includes(task.id)
                }
                onCheckedChange={() => handleTaskComplete(task.id)}
                className="mt-1"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-medium ${
                        task.status === "completed" ||
                        completedTasks.includes(task.id)
                          ? "text-muted-foreground line-through"
                          : ""
                      }`}
                    >
                      {task.title}
                    </span>
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
                    <Badge
                      variant={
                        task.status === "completed" ||
                        completedTasks.includes(task.id)
                          ? "success"
                          : task.status === "in_progress"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {task.status === "completed" ||
                      completedTasks.includes(task.id)
                        ? "Completed"
                        : task.status === "in_progress"
                        ? "In Progress"
                        : "Pending"}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Task
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        Reassign
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Task
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p
                  className={`text-sm ${
                    task.status === "completed" ||
                    completedTasks.includes(task.id)
                      ? "text-muted-foreground"
                      : ""
                  }`}
                >
                  {task.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Due {formatDistanceToNow(task.dueDate, { addSuffix: true })}</span>
                  </div>
                  {(task.status === "completed" ||
                    completedTasks.includes(task.id)) &&
                    task.completedAt && (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>
                            Completed{" "}
                            {formatDistanceToNow(task.completedAt, {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </>
                    )}
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={task.assignedTo.image}
                        alt={task.assignedTo.name}
                      />
                      <AvatarFallback>
                        {task.assignedTo.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>Assigned to {task.assignedTo.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
