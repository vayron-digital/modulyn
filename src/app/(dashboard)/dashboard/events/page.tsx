"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventList } from "@/components/events/event-list"
import { EventCalendar } from "@/components/events/event-calendar"
import { EventFilters } from "@/components/events/event-filters"
import { EventActions } from "@/components/events/event-actions"
import { EventStats } from "@/components/events/event-stats"

export default function EventsPage() {
  const [view, setView] = useState<"list" | "calendar">("list")

  return (
    <div className="space-y-6 p-1">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Events</h2>
          <p className="text-muted-foreground">
            Manage your organization's events and registrations.
          </p>
        </div>
        <EventActions />
      </div>

      <EventStats />

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle>Event Management</CardTitle>
            <Tabs
              value={view}
              onValueChange={(value) => setView(value as "list" | "calendar")}
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <EventFilters />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {view === "list" ? <EventList /> : <EventCalendar />}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
