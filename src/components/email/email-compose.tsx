"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Send,
  Paperclip,
  Image,
  Link,
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  X,
  ChevronDown,
  Clock,
  Plus,
  Check,
} from "lucide-react"

interface EmailComposeProps {
  onSend: () => void
}

// This would normally come from an API
const contacts = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=Michael",
  },
]

const templates = [
  {
    id: "1",
    name: "Property Viewing Confirmation",
    subject: "Property Viewing Confirmation - [Address]",
    content: "Hi [Name],\n\nI'm writing to confirm your property viewing...",
  },
  {
    id: "2",
    name: "Offer Acceptance",
    subject: "Offer Accepted - [Address]",
    content: "Dear [Name],\n\nI'm pleased to inform you that your offer...",
  },
  {
    id: "3",
    name: "Meeting Follow-up",
    subject: "Follow-up: Our Meeting Today",
    content: "Hi [Name],\n\nThank you for taking the time to meet today...",
  },
]

export function EmailCompose({ onSend }: EmailComposeProps) {
  const [to, setTo] = useState<string[]>([])
  const [cc, setCc] = useState<string[]>([])
  const [bcc, setBcc] = useState<string[]>([])
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [showCc, setShowCc] = useState(false)
  const [showBcc, setShowBcc] = useState(false)
  const [attachments, setAttachments] = useState<File[]>([])
  const [isScheduled, setIsScheduled] = useState(false)
  const [scheduleDate, setScheduleDate] = useState<string>("")

  const handleSend = () => {
    // Handle email sending
    onSend()
  }

  const handleAttachment = () => {
    // Handle file attachment
  }

  const handleRecipientAdd = (
    email: string,
    type: "to" | "cc" | "bcc"
  ) => {
    switch (type) {
      case "to":
        setTo([...to, email])
        break
      case "cc":
        setCc([...cc, email])
        break
      case "bcc":
        setBcc([...bcc, email])
        break
    }
  }

  const handleRecipientRemove = (
    email: string,
    type: "to" | "cc" | "bcc"
  ) => {
    switch (type) {
      case "to":
        setTo(to.filter((e) => e !== email))
        break
      case "cc":
        setCc(cc.filter((e) => e !== email))
        break
      case "bcc":
        setBcc(bcc.filter((e) => e !== email))
        break
    }
  }

  const renderRecipientField = (
    label: string,
    recipients: string[],
    type: "to" | "cc" | "bcc"
  ) => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex-1">
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex min-h-10 w-full flex-wrap items-center gap-1 rounded-md border border-input px-3 py-2">
              {recipients.map((email) => {
                const contact = contacts.find((c) => c.email === email)
                return (
                  <Badge
                    key={email}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {contact?.name || email}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => handleRecipientRemove(email, type)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )
              })}
              <input
                className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                placeholder="Add recipient..."
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder="Search contacts..." />
              <CommandEmpty>No contacts found.</CommandEmpty>
              <CommandGroup>
                {contacts
                  .filter((contact) => !recipients.includes(contact.email))
                  .map((contact) => (
                    <CommandItem
                      key={contact.id}
                      onSelect={() => handleRecipientAdd(contact.email, type)}
                    >
                      {contact.name}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {contact.email}
                      </span>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )

  return (
    <div className="flex h-[600px] flex-col">
      <div className="space-y-4 p-4">
        <div className="flex items-center gap-2">
          {renderRecipientField("To", to, "to")}
          {!showCc && !showBcc && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCc(true)}
              >
                Cc
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBcc(true)}
              >
                Bcc
              </Button>
            </div>
          )}
        </div>

        {showCc && renderRecipientField("Cc", cc, "cc")}
        {showBcc && renderRecipientField("Bcc", bcc, "bcc")}

        <Input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <div className="flex items-center gap-2 rounded-t-md border p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bold className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bold</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Italic className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Italic</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Separator orientation="vertical" className="mx-1 h-6" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <List className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bullet List</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ListOrdered className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Numbered List</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Separator orientation="vertical" className="mx-1 h-6" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <AlignLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align Left</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <AlignCenter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align Center</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <AlignRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align Right</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Separator orientation="vertical" className="mx-1 h-6" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Link className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Insert Link</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="ml-auto flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Undo className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Undo</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Redo className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Redo</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <Textarea
          placeholder="Write your message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[300px] resize-none border-0 p-4 focus-visible:ring-0"
        />
      </ScrollArea>

      <div className="flex items-center justify-between border-t p-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleAttachment}>
            <Paperclip className="mr-2 h-4 w-4" />
            Attach
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Template
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[300px]">
              <Command>
                <CommandInput placeholder="Search templates..." />
                <CommandEmpty>No templates found.</CommandEmpty>
                <CommandGroup>
                  {templates.map((template) => (
                    <CommandItem
                      key={template.id}
                      onSelect={() => {
                        setSubject(template.subject)
                        setContent(template.content)
                      }}
                    >
                      {template.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                Schedule
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[300px]">
              <div className="space-y-4 p-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Send at</label>
                  <Input
                    type="datetime-local"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={() => setIsScheduled(true)}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Schedule Send
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button onClick={handleSend}>
            <Send className="mr-2 h-4 w-4" />
            {isScheduled ? "Schedule" : "Send"}
          </Button>
        </div>
      </div>
    </div>
  )
}
