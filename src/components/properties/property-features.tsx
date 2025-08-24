"use client"

import { Check } from "lucide-react"

interface PropertyFeaturesProps {
  id: string
}

// This would normally come from an API
const features = {
  interior: [
    "Hardwood Floors",
    "Central Air",
    "Forced Air Heating",
    "Walk-in Closets",
    "Crown Molding",
    "Recessed Lighting",
    "Granite Countertops",
    "Stainless Steel Appliances",
    "Kitchen Island",
    "Pantry",
    "Master Suite",
    "Fireplace",
  ],
  exterior: [
    "Brick Exterior",
    "Asphalt Shingle Roof",
    "Attached Garage",
    "Covered Porch",
    "Deck",
    "Fenced Yard",
    "Sprinkler System",
    "Landscape Lighting",
  ],
  community: [
    "Swimming Pool",
    "Tennis Courts",
    "Clubhouse",
    "Fitness Center",
    "Gated Entry",
    "Walking Trails",
    "Park Access",
    "24/7 Security",
  ],
  utilities: [
    "Public Water",
    "Public Sewer",
    "Natural Gas",
    "High-Speed Internet",
    "Cable Ready",
    "Smart Home Features",
  ],
}

export function PropertyFeatures({ id }: PropertyFeaturesProps) {
  return (
    <div className="grid gap-6 p-6 md:grid-cols-2">
      <div className="space-y-4">
        <h3 className="font-semibold">Interior Features</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {features.interior.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Check className="h-4 w-4 text-primary" />
              {feature}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Exterior Features</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {features.exterior.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Check className="h-4 w-4 text-primary" />
              {feature}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Community Amenities</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {features.community.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Check className="h-4 w-4 text-primary" />
              {feature}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Utilities & Infrastructure</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {features.utilities.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Check className="h-4 w-4 text-primary" />
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
