"use client"

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
  Bed,
  Bath,
  Square,
  MoreHorizontal,
  Eye,
  Calendar,
  Star,
  X,
  DollarSign,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface LeadPropertiesProps {
  id: string
}

// This would normally come from an API
const properties = [
  {
    id: "1",
    status: "Viewed",
    address: "123 Main Street",
    city: "Chicago",
    state: "IL",
    price: 650000,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    beds: 4,
    baths: 3,
    sqft: 2500,
    type: "Single Family",
    viewDate: new Date(2024, 2, 12),
    feedback: "Liked the layout, concerned about backyard size",
    matchScore: 92,
  },
  {
    id: "2",
    status: "Scheduled",
    address: "456 Oak Avenue",
    city: "Chicago",
    state: "IL",
    price: 725000,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    beds: 4,
    baths: 2.5,
    sqft: 2800,
    type: "Single Family",
    viewingDate: new Date(2024, 3, 1),
    matchScore: 88,
  },
  {
    id: "3",
    status: "Saved",
    address: "789 Pine Street",
    city: "Chicago",
    state: "IL",
    price: 595000,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    beds: 3,
    baths: 2,
    sqft: 2200,
    type: "Single Family",
    savedDate: new Date(2024, 2, 15),
    matchScore: 85,
  },
]

export function LeadProperties({ id }: LeadPropertiesProps) {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Properties</h3>
          <p className="text-sm text-muted-foreground">
            Track viewed, scheduled, and saved properties
          </p>
        </div>
        <Button>
          <Home className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>

      <div className="grid gap-6">
        {properties.map((property) => (
          <Card key={property.id}>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-4">
                <div className="h-20 w-32 overflow-hidden rounded-md">
                  <img
                    src={property.image}
                    alt={property.address}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-lg">{property.address}</CardTitle>
                  <CardDescription>
                    {property.city}, {property.state}
                  </CardDescription>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge
                      variant={
                        property.status === "Viewed"
                          ? "secondary"
                          : property.status === "Scheduled"
                          ? "default"
                          : "outline"
                      }
                    >
                      {property.status}
                    </Badge>
                    <Badge variant="outline">Match: {property.matchScore}%</Badge>
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
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Viewing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Star className="mr-2 h-4 w-4" />
                    Save Property
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <X className="mr-2 h-4 w-4" />
                    Remove Property
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Price</div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      ${property.price.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Details</div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4 text-muted-foreground" />
                      <span>{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4 text-muted-foreground" />
                      <span>{property.baths}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="h-4 w-4 text-muted-foreground" />
                      <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    {property.status === "Viewed"
                      ? "Viewed"
                      : property.status === "Scheduled"
                      ? "Viewing"
                      : "Saved"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {property.status === "Viewed"
                        ? property.viewDate
                          ? formatDistanceToNow(property.viewDate, {
                              addSuffix: true,
                            })
                          : "Recently"
                        : property.status === "Scheduled"
                        ? property.viewingDate
                          ? formatDistanceToNow(property.viewingDate, {
                              addSuffix: true,
                            })
                          : "Soon"
                        : property.savedDate
                        ? formatDistanceToNow(property.savedDate, {
                            addSuffix: true,
                          })
                        : "Recently"}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Actions</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Schedule Viewing
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
              {property.feedback && (
                <div className="mt-4 rounded-lg border p-3">
                  <div className="text-sm font-medium">Feedback</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {property.feedback}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
