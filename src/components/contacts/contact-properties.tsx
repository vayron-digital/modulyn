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
  Edit,
  Trash,
} from "lucide-react"

interface ContactPropertiesProps {
  id: string
}

// This would normally come from an API
const properties = [
  {
    id: "1",
    status: "Owned",
    address: "123 Main Street",
    city: "Chicago",
    state: "IL",
    price: 450000,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    beds: 4,
    baths: 3,
    sqft: 2500,
    type: "Single Family",
    purchaseDate: "Jan 2022",
  },
  {
    id: "2",
    status: "Interested",
    address: "456 Oak Avenue",
    city: "Chicago",
    state: "IL",
    price: 350000,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "Condo",
    viewingDate: "Next Week",
  },
  {
    id: "3",
    status: "Previous",
    address: "789 Pine Street",
    city: "Chicago",
    state: "IL",
    price: 525000,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    beds: 5,
    baths: 4,
    sqft: 3200,
    type: "Single Family",
    soldDate: "Dec 2023",
  },
]

export function ContactProperties({ id }: ContactPropertiesProps) {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Properties</h3>
          <p className="text-sm text-muted-foreground">
            Track owned, interested, and previous properties
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
                        property.status === "Owned"
                          ? "default"
                          : property.status === "Interested"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {property.status}
                    </Badge>
                    <Badge variant="outline">{property.type}</Badge>
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
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Property
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Remove Property
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Price</div>
                  <div className="font-medium">
                    ${property.price.toLocaleString()}
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
                    {property.status === "Owned"
                      ? "Purchase Date"
                      : property.status === "Interested"
                      ? "Viewing"
                      : "Sold Date"}
                  </div>
                  <div className="font-medium">
                    {property.status === "Owned"
                      ? property.purchaseDate
                      : property.status === "Interested"
                      ? property.viewingDate
                      : property.soldDate}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Actions</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Schedule Viewing
                    </Button>
                    <Button variant="outline" size="sm">
                      Contact Agent
                    </Button>
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
