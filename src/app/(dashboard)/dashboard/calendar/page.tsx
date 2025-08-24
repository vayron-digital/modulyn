"use client"

import { useState } from "react"
import { CalendarView } from "@/components/calendar/calendar-view"
import { CalendarTimeline } from "@/components/calendar/calendar-timeline"
import { CalendarKanban } from "@/components/calendar/calendar-kanban"
import { CalendarFilters } from "@/components/calendar/calendar-filters"
import { CalendarActions } from "@/components/calendar/calendar-actions"
import { CalendarStats } from "@/components/calendar/calendar-stats"
import { CalendarSidebar } from "@/components/calendar/calendar-sidebar"
import { CalendarSearch } from "@/components/calendar/calendar-search"
import { CalendarMiniMap } from "@/components/calendar/calendar-minimap"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CalendarIcon,
  LayoutGrid,
  ListTodo,
  KanbanSquare,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react"
import { format } from "date-fns"

type ViewMode = "calendar" | "timeline" | "kanban"
type CalendarMode = "month" | "week" | "day" | "agenda"

export default function CalendarPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("calendar")
  const [calendarMode, setCalendarMode] = useState<CalendarMode>("month")
  const [currentDate, setCurrentDate] = useState(new Date())

  const handlePrevious = () => {
    const newDate = new Date(currentDate)
    switch (calendarMode) {
      case "month":
        newDate.setMonth(currentDate.getMonth() - 1)
        break
      case "week":
        newDate.setDate(currentDate.getDate() - 7)
        break
      case "day":
        newDate.setDate(currentDate.getDate() - 1)
        break
    }
    setCurrentDate(newDate)
  }

  const handleNext = () => {
    const newDate = new Date(currentDate)
    switch (calendarMode) {
      case "month":
        newDate.setMonth(currentDate.getMonth() + 1)
        break
      case "week":
        newDate.setDate(currentDate.getDate() + 7)
        break
      case "day":
        newDate.setDate(currentDate.getDate() + 1)
        break
    }
    setCurrentDate(newDate)
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-6 p-6">
      <div className="hidden w-80 flex-col space-y-6 lg:flex">
        <CalendarSearch />
        <CalendarSidebar />
        <CalendarMiniMap
          currentDate={currentDate}
          onDateSelect={setCurrentDate}
        />
      </div>

      <div className="flex-1 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Calendar</h2>
            <p className="text-muted-foreground">
              Manage your schedule and view upcoming events
            </p>
          </div>
          <CalendarActions />
        </div>

        <CalendarStats />

        <Card>
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={handleToday}
              >
                Today
              </Button>
              <div className="ml-4 text-lg font-semibold">
                {format(currentDate, "MMMM yyyy")}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Tabs
                value={viewMode}
                onValueChange={(v) => setViewMode(v as ViewMode)}
              >
                <TabsList>
                  <TabsTrigger value="calendar">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Calendar
                  </TabsTrigger>
                  <TabsTrigger value="timeline">
                    <ListTodo className="mr-2 h-4 w-4" />
                    Timeline
                  </TabsTrigger>
                  <TabsTrigger value="kanban">
                    <KanbanSquare className="mr-2 h-4 w-4" />
                    Kanban
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {viewMode === "calendar" && (
                <Tabs
                  value={calendarMode}
                  onValueChange={(v) => setCalendarMode(v as CalendarMode)}
                >
                  <TabsList>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="day">Day</TabsTrigger>
                    <TabsTrigger value="agenda">Agenda</TabsTrigger>
                  </TabsList>
                </Tabs>
              )}

              <CalendarFilters />
            </div>
          </div>

          <div className="p-4">
            {viewMode === "calendar" && (
              <CalendarView
                view={calendarMode}
                currentDate={currentDate}
                onDateSelect={setCurrentDate}
              />
            )}
            {viewMode === "timeline" && (
              <CalendarTimeline
                currentDate={currentDate}
                onDateSelect={setCurrentDate}
              />
            )}
            {viewMode === "kanban" && (
              <CalendarKanban
                currentDate={currentDate}
                onDateSelect={setCurrentDate}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}