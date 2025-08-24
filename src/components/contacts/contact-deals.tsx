"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Home,
  DollarSign,
  Calendar,
  MoreHorizontal,
  FileText,
  Mail,
  Phone,
  Trash,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ContactDealsProps {
  id: string
}

// This would normally come from an API
const deals = [
  {
    id: "1",
    type: "Purchase",
    status: "Active",
    property: {
      address: "123 Main Street",
      city: "Chicago",
      state: "IL",
      price: 450000,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    },
    agent: {
      name: "Sarah Johnson",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
    },
    stage: "Under Contract",
    lastActivity: new Date(2024, 2, 15),
    closingDate: new Date(2024, 4, 1),
    documents: 8,
  },
  {
    id: "2",
    type: "Sale",
    status: "Closed",
    property: {
      address: "456 Oak Avenue",
      city: "Chicago",
      state: "IL",
      price: 350000,
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    },
    agent: {
      name: "Michael Brown",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Michael",
    },
    stage: "Closed",
    lastActivity: new Date(2024, 1, 1),
    closingDate: new Date(2024, 1, 15),
    documents: 12,
  },
  {
    id: "3",
    type: "Purchase",
    status: "Lost",
    property: {
      address: "789 Pine Street",
      city: "Chicago",
      state: "IL",
      price: 525000,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    },
    agent: {
      name: "Emily Davis",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Emily",
    },
    stage: "Offer Rejected",
    lastActivity: new Date(2023, 11, 15),
    closingDate: null,
    documents: 4,
  },
]

export function ContactDeals({ id }: ContactDealsProps) {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Deals & Transactions</h3>
          <p className="text-sm text-muted-foreground">
            Manage deals and track their progress
          </p>
        </div>
        <Button>
          <DollarSign className="mr-2 h-4 w-4" />
          New Deal
        </Button>
      </div>

      <div className="grid gap-6">
        {deals.map((deal) => (
          <Card key={deal.id}>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-4">
                <div className="h-20 w-32 overflow-hidden rounded-md">
                  <img
                    src={deal.property.image}
                    alt={deal.property.address}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {deal.property.address}
                  </CardTitle>
                  <CardDescription>
                    {deal.property.city}, {deal.property.state}
                  </CardDescription>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge
                      variant={
                        deal.status === "Active"
                          ? "default"
                          : deal.status === "Closed"
                          ? "success"
                          : "secondary"
                      }
                    >
                      {deal.type}
                    </Badge>
                    <Badge
                      variant={
                        deal.status === "Active"
                          ? "default"
                          : deal.status === "Closed"
                          ? "success"
                          : "destructive"
                      }
                    >
                      {deal.status}
                    </Badge>
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
                    <FileText className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Agent
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Deal
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Stage</div>
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span>{deal.stage}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Price</div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>${deal.property.price.toLocaleString()}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    {deal.closingDate ? "Closing Date" : "Last Activity"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {deal.closingDate
                        ? formatDistanceToNow(deal.closingDate, {
                            addSuffix: true,
                          })
                        : formatDistanceToNow(deal.lastActivity, {
                            addSuffix: true,
                          })}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Agent</div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={deal.agent.image} alt={deal.agent.name} />
                      <AvatarFallback>
                        {deal.agent.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{deal.agent.name}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
