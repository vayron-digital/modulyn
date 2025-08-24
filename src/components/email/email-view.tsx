"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Reply,
  ReplyAll,
  Forward,
  MoreHorizontal,
  Star,
  Archive,
  Trash2,
  Mail,
  Tag,
  Download,
  Paperclip,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react"
import { format } from "date-fns"

interface EmailViewProps {
  emailId: string
  onClose: () => void
}

// This would normally come from an API
const email = {
  id: "1",
  from: {
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
  },
  to: [
    {
      name: "Me",
      email: "me@example.com",
    },
  ],
  cc: [
    {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
    },
  ],
  subject: "Property Viewing Confirmation - 123 Main Street",
  date: new Date(2024, 2, 15, 14, 30),
  content: `
    <p>Hi there,</p>
    <p>I'm writing to confirm your upcoming property viewing appointment for 123 Main Street scheduled for tomorrow at 2:00 PM.</p>
    <p>Here are the property details and what to expect:</p>
    <ul>
      <li>4 bedrooms, 3 bathrooms</li>
      <li>2,500 sq ft</li>
      <li>Recently renovated kitchen</li>
      <li>Large backyard with deck</li>
      <li>2-car garage</li>
    </ul>
    <p>I've attached the property details sheet and floor plan for your reference.</p>
    <p>Please let me know if you need to reschedule or have any questions before the viewing.</p>
    <p>Best regards,<br>John Smith</p>
  `,
  attachments: [
    {
      name: "Property-Details.pdf",
      size: "2.4 MB",
      type: "application/pdf",
    },
    {
      name: "Floor-Plan.jpg",
      size: "1.8 MB",
      type: "image/jpeg",
    },
  ],
  isStarred: true,
  labels: ["clients", "properties"],
}

export function EmailView({ emailId, onClose }: EmailViewProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">{email.subject}</h2>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={email.isStarred ? "text-yellow-500" : ""}
                >
                  <Star className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {email.isStarred ? "Unstar" : "Star"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={email.from.avatar} alt={email.from.name} />
            <AvatarFallback>
              {email.from.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{email.from.name}</div>
            <Button
              variant="link"
              className="h-auto p-0 text-sm text-muted-foreground"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? (
                <>
                  <ChevronUp className="mr-1 h-3 w-3" />
                  Hide Details
                </>
              ) : (
                <>
                  <ChevronDown className="mr-1 h-3 w-3" />
                  Show Details
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {format(email.date, "MMM d, yyyy h:mm a")}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Reply className="mr-2 h-4 w-4" />
                Reply
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ReplyAll className="mr-2 h-4 w-4" />
                Reply All
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Forward className="mr-2 h-4 w-4" />
                Forward
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                Mark as Unread
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Tag className="mr-2 h-4 w-4" />
                Apply Label
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {showDetails && (
        <div className="border-b p-4">
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-[auto,1fr] gap-2">
              <span className="font-medium">From:</span>
              <span>
                {email.from.name} &lt;{email.from.email}&gt;
              </span>
            </div>
            <div className="grid grid-cols-[auto,1fr] gap-2">
              <span className="font-medium">To:</span>
              <span>
                {email.to.map((recipient) => (
                  <span key={recipient.email}>
                    {recipient.name} &lt;{recipient.email}&gt;
                  </span>
                ))}
              </span>
            </div>
            {email.cc && (
              <div className="grid grid-cols-[auto,1fr] gap-2">
                <span className="font-medium">Cc:</span>
                <span>
                  {email.cc.map((recipient) => (
                    <span key={recipient.email}>
                      {recipient.name} &lt;{recipient.email}&gt;
                    </span>
                  ))}
                </span>
              </div>
            )}
            <div className="grid grid-cols-[auto,1fr] gap-2">
              <span className="font-medium">Date:</span>
              <span>{format(email.date, "MMMM d, yyyy h:mm a")}</span>
            </div>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1 p-4">
        <div
          className="prose max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: email.content }}
        />
      </ScrollArea>

      {email.attachments && email.attachments.length > 0 && (
        <>
          <Separator />
          <div className="p-4">
            <h3 className="mb-2 font-semibold">Attachments</h3>
            <div className="grid gap-2 md:grid-cols-2">
              {email.attachments.map((attachment) => (
                <div
                  key={attachment.name}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-2">
                    <Paperclip className="h-4 w-4" />
                    <div>
                      <div className="font-medium">{attachment.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {attachment.size}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <Separator />

      <div className="flex items-center gap-2 p-4">
        <Button>
          <Reply className="mr-2 h-4 w-4" />
          Reply
        </Button>
        <Button variant="outline">
          <ReplyAll className="mr-2 h-4 w-4" />
          Reply All
        </Button>
        <Button variant="outline">
          <Forward className="mr-2 h-4 w-4" />
          Forward
        </Button>
      </div>
    </div>
  )
}
