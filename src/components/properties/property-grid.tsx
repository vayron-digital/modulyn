"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bed, Bath, Square, MapPin, Eye } from "lucide-react"

// This would normally come from an API
const properties = [
  {
    id: "1",
    title: "Modern Family Home",
    address: "123 Main Street, Chicago, IL",
    price: 750000,
    type: "Single Family",
    status: "Active",
    beds: 4,
    baths: 3,
    sqft: 2500,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    agent: {
      name: "Sarah Johnson",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
    },
    views: 245,
  },
  {
    id: "2",
    title: "Luxury Downtown Condo",
    address: "456 Park Avenue, New York, NY",
    price: 1200000,
    type: "Condo",
    status: "Under Contract",
    beds: 2,
    baths: 2,
    sqft: 1800,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    agent: {
      name: "Michael Brown",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Michael",
    },
    views: 180,
  },
  {
    id: "3",
    title: "Waterfront Estate",
    address: "789 Ocean Drive, Miami, FL",
    price: 2500000,
    type: "Luxury",
    status: "Active",
    beds: 6,
    baths: 5,
    sqft: 4500,
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    agent: {
      name: "Emily Davis",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Emily",
    },
    views: 320,
  },
  {
    id: "4",
    title: "Mountain View Retreat",
    address: "321 Mountain View, Denver, CO",
    price: 650000,
    type: "Single Family",
    status: "Active",
    beds: 3,
    baths: 2,
    sqft: 2000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    agent: {
      name: "John Wilson",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
    },
    views: 156,
  },
]

export function PropertyGrid() {
  const router = useRouter()

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative aspect-video">
              <img
                src={property.image}
                alt={property.title}
                className="object-cover w-full h-full"
              />
              <Badge
                className="absolute top-2 right-2"
                variant={
                  property.status === "Active"
                    ? "success"
                    : property.status === "Under Contract"
                    ? "warning"
                    : "secondary"
                }
              >
                {property.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2.5 p-4">
            <div className="space-y-1">
              <h3 className="font-semibold leading-none tracking-tight">
                {property.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                ${property.price.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{property.address}</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.beds} beds</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.baths} baths</span>
              </div>
              <div className="flex items-center gap-1">
                <Square className="h-4 w-4" />
                <span>{property.sqft.toLocaleString()} sqft</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={property.agent.image} alt={property.agent.name} />
                  <AvatarFallback>
                    {property.agent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{property.agent.name}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span>{property.views}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
