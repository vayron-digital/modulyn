"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarDays, MapPin, Users } from "lucide-react"

// This would normally come from an API
const events = [
  {
    id: "1",
    title: "Annual Trade Conference 2024",
    type: "conference",
    startDate: new Date(2024, 2, 15),
    endDate: new Date(2024, 2, 17),
    location: "Chicago, IL",
    capacity: 500,
    registrations: 245,
    status: "upcoming",
  },
  {
    id: "2",
    title: "Industry Leadership Summit",
    type: "summit",
    startDate: new Date(2024, 2, 25),
    endDate: new Date(2024, 2, 25),
    location: "Virtual",
    capacity: 1000,
    registrations: 180,
    status: "upcoming",
  },
  {
    id: "3",
    title: "Regulatory Compliance Workshop",
    type: "workshop",
    startDate: new Date(2024, 3, 5),
    endDate: new Date(2024, 3, 5),
    location: "New York, NY",
    capacity: 100,
    registrations: 75,
    status: "upcoming",
  },
  {
    id: "4",
    title: "Networking Mixer",
    type: "networking",
    startDate: new Date(2024, 3, 12),
    endDate: new Date(2024, 3, 12),
    location: "Los Angeles, CA",
    capacity: 200,
    registrations: 120,
    status: "upcoming",
  },
]

export function EventCalendar() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
      components={{
        DayContent: ({ date: dayDate, ...props }) => {
          const dayEvents = events.filter(
            (event) =>
              dayDate >= event.startDate &&
              dayDate <= event.endDate
          )

          if (dayEvents.length === 0) {
            return (
              <div
                className="h-9 w-9 p-0 font-normal"
              >
                <span className="flex h-full w-full items-center justify-center">
                  {dayDate.getDate()}
                </span>
              </div>
            )
          }

          return (
            <HoverCard>
              <HoverCardTrigger asChild>
                <div
                  className="relative h-9 w-9 p-0 font-normal"
                >
                  <span className="flex h-full w-full items-center justify-center">
                    {dayDate.getDate()}
                  </span>
                  <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
                    {dayEvents.slice(0, 3).map((event, i) => (
                      <div
                        key={event.id}
                        className="h-1 w-1 rounded-full bg-primary"
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="h-1 w-1 rounded-full bg-primary opacity-50" />
                    )}
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent
                align="start"
                className="w-80"
                side="right"
              >
                <div className="space-y-2">
                  <p className="text-sm">
                    {format(dayDate, "MMMM d, yyyy")}
                  </p>
                  <div className="space-y-4">
                    {dayEvents.map((event) => (
                      <div key={event.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {event.title}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CalendarDays className="h-3 w-3" />
                              <span>
                                {format(event.startDate, "h:mm a")}
                                {event.startDate.toDateString() !==
                                  event.endDate.toDateString() && (
                                  <span>
                                    {" "}
                                    - {format(event.endDate, "MMM d")}
                                  </span>
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="h-3 w-3" />
                              <span>
                                {event.registrations} / {event.capacity}
                              </span>
                            </div>
                          </div>
                          <Badge variant="outline">
                            {event.type}
                          </Badge>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() =>
                            router.push(`/dashboard/events/${event.id}`)
                          }
                        >
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          )
        },
      }}
    />
  )
}
