"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Mail, Phone, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface PropertyLeadsProps {
  id: string
}

// This would normally come from an API
const leads = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    status: "Hot",
    source: "Website",
    lastContact: new Date(2024, 2, 1),
    notes: "Very interested, planning to make an offer",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
  },
  {
    id: "2",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "(555) 234-5678",
    status: "Warm",
    source: "Zillow",
    lastContact: new Date(2024, 2, 5),
    notes: "Scheduled for second viewing",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Emma",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "(555) 345-6789",
    status: "Cold",
    source: "Referral",
    lastContact: new Date(2024, 2, 8),
    notes: "Initial inquiry, no follow-up yet",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Michael",
  },
  {
    id: "4",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    phone: "(555) 456-7890",
    status: "Hot",
    source: "Open House",
    lastContact: new Date(2024, 2, 10),
    notes: "Pre-approved, very motivated buyer",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
  },
]

export function PropertyLeads({ id }: PropertyLeadsProps) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold">Interested Buyers</h3>
          <p className="text-sm text-muted-foreground">
            Manage and track potential buyers
          </p>
        </div>
        <Button>Add Lead</Button>
      </div>

      <div className="rounded-lg border">
        {leads.map((lead, index) => (
          <div
            key={lead.id}
            className={`space-y-4 p-4 ${
              index !== leads.length - 1 ? "border-b" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={lead.image} alt={lead.name} />
                  <AvatarFallback>
                    {lead.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{lead.name}</span>
                    <Badge
                      variant={
                        lead.status === "Hot"
                          ? "destructive"
                          : lead.status === "Warm"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {lead.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{lead.source}</span>
                    <span>•</span>
                    <span>
                      Last contact{" "}
                      {formatDistanceToNow(lead.lastContact, { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Lead
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Meeting
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="text-sm">{lead.notes}</div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Mail className="h-4 w-4" />
                {lead.email}
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Phone className="h-4 w-4" />
                {lead.phone}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
