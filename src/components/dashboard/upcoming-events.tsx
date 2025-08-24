import { CalendarDays } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const events = [
  {
    id: 1,
    title: "Annual Trade Conference 2024",
    date: "March 15-17, 2024",
    location: "Chicago, IL",
    type: "Conference",
    registrations: 245,
  },
  {
    id: 2,
    title: "Industry Leadership Summit",
    date: "March 25, 2024",
    location: "Virtual",
    type: "Webinar",
    registrations: 180,
  },
  {
    id: 3,
    title: "Regulatory Compliance Workshop",
    date: "April 5, 2024",
    location: "New York, NY",
    type: "Workshop",
    registrations: 75,
  },
  {
    id: 4,
    title: "Networking Mixer",
    date: "April 12, 2024",
    location: "Los Angeles, CA",
    type: "Networking",
    registrations: 120,
  },
]

export function UpcomingEvents() {
  return (
    <div className="space-y-8">
      {events.map((event) => (
        <div key={event.id} className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{event.title}</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                {event.date} • {event.location}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="secondary">
              {event.registrations} registered
            </Badge>
            <span className="text-xs font-medium">{event.type}</span>
          </div>
        </div>
      ))}
    </div>
  )
}