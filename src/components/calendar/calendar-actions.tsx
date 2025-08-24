"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Calendar,
  Download,
  Building2,
  Home,
  Users,
  FileText,
  Check,
  ChevronsUpDown,
  X,
} from "lucide-react"

// This would normally come from an API
const team = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
  },
  {
    id: "2",
    name: "Michael Brown",
    email: "michael.brown@example.com",
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
  },
]

export function CalendarActions() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [location, setLocation] = useState("")
  const [attendees, setAttendees] = useState<string[]>([])
  const [attendeeComboboxOpen, setAttendeeComboboxOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle event creation
    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setType("")
    setDate("")
    setStartTime("")
    setEndTime("")
    setLocation("")
    setAttendees([])
  }

  const removeAttendee = (attendeeId: string) => {
    setAttendees(attendees.filter((id) => id !== attendeeId))
  }

  return (
    <div className="flex items-center gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Add a new event to your calendar
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter event title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter event description"
                />
              </div>

              <div className="space-y-2">
                <Label>Event Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Event Type</SelectLabel>
                      <SelectItem value="event">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-purple-500" />
                          General Event
                        </div>
                      </SelectItem>
                      <SelectItem value="property">
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4 text-green-500" />
                          Property Viewing
                        </div>
                      </SelectItem>
                      <SelectItem value="deal">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-blue-500" />
                          Deal Meeting
                        </div>
                      </SelectItem>
                      <SelectItem value="client">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-orange-500" />
                          Client Meeting
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Attendees</Label>
                <Popover
                  open={attendeeComboboxOpen}
                  onOpenChange={setAttendeeComboboxOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={attendeeComboboxOpen}
                      className="w-full justify-between"
                    >
                      Select attendees...
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search team members..." />
                      <CommandEmpty>No team member found.</CommandEmpty>
                      <CommandGroup>
                        {team
                          .filter((member) => !attendees.includes(member.id))
                          .map((member) => (
                            <CommandItem
                              key={member.id}
                              value={member.id}
                              onSelect={(value) => {
                                setAttendees([...attendees, value])
                                setAttendeeComboboxOpen(false)
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  attendees.includes(member.id)
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              {member.name}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                {attendees.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {attendees.map((attendeeId) => {
                      const member = team.find((t) => t.id === attendeeId)
                      if (!member) return null

                      return (
                        <Badge
                          key={attendeeId}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {member.name}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => removeAttendee(attendeeId)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Create Event</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  )
}
