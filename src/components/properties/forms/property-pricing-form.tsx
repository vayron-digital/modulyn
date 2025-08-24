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
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

const propertyPricingSchema = z.object({
  listPrice: z.string().regex(/^\d+$/, {
    message: "Please enter a valid price.",
  }),
  pricePerSqFt: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Please enter a valid price per square foot.",
  }),
  showPriceHistory: z.boolean(),
  priceHistory: z.array(
    z.object({
      date: z.string(),
      price: z.string().regex(/^\d+$/, {
        message: "Please enter a valid price.",
      }),
      type: z.string(),
    })
  ),
  taxAssessment: z.string().regex(/^\d+$/, {
    message: "Please enter a valid tax assessment value.",
  }),
  taxYear: z.string().regex(/^\d{4}$/, {
    message: "Please enter a valid year.",
  }),
  annualTaxAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Please enter a valid tax amount.",
  }),
  hoaFees: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Please enter a valid HOA fee amount.",
  }),
  hoaFrequency: z.string(),
  hoaIncludes: z.string(),
  financing: z.object({
    conventional: z.boolean(),
    fha: z.boolean(),
    va: z.boolean(),
    cash: z.boolean(),
  }),
  terms: z.string(),
})

type PropertyPricingValues = z.infer<typeof propertyPricingSchema>

interface PropertyPricingFormProps {
  id: string
}

export function PropertyPricingForm({ id }: PropertyPricingFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<PropertyPricingValues>({
    resolver: zodResolver(propertyPricingSchema),
    defaultValues: {
      listPrice: "",
      pricePerSqFt: "",
      showPriceHistory: true,
      priceHistory: [
        {
          date: new Date().toISOString().split("T")[0],
          price: "",
          type: "list",
        },
      ],
      taxAssessment: "",
      taxYear: new Date().getFullYear().toString(),
      annualTaxAmount: "",
      hoaFees: "0",
      hoaFrequency: "monthly",
      hoaIncludes: "",
      financing: {
        conventional: true,
        fha: true,
        va: true,
        cash: true,
      },
      terms: "",
    },
  })

  async function onSubmit(data: PropertyPricingValues) {
    try {
      setIsLoading(true)
      // Here you would normally save the data to your API
      // const response = await fetch("/api/properties/${id}/pricing", {
      //   method: "PUT",
      //   body: JSON.stringify(data),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Property pricing saved successfully!")
      router.push(`/dashboard/properties/${id}`)
    } catch (error) {
      toast.error("Failed to save property pricing")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Pricing Information</h3>
            <p className="text-sm text-muted-foreground">
              Set the listing price and related financial details.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="listPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>List Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder="750000"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>The asking price.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pricePerSqFt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price per Square Foot</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="300.00"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Calculated based on list price and square footage.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Price History</h3>
              <p className="text-sm text-muted-foreground">
                Track price changes over time.
              </p>
            </div>
            <FormField
              control={form.control}
              name="showPriceHistory"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormLabel>Show Price History</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {form.watch("showPriceHistory") && (
            <div className="space-y-4">
              {form.watch("priceHistory").map((_, index) => (
                <div key={index} className="grid gap-4 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name={`priceHistory.${index}.date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`priceHistory.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            placeholder="750000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`priceHistory.${index}.type`}
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
                            <SelectItem value="list">List Price</SelectItem>
                            <SelectItem value="sold">Sold Price</SelectItem>
                            <SelectItem value="reduced">Price Reduced</SelectItem>
                            <SelectItem value="increased">
                              Price Increased
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Tax Information</h3>
            <p className="text-sm text-muted-foreground">
              Property tax details and assessment.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="taxAssessment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Assessment</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder="700000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="taxYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Year</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1900"
                      max="2100"
                      placeholder="2024"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="annualTaxAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Tax Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="12000.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">HOA Information</h3>
            <p className="text-sm text-muted-foreground">
              Homeowners Association fees and details.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="hoaFees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HOA Fees</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="250.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hoaFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fee Frequency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hoaIncludes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HOA Includes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List amenities and services included..."
                      className="h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Financing</h3>
            <p className="text-sm text-muted-foreground">
              Acceptable financing options and terms.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <FormField
              control={form.control}
              name="financing.conventional"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Conventional</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="financing.fha"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>FHA</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="financing.va"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>VA</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="financing.cash"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Cash</FormLabel>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Terms</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter any additional financing terms or requirements..."
                    className="h-20"
                    {...field}
                  />
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
