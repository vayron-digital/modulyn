"use client"

import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Eye, Edit, Trash, ExternalLink } from "lucide-react"

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
    listedDate: new Date(2024, 2, 1),
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
    listedDate: new Date(2024, 2, 5),
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
    listedDate: new Date(2024, 2, 8),
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
    listedDate: new Date(2024, 2, 10),
  },
]

export function PropertyList() {
  const router = useRouter()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Agent</TableHead>
          <TableHead>Views</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.map((property) => (
          <TableRow key={property.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-10 w-14 rounded-md object-cover"
                />
                <div>
                  <p className="font-medium">{property.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {property.address}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>{property.type}</TableCell>
            <TableCell>${property.price.toLocaleString()}</TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={property.agent.image}
                    alt={property.agent.name}
                  />
                  <AvatarFallback>
                    {property.agent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{property.agent.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span>{property.views}</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/dashboard/properties/${property.id}`)
                    }
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/dashboard/properties/${property.id}/edit`)
                    }
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Property
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Property
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
