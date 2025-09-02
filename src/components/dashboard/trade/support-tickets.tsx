"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const tickets = [
  {
    id: 1,
    user: {
      email: "jessica.smith123@example.com",
      name: "Jessica Smith",
      avatar: null,
    },
    subject: "Login Issue",
    status: "OPEN",
    priority: "HIGH",
  },
  {
    id: 2,
    user: {
      email: "david.jones456@gmailkummy.com",
      name: "David Jones",
      avatar: null,
    },
    subject: "Billing Inquiry",
    status: "PENDING",
    priority: "MEDIUM",
  },
  {
    id: 3,
    user: {
      email: "emily.wilson789@ficticiousmail.net",
      name: "Emily Wilson",
      avatar: null,
    },
    subject: "Product Malfunction",
    status: "CLOSED",
    priority: "LOW",
  },
  {
    id: 4,
    user: {
      email: "andrew.johnson22@phonyinbox.org",
      name: "Andrew Johnson",
      avatar: null,
    },
    subject: "Feature Request",
    status: "OPEN",
    priority: "MEDIUM",
  },
]

type TicketStatus = "All" | "Open" | "Pending" | "Closed"

export function SupportTickets() {
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus>("All")

  const filteredTickets = tickets.filter(ticket => {
    if (selectedStatus === "All") return true
    return ticket.status === selectedStatus.toUpperCase()
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-green-100 text-green-700"
      case "PENDING":
        return "bg-yellow-100 text-yellow-700"
      case "CLOSED":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-700"
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700"
      case "LOW":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {["All", "Open", "Pending", "Closed"].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status as TicketStatus)}
            className={cn(
              "px-3 py-1 text-sm rounded-full transition-colors",
              selectedStatus === status
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                {ticket.user.avatar && (
                  <AvatarImage src={ticket.user.avatar} alt={ticket.user.name} />
                )}
                <AvatarFallback>
                  {ticket.user.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-gray-900">{ticket.user.email}</div>
                <div className="text-sm text-gray-500">{ticket.subject}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={getStatusColor(ticket.status)}>
                {ticket.status}
              </Badge>
              <Badge variant="secondary" className={getPriorityColor(ticket.priority)}>
                {ticket.priority}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
