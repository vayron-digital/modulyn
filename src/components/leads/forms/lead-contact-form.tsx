"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

const leadContactSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  alternatePhone: z.string().optional(),
  communicationPreference: z.string({
    required_error: "Please select a communication preference.",
  }),
  bestTimeToContact: z.string({
    required_error: "Please select the best time to contact.",
  }),
  homeAddress: z.string().min(1, {
    message: "Please enter the home address.",
  }),
  workAddress: z.string().optional(),
  company: z.string().optional(),
  occupation: z.string().optional(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
})

type LeadContactValues = z.infer<typeof leadContactSchema>

interface LeadContactFormProps {
  id: string
}

export function LeadContactForm({ id }: LeadContactFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LeadContactValues>({
    resolver: zodResolver(leadContactSchema),
    defaultValues: {
      email: "",
      phone: "",
      alternatePhone: "",
      communicationPreference: "",
      bestTimeToContact: "",
      homeAddress: "",
      workAddress: "",
      company: "",
      occupation: "",
      website: "",
      linkedin: "",
      twitter: "",
    },
  })

  async function onSubmit(data: LeadContactValues) {
    try {
      setIsLoading(true)
      // Here you would normally save the data to your API
      // const response = await fetch("/api/leads/${id}/contact", {
      //   method: "PUT",
      //   body: JSON.stringify(data),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Lead contact information saved successfully!")
      router.push(`/dashboard/leads/${id}`)
    } catch (error) {
      toast.error("Failed to save contact information")
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="(555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="communicationPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Communication Preference</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="text">Text Message</SelectItem>
                    <SelectItem value="any">Any</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Preferred method of communication
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bestTimeToContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Best Time to Contact</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                    <SelectItem value="any">Any Time</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  When is the best time to reach out?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="homeAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St, City, State, ZIP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Address (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="456 Business Ave, City, State, ZIP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupation (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Job title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="www.example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="linkedin.com/in/username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="twitter.com/username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
