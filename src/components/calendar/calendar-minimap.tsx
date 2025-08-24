"use client"

import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Building2,
  Home,
  Users,
  FileText,
  Calendar as CalendarIcon,
} from "lucide-react"
import { isSameDay, format } from "date-fns"

interface CalendarMiniMapProps {
  currentDate: Date
  onDateSelect: (date: Date) => void
}

// This would normally come from an API
const events = [
  {
    id: "1",
    title: "Property Viewing",
    type: "property",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    icon: Home,
    color: "text-green-500",
  },
  {
    id: "2",
    title: "Contract Review",
    type: "deal",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    icon: Building2,
    color: "text-blue-500",
  },
  {
    id: "3",
    title: "Client Meeting",
    type: "client",
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    icon: Users,
    color: "text-orange-500",
  },
]

export function CalendarMiniMap({
  currentDate,
  onDateSelect,
}: CalendarMiniMapProps) {
  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date))
  }

  const getDayContent = (day: Date) => {
    const dayEvents = getEventsForDate(day)
    if (dayEvents.length === 0) return null

    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
              <Badge
                variant="secondary"
                className="mx-auto -mb-2 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px]"
              >
                {dayEvents.length}
              </Badge>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-64 p-2"
          side="right"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span className="font-medium">
                {format(day, "MMMM d, yyyy")}
              </span>
            </div>
            <div className="space-y-1">
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-2 rounded-md p-1 text-sm hover:bg-muted"
                >
                  <event.icon className={`h-4 w-4 ${event.color}`} />
                  <span>{event.title}</span>
                </div>
              ))}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    )
  }

  return (
    <Card className="p-4">
      <Calendar
        mode="single"
        selected={currentDate}
        onSelect={(date) => date && onDateSelect(date)}
        className="w-full rounded-md border"
        components={{
          DayContent: ({ date }) => getDayContent(date),
        }}
      />
    </Card>
  )
}
