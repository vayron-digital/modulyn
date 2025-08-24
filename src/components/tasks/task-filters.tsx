"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  SlidersHorizontal,
  Search,
  Building2,
  Home,
  Users,
  FileText,
  Calendar,
} from "lucide-react"

export function TaskFilters() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [priority, setPriority] = useState("")
  const [status, setStatus] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [assignee, setAssignee] = useState("")
  const [showCompleted, setShowCompleted] = useState(true)
  const [categories, setCategories] = useState({
    deals: true,
    properties: true,
    clients: true,
    documents: true,
  })

  return (
    <div className="flex items-center gap-2">
      <div className="flex w-full max-w-sm items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
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
            <SheetTitle>Filter Tasks</SheetTitle>
            <SheetDescription>
              Customize your task view with advanced filters
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority Level</SelectLabel>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Task Status</SelectLabel>
                    <SelectItem value="not_started">Not Started</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on_hold">On Hold</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Select value={dueDate} onValueChange={setDueDate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select due date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Time Frame</SelectLabel>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="this_week">This Week</SelectItem>
                    <SelectItem value="next_week">Next Week</SelectItem>
                    <SelectItem value="this_month">This Month</SelectItem>
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
                    id="clients"
                    checked={categories.clients}
                    onCheckedChange={(checked) =>
                      setCategories({ ...categories, clients: checked })
                    }
                  />
                  <Label htmlFor="clients" className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    Clients
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="documents"
                    checked={categories.documents}
                    onCheckedChange={(checked) =>
                      setCategories({ ...categories, documents: checked })
                    }
                  />
                  <Label htmlFor="documents" className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-orange-500" />
                    Documents
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Show Completed Tasks</Label>
                <Switch
                  checked={showCompleted}
                  onCheckedChange={setShowCompleted}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setPriority("")
                  setStatus("")
                  setDueDate("")
                  setAssignee("")
                  setCategories({
                    deals: true,
                    properties: true,
                    clients: true,
                    documents: true,
                  })
                  setShowCompleted(true)
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
