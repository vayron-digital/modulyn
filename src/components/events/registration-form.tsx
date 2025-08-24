"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

const attendeeSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  title: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  dietaryRequirements: z.string().optional(),
  accessibility: z.string().optional(),
})

const registrationSchema = z.object({
  attendees: z.array(attendeeSchema),
  specialRequirements: z.string().optional(),
})

type RegistrationValues = z.infer<typeof registrationSchema>

interface RegistrationFormProps {
  eventId: string
  tickets: { id: string; quantity: number; price: number }[]
  onComplete: (data: { attendees: any[] }) => void
}

export function RegistrationForm({
  eventId,
  tickets,
  onComplete,
}: RegistrationFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const totalAttendees = tickets.reduce((sum, ticket) => sum + ticket.quantity, 0)

  const form = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      attendees: Array(totalAttendees).fill({
        firstName: "",
        lastName: "",
        email: "",
        title: "",
        company: "",
      }),
      specialRequirements: "",
    },
  })

  const { fields } = useFieldArray({
    name: "attendees",
    control: form.control,
  })

  async function onSubmit(data: RegistrationValues) {
    try {
      setIsLoading(true)
      // Here you would normally validate the registration with your API
      // const response = await fetch("/api/events/${eventId}/validate-registration", {
      //   method: "POST",
      //   body: JSON.stringify(data),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onComplete({ attendees: data.attendees })
    } catch (error) {
      toast.error("Failed to process registration")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Attendee {index + 1}</h3>
              <div className="text-sm text-muted-foreground">
                {tickets.find((t, i) => {
                  const prevQuantities = tickets
                    .slice(0, i)
                    .reduce((sum, t) => sum + t.quantity, 0)
                  return (
                    index >= prevQuantities &&
                    index < prevQuantities + t.quantity
                  )
                })?.id === "3" && (
                  <Badge variant="secondary">VIP Ticket</Badge>
                )}
              </div>
            </div>

            <div className="grid gap-4 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name={`attendees.${index}.firstName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`attendees.${index}.lastName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`attendees.${index}.email`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name={`attendees.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`attendees.${index}.company`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`attendees.${index}.dietaryRequirements`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dietary Requirements</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select dietary requirements" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="gluten-free">Gluten Free</SelectItem>
                        <SelectItem value="dairy-free">Dairy Free</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`attendees.${index}.accessibility`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accessibility Requirements</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please let us know if you have any accessibility requirements"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {index < fields.length - 1 && <Separator className="my-6" />}
          </div>
        ))}

        <FormField
          control={form.control}
          name="specialRequirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Requirements</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional requirements or notes"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please let us know if you have any special requirements or
                requests.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Back
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : "Continue"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

