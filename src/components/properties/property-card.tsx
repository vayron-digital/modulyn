"use client"

import { NavLink } from "@/components/ui/nav-link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, DollarSign, Bed, Bath, Square } from "lucide-react"

interface PropertyCardProps {
  property: {
    id: string
    title: string
    address: string
    price: number
    status: "for-sale" | "for-rent" | "sold" | "rented"
    bedrooms: number
    bathrooms: number
    squareFeet: number
    image?: string
  }
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <NavLink href={`/dashboard/properties/${property.id}`} className="block">
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        {property.image && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <CardHeader className="space-y-1">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold">{property.title}</h3>
            <Badge variant={property.status === "sold" ? "secondary" : "default"}>
              {property.status.replace("-", " ")}
            </Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            {property.address}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <DollarSign className="mr-1 inline-block h-5 w-5" />
            {property.price.toLocaleString()}
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Bed className="mr-1 h-4 w-4" />
            {property.bedrooms} beds
          </div>
          <div className="flex items-center">
            <Bath className="mr-1 h-4 w-4" />
            {property.bathrooms} baths
          </div>
          <div className="flex items-center">
            <Square className="mr-1 h-4 w-4" />
            {property.squareFeet.toLocaleString()} sqft
          </div>
        </CardFooter>
      </Card>
    </NavLink>
  )
}
