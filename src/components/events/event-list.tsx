"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Users, Edit, Trash } from "lucide-react"
import { format } from "date-fns"

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

export function EventList() {
  const router = useRouter()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Event</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Registrations</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell>
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-muted-foreground">
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="text-sm">
                <p>{format(event.startDate, "MMM d, yyyy")}</p>
                {event.startDate.toDateString() !== event.endDate.toDateString() && (
                  <p className="text-muted-foreground">
                    to {format(event.endDate, "MMM d, yyyy")}
                  </p>
                )}
              </div>
            </TableCell>
            <TableCell>{event.location}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>
                  {event.registrations} / {event.capacity}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  event.status === "upcoming"
                    ? "default"
                    : event.status === "in_progress"
                    ? "warning"
                    : "secondary"
                }
              >
                {event.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => router.push(`/dashboard/events/${event.id}`)}
                  >
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/dashboard/events/${event.id}/registrations`)
                    }
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Manage Registrations
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/dashboard/events/${event.id}/edit`)
                    }
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Event
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Event
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
