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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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
  Upload,
  Download,
  Building2,
  Home,
  Users,
  FileText,
  Check,
  ChevronsUpDown,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

// This would normally come from an API
const tasks = [
  {
    id: "1",
    title: "Schedule property viewing",
    status: "in_progress",
  },
  {
    id: "2",
    title: "Review purchase agreement",
    status: "not_started",
  },
  {
    id: "3",
    title: "Follow up with client",
    status: "completed",
  },
  {
    id: "4",
    title: "Update listing documents",
    status: "in_progress",
  },
]

export function TaskActions() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [category, setCategory] = useState("")
  const [assignee, setAssignee] = useState("")
  const [dependencies, setDependencies] = useState<string[]>([])
  const [dependencyComboboxOpen, setDependencyComboboxOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle task creation
    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setPriority("")
    setDueDate("")
    setCategory("")
    setAssignee("")
    setDependencies([])
  }

  const removeDependency = (taskId: string) => {
    setDependencies(dependencies.filter((id) => id !== taskId))
  }

  return (
    <div className="flex items-center gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new task to your task list
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter task title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter task description"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
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
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Task Category</SelectLabel>
                        <SelectItem value="deals">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-blue-500" />
                            Deals
                          </div>
                        </SelectItem>
                        <SelectItem value="properties">
                          <div className="flex items-center gap-2">
                            <Home className="h-4 w-4 text-green-500" />
                            Properties
                          </div>
                        </SelectItem>
                        <SelectItem value="clients">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-purple-500" />
                            Clients
                          </div>
                        </SelectItem>
                        <SelectItem value="documents">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-orange-500" />
                            Documents
                          </div>
                        </SelectItem>
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
                        <SelectItem value="me">Assign to Me</SelectItem>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="michael">Michael Brown</SelectItem>
                        <SelectItem value="emma">Emma Wilson</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Dependencies</Label>
                <Popover
                  open={dependencyComboboxOpen}
                  onOpenChange={setDependencyComboboxOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={dependencyComboboxOpen}
                      className="w-full justify-between"
                    >
                      Select dependencies...
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search tasks..." />
                      <CommandEmpty>No tasks found.</CommandEmpty>
                      <CommandGroup>
                        {tasks
                          .filter((task) => !dependencies.includes(task.id))
                          .map((task) => (
                            <CommandItem
                              key={task.id}
                              value={task.id}
                              onSelect={(value) => {
                                setDependencies([...dependencies, value])
                                setDependencyComboboxOpen(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  dependencies.includes(task.id)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {task.title}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                {dependencies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {dependencies.map((taskId) => {
                      const task = tasks.find((t) => t.id === taskId)
                      if (!task) return null

                      return (
                        <Badge
                          key={taskId}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {task.title}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => removeDependency(taskId)}
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
              <Button type="submit">Create Task</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Button variant="outline">
        <Upload className="mr-2 h-4 w-4" />
        Import
      </Button>

      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  )
}