"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

const scheduleItemSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  type: z.enum(["keynote", "session", "workshop", "break"]),
  startTime: z.date({
    required_error: "A start time is required.",
  }),
  endTime: z.date({
    required_error: "An end time is required.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
}).refine((data) => data.endTime > data.startTime, {
  message: "End time must be after start time.",
  path: ["endTime"],
})

type ScheduleItemValues = z.infer<typeof scheduleItemSchema>

interface EventScheduleProps {
  id: string
}

// This would normally come from an API
const scheduleItems = [
  {
    id: "1",
    title: "Opening Keynote",
    description: "Welcome and industry trends overview",
    type: "keynote",
    startTime: new Date(2024, 2, 15, 9, 0),
    endTime: new Date(2024, 2, 15, 10, 0),
    location: "Main Hall",
    speakers: ["John Smith"],
  },
  {
    id: "2",
    title: "Coffee Break",
    description: "Networking opportunity",
    type: "break",
    startTime: new Date(2024, 2, 15, 10, 0),
    endTime: new Date(2024, 2, 15, 10, 30),
    location: "Lobby",
    speakers: [],
  },
  {
    id: "3",
    title: "Future of Trade",
    description: "Panel discussion on emerging trends",
    type: "session",
    startTime: new Date(2024, 2, 15, 10, 30),
    endTime: new Date(2024, 2, 15, 12, 0),
    location: "Room A",
    speakers: ["Sarah Johnson", "Michael Brown"],
  },
]

export function EventSchedule({ id }: EventScheduleProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ScheduleItemValues>({
    resolver: zodResolver(scheduleItemSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "session",
      location: "",
    },
  })

  async function onSubmit(data: ScheduleItemValues) {
    try {
      setIsLoading(true)
      // Here you would normally save the schedule item to your API
      // const response = await fetch("/api/events/${id}/schedule", {
      //   method: "POST",
      //   body: JSON.stringify(data),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Schedule item added successfully!")
      setIsAdding(false)
      form.reset()
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Time</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Speakers</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scheduleItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {format(item.startTime, "h:mm a")} -{" "}
                {format(item.endTime, "h:mm a")}
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    item.type === "keynote"
                      ? "default"
                      : item.type === "session"
                      ? "secondary"
                      : item.type === "workshop"
                      ? "outline"
                      : "destructive"
                  }
                >
                  {item.type}
                </Badge>
              </TableCell>
              <TableCell>
                {item.speakers.length > 0 ? (
                  item.speakers.join(", ")
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isAdding ? (
        <div className="border rounded-lg p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Opening Keynote" {...field} />
                    </FormControl>
                    <FormDescription>
                      A clear title for this schedule item.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe this schedule item..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide more details about this item.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Time</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP p")
                              ) : (
                                <span>Pick a date and time</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                          <div className="p-3 border-t">
                            <Input
                              type="time"
                              onChange={(e) => {
                                const [hours, minutes] = e.target.value
                                  .split(":")
                                  .map(Number)
                                const date = field.value || new Date()
                                date.setHours(hours)
                                date.setMinutes(minutes)
                                field.onChange(date)
                              }}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        When does this item start?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Time</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP p")
                              ) : (
                                <span>Pick a date and time</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                          <div className="p-3 border-t">
                            <Input
                              type="time"
                              onChange={(e) => {
                                const [hours, minutes] = e.target.value
                                  .split(":")
                                  .map(Number)
                                const date = field.value || new Date()
                                date.setHours(hours)
                                date.setMinutes(minutes)
                                field.onChange(date)
                              }}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        When does this item end?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="keynote">Keynote</SelectItem>
                          <SelectItem value="session">Session</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="break">Break</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The type of schedule item.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Main Hall" {...field} />
                      </FormControl>
                      <FormDescription>
                        Where this item takes place.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAdding(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add Schedule Item"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <Button onClick={() => setIsAdding(true)}>Add Schedule Item</Button>
      )}
    </div>
  )
}
