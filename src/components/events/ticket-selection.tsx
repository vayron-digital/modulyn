"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface TicketSelectionProps {
  eventId: string
  onComplete: (data: { tickets: SelectedTicket[] }) => void
}

interface TicketType {
  id: string
  name: string
  description: string
  price: number
  available: number
  features: string[]
}

interface SelectedTicket {
  id: string
  quantity: number
  price: number
}

// This would normally come from an API
const ticketTypes: TicketType[] = [
  {
    id: "1",
    name: "Early Bird",
    description: "Limited time offer with special pricing",
    price: 199,
    available: 25,
    features: [
      "Access to all sessions",
      "Conference materials",
      "Networking lunch",
    ],
  },
  {
    id: "2",
    name: "Regular",
    description: "Standard conference ticket",
    price: 299,
    available: 180,
    features: [
      "Access to all sessions",
      "Conference materials",
      "Networking lunch",
      "Welcome reception",
    ],
  },
  {
    id: "3",
    name: "VIP",
    description: "Premium conference experience",
    price: 499,
    available: 30,
    features: [
      "Access to all sessions",
      "Conference materials",
      "Networking lunch",
      "Welcome reception",
      "VIP lounge access",
      "Exclusive networking dinner",
      "Priority seating",
    ],
  },
]

export function TicketSelection({ eventId, onComplete }: TicketSelectionProps) {
  const [selectedTickets, setSelectedTickets] = useState<{
    [key: string]: number
  }>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleQuantityChange = (ticketId: string, quantity: number) => {
    const ticket = ticketTypes.find((t) => t.id === ticketId)
    if (!ticket) return

    if (quantity > ticket.available) {
      toast.error(`Only ${ticket.available} tickets available`)
      return
    }

    setSelectedTickets((prev) => ({
      ...prev,
      [ticketId]: Math.max(0, quantity),
    }))
  }

  const totalAmount = Object.entries(selectedTickets).reduce(
    (total, [ticketId, quantity]) => {
      const ticket = ticketTypes.find((t) => t.id === ticketId)
      return total + (ticket?.price || 0) * quantity
    },
    0
  )

  const handleContinue = async () => {
    const tickets = Object.entries(selectedTickets)
      .filter(([_, quantity]) => quantity > 0)
      .map(([ticketId, quantity]) => {
        const ticket = ticketTypes.find((t) => t.id === ticketId)!
        return {
          id: ticketId,
          quantity,
          price: ticket.price,
        }
      })

    if (tickets.length === 0) {
      toast.error("Please select at least one ticket")
      return
    }

    try {
      setIsLoading(true)
      // Here you would normally validate the ticket selection with your API
      // const response = await fetch("/api/events/${eventId}/validate-tickets", {
      //   method: "POST",
      //   body: JSON.stringify({ tickets }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onComplete({ tickets })
    } catch (error) {
      toast.error("Failed to validate ticket selection")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {ticketTypes.map((ticket) => (
          <Card key={ticket.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>{ticket.name}</CardTitle>
                  <CardDescription>{ticket.description}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${ticket.price}</div>
                  <Badge variant="secondary">
                    {ticket.available} available
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                {ticket.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-2 w-full">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleQuantityChange(
                      ticket.id,
                      (selectedTickets[ticket.id] || 0) - 1
                    )
                  }
                  disabled={!selectedTickets[ticket.id]}
                >
                  -
                </Button>
                <Input
                  type="number"
                  min="0"
                  max={ticket.available}
                  value={selectedTickets[ticket.id] || 0}
                  onChange={(e) =>
                    handleQuantityChange(ticket.id, parseInt(e.target.value) || 0)
                  }
                  className="w-20 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleQuantityChange(
                      ticket.id,
                      (selectedTickets[ticket.id] || 0) + 1
                    )
                  }
                  disabled={
                    (selectedTickets[ticket.id] || 0) >= ticket.available
                  }
                >
                  +
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="text-lg font-semibold">
          Total: ${totalAmount.toFixed(2)}
        </div>
        <Button onClick={handleContinue} disabled={isLoading}>
          {isLoading ? "Validating..." : "Continue"}
        </Button>
      </div>
    </div>
  )
}

