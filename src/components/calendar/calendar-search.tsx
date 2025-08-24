"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Calendar,
  Search,
  Building2,
  Home,
  Users,
  FileText,
  Clock,
  MapPin,
  CalendarDays,
} from "lucide-react"
import { format, isToday, isTomorrow, isThisWeek } from "date-fns"

// This would normally come from an API
const searchResults = [
  {
    id: "1",
    title: "Property Viewing",
    type: "property",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    location: "123 Main Street",
    icon: Home,
    color: "text-green-500",
    attendees: ["Sarah Johnson", "John Smith"],
  },
  {
    id: "2",
    title: "Contract Review",
    type: "deal",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    location: "Office",
    icon: Building2,
    color: "text-blue-500",
    attendees: ["Michael Brown", "Emma Wilson"],
  },
  {
    id: "3",
    title: "Client Meeting",
    type: "client",
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    location: "Virtual",
    icon: Users,
    color: "text-orange-500",
    attendees: ["David Lee"],
  },
]

export function CalendarSearch() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return "Today"
    if (isTomorrow(date)) return "Tomorrow"
    if (isThisWeek(date)) return format(date, "EEEE")
    return format(date, "MMM d, yyyy")
  }

  const getTimeLabel = (date: Date) => {
    return format(date, "h:mm a")
  }

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-start"
          >
            <Search className="mr-2 h-4 w-4" />
            Search calendar...
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search events, tasks, and more..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Upcoming Events">
                <ScrollArea className="h-[300px]">
                  {searchResults.map((result) => (
                    <CommandItem
                      key={result.id}
                      value={result.id}
                      onSelect={() => {
                        // Handle selection
                        setOpen(false)
                      }}
                      className="p-2"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <result.icon
                            className={`h-4 w-4 ${result.color}`}
                          />
                          <span className="font-medium">{result.title}</span>
                          <Badge variant="outline">
                            {result.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            <span>{getDateLabel(result.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{getTimeLabel(result.date)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{result.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>
                              {result.attendees.length}{" "}
                              {result.attendees.length === 1
                                ? "attendee"
                                : "attendees"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
