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
  DollarSign,
  Calendar,
  Star,
  Trash,
  UserX,
  Home,
  Users,
  ArrowUpRight,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface DealListProps {
  status: "all" | "active" | "pending" | "closed" | "lost"
}

// This would normally come from an API
const deals = [
  {
    id: "1",
    title: "123 Main Street",
    type: "Purchase",
    value: 750000,
    stage: "Lead",
    status: "active",
    client: {
      name: "John Smith",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
    },
    agent: {
      name: "Sarah Johnson",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
    },
    dueDate: new Date(2024, 3, 15),
    lastActivity: new Date(2024, 2, 15),
    probability: 60,
    tags: ["hot", "financing"],
  },
  {
    id: "2",
    title: "456 Oak Avenue",
    type: "Sale",
    value: 850000,
    stage: "Qualified",
    status: "active",
    client: {
      name: "Emma Wilson",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Emma",
    },
    agent: {
      name: "Michael Brown",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Michael",
    },
    dueDate: new Date(2024, 3, 20),
    lastActivity: new Date(2024, 2, 14),
    probability: 75,
    tags: ["priority"],
  },
  // Add more deals...
]

export function DealList({ status }: DealListProps) {
  const router = useRouter()
  const filteredDeals =
    status === "all" ? deals : deals.filter((deal) => deal.status === status)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Deal</TableHead>
          <TableHead>Stage</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Agent</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Last Activity</TableHead>
          <TableHead>Probability</TableHead>
          <TableHead className="w-[80px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredDeals.map((deal) => (
          <TableRow key={deal.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <div>
                  <div className="font-medium">{deal.title}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Home className="h-3 w-3" />
                    <span>{deal.type}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {deal.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>${deal.value.toLocaleString()}</span>
              </div>
            </TableCell>
            <TableCell>
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
                <span className="text-sm">{deal.client.name}</span>
              </div>
            </TableCell>
            <TableCell>
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
                <span className="text-sm">{deal.agent.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {formatDistanceToNow(deal.dueDate, { addSuffix: true })}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {formatDistanceToNow(deal.lastActivity, { addSuffix: true })}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  deal.probability >= 75
                    ? "success"
                    : deal.probability >= 50
                    ? "warning"
                    : "secondary"
                }
              >
                {deal.probability}%
              </Badge>
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
                    onClick={() => router.push(`/dashboard/deals/${deal.id}`)}
                  >
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/dashboard/deals/${deal.id}/edit`)
                    }
                  >
                    Edit Deal
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
                    Delete Deal
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
