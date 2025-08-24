"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Plus,
  MoreHorizontal,
  Edit,
  Copy,
  Trash,
  Pin,
  Tags,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { toast } from "sonner"

interface ContactNotesProps {
  id: string
}

// This would normally come from an API
const notes = [
  {
    id: "1",
    content:
      "Client is interested in 3-4 bedroom properties in the North Side area. Budget range: $600k-$800k. Prefers modern finishes and a large kitchen.",
    createdBy: {
      name: "Sarah Johnson",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
    },
    createdAt: new Date(2024, 2, 15),
    tags: ["preferences", "requirements"],
    isPinned: true,
  },
  {
    id: "2",
    content:
      "Follow-up from property viewing at 123 Main Street. Liked the layout but concerned about the small backyard. Will send similar listings with larger outdoor spaces.",
    createdBy: {
      name: "Michael Brown",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Michael",
    },
    createdAt: new Date(2024, 2, 10),
    tags: ["viewing", "feedback"],
    isPinned: false,
  },
  {
    id: "3",
    content:
      "Discussed financing options. Pre-approved for $750k with ABC Bank. Rate locked at 3.5% for 60 days.",
    createdBy: {
      name: "Emily Davis",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Emily",
    },
    createdAt: new Date(2024, 2, 5),
    tags: ["financing"],
    isPinned: true,
  },
]

export function ContactNotes({ id }: ContactNotesProps) {
  const [newNote, setNewNote] = useState("")
  const [isAddingNote, setIsAddingNote] = useState(false)

  const handleAddNote = async () => {
    if (!newNote.trim()) return

    try {
      // Here you would normally save the note to your API
      // const response = await fetch("/api/contacts/${id}/notes", {
      //   method: "POST",
      //   body: JSON.stringify({ content: newNote }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Note added successfully")
      setNewNote("")
      setIsAddingNote(false)
    } catch (error) {
      toast.error("Failed to add note")
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Notes</h3>
          <p className="text-sm text-muted-foreground">
            Keep track of important information and conversations
          </p>
        </div>
        <Button onClick={() => setIsAddingNote(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Note
        </Button>
      </div>

      {isAddingNote && (
        <div className="mb-6 space-y-4 rounded-lg border p-4">
          <Textarea
            placeholder="Type your note here..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setNewNote("")
                setIsAddingNote(false)
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddNote}>Save Note</Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`rounded-lg border p-4 ${
              note.isPinned ? "border-primary bg-primary/5" : ""
            }`}
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={note.createdBy.image}
                    alt={note.createdBy.name}
                  />
                  <AvatarFallback>
                    {note.createdBy.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{note.createdBy.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDistanceToNow(note.createdAt, { addSuffix: true })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {note.isPinned && (
                  <Badge variant="outline" className="gap-1">
                    <Pin className="h-3 w-3" />
                    Pinned
                  </Badge>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Note
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pin className="mr-2 h-4 w-4" />
                      {note.isPinned ? "Unpin Note" : "Pin Note"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Tags className="mr-2 h-4 w-4" />
                      Manage Tags
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Text
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Note
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <p className="whitespace-pre-wrap text-sm">{note.content}</p>
            {note.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1">
                {note.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
