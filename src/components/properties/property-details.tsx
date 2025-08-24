"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Bed,
  Bath,
  Square,
  Home,
  Calendar,
  DollarSign,
  Building2,
  Ruler,
  Car,
  Trees,
} from "lucide-react"

interface PropertyDetailsProps {
  id: string
}

// This would normally come from an API
const property = {
  id: "1",
  price: 750000,
  type: "Single Family",
  status: "Active",
  beds: 4,
  baths: 3,
  sqft: 2500,
  lotSize: "0.25 acres",
  yearBuilt: 2020,
  stories: 2,
  garage: "2 Car Attached",
  parking: "4 spaces",
  basement: "Finished",
  exterior: "Brick",
  roof: "Asphalt Shingle",
  heating: "Forced Air",
  cooling: "Central Air",
  appliances: [
    "Refrigerator",
    "Dishwasher",
    "Microwave",
    "Range/Oven",
    "Washer",
    "Dryer",
  ],
  features: [
    "Hardwood Floors",
    "Granite Countertops",
    "Stainless Steel Appliances",
    "Walk-in Closets",
    "Fireplace",
    "Deck",
    "Fenced Yard",
  ],
}

export function PropertyDetails({ id }: PropertyDetailsProps) {
  return (
    <div className="divide-y p-6">
      <div className="pb-4">
        <div className="mb-2 text-2xl font-bold">
          ${property.price.toLocaleString()}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{property.type}</Badge>
          <Badge
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
      </div>

      <div className="grid grid-cols-3 gap-4 py-4">
        <div className="flex flex-col items-center gap-1">
          <Bed className="h-5 w-5 text-muted-foreground" />
          <span className="text-lg font-semibold">{property.beds}</span>
          <span className="text-xs text-muted-foreground">Beds</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Bath className="h-5 w-5 text-muted-foreground" />
          <span className="text-lg font-semibold">{property.baths}</span>
          <span className="text-xs text-muted-foreground">Baths</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Square className="h-5 w-5 text-muted-foreground" />
          <span className="text-lg font-semibold">
            {property.sqft.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">Sq Ft</span>
        </div>
      </div>

      <div className="space-y-4 py-4">
        <h3 className="font-semibold">Property Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Built {property.yearBuilt}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span>{property.stories} Stories</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-muted-foreground" />
            <span>{property.lotSize}</span>
          </div>
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-muted-foreground" />
            <span>{property.garage}</span>
          </div>
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span>{property.exterior}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trees className="h-4 w-4 text-muted-foreground" />
            <span>{property.basement}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 py-4">
        <h3 className="font-semibold">Included Appliances</h3>
        <div className="flex flex-wrap gap-2">
          {property.appliances.map((appliance) => (
            <Badge key={appliance} variant="secondary">
              {appliance}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4 py-4">
        <h3 className="font-semibold">Key Features</h3>
        <div className="flex flex-wrap gap-2">
          {property.features.map((feature) => (
            <Badge key={feature} variant="outline">
              {feature}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline">Schedule Showing</Button>
        <Button>Contact Agent</Button>
      </div>
    </div>
  )
}
