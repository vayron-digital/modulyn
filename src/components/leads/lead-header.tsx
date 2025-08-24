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
  Building2,
  ArrowUpRight,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface LeadHeaderProps {
  id: string
}

// This would normally come from an API
const lead = {
  id: "1",
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "(555) 123-4567",
  status: "qualified",
  source: "Website",
  tags: ["buyer", "hot", "pre-approved"],
  lastContact: new Date(2024, 2, 1),
  nextFollowUp: new Date(2024, 3, 1),
  assignedTo: {
    name: "Sarah Johnson",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
  },
  propertyInterest: {
    type: "Single Family",
    priceRange: "$600k-$800k",
    location: "North Side",
  },
  score: 85,
  image: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
}

export function LeadHeader({ id }: LeadHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={lead.image} alt={lead.name} />
          <AvatarFallback>
            {lead.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{lead.name}</h2>
            <Badge
              variant={
                lead.status === "new"
                  ? "default"
                  : lead.status === "contacted"
                  ? "secondary"
                  : lead.status === "qualified"
                  ? "success"
                  : lead.status === "proposal"
                  ? "warning"
                  : lead.status === "negotiation"
                  ? "warning"
                  : lead.status === "closed"
                  ? "success"
                  : "destructive"
              }
            >
              {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
            </Badge>
            <Badge variant="outline">Score: {lead.score}</Badge>
          </div>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:gap-4">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{lead.email}</span>
            </div>
            <div className="hidden md:block">•</div>
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{lead.phone}</span>
            </div>
            <div className="hidden md:block">•</div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                Last contact {formatDistanceToNow(lead.lastContact, { addSuffix: true })}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {lead.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:gap-4">
            <div className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              <span>{lead.propertyInterest.type}</span>
            </div>
            <div className="hidden md:block">•</div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>{lead.propertyInterest.priceRange}</span>
            </div>
            <div className="hidden md:block">•</div>
            <div className="flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4" />
              <span>{lead.propertyInterest.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-lg border bg-background p-1">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={lead.assignedTo.image}
              alt={lead.assignedTo.name}
            />
            <AvatarFallback>
              {lead.assignedTo.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">{lead.assignedTo.name}</span>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push(`/dashboard/leads/${id}/edit`)}
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
              Delete Lead
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
