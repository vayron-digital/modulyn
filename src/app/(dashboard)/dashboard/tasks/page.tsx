"use client"

import { useState } from "react"
import { TaskStats } from "@/components/tasks/task-stats"
import { TaskCalendar } from "@/components/tasks/task-calendar"
import { TaskList } from "@/components/tasks/task-list"
import { TaskFilters } from "@/components/tasks/task-filters"
import { TaskActions } from "@/components/tasks/task-actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

export default function TasksPage() {
  const [view, setView] = useState<"list" | "calendar">("list")

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tasks</h2>
          <p className="text-muted-foreground">
            Manage and track all your tasks in one place
          </p>
        </div>
        <TaskActions />
      </div>

      <TaskStats />

      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-1">
          <Tabs defaultValue={view} onValueChange={(v) => setView(v as "list" | "calendar")}>
            <div className="flex items-center justify-between border-b px-4">
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              </TabsList>
              <TaskFilters />
            </div>
            <TabsContent value="list" className="p-0">
              <TaskList />
            </TabsContent>
            <TabsContent value="calendar" className="p-0">
              <TaskCalendar />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
