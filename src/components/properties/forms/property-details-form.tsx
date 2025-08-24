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

const propertyDetailsSchema = z.object({
  bedrooms: z.string().regex(/^\d+$/, {
    message: "Please enter a valid number.",
  }),
  bathrooms: z.string().regex(/^\d+(\.\d+)?$/, {
    message: "Please enter a valid number.",
  }),
  squareFeet: z.string().regex(/^\d+$/, {
    message: "Please enter a valid number.",
  }),
  lotSize: z.string().min(1, {
    message: "Please enter the lot size.",
  }),
  stories: z.string().regex(/^\d+$/, {
    message: "Please enter a valid number.",
  }),
  garage: z.string().min(1, {
    message: "Please select a garage type.",
  }),
  parking: z.string().min(1, {
    message: "Please enter parking details.",
  }),
  basement: z.string().min(1, {
    message: "Please select a basement type.",
  }),
  exterior: z.string().min(1, {
    message: "Please select an exterior type.",
  }),
  roof: z.string().min(1, {
    message: "Please select a roof type.",
  }),
  heating: z.string().min(1, {
    message: "Please select a heating type.",
  }),
  cooling: z.string().min(1, {
    message: "Please select a cooling type.",
  }),
})

type PropertyDetailsValues = z.infer<typeof propertyDetailsSchema>

interface PropertyDetailsFormProps {
  id: string
}

export function PropertyDetailsForm({ id }: PropertyDetailsFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<PropertyDetailsValues>({
    resolver: zodResolver(propertyDetailsSchema),
    defaultValues: {
      bedrooms: "",
      bathrooms: "",
      squareFeet: "",
      lotSize: "",
      stories: "1",
      garage: "",
      parking: "",
      basement: "",
      exterior: "",
      roof: "",
      heating: "",
      cooling: "",
    },
  })

  async function onSubmit(data: PropertyDetailsValues) {
    try {
      setIsLoading(true)
      // Here you would normally save the data to your API
      // const response = await fetch("/api/properties/${id}/details", {
      //   method: "PUT",
      //   body: JSON.stringify(data),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Property details saved successfully!")
      router.push(`/dashboard/properties/${id}`)
    } catch (error) {
      toast.error("Failed to save property details")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
        <div className="grid gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrooms</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
                <FormDescription>Number of bedrooms.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathrooms</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.5" {...field} />
                </FormControl>
                <FormDescription>Number of bathrooms.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="squareFeet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Square Feet</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
                <FormDescription>Total living area.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="lotSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lot Size</FormLabel>
                <FormControl>
                  <Input placeholder="0.25 acres" {...field} />
                </FormControl>
                <FormDescription>Size of the property lot.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stories</FormLabel>
                <FormControl>
                  <Input type="number" min="1" {...field} />
                </FormControl>
                <FormDescription>Number of stories/floors.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="garage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Garage</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select garage type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">No Garage</SelectItem>
                    <SelectItem value="1-car-attached">1 Car Attached</SelectItem>
                    <SelectItem value="2-car-attached">2 Car Attached</SelectItem>
                    <SelectItem value="3-car-attached">3 Car Attached</SelectItem>
                    <SelectItem value="1-car-detached">1 Car Detached</SelectItem>
                    <SelectItem value="2-car-detached">2 Car Detached</SelectItem>
                    <SelectItem value="3-car-detached">3 Car Detached</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Type of garage available.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parking"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parking</FormLabel>
                <FormControl>
                  <Input placeholder="4 spaces" {...field} />
                </FormControl>
                <FormDescription>Additional parking details.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="basement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Basement</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select basement type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">No Basement</SelectItem>
                    <SelectItem value="unfinished">Unfinished</SelectItem>
                    <SelectItem value="partially-finished">
                      Partially Finished
                    </SelectItem>
                    <SelectItem value="finished">Finished</SelectItem>
                    <SelectItem value="walkout">Walkout</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Type of basement.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="exterior"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exterior</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exterior type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="brick">Brick</SelectItem>
                    <SelectItem value="vinyl">Vinyl</SelectItem>
                    <SelectItem value="wood">Wood</SelectItem>
                    <SelectItem value="stucco">Stucco</SelectItem>
                    <SelectItem value="stone">Stone</SelectItem>
                    <SelectItem value="fiber-cement">Fiber Cement</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Exterior material.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="roof"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roof</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select roof type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="asphalt">Asphalt Shingle</SelectItem>
                    <SelectItem value="metal">Metal</SelectItem>
                    <SelectItem value="tile">Tile</SelectItem>
                    <SelectItem value="slate">Slate</SelectItem>
                    <SelectItem value="wood">Wood Shake</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Roof material.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="heating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heating</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select heating type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="forced-air">Forced Air</SelectItem>
                    <SelectItem value="heat-pump">Heat Pump</SelectItem>
                    <SelectItem value="radiant">Radiant</SelectItem>
                    <SelectItem value="baseboard">Baseboard</SelectItem>
                    <SelectItem value="geothermal">Geothermal</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Heating system type.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cooling"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cooling</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cooling type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="central">Central Air</SelectItem>
                    <SelectItem value="heat-pump">Heat Pump</SelectItem>
                    <SelectItem value="wall-unit">Wall Units</SelectItem>
                    <SelectItem value="mini-split">Mini Split</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Cooling system type.</FormDescription>
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
