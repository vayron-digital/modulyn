"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  CalendarClock,
  Users,
  Building2,
  Home,
  FileText,
} from "lucide-react"

// This would normally come from an API
const stats = {
  overview: {
    total: 45,
    completed: 28,
    inProgress: 12,
    overdue: 5,
    completion: 62,
  },
  categories: [
    {
      name: "Deals",
      icon: Building2,
      total: 15,
      completed: 8,
      color: "text-blue-500",
    },
    {
      name: "Properties",
      icon: Home,
      total: 12,
      completed: 9,
      color: "text-green-500",
    },
    {
      name: "Clients",
      icon: Users,
      total: 10,
      completed: 7,
      color: "text-purple-500",
    },
    {
      name: "Documents",
      icon: FileText,
      total: 8,
      completed: 4,
      color: "text-orange-500",
    },
  ],
}

export function TaskStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total Tasks</span>
            </div>
            <span className="text-2xl font-bold">{stats.overview.total}</span>
          </div>
          <div className="mt-4">
            <Progress value={stats.overview.completion} className="h-2" />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            {stats.overview.completion}% completion rate
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Completed</span>
            </div>
            <span className="text-2xl font-bold">{stats.overview.completed}</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Today</div>
              <div className="text-sm font-medium">5</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">This Week</div>
              <div className="text-sm font-medium">12</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">In Progress</span>
            </div>
            <span className="text-2xl font-bold">{stats.overview.inProgress}</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">High Priority</div>
              <div className="text-sm font-medium">4</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Due Today</div>
              <div className="text-sm font-medium">3</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium">Overdue</span>
            </div>
            <span className="text-2xl font-bold">{stats.overview.overdue}</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">1-2 Days</div>
              <div className="text-sm font-medium">3</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">3+ Days</div>
              <div className="text-sm font-medium">2</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-4">
        <CardContent className="p-6">
          <h3 className="mb-4 font-medium">Tasks by Category</h3>
          <div className="grid gap-6 md:grid-cols-4">
            {stats.categories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center gap-2">
                  <category.icon className={`h-4 w-4 ${category.color}`} />
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {category.completed} of {category.total} completed
                  </span>
                  <span className="font-medium">
                    {Math.round((category.completed / category.total) * 100)}%
                  </span>
                </div>
                <Progress
                  value={(category.completed / category.total) * 100}
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
