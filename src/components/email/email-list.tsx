"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Star,
  MoreHorizontal,
  Archive,
  Trash2,
  Mail,
  MailOpen,
  Tag,
  Forward,
  Reply,
  ReplyAll,
  Paperclip,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

interface EmailListProps {
  view: string
  filter: string
  selectedEmail: string | null
  onEmailSelect: (id: string) => void
}

// This would normally come from an API
const emails = [
  {
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
    subject: "Property Viewing Confirmation - 123 Main Street",
    preview: "I'm writing to confirm your upcoming property viewing appointment...",
    date: new Date(2024, 2, 15, 14, 30),
    isRead: false,
    isStarred: true,
    hasAttachments: true,
    labels: ["clients", "properties"],
    attachments: [
      {
        name: "Property-Details.pdf",
        size: "2.4 MB",
      },
      {
        name: "Floor-Plan.jpg",
        size: "1.8 MB",
      },
    ],
  },
  {
    id: "2",
    from: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
    },
    to: [
      {
        name: "Me",
        email: "me@example.com",
      },
    ],
    subject: "Contract Review - 456 Oak Avenue Deal",
    preview: "Please find attached the updated contract for your review...",
    date: new Date(2024, 2, 15, 11, 20),
    isRead: true,
    isStarred: false,
    hasAttachments: true,
    labels: ["deals"],
    attachments: [
      {
        name: "Contract-v2.pdf",
        size: "3.1 MB",
      },
    ],
  },
  {
    id: "3",
    from: {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=Michael",
    },
    to: [
      {
        name: "Me",
        email: "me@example.com",
      },
      {
        name: "Team",
        email: "team@example.com",
      },
    ],
    subject: "Team Meeting - Q1 Performance Review",
    preview: "Let's discuss our Q1 performance and upcoming goals...",
    date: new Date(2024, 2, 14, 16, 45),
    isRead: true,
    isStarred: false,
    hasAttachments: true,
    labels: ["team"],
    attachments: [
      {
        name: "Q1-Report.pptx",
        size: "5.2 MB",
      },
    ],
  },
]

const labelColors: Record<string, string> = {
  clients: "bg-blue-500",
  properties: "bg-green-500",
  deals: "bg-orange-500",
  team: "bg-purple-500",
}

export function EmailList({
  view,
  filter,
  selectedEmail,
  onEmailSelect,
}: EmailListProps) {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])

  const toggleEmailSelection = (emailId: string) => {
    setSelectedEmails((current) =>
      current.includes(emailId)
        ? current.filter((id) => id !== emailId)
        : [...current, emailId]
    )
  }

  const toggleStarred = (emailId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    // Handle starring email
  }

  const filteredEmails = emails.filter((email) => {
    if (filter === "unread") return !email.isRead
    if (filter === "flagged") return email.isStarred
    if (filter === "attachments") return email.hasAttachments
    return true
  })

  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="divide-y">
        {filteredEmails.map((email) => (
          <div
            key={email.id}
            className={cn(
              "flex cursor-pointer items-center gap-2 p-4 transition-colors hover:bg-muted/50",
              !email.isRead && "bg-muted/30",
              selectedEmail === email.id && "bg-muted"
            )}
            onClick={() => onEmailSelect(email.id)}
          >
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedEmails.includes(email.id)}
                onCheckedChange={() => toggleEmailSelection(email.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <button
                className={cn(
                  "text-muted-foreground transition-colors hover:text-primary",
                  email.isStarred && "text-yellow-500"
                )}
                onClick={(e) => toggleStarred(email.id, e)}
              >
                <Star className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn("font-medium", !email.isRead && "font-bold")}>
                    {email.from.name}
                  </span>
                  {email.labels.map((label) => (
                    <span
                      key={label}
                      className={cn(
                        "h-2 w-2 rounded-full",
                        labelColors[label]
                      )}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {email.hasAttachments && (
                    <Paperclip className="h-4 w-4" />
                  )}
                  <span>
                    {formatDistanceToNow(email.date, { addSuffix: true })}
                  </span>
                </div>
              </div>

              <div className="text-sm font-medium">{email.subject}</div>
              <div className="text-sm text-muted-foreground">
                {email.preview}
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-4 w-4" />
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
                  {email.isRead ? (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Mark as Unread
                    </>
                  ) : (
                    <>
                      <MailOpen className="mr-2 h-4 w-4" />
                      Mark as Read
                    </>
                  )}
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
        ))}
      </div>
    </ScrollArea>
  )
}
