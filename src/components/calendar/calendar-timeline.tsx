"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Building2,
  Home,
  Users,
  FileText,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import {
  addDays,
  format,
  isSameDay,
  startOfDay,
  eachHourOfInterval,
} from "date-fns"

interface CalendarTimelineProps {
  currentDate: Date
  onDateSelect: (date: Date) => void
}

// This would normally come from an API
const events = [
  {
    id: "1",
    title: "Property Viewing",
    type: "property",
    startTime: addDays(startOfDay(new Date()), 2).getTime() + 10 * 3600000, // 10 AM
    endTime: addDays(startOfDay(new Date()), 2).getTime() + 11 * 3600000, // 11 AM
    location: "123 Main Street",
    status: "confirmed",
    icon: Home,
    color: "text-green-500",
    attendees: [
      {
        name: "John Smith",
        image: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
      },
      {
        name: "Sarah Johnson",
        image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
      },
    ],
  },
  {
    id: "2",
    title: "Contract Review",
    type: "deal",
    startTime: addDays(startOfDay(new Date()), 2).getTime() + 14 * 3600000, // 2 PM
    endTime: addDays(startOfDay(new Date()), 2).getTime() + 15 * 3600000, // 3 PM
    location: "Office",
    status: "pending",
    icon: Building2,
    color: "text-blue-500",
    attendees: [
      {
        name: "Michael Brown",
        image: "https://api.dicebear.com/7.x/avatars/svg?seed=Michael",
      },
      {
        name: "Emma Wilson",
        image: "https://api.dicebear.com/7.x/avatars/svg?seed=Emma",
      },
    ],
  },
  {
    id: "3",
    title: "Client Meeting",
    type: "client",
    startTime: addDays(startOfDay(new Date()), 3).getTime() + 11 * 3600000, // 11 AM
    endTime: addDays(startOfDay(new Date()), 3).getTime() + 12 * 3600000, // 12 PM
    location: "Virtual",
    status: "confirmed",
    icon: Users,
    color: "text-orange-500",
    attendees: [
      {
        name: "David Lee",
        image: "https://api.dicebear.com/7.x/avatars/svg?seed=David",
      },
    ],
  },
]

export function CalendarTimeline({
  currentDate,
  onDateSelect,
}: CalendarTimelineProps) {
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(
    null
  )

  const days = Array.from({ length: 7 }, (_, i) => addDays(currentDate, i))
  const hours = eachHourOfInterval({
    start: startOfDay(currentDate),
    end: addDays(startOfDay(currentDate), 1),
  })

  const getEventsForDay = (date: Date) => {
    return events.filter((event) =>
      isSameDay(new Date(event.startTime), date)
    )
  }

  const getEventPosition = (event: typeof events[0]) => {
    const start = new Date(event.startTime)
    const end = new Date(event.endTime)
    const top = (start.getHours() + start.getMinutes() / 60) * 100
    const height =
      (end.getHours() + end.getMinutes() / 60 - start.getHours() - start.getMinutes() / 60) * 100

    return { top, height }
  }

  return (
    <div className="flex h-[600px] flex-col">
      <div className="flex border-b">
        <div className="w-16 shrink-0 border-r" />
        {days.map((day) => (
          <div
            key={day.getTime()}
            className="flex-1 border-r px-2 py-1 text-center"
          >
            <div className="font-medium">
              {format(day, "EEE")}
            </div>
            <div className="text-sm text-muted-foreground">
              {format(day, "MMM d")}
            </div>
          </div>
        ))}
      </div>

      <ScrollArea
        ref={setScrollContainer}
        className="flex-1"
        scrollHideDelay={0}
      >
        <div className="relative flex" style={{ height: "1440px" }}>
          <div className="w-16 shrink-0 border-r">
            {hours.map((hour) => (
              <div
                key={hour.getTime()}
                className="relative h-[100px] border-b text-xs"
              >
                <div className="absolute -top-2.5 right-2 text-muted-foreground">
                  {format(hour, "h a")}
                </div>
              </div>
            ))}
          </div>

          {days.map((day) => {
            const dayEvents = getEventsForDay(day)

            return (
              <div
                key={day.getTime()}
                className="relative flex-1 border-r"
              >
                {hours.map((hour) => (
                  <div
                    key={hour.getTime()}
                    className="h-[100px] border-b border-dashed"
                  />
                ))}

                {dayEvents.map((event) => {
                  const { top, height } = getEventPosition(event)
                  const Icon = event.icon

                  return (
                    <div
                      key={event.id}
                      className="absolute left-1 right-1 rounded-md border bg-background p-2 shadow-sm"
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${event.color}`} />
                        <span className="font-medium">{event.title}</span>
                        <Badge
                          variant={
                            event.status === "confirmed"
                              ? "success"
                              : "secondary"
                          }
                          className="ml-auto"
                        >
                          {event.status}
                        </Badge>
                      </div>
                      <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {format(new Date(event.startTime), "h:mm a")}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <div className="mt-1 flex -space-x-2">
                        {event.attendees.map((attendee) => (
                          <Avatar
                            key={attendee.name}
                            className="h-6 w-6 border-2 border-background"
                          >
                            <AvatarImage
                              src={attendee.image}
                              alt={attendee.name}
                            />
                            <AvatarFallback>
                              {attendee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
