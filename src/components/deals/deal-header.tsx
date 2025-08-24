"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Mail,
  Phone,
  Calendar,
  Star,
  UserX,
  Trash,
  MessageSquare,
  DollarSign,
  Home,
  ArrowUpRight,
  Clock,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface DealHeaderProps {
  id: string
}

// This would normally come from an API
const deal = {
  id: "1",
  title: "123 Main Street",
  type: "Purchase",
  value: 750000,
  stage: "Qualified",
  status: "active",
  client: {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
  },
  agent: {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 234-5678",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
  },
  property: {
    address: "123 Main Street",
    city: "Chicago",
    state: "IL",
    type: "Single Family",
    beds: 4,
    baths: 3,
    sqft: 2500,
  },
  timeline: {
    created: new Date(2024, 2, 1),
    lastActivity: new Date(2024, 2, 15),
    closingDate: new Date(2024, 4, 1),
  },
  probability: 75,
  tags: ["hot", "financing"],
}

export function DealHeader({ id }: DealHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">{deal.title}</h2>
          <Badge
            variant={
              deal.stage === "Lead"
                ? "default"
                : deal.stage === "Qualified"
                ? "secondary"
                : deal.stage === "Negotiation"
                ? "warning"
                : "outline"
            }
          >
            {deal.stage}
          </Badge>
          <Badge
            variant={
              deal.probability >= 75
                ? "success"
                : deal.probability >= 50
                ? "warning"
                : "secondary"
            }
          >
            {deal.probability}% Probability
          </Badge>
        </div>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:gap-4">
          <div className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span>
              {deal.property.type} • {deal.property.beds} beds •{" "}
              {deal.property.baths} baths • {deal.property.sqft.toLocaleString()}{" "}
              sqft
            </span>
          </div>
          <div className="hidden md:block">•</div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>${deal.value.toLocaleString()}</span>
          </div>
          <div className="hidden md:block">•</div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>
              Closing {formatDistanceToNow(deal.timeline.closingDate, { addSuffix: true })}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={deal.client.image} alt={deal.client.name} />
              <AvatarFallback>
                {deal.client.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{deal.client.name}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-3 w-3" />
                <span>{deal.client.email}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={deal.agent.image} alt={deal.agent.name} />
              <AvatarFallback>
                {deal.agent.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{deal.agent.name}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-3 w-3" />
                <span>{deal.agent.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {deal.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push(`/dashboard/deals/${id}/edit`)}
        >
          <Edit className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="icon">
          <MessageSquare className="h-4 w-4" />
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
              <Star className="mr-2 h-4 w-4" />
              Mark as Hot
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserX className="mr-2 h-4 w-4" />
              Mark as Lost
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete Deal
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
