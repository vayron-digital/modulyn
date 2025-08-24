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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

const propertyBasicSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  type: z.string({
    required_error: "Please select a property type.",
  }),
  status: z.string({
    required_error: "Please select a property status.",
  }),
  mlsNumber: z.string().optional(),
  yearBuilt: z.string().regex(/^\d{4}$/, {
    message: "Please enter a valid year.",
  }),
  propertyId: z.string().optional(),
  agent: z.string({
    required_error: "Please select a listing agent.",
  }),
})

type PropertyBasicValues = z.infer<typeof propertyBasicSchema>

interface PropertyBasicFormProps {
  id: string
}

// This would normally come from an API
const agents = [
  { id: "1", name: "Sarah Johnson" },
  { id: "2", name: "Michael Brown" },
  { id: "3", name: "Emily Davis" },
  { id: "4", name: "John Wilson" },
]

export function PropertyBasicForm({ id }: PropertyBasicFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<PropertyBasicValues>({
    resolver: zodResolver(propertyBasicSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
      status: "active",
      yearBuilt: new Date().getFullYear().toString(),
    },
  })

  async function onSubmit(data: PropertyBasicValues) {
    try {
      setIsLoading(true)
      // Here you would normally save the data to your API
      // const response = await fetch("/api/properties/${id}", {
      //   method: "PUT",
      //   body: JSON.stringify(data),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Property basic information saved successfully!")
      router.push(`/dashboard/properties/${id}`)
    } catch (error) {
      toast.error("Failed to save property information")
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Title</FormLabel>
                <FormControl>
                  <Input placeholder="Modern Family Home" {...field} />
                </FormControl>
                <FormDescription>
                  A descriptive title for the property listing.
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
                <FormLabel>Property Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="single-family">Single Family</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="multi-family">Multi Family</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The type of property being listed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the property..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A detailed description of the property. Include key features and
                selling points.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="off-market">Off Market</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Current status of the property.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Listing Agent</FormLabel>
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
                  Agent responsible for this listing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="mlsNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MLS Number</FormLabel>
                <FormControl>
                  <Input placeholder="MLS12345678" {...field} />
                </FormControl>
                <FormDescription>
                  Multiple Listing Service number (optional).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearBuilt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year Built</FormLabel>
                <FormControl>
                  <Input placeholder="2024" {...field} />
                </FormControl>
                <FormDescription>Year the property was built.</FormDescription>
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
