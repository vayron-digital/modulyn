"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
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
  SlidersHorizontal,
  Search,
  Building2,
  Home,
  Users,
  FileText,
  Calendar,
  CheckCircle2,
} from "lucide-react"

export function CalendarFilters() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [dateRange, setDateRange] = useState("")
  const [assignee, setAssignee] = useState("")
  const [categories, setCategories] = useState({
    events: true,
    tasks: true,
    properties: true,
    deals: true,
  })
  const [statuses, setStatuses] = useState({
    confirmed: true,
    pending: true,
    completed: true,
    inProgress: true,
    notStarted: true,
  })

  return (
    <div className="flex items-center gap-2">
      <div className="flex w-full max-w-sm items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search calendar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9"
        />
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter Calendar</SheetTitle>
            <SheetDescription>
              Customize your calendar view with advanced filters
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Time Frame</SelectLabel>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="this_week">This Week</SelectItem>
                    <SelectItem value="next_week">Next Week</SelectItem>
                    <SelectItem value="this_month">This Month</SelectItem>
                    <SelectItem value="next_month">Next Month</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Assignee</Label>
              <Select value={assignee} onValueChange={setAssignee}>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Team Members</SelectLabel>
                    <SelectItem value="me">Assigned to Me</SelectItem>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="michael">Michael Brown</SelectItem>
                    <SelectItem value="emma">Emma Wilson</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Categories</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Switch
                    id="events"
                    checked={categories.events}
                    onCheckedChange={(checked) =>
                      setCategories({ ...categories, events: checked })
                    }
                  />
                  <Label htmlFor="events" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    Events
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="tasks"
                    checked={categories.tasks}
                    onCheckedChange={(checked) =>
                      setCategories({ ...categories, tasks: checked })
                    }
                  />
                  <Label htmlFor="tasks" className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-orange-500" />
                    Tasks
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="properties"
                    checked={categories.properties}
                    onCheckedChange={(checked) =>
                      setCategories({ ...categories, properties: checked })
                    }
                  />
                  <Label htmlFor="properties" className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-green-500" />
                    Properties
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="deals"
                    checked={categories.deals}
                    onCheckedChange={(checked) =>
                      setCategories({ ...categories, deals: checked })
                    }
                  />
                  <Label htmlFor="deals" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-500" />
                    Deals
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Status</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Switch
                    id="confirmed"
                    checked={statuses.confirmed}
                    onCheckedChange={(checked) =>
                      setStatuses({ ...statuses, confirmed: checked })
                    }
                  />
                  <Label htmlFor="confirmed">Confirmed</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="pending"
                    checked={statuses.pending}
                    onCheckedChange={(checked) =>
                      setStatuses({ ...statuses, pending: checked })
                    }
                  />
                  <Label htmlFor="pending">Pending</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="completed"
                    checked={statuses.completed}
                    onCheckedChange={(checked) =>
                      setStatuses({ ...statuses, completed: checked })
                    }
                  />
                  <Label htmlFor="completed">Completed</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="inProgress"
                    checked={statuses.inProgress}
                    onCheckedChange={(checked) =>
                      setStatuses({ ...statuses, inProgress: checked })
                    }
                  />
                  <Label htmlFor="inProgress">In Progress</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="notStarted"
                    checked={statuses.notStarted}
                    onCheckedChange={(checked) =>
                      setStatuses({ ...statuses, notStarted: checked })
                    }
                  />
                  <Label htmlFor="notStarted">Not Started</Label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setDateRange("")
                  setAssignee("")
                  setCategories({
                    events: true,
                    tasks: true,
                    properties: true,
                    deals: true,
                  })
                  setStatuses({
                    confirmed: true,
                    pending: true,
                    completed: true,
                    inProgress: true,
                    notStarted: true,
                  })
                }}
              >
                Reset Filters
              </Button>
              <Button onClick={() => setOpen(false)}>Apply Filters</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
