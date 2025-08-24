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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

const leadPreferencesSchema = z.object({
  propertyType: z.string({
    required_error: "Please select a property type.",
  }),
  minBedrooms: z.string().regex(/^\d+$/, {
    message: "Please enter a valid number.",
  }),
  minBathrooms: z.string().regex(/^\d+(\.\d+)?$/, {
    message: "Please enter a valid number.",
  }),
  minSquareFeet: z.string().regex(/^\d+$/, {
    message: "Please enter a valid number.",
  }),
  maxSquareFeet: z.string().regex(/^\d+$/, {
    message: "Please enter a valid number.",
  }),
  location: z.string().min(1, {
    message: "Please enter preferred location.",
  }),
  minPrice: z.string().regex(/^\d+$/, {
    message: "Please enter a valid price.",
  }),
  maxPrice: z.string().regex(/^\d+$/, {
    message: "Please enter a valid price.",
  }),
  features: z.array(z.string()).min(1, {
    message: "Select at least one feature.",
  }),
  timeline: z.string({
    required_error: "Please select a timeline.",
  }),
  urgency: z.string({
    required_error: "Please select urgency level.",
  }),
})

type LeadPreferencesValues = z.infer<typeof leadPreferencesSchema>

interface LeadPreferencesFormProps {
  id: string
}

const features = [
  "Modern Kitchen",
  "Hardwood Floors",
  "Garage",
  "Backyard",
  "Pool",
  "Home Office",
  "Fireplace",
  "Central Air",
  "Walk-in Closets",
  "Smart Home",
  "Energy Efficient",
  "Open Floor Plan",
  "High Ceilings",
  "Basement",
  "Deck/Patio",
]

export function LeadPreferencesForm({ id }: LeadPreferencesFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LeadPreferencesValues>({
    resolver: zodResolver(leadPreferencesSchema),
    defaultValues: {
      propertyType: "",
      minBedrooms: "3",
      minBathrooms: "2",
      minSquareFeet: "1500",
      maxSquareFeet: "3000",
      location: "",
      minPrice: "500000",
      maxPrice: "800000",
      features: [],
      timeline: "",
      urgency: "",
    },
  })

  async function onSubmit(data: LeadPreferencesValues) {
    try {
      setIsLoading(true)
      // Here you would normally save the data to your API
      // const response = await fetch("/api/leads/${id}/preferences", {
      //   method: "PUT",
      //   body: JSON.stringify(data),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Lead preferences saved successfully!")
      router.push(`/dashboard/leads/${id}`)
    } catch (error) {
      toast.error("Failed to save preferences")
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
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="single-family">Single Family</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="multi-family">Multi Family</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Location</FormLabel>
                <FormControl>
                  <Input placeholder="Neighborhood or area" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <FormField
            control={form.control}
            name="minBedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Bedrooms</FormLabel>
                <FormControl>
                  <Input type="number" min="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minBathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Bathrooms</FormLabel>
                <FormControl>
                  <Input type="number" min="1" step="0.5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minSquareFeet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Square Feet</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxSquareFeet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Square Feet</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="minPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="10000"
                    placeholder="500000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="10000"
                    placeholder="800000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div>
          <h3 className="mb-4 font-medium">Desired Features</h3>
          <FormField
            control={form.control}
            name="features"
            render={() => (
              <FormItem>
                <div className="grid gap-4 md:grid-cols-3">
                  {features.map((feature) => (
                    <FormField
                      key={feature}
                      control={form.control}
                      name="features"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(feature)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, feature])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== feature
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {feature}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="timeline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purchase Timeline</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="1-3months">1-3 Months</SelectItem>
                    <SelectItem value="3-6months">3-6 Months</SelectItem>
                    <SelectItem value="6-12months">6-12 Months</SelectItem>
                    <SelectItem value="12+months">12+ Months</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  When are they looking to make a purchase?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="urgency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Urgency Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  How urgent is their need to purchase?
                </FormDescription>
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
