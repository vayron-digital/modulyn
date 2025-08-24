"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Building2,
  Home,
  FileText,
} from "lucide-react"

// This would normally come from an API
const stats = {
  today: {
    total: 8,
    completed: 3,
    upcoming: 5,
    breakdown: {
      events: 3,
      tasks: 2,
      properties: 2,
      deals: 1,
    },
  },
  week: {
    total: 32,
    completed: 12,
    upcoming: 20,
    breakdown: {
      events: 12,
      tasks: 8,
      properties: 7,
      deals: 5,
    },
  },
  month: {
    total: 125,
    completed: 45,
    upcoming: 80,
    breakdown: {
      events: 45,
      tasks: 35,
      properties: 25,
      deals: 20,
    },
  },
}

export function CalendarStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.today.total}</div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-success" />
              <span>{stats.today.completed} completed</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-warning" />
              <span>{stats.today.upcoming} upcoming</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Week</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.week.total}</div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-success" />
              <span>{stats.week.completed} completed</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-warning" />
              <span>{stats.week.upcoming} upcoming</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.month.total}</div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-success" />
              <span>{stats.month.completed} completed</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-warning" />
              <span>{stats.month.upcoming} upcoming</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">By Category</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-purple-500" />
                <span className="text-xs">Events</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {stats.week.breakdown.events}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3 text-orange-500" />
                <span className="text-xs">Tasks</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {stats.week.breakdown.tasks}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Home className="h-3 w-3 text-green-500" />
                <span className="text-xs">Properties</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {stats.week.breakdown.properties}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Building2 className="h-3 w-3 text-blue-500" />
                <span className="text-xs">Deals</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {stats.week.breakdown.deals}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
