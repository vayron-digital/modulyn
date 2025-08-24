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
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

const propertyLocationSchema = z.object({
  address: z.string().min(1, {
    message: "Address is required.",
  }),
  unit: z.string().optional(),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  state: z.string().min(1, {
    message: "State is required.",
  }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, {
    message: "Please enter a valid ZIP code.",
  }),
  country: z.string().min(1, {
    message: "Country is required.",
  }),
  neighborhood: z.string().min(1, {
    message: "Neighborhood is required.",
  }),
  latitude: z.string().regex(/^-?\d*\.?\d*$/, {
    message: "Please enter a valid latitude.",
  }),
  longitude: z.string().regex(/^-?\d*\.?\d*$/, {
    message: "Please enter a valid longitude.",
  }),
  schools: z.object({
    elementary: z.string().min(1, {
      message: "Elementary school is required.",
    }),
    middle: z.string().min(1, {
      message: "Middle school is required.",
    }),
    high: z.string().min(1, {
      message: "High school is required.",
    }),
  }),
})

type PropertyLocationValues = z.infer<typeof propertyLocationSchema>

interface PropertyLocationFormProps {
  id: string
}

// This would normally come from an API
const states = [
  { code: "IL", name: "Illinois" },
  { code: "NY", name: "New York" },
  { code: "CA", name: "California" },
  // Add more states...
]

export function PropertyLocationForm({ id }: PropertyLocationFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<PropertyLocationValues>({
    resolver: zodResolver(propertyLocationSchema),
    defaultValues: {
      address: "",
      unit: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
      neighborhood: "",
      latitude: "",
      longitude: "",
      schools: {
        elementary: "",
        middle: "",
        high: "",
      },
    },
  })

  async function onSubmit(data: PropertyLocationValues) {
    try {
      setIsLoading(true)
      // Here you would normally save the data to your API
      // const response = await fetch("/api/properties/${id}/location", {
      //   method: "PUT",
      //   body: JSON.stringify(data),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Property location saved successfully!")
      router.push(`/dashboard/properties/${id}`)
    } catch (error) {
      toast.error("Failed to save property location")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Property Address</h3>
            <p className="text-sm text-muted-foreground">
              Enter the physical location of the property.
            </p>
          </div>

          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-4">
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit/Apt #</FormLabel>
                    <FormControl>
                      <Input placeholder="Apt 4B" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Chicago" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state.code} value={state.code}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP Code</FormLabel>
                    <FormControl>
                      <Input placeholder="60601" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Location Details</h3>
            <p className="text-sm text-muted-foreground">
              Additional location information.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Neighborhood</FormLabel>
                  <FormControl>
                    <Input placeholder="River North" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of the neighborhood or subdivision.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input placeholder="41.8781" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input placeholder="-87.6298" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">School Information</h3>
            <p className="text-sm text-muted-foreground">
              Enter the schools assigned to this property.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="schools.elementary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Elementary School</FormLabel>
                  <FormControl>
                    <Input placeholder="Lincoln Elementary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="schools.middle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle School</FormLabel>
                  <FormControl>
                    <Input placeholder="Washington Middle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="schools.high"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>High School</FormLabel>
                  <FormControl>
                    <Input placeholder="Roosevelt High" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
