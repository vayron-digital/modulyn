"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Building2,
  Home,
  Users,
  FileText,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowDown,
  Link,
} from "lucide-react"
import { addDays, format, isSameDay } from "date-fns"

// This would normally come from an API
const tasks = [
  {
    id: "1",
    title: "Schedule property viewing",
    description: "Arrange viewing for 123 Main Street with potential buyers",
    category: "properties",
    priority: "high",
    status: "in_progress",
    dueDate: addDays(new Date(), 2),
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
    dueDate: new Date(),
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
    dueDate: addDays(new Date(), -2),
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
    dueDate: addDays(new Date(), 4),
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

export function TaskCalendar() {
  const [date, setDate] = useState<Date>(new Date())

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => isSameDay(task.dueDate, date))
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

  const getDayContent = (day: Date) => {
    const tasksForDay = getTasksForDate(day)
    if (tasksForDay.length === 0) return null

    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
              <Badge
                variant="secondary"
                className="mx-auto -mb-2 flex h-5 w-5 items-center justify-center rounded-full p-0"
              >
                {tasksForDay.length}
              </Badge>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-96" align="start">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span className="font-medium">
                {format(day, "MMMM d, yyyy")}
              </span>
            </div>
            <div className="divide-y">
              {tasksForDay.map((task) => {
                const Icon = task.related.icon
                const StatusIcon =
                  task.status === "completed"
                    ? CheckCircle2
                    : task.status === "in_progress"
                    ? Clock
                    : AlertCircle
                const hasDependencies = task.dependencies.length > 0
                const hasDependents = task.dependents.length > 0

                return (
                  <div key={task.id} className="py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <StatusIcon
                          className={`h-4 w-4 ${
                            task.status === "completed"
                              ? "text-success"
                              : task.status === "in_progress"
                              ? "text-warning"
                              : "text-muted-foreground"
                          }`}
                        />
                        <span className="font-medium">{task.title}</span>
                      </div>
                      {(hasDependencies || hasDependents) && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Link className="h-3 w-3" />
                          {task.dependencies.length + task.dependents.length}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon className="h-4 w-4" />
                          <span>{task.related.title}</span>
                        </div>
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={task.assignee.image}
                            alt={task.assignee.name}
                          />
                          <AvatarFallback>
                            {task.assignee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      {hasDependencies && (
                        <div className="space-y-1">
                          <div className="text-xs font-medium">Prerequisites:</div>
                          {getDependencyChain(task.id, "dependencies").map((dep) => (
                            <div
                              key={dep.id}
                              className="flex items-center gap-1 text-xs text-muted-foreground"
                            >
                              <ArrowRight className="h-3 w-3" />
                              <span>{dep.title}</span>
                              <Badge
                                variant={
                                  dep.status === "completed"
                                    ? "success"
                                    : "secondary"
                                }
                                className="ml-1"
                              >
                                {dep.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}
                      {hasDependents && (
                        <div className="space-y-1">
                          <div className="text-xs font-medium">Dependent Tasks:</div>
                          {getDependencyChain(task.id, "dependents").map((dep) => (
                            <div
                              key={dep.id}
                              className="flex items-center gap-1 text-xs text-muted-foreground"
                            >
                              <ArrowDown className="h-3 w-3" />
                              <span>{dep.title}</span>
                              <Badge
                                variant={
                                  dep.status === "completed"
                                    ? "success"
                                    : "secondary"
                                }
                                className="ml-1"
                              >
                                {dep.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    )
  }

  return (
    <div className="p-6">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="mx-auto max-w-fit rounded-md border"
        components={{
          DayContent: ({ date }) => getDayContent(date),
        }}
      />
    </div>
  )
}