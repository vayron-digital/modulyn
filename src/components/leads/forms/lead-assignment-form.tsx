"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const leadAssignmentSchema = z.object({
  assignedTo: z.string({
    required_error: "Please select an agent.",
  }),
  team: z.string({
    required_error: "Please select a team.",
  }),
  priority: z.string({
    required_error: "Please select a priority level.",
  }),
  followUpDate: z.string().min(1, {
    message: "Please select a follow-up date.",
  }),
  autoAssign: z.boolean(),
  sendNotifications: z.boolean(),
  notes: z.string().optional(),
})

type LeadAssignmentValues = z.infer<typeof leadAssignmentSchema>

interface LeadAssignmentFormProps {
  id: string
}

// This would normally come from an API
const agents = [
  { id: "1", name: "Sarah Johnson" },
  { id: "2", name: "Michael Brown" },
  { id: "3", name: "Emily Davis" },
  { id: "4", name: "John Wilson" },
]

const teams = [
  { id: "1", name: "Residential Sales" },
  { id: "2", name: "Luxury Properties" },
  { id: "3", name: "Investment Properties" },
  { id: "4", name: "New Construction" },
]

export function LeadAssignmentForm({ id }: LeadAssignmentFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LeadAssignmentValues>({
    resolver: zodResolver(leadAssignmentSchema),
    defaultValues: {
      assignedTo: "",
      team: "",
      priority: "medium",
      followUpDate: new Date().toISOString().split("T")[0],
      autoAssign: false,
      sendNotifications: true,
      notes: "",
    },
  })

  async function onSubmit(data: LeadAssignmentValues) {
    try {
      setIsLoading(true)
      // Here you would normally save the data to your API
      // const response = await fetch("/api/leads/${id}/assignment", {
      //   method: "PUT",
      //   body: JSON.stringify(data),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Lead assignment saved successfully!")
      router.push(`/dashboard/leads/${id}`)
    } catch (error) {
      toast.error("Failed to save assignment")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="assignedTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned Agent</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select agent" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Agent responsible for this lead
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="team"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Team handling this lead</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Set the priority for follow-up
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="followUpDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Follow-up Date</FormLabel>
                <FormControl>
                  <input
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  When to follow up with this lead
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="autoAssign"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div>
                  <FormLabel>Auto-assign</FormLabel>
                  <FormDescription>
                    Automatically assign leads based on agent availability and
                    expertise
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sendNotifications"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div>
                  <FormLabel>Send Notifications</FormLabel>
                  <FormDescription>
                    Notify assigned agent and team about new leads and updates
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assignment Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any notes about this assignment..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save & Continue"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
