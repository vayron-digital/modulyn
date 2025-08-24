"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon, MapPin } from "lucide-react"
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
import { toast } from "sonner"

const eventFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  type: z.enum(["conference", "workshop", "webinar", "networking"]),
  startDate: z.date({
    required_error: "A start date is required.",
  }),
  endDate: z.date({
    required_error: "An end date is required.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  capacity: z.number().min(1, {
    message: "Capacity must be at least 1.",
  }),
  registrationDeadline: z.date({
    required_error: "A registration deadline is required.",
  }),
}).refine((data) => data.endDate >= data.startDate, {
  message: "End date cannot be earlier than start date.",
  path: ["endDate"],
}).refine((data) => data.registrationDeadline <= data.startDate, {
  message: "Registration deadline must be before the event starts.",
  path: ["registrationDeadline"],
})

type EventFormValues = z.infer<typeof eventFormSchema>

interface EventFormProps {
  id: string
}

export function EventForm({ id }: EventFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "conference",
      location: "",
      capacity: 100,
    },
  })

  async function onSubmit(data: EventFormValues) {
    try {
      setIsLoading(true)
      // Here you would normally save the event to your API
      // const response = await fetch("/api/events", {
      //   method: "POST",
      //   body: JSON.stringify(data),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success(
        id === "new"
          ? "Event created successfully!"
          : "Event updated successfully!"
      )
      router.push("/dashboard/events")
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Title</FormLabel>
              <FormControl>
                <Input placeholder="Annual Trade Conference 2024" {...field} />
              </FormControl>
              <FormDescription>
                A clear and descriptive title for your event.
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
                  placeholder="Tell attendees what your event is about..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a detailed description of your event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="webinar">Webinar</SelectItem>
                  <SelectItem value="networking">Networking</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the type that best describes your event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
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
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
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
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  When does your event start?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
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
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
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
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  When does your event end?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Chicago, IL or Virtual"
                    className="pl-8"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Physical location or "Virtual" for online events.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Maximum number of attendees.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registrationDeadline"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Registration Deadline</FormLabel>
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
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
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
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Last day for registration.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/events")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              "Saving..."
            ) : id === "new" ? (
              "Create Event"
            ) : (
              "Update Event"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
