"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd"
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
  MoreHorizontal,
} from "lucide-react"
import { addDays, format, startOfDay } from "date-fns"

interface CalendarKanbanProps {
  currentDate: Date
  onDateSelect: (date: Date) => void
}

// This would normally come from an API
const initialEvents = [
  {
    id: "1",
    title: "Property Viewing",
    type: "property",
    startTime: addDays(startOfDay(new Date()), 2).getTime() + 10 * 3600000,
    endTime: addDays(startOfDay(new Date()), 2).getTime() + 11 * 3600000,
    location: "123 Main Street",
    status: "upcoming",
    icon: Home,
    color: "text-green-500",
    priority: "high",
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
    startTime: addDays(startOfDay(new Date()), 2).getTime() + 14 * 3600000,
    endTime: addDays(startOfDay(new Date()), 2).getTime() + 15 * 3600000,
    location: "Office",
    status: "in_progress",
    icon: Building2,
    color: "text-blue-500",
    priority: "medium",
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
    startTime: addDays(startOfDay(new Date()), 3).getTime() + 11 * 3600000,
    endTime: addDays(startOfDay(new Date()), 3).getTime() + 12 * 3600000,
    location: "Virtual",
    status: "completed",
    icon: Users,
    color: "text-orange-500",
    priority: "low",
    attendees: [
      {
        name: "David Lee",
        image: "https://api.dicebear.com/7.x/avatars/svg?seed=David",
      },
    ],
  },
]

const columns = [
  {
    id: "upcoming",
    title: "Upcoming",
    icon: Calendar,
    color: "text-blue-500",
  },
  {
    id: "in_progress",
    title: "In Progress",
    icon: Clock,
    color: "text-orange-500",
  },
  {
    id: "completed",
    title: "Completed",
    icon: CheckCircle2,
    color: "text-green-500",
  },
]

export function CalendarKanban({
  currentDate,
  onDateSelect,
}: CalendarKanbanProps) {
  const [events, setEvents] = useState(initialEvents)

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const newEvents = events.map((event) => {
      if (event.id === draggableId) {
        return {
          ...event,
          status: destination.droppableId,
        }
      }
      return event
    })

    setEvents(newEvents)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive"
      case "medium":
        return "text-warning"
      case "low":
        return "text-success"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid h-[600px] grid-cols-3 gap-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex flex-col rounded-lg border bg-muted/50"
          >
            <div className="flex items-center gap-2 border-b bg-background p-4">
              <column.icon className={`h-5 w-5 ${column.color}`} />
              <h3 className="font-semibold">{column.title}</h3>
              <Badge variant="secondary" className="ml-auto">
                {events.filter((event) => event.status === column.id).length}
              </Badge>
            </div>

            <Droppable droppableId={column.id}>
              {(provided) => (
                <ScrollArea
                  className="flex-1 p-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <div className="space-y-4">
                    {events
                      .filter((event) => event.status === column.id)
                      .map((event, index) => {
                        const Icon = event.icon

                        return (
                          <Draggable
                            key={event.id}
                            draggableId={event.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="rounded-lg border bg-background p-4 shadow-sm"
                              >
                                <div className="flex items-center gap-2">
                                  <Icon className={`h-4 w-4 ${event.color}`} />
                                  <span className="font-medium">
                                    {event.title}
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className={getPriorityColor(event.priority)}
                                  >
                                    {event.priority}
                                  </Badge>
                                </div>

                                <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>
                                      {format(
                                        new Date(event.startTime),
                                        "MMM d, h:mm a"
                                      )}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>{event.location}</span>
                                  </div>
                                </div>

                                <div className="mt-2 flex items-center justify-between">
                                  <div className="flex -space-x-2">
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
                                  <button className="rounded-md p-1 hover:bg-muted">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )
                      })}
                    {provided.placeholder}
                  </div>
                </ScrollArea>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}
