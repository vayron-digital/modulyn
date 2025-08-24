"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  School,
  ShoppingBag,
  Utensils,
  Train,
  Bus,
  Car,
  TreePine,
  Building2,
} from "lucide-react"

interface PropertyLocationProps {
  id: string
}

// This would normally come from an API
const location = {
  address: "123 Main Street",
  city: "Chicago",
  state: "IL",
  zip: "60601",
  neighborhood: "River North",
  schools: [
    {
      name: "Lincoln Elementary School",
      type: "Elementary",
      rating: 8,
      distance: 0.5,
    },
    {
      name: "Washington Middle School",
      type: "Middle",
      rating: 7,
      distance: 1.2,
    },
    {
      name: "Roosevelt High School",
      type: "High",
      rating: 9,
      distance: 1.8,
    },
  ],
  amenities: [
    {
      name: "Whole Foods Market",
      type: "Grocery",
      distance: 0.3,
      icon: ShoppingBag,
    },
    {
      name: "Starbucks",
      type: "Coffee",
      distance: 0.2,
      icon: Utensils,
    },
    {
      name: "LA Fitness",
      type: "Gym",
      distance: 0.5,
      icon: Building2,
    },
    {
      name: "Lincoln Park",
      type: "Park",
      distance: 0.8,
      icon: TreePine,
    },
  ],
  transportation: [
    {
      name: "Red Line Station",
      type: "Train",
      distance: 0.4,
      icon: Train,
    },
    {
      name: "Bus Stop 123",
      type: "Bus",
      distance: 0.2,
      icon: Bus,
    },
    {
      name: "I-90 Highway",
      type: "Highway",
      distance: 1.0,
      icon: Car,
    },
  ],
}

export function PropertyLocation({ id }: PropertyLocationProps) {
  return (
    <div className="space-y-6 p-6">
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
        {/* Here you would normally integrate with Google Maps or similar */}
        <div className="flex h-full items-center justify-center">
          <span className="text-muted-foreground">Map View</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Location</h3>
            <p className="text-sm text-muted-foreground">
              {location.address}, {location.city}, {location.state} {location.zip}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Neighborhood</h4>
            <p className="text-sm text-muted-foreground">
              {location.neighborhood}
            </p>
          </div>
          <Button variant="outline" className="w-full">
            Get Directions
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Schools</h3>
          <div className="space-y-2">
            {location.schools.map((school) => (
              <div
                key={school.name}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <School className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{school.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {school.type} • {school.distance} miles
                  </p>
                </div>
                <Badge variant="secondary">{school.rating}/10</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Nearby Amenities</h3>
          <div className="space-y-2">
            {location.amenities.map((amenity) => (
              <div
                key={amenity.name}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-2">
                  <amenity.icon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="font-medium">{amenity.name}</span>
                    <p className="text-sm text-muted-foreground">
                      {amenity.distance} miles
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Transportation</h3>
          <div className="space-y-2">
            {location.transportation.map((transport) => (
              <div
                key={transport.name}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-2">
                  <transport.icon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="font-medium">{transport.name}</span>
                    <p className="text-sm text-muted-foreground">
                      {transport.distance} miles
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
