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
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

const propertyFeaturesSchema = z.object({
  interior: z.array(z.string()).min(1, {
    message: "Select at least one interior feature.",
  }),
  exterior: z.array(z.string()).min(1, {
    message: "Select at least one exterior feature.",
  }),
  community: z.array(z.string()),
  utilities: z.array(z.string()).min(1, {
    message: "Select at least one utility feature.",
  }),
  appliances: z.array(z.string()),
})

type PropertyFeaturesValues = z.infer<typeof propertyFeaturesSchema>

interface PropertyFeaturesFormProps {
  id: string
}

const features = {
  interior: [
    "Hardwood Floors",
    "Carpet",
    "Tile",
    "Crown Molding",
    "Recessed Lighting",
    "Ceiling Fan",
    "Walk-in Closet",
    "Master Suite",
    "Fireplace",
    "Granite Countertops",
    "Stainless Steel Appliances",
    "Kitchen Island",
    "Pantry",
    "Breakfast Nook",
    "Formal Dining Room",
    "Office/Study",
    "Laundry Room",
    "Smart Home Features",
  ],
  exterior: [
    "Porch",
    "Deck",
    "Patio",
    "Balcony",
    "Fenced Yard",
    "Sprinkler System",
    "Landscape Lighting",
    "Garden",
    "Pool",
    "Hot Tub",
    "Outdoor Kitchen",
    "Fire Pit",
    "Security System",
    "Storm Shelter",
    "RV Parking",
  ],
  community: [
    "Gated Community",
    "Clubhouse",
    "Fitness Center",
    "Swimming Pool",
    "Tennis Courts",
    "Basketball Courts",
    "Playground",
    "Dog Park",
    "Walking Trails",
    "Lake Access",
    "Golf Course",
    "24/7 Security",
  ],
  utilities: [
    "Public Water",
    "Public Sewer",
    "Natural Gas",
    "Electric",
    "High-Speed Internet",
    "Cable Ready",
    "Solar Panels",
    "Generator",
    "Water Softener",
    "Security System",
  ],
  appliances: [
    "Refrigerator",
    "Range/Oven",
    "Microwave",
    "Dishwasher",
    "Washer",
    "Dryer",
    "Garbage Disposal",
    "Water Heater",
    "HVAC System",
  ],
}

export function PropertyFeaturesForm({ id }: PropertyFeaturesFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<PropertyFeaturesValues>({
    resolver: zodResolver(propertyFeaturesSchema),
    defaultValues: {
      interior: [],
      exterior: [],
      community: [],
      utilities: [],
      appliances: [],
    },
  })

  async function onSubmit(data: PropertyFeaturesValues) {
    try {
      setIsLoading(true)
      // Here you would normally save the data to your API
      // const response = await fetch("/api/properties/${id}/features", {
      //   method: "PUT",
      //   body: JSON.stringify(data),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Property features saved successfully!")
      router.push(`/dashboard/properties/${id}`)
    } catch (error) {
      toast.error("Failed to save property features")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Interior Features</h3>
            <p className="text-sm text-muted-foreground">
              Select all interior features that apply to this property.
            </p>
          </div>
          <FormField
            control={form.control}
            name="interior"
            render={() => (
              <FormItem>
                <div className="grid gap-4 md:grid-cols-3">
                  {features.interior.map((feature) => (
                    <FormField
                      key={feature}
                      control={form.control}
                      name="interior"
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

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Exterior Features</h3>
            <p className="text-sm text-muted-foreground">
              Select all exterior features that apply to this property.
            </p>
          </div>
          <FormField
            control={form.control}
            name="exterior"
            render={() => (
              <FormItem>
                <div className="grid gap-4 md:grid-cols-3">
                  {features.exterior.map((feature) => (
                    <FormField
                      key={feature}
                      control={form.control}
                      name="exterior"
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

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Community Amenities</h3>
            <p className="text-sm text-muted-foreground">
              Select all community amenities available to residents.
            </p>
          </div>
          <FormField
            control={form.control}
            name="community"
            render={() => (
              <FormItem>
                <div className="grid gap-4 md:grid-cols-3">
                  {features.community.map((feature) => (
                    <FormField
                      key={feature}
                      control={form.control}
                      name="community"
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

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Utilities & Infrastructure</h3>
            <p className="text-sm text-muted-foreground">
              Select all utilities and infrastructure features available.
            </p>
          </div>
          <FormField
            control={form.control}
            name="utilities"
            render={() => (
              <FormItem>
                <div className="grid gap-4 md:grid-cols-3">
                  {features.utilities.map((feature) => (
                    <FormField
                      key={feature}
                      control={form.control}
                      name="utilities"
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

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Included Appliances</h3>
            <p className="text-sm text-muted-foreground">
              Select all appliances included with the property.
            </p>
          </div>
          <FormField
            control={form.control}
            name="appliances"
            render={() => (
              <FormItem>
                <div className="grid gap-4 md:grid-cols-3">
                  {features.appliances.map((feature) => (
                    <FormField
                      key={feature}
                      control={form.control}
                      name="appliances"
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
