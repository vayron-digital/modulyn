"use client"

import { useState } from "react"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Building2,
  Home,
  Users,
  FileText,
  MoreHorizontal,
  Calendar,
  AlertCircle,
  Clock,
  CheckCircle2,
  Edit,
  Trash,
  MessageSquare,
  Link,
  ArrowRight,
  ArrowDown,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// This would normally come from an API
const tasks = [
  {
    id: "1",
    title: "Schedule property viewing",
    description: "Arrange viewing for 123 Main Street with potential buyers",
    category: "properties",
    priority: "high",
    status: "in_progress",
    dueDate: new Date(2024, 2, 20),
    assignee: {
      name: "Sarah Johnson",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
    },
    related: {
      type: "property",
      title: "123 Main Street",
      icon: Home,
    },
    dependencies: [],
    dependents: ["2"],
  },
  {
    id: "2",
    title: "Review purchase agreement",
    description: "Review and sign purchase agreement for Oak Avenue deal",
    category: "deals",
    priority: "high",
    status: "not_started",
    dueDate: new Date(2024, 2, 18),
    assignee: {
      name: "Michael Brown",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Michael",
    },
    related: {
      type: "deal",
      title: "456 Oak Avenue",
      icon: Building2,
    },
    dependencies: ["1"],
    dependents: ["3"],
  },
  {
    id: "3",
    title: "Follow up with client",
    description: "Check in with John Smith about property requirements",
    category: "clients",
    priority: "medium",
    status: "completed",
    dueDate: new Date(2024, 2, 15),
    assignee: {
      name: "Emma Wilson",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Emma",
    },
    related: {
      type: "client",
      title: "John Smith",
      icon: Users,
    },
    dependencies: ["2"],
    dependents: ["4"],
  },
  {
    id: "4",
    title: "Update listing documents",
    description: "Update property listing documents with new photos",
    category: "documents",
    priority: "low",
    status: "in_progress",
    dueDate: new Date(2024, 2, 22),
    assignee: {
      name: "Sarah Johnson",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
    },
    related: {
      type: "document",
      title: "Listing Documents",
      icon: FileText,
    },
    dependencies: ["3"],
    dependents: [],
  },
]

export function TaskList() {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)

  const toggleTask = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    )
  }

  const isOverdue = (date: Date) => {
    return date < new Date()
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive"
      case "medium":
        return "text-warning"
      case "low":
        return "text-success"
      default:
        return "text-muted-foreground"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "deals":
        return Building2
      case "properties":
        return Home
      case "clients":
        return Users
      case "documents":
        return FileText
      default:
        return FileText
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle2
      case "in_progress":
        return Clock
      case "not_started":
        return AlertCircle
      default:
        return AlertCircle
    }
  }

  const getTaskById = (id: string) => {
    return tasks.find((task) => task.id === id)
  }

  const getDependencyChain = (taskId: string, type: "dependencies" | "dependents") => {
    const chain: typeof tasks = []
    const task = getTaskById(taskId)
    if (!task) return chain

    const ids = type === "dependencies" ? task.dependencies : task.dependents
    ids.forEach((id) => {
      const relatedTask = getTaskById(id)
      if (relatedTask) {
        chain.push(relatedTask)
      }
    })

    return chain
  }

  return (
    <div className="divide-y">
      {tasks.map((task) => {
        const Icon = getCategoryIcon(task.category)
        const StatusIcon = getStatusIcon(task.status)
        const RelatedIcon = task.related.icon
        const hasDependencies = task.dependencies.length > 0
        const hasDependents = task.dependents.length > 0

        return (
          <div
            key={task.id}
            className="flex items-start gap-4 p-4 hover:bg-muted/50"
          >
            <Checkbox
              checked={selectedTasks.includes(task.id)}
              onCheckedChange={() => toggleTask(task.id)}
            />

            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{task.title}</span>
                <Badge
                  variant={task.status === "completed" ? "success" : "secondary"}
                >
                  <StatusIcon className="mr-1 h-3 w-3" />
                  {task.status === "completed"
                    ? "Completed"
                    : task.status === "in_progress"
                    ? "In Progress"
                    : "Not Started"}
                </Badge>
                <Badge variant="outline" className={getPriorityColor(task.priority)}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
                {(hasDependencies || hasDependents) && (
                  <Dialog open={selectedTaskId === task.id} onOpenChange={(open) => setSelectedTaskId(open ? task.id : null)}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Link className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Task Dependencies</DialogTitle>
                        <DialogDescription>
                          View task dependencies and dependent tasks
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4 space-y-4">
                        {hasDependencies && (
                          <div className="space-y-2">
                            <h4 className="font-medium">Prerequisites</h4>
                            <div className="rounded-lg border">
                              {getDependencyChain(task.id, "dependencies").map((dep) => (
                                <div
                                  key={dep.id}
                                  className="flex items-center gap-2 border-b p-2 last:border-0"
                                >
                                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                  <span>{dep.title}</span>
                                  <Badge
                                    variant={
                                      dep.status === "completed"
                                        ? "success"
                                        : "secondary"
                                    }
                                  >
                                    {dep.status}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {hasDependents && (
                          <div className="space-y-2">
                            <h4 className="font-medium">Dependent Tasks</h4>
                            <div className="rounded-lg border">
                              {getDependencyChain(task.id, "dependents").map((dep) => (
                                <div
                                  key={dep.id}
                                  className="flex items-center gap-2 border-b p-2 last:border-0"
                                >
                                  <ArrowDown className="h-4 w-4 text-muted-foreground" />
                                  <span>{dep.title}</span>
                                  <Badge
                                    variant={
                                      dep.status === "completed"
                                        ? "success"
                                        : "secondary"
                                    }
                                  >
                                    {dep.status}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              <p className="text-sm text-muted-foreground">{task.description}</p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4" />
                  <span>{task.category.charAt(0).toUpperCase() + task.category.slice(1)}</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <RelatedIcon className="h-4 w-4" />
                  <span>{task.related.title}</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span
                    className={
                      isOverdue(task.dueDate) ? "text-destructive" : undefined
                    }
                  >
                    Due {formatDistanceToNow(task.dueDate, { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={task.assignee.image} alt={task.assignee.name} />
                <AvatarFallback>
                  {task.assignee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

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
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Add Comment
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Task
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )
      })}
    </div>
  )
}