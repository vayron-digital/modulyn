"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Send,
  Paperclip,
  Clock,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { toast } from "sonner"

interface LeadCommunicationProps {
  id: string
}

// This would normally come from an API
const communications = [
  {
    id: "1",
    type: "email",
    subject: "Property Recommendations",
    content:
      "Hi John, Based on our conversation, I've put together a list of properties that match your criteria. Let me know if you'd like to schedule viewings for any of them.",
    sentBy: {
      name: "Sarah Johnson",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
    },
    sentTo: {
      name: "John Smith",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
    },
    date: new Date(2024, 2, 15, 14, 30),
    status: "sent",
  },
  {
    id: "2",
    type: "call",
    subject: "Initial Consultation",
    content:
      "Discussed property preferences and budget. Client is interested in 3-4 bedroom single-family homes in the North Side area.",
    sentBy: {
      name: "Sarah Johnson",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
    },
    date: new Date(2024, 2, 14, 11, 15),
    duration: "15 minutes",
    status: "completed",
  },
  {
    id: "3",
    type: "message",
    content:
      "Great, I'll be there at 2 PM tomorrow to show you the property at 123 Main Street.",
    sentBy: {
      name: "Sarah Johnson",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
    },
    sentTo: {
      name: "John Smith",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
    },
    date: new Date(2024, 2, 12, 15, 0),
    status: "sent",
  },
]

export function LeadCommunication({ id }: LeadCommunicationProps) {
  const [message, setMessage] = useState("")
  const [communicationType, setCommunicationType] = useState("email")

  const handleSend = async () => {
    if (!message.trim()) return

    try {
      // Here you would normally send the message via your API
      // const response = await fetch("/api/leads/${id}/communications", {
      //   method: "POST",
      //   body: JSON.stringify({ type: communicationType, content: message }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Message sent successfully")
      setMessage("")
    } catch (error) {
      toast.error("Failed to send message")
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Communication History</h3>
          <p className="text-sm text-muted-foreground">
            Track all communications with this lead
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Phone className="mr-2 h-4 w-4" />
            Call
          </Button>
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
        </div>
      </div>

      <div className="mb-6 space-y-4 rounded-lg border p-4">
        <div className="flex items-center gap-4">
          <Select
            value={communicationType}
            onValueChange={setCommunicationType}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="message">Message</SelectItem>
              <SelectItem value="note">Note</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>
        <Textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button onClick={handleSend}>
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {communications.map((comm) => (
          <div
            key={comm.id}
            className="flex items-start gap-4 rounded-lg border p-4"
          >
            <Avatar>
              <AvatarImage src={comm.sentBy.image} alt={comm.sentBy.name} />
              <AvatarFallback>
                {comm.sentBy.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comm.sentBy.name}</span>
                  <Badge
                    variant={
                      comm.type === "email"
                        ? "default"
                        : comm.type === "call"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {comm.type === "email" ? (
                      <Mail className="mr-1 h-3 w-3" />
                    ) : comm.type === "call" ? (
                      <Phone className="mr-1 h-3 w-3" />
                    ) : (
                      <MessageSquare className="mr-1 h-3 w-3" />
                    )}
                    {comm.type.charAt(0).toUpperCase() + comm.type.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatDistanceToNow(comm.date, { addSuffix: true })}
                  </span>
                </div>
              </div>
              {"subject" in comm && (
                <div className="font-medium">{comm.subject}</div>
              )}
              <p className="text-sm text-muted-foreground">{comm.content}</p>
              {"duration" in comm && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Duration: {comm.duration}</span>
                </div>
              )}
              {"sentTo" in comm && comm.sentTo && (
                <div className="mt-2 flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={comm.sentTo.image}
                      alt={comm.sentTo.name}
                    />
                    <AvatarFallback>
                      {comm.sentTo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    Sent to {comm.sentTo.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <Button variant="outline" size="sm" className="w-full">
          Load More
        </Button>
      </div>
    </div>
  )
}
