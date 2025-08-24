"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  Star,
  Trash,
  UserX,
  DollarSign,
  Building2,
  ArrowUpRight,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface LeadListProps {
  status: "all" | "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "closed" | "lost"
}

// This would normally come from an API
const leads = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    status: "new",
    source: "Website",
    tags: ["buyer", "hot"],
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
  },
  {
    id: "2",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "(555) 234-5678",
    status: "contacted",
    source: "Zillow",
    tags: ["seller"],
    lastContact: new Date(2024, 2, 5),
    nextFollowUp: new Date(2024, 3, 5),
    assignedTo: {
      name: "Michael Brown",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Michael",
    },
    propertyInterest: {
      type: "Condo",
      priceRange: "$400k-$600k",
      location: "Downtown",
    },
    score: 65,
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Emma",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "(555) 345-6789",
    status: "qualified",
    source: "Referral",
    tags: ["investor", "pre-approved"],
    lastContact: new Date(2024, 2, 8),
    nextFollowUp: new Date(2024, 3, 8),
    assignedTo: {
      name: "Emily Davis",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Emily",
    },
    propertyInterest: {
      type: "Multi-family",
      priceRange: "$800k-$1.2M",
      location: "South Side",
    },
    score: 92,
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Michael",
  },
]

export function LeadList({ status }: LeadListProps) {
  const router = useRouter()
  const filteredLeads =
    status === "all" ? leads : leads.filter((lead) => lead.status === status)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Lead</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Property Interest</TableHead>
          <TableHead>Last Contact</TableHead>
          <TableHead>Next Follow-up</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead className="w-[80px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredLeads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={lead.image} alt={lead.name} />
                  <AvatarFallback>
                    {lead.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{lead.name}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span>{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    <span>{lead.phone}</span>
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
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
              <div className="mt-1 flex flex-wrap gap-1">
                {lead.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="font-medium">{lead.source}</div>
            </TableCell>
            <TableCell>
              <div
                className={`font-medium ${
                  lead.score >= 80
                    ? "text-emerald-600"
                    : lead.score >= 60
                    ? "text-amber-600"
                    : "text-red-600"
                }`}
              >
                {lead.score}
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <Building2 className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{lead.propertyInterest.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{lead.propertyInterest.priceRange}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{lead.propertyInterest.location}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm">
                  {formatDistanceToNow(lead.lastContact, { addSuffix: true })}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm">
                  {formatDistanceToNow(lead.nextFollowUp, { addSuffix: true })}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
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
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => router.push(`/dashboard/leads/${lead.id}`)}
                  >
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/dashboard/leads/${lead.id}/edit`)
                    }
                  >
                    Edit Lead
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
