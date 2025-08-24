"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Building2,
  Home,
  Users,
  FileText,
  Clock,
  MapPin,
  CalendarIcon,
} from "lucide-react"
import { addDays, format, isSameDay } from "date-fns"

interface CalendarViewProps {
  view: "month" | "week" | "day" | "agenda"
  currentDate: Date
  onDateSelect: (date: Date) => void
}

// This would normally come from an API
const events = [
  {
    id: "1",
    title: "Property Viewing",
    type: "property",
    startTime: addDays(new Date(), 2).getTime() + 10 * 3600000, // 10 AM
    endTime: addDays(new Date(), 2).getTime() + 11 * 3600000, // 11 AM
    location: "123 Main Street",
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
    startTime: addDays(new Date(), 3).getTime() + 14 * 3600000, // 2 PM
    endTime: addDays(new Date(), 3).getTime() + 15 * 3600000, // 3 PM
    location: "Office",
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
]

export function CalendarView({ view, currentDate, onDateSelect }: CalendarViewProps) {
  const getEventsForDate = (date: Date) => {
    return events.filter((event) =>
      isSameDay(new Date(event.startTime), date) ||
      isSameDay(new Date(event.endTime), date)
    )
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
                className="mx-auto -mb-2 flex h-5 w-5 items-center justify-center rounded-full p-0"
              >
                {dayEvents.length}
              </Badge>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80" align="start">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span className="font-medium">
                {format(day, "MMMM d, yyyy")}
              </span>
            </div>
            <div className="divide-y">
              {dayEvents.map((event) => {
                const Icon = event.icon

                return (
                  <div key={event.id} className="py-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${event.color}`} />
                      <span className="font-medium">{event.title}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {format(new Date(event.startTime), "h:mm a")} -{" "}
                          {format(new Date(event.endTime), "h:mm a")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex -space-x-2">
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
          </div>
        </HoverCardContent>
      </HoverCard>
    )
  }

  return (
    <Calendar
      mode="single"
      selected={currentDate}
      onSelect={(date) => date && onDateSelect(date)}
      className="rounded-md border"
      components={{
        DayContent: ({ date }) => getDayContent(date),
      }}
    />
  )
}