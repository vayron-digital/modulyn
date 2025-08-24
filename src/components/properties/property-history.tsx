"use client"

import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface PropertyHistoryProps {
  id: string
}

// This would normally come from an API
const history = [
  {
    id: "1",
    date: new Date(2024, 2, 1),
    type: "Listed",
    price: 750000,
    agent: "Sarah Johnson",
    description: "Property listed for sale",
  },
  {
    id: "2",
    date: new Date(2024, 2, 5),
    type: "Price Change",
    price: 725000,
    agent: "Sarah Johnson",
    description: "Price reduced by $25,000",
  },
  {
    id: "3",
    date: new Date(2024, 2, 8),
    type: "Showing",
    agent: "Michael Brown",
    description: "Property showing conducted",
    attendees: 3,
  },
  {
    id: "4",
    date: new Date(2024, 2, 10),
    type: "Offer",
    price: 715000,
    agent: "Emily Davis",
    description: "Offer received and under review",
  },
  {
    id: "5",
    date: new Date(2024, 2, 12),
    type: "Inspection",
    agent: "John Wilson",
    description: "Home inspection completed",
  },
]

export function PropertyHistory({ id }: PropertyHistoryProps) {
  return (
    <div className="p-6">
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-border" />
        <div className="space-y-8">
          {history.map((event) => (
            <div key={event.id} className="relative pl-8">
              <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-primary bg-background" />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        event.type === "Listed"
                          ? "default"
                          : event.type === "Price Change"
                          ? "warning"
                          : event.type === "Showing"
                          ? "secondary"
                          : event.type === "Offer"
                          ? "success"
                          : "outline"
                      }
                    >
                      {event.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(event.date, { addSuffix: true })}
                    </span>
                  </div>
                  {"price" in event && event.price && (
                    <span className="font-medium">
                      ${event.price.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-sm">{event.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Agent: {event.agent}</span>
                  {"attendees" in event && (
                    <>
                      <span>•</span>
                      <span>Attendees: {event.attendees}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
