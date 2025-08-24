"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
  Search,
  Mail,
  Calendar,
  Paperclip,
  User,
  Tag,
  Filter,
} from "lucide-react"

type BaseSearchItem = {
  id: string
  label: string
}

type CommonSearchItem = BaseSearchItem & {
  type: 'common'
  filter: string
}

type OperatorItem = BaseSearchItem & {
  type: 'operator'
  description: string
}

type SearchGroup = {
  group: string
  items: (CommonSearchItem | OperatorItem)[]
}

// This would normally come from an API
const searchSuggestions: SearchGroup[] = [
  {
    group: "Common Searches",
    items: [
      { id: "1", type: "common", label: "Unread emails", filter: "is:unread" },
      { id: "2", type: "common", label: "Emails with attachments", filter: "has:attachment" },
      { id: "3", type: "common", label: "Starred emails", filter: "is:starred" },
      { id: "4", type: "common", label: "Recent emails", filter: "newer_than:7d" },
    ],
  },
  {
    group: "Search Operators",
    items: [
      { id: "5", type: "operator", label: "from:[email]", description: "Emails from a sender" },
      { id: "6", type: "operator", label: "to:[email]", description: "Emails to a recipient" },
      { id: "7", type: "operator", label: "subject:[text]", description: "Search in subject" },
      { id: "8", type: "operator", label: "has:attachment", description: "With attachments" },
    ],
  },
]

export function EmailSearch() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search emails..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {searchSuggestions.map((group) => (
                <CommandGroup key={group.group} heading={group.group}>
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.id}
                      onSelect={() => {
                        // Use filter for common searches, label for operator items
                        const searchValue = item.type === 'common' ? item.filter : item.label
                        setSearch(searchValue)
                        setOpen(false)
                      }}
                    >
                      {item.label}
                      {'description' in item && (
                        <span className="ml-2 text-sm text-muted-foreground">
                          {item.description}
                        </span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={showFilters} onOpenChange={setShowFilters}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px]" align="end">
          <div className="space-y-2">
            <div className="font-medium">Search Filters</div>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <Mail className="mr-2 h-4 w-4" />
                By Email
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                By Date
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Paperclip className="mr-2 h-4 w-4" />
                Has Attachment
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                From Contact
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Tag className="mr-2 h-4 w-4" />
                By Label
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
