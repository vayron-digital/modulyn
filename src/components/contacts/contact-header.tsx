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
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ContactHeaderProps {
  id: string
}

// This would normally come from an API
const contact = {
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
  assignedAgent: {
    name: "Sarah Johnson",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
  },
}

export function ContactHeader({ id }: ContactHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={contact.image} alt={contact.name} />
          <AvatarFallback>
            {contact.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{contact.name}</h2>
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
          </div>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:gap-4">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{contact.email}</span>
            </div>
            <div className="hidden md:block">•</div>
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{contact.phone}</span>
            </div>
            <div className="hidden md:block">•</div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                Last contact {formatDistanceToNow(contact.lastContact, { addSuffix: true })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {contact.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-lg border bg-background p-1">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={contact.assignedAgent.image}
              alt={contact.assignedAgent.name}
            />
            <AvatarFallback>
              {contact.assignedAgent.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">{contact.assignedAgent.name}</span>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push(`/dashboard/contacts/${id}/edit`)}
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
      </div>
    </div>
  )
}
