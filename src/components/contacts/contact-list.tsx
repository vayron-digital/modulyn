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
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ContactListProps {
  type: "all" | "clients" | "leads" | "vendors" | "partners"
}

// This would normally come from an API
const contacts = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    type: "client",
    status: "active",
    tags: ["buyer", "investor"],
    lastContact: new Date(2024, 2, 1),
    deals: 3,
    value: 750000,
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
  },
  {
    id: "2",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "(555) 234-5678",
    type: "lead",
    status: "new",
    tags: ["seller"],
    lastContact: new Date(2024, 2, 5),
    deals: 0,
    value: 0,
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Emma",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "(555) 345-6789",
    type: "vendor",
    status: "active",
    tags: ["contractor"],
    lastContact: new Date(2024, 2, 8),
    deals: 5,
    value: 25000,
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Michael",
  },
  {
    id: "4",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    phone: "(555) 456-7890",
    type: "partner",
    status: "active",
    tags: ["agent", "vip"],
    lastContact: new Date(2024, 2, 10),
    deals: 12,
    value: 1500000,
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
  },
]

export function ContactList({ type }: ContactListProps) {
  const router = useRouter()
  const filteredContacts =
    type === "all"
      ? contacts
      : contacts.filter((contact) => contact.type === type.slice(0, -1))

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Contact Info</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead>Last Contact</TableHead>
          <TableHead>Deals</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="w-[80px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredContacts.map((contact) => (
          <TableRow key={contact.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={contact.image} alt={contact.name} />
                  <AvatarFallback>
                    {contact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{contact.name}</div>
                  <div className="text-sm text-muted-foreground">
                    ID: {contact.id}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{contact.phone}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  contact.type === "client"
                    ? "default"
                    : contact.type === "lead"
                    ? "secondary"
                    : contact.type === "vendor"
                    ? "outline"
                    : "default"
                }
              >
                {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  contact.status === "active"
                    ? "success"
                    : contact.status === "new"
                    ? "warning"
                    : "secondary"
                }
              >
                {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {contact.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {formatDistanceToNow(contact.lastContact, { addSuffix: true })}
                </span>
              </div>
            </TableCell>
            <TableCell>{contact.deals}</TableCell>
            <TableCell>
              {contact.value > 0
                ? "$" + contact.value.toLocaleString()
                : "N/A"}
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
                    onClick={() =>
                      router.push(`/dashboard/contacts/${contact.id}`)
                    }
                  >
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/dashboard/contacts/${contact.id}/edit`)
                    }
                  >
                    Edit Contact
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Star className="mr-2 h-4 w-4" />
                    Mark as VIP
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserX className="mr-2 h-4 w-4" />
                    Mark as Inactive
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Contact
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
