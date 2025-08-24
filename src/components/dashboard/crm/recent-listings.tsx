"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

const listings = [
  {
    id: "1",
    address: "123 Main Street, Chicago, IL",
    type: "Single Family",
    price: 750000,
    status: "Active",
    agent: {
      name: "Sarah Johnson",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
    },
    listedDate: new Date(2024, 2, 1),
    views: 245,
  },
  {
    id: "2",
    address: "456 Park Avenue, New York, NY",
    type: "Condo",
    price: 1200000,
    status: "Under Contract",
    agent: {
      name: "Michael Brown",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Michael",
    },
    listedDate: new Date(2024, 2, 5),
    views: 180,
  },
  {
    id: "3",
    address: "789 Ocean Drive, Miami, FL",
    type: "Luxury",
    price: 2500000,
    status: "Active",
    agent: {
      name: "Emily Davis",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Emily",
    },
    listedDate: new Date(2024, 2, 8),
    views: 320,
  },
  {
    id: "4",
    address: "321 Mountain View, Denver, CO",
    type: "Single Family",
    price: 650000,
    status: "Active",
    agent: {
      name: "John Wilson",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
    },
    listedDate: new Date(2024, 2, 10),
    views: 156,
  },
]

export function RecentListings() {
  return (
    <div className="space-y-8">
      {listings.map((listing) => (
        <div key={listing.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={listing.agent.image} alt={listing.agent.name} />
            <AvatarFallback>
              {listing.agent.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1 flex-1">
            <p className="text-sm font-medium leading-none">
              {listing.address}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{listing.type}</span>
              <span>•</span>
              <span>${listing.price.toLocaleString()}</span>
            </div>
          </div>
          <div className="ml-auto flex flex-col items-end gap-2">
            <Badge
              variant={
                listing.status === "Active"
                  ? "success"
                  : listing.status === "Under Contract"
                  ? "warning"
                  : "secondary"
              }
            >
              {listing.status}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(listing.listedDate, { addSuffix: true })}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
