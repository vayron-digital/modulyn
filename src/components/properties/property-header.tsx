"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Edit,
  MoreHorizontal,
  Share2,
  Archive,
  Eye,
  Clock,
  ArrowUpRight,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

interface PropertyHeaderProps {
  id: string
}

// This would normally come from an API
const property = {
  id: "1",
  title: "Modern Family Home",
  address: "123 Main Street, Chicago, IL",
  price: 750000,
  type: "Single Family",
  status: "Active",
  listedDate: new Date(2024, 2, 1),
  views: 245,
  agent: {
    name: "Sarah Johnson",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
  },
}

export function PropertyHeader({ id }: PropertyHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-bold tracking-tight">
            {property.title}
          </h2>
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
        <div className="flex flex-col gap-2 text-muted-foreground md:flex-row md:items-center md:gap-4">
          <p>{property.address}</p>
          <div className="hidden md:block">•</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Listed {formatDistanceToNow(property.listedDate, { addSuffix: true })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{property.views} views</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-lg border bg-background p-1">
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

        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push(`/dashboard/properties/${id}/edit`)}
        >
          <Edit className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <ArrowUpRight className="mr-2 h-4 w-4" />
              View Public Listing
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Archive className="mr-2 h-4 w-4" />
              Archive Property
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
