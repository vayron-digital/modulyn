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

const paymentSchema = z.object({
  cardName: z.string().min(2, {
    message: "Card holder name must be at least 2 characters.",
  }),
  cardNumber: z.string().regex(/^\d{16}$/, {
    message: "Please enter a valid 16-digit card number.",
  }),
  expiryMonth: z.string().min(1, {
    message: "Please select expiry month.",
  }),
  expiryYear: z.string().min(1, {
    message: "Please select expiry year.",
  }),
  cvv: z.string().regex(/^\d{3,4}$/, {
    message: "Please enter a valid CVV.",
  }),
  billingAddress: z.object({
    line1: z.string().min(1, {
      message: "Address line 1 is required.",
    }),
    line2: z.string().optional(),
    city: z.string().min(1, {
      message: "City is required.",
    }),
    state: z.string().min(1, {
      message: "State is required.",
    }),
    postalCode: z.string().min(1, {
      message: "Postal code is required.",
    }),
    country: z.string().min(1, {
      message: "Country is required.",
    }),
  }),
})

type PaymentValues = z.infer<typeof paymentSchema>

interface PaymentDetailsProps {
  eventId: string
  registrationData: {
    tickets: { id: string; quantity: number; price: number }[]
    attendees: any[]
  }
  onComplete: (data: { payment: any }) => void
}

export function PaymentDetails({
  eventId,
  registrationData,
  onComplete,
}: PaymentDetailsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const totalAmount = registrationData.tickets.reduce(
    (sum, ticket) => sum + ticket.price * ticket.quantity,
    0
  )

  const form = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      billingAddress: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
    },
  })

  async function onSubmit(data: PaymentValues) {
    try {
      setIsLoading(true)
      // Here you would normally process the payment with your payment provider
      // const response = await fetch("/api/events/${eventId}/process-payment", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     ...data,
      //     amount: totalAmount,
      //     tickets: registrationData.tickets,
      //     attendees: registrationData.attendees,
      //   }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Registration completed successfully!")
      router.push(`/dashboard/events/${eventId}/confirmation`)
    } catch (error) {
      toast.error("Failed to process payment")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h3 className="text-lg font-medium">Order Summary</h3>
        <div className="mt-4 space-y-4">
          {registrationData.tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between text-sm"
            >
              <div>
                {ticket.quantity}x Ticket Type {ticket.id}
              </div>
              <div>${(ticket.price * ticket.quantity).toFixed(2)}</div>
            </div>
          ))}
          <Separator />
          <div className="flex items-center justify-between font-medium">
            <div>Total</div>
            <div>${totalAmount.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Payment Information</h3>
            <div className="mt-4 grid gap-4">
              <FormField
                control={form.control}
                name="cardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Holder Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        maxLength={16}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "")
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="expiryMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Month</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => {
                            const month = (i + 1).toString().padStart(2, "0")
                            return (
                              <SelectItem key={month} value={month}>
                                {month}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiryYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Year</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => {
                            const year = (
                              new Date().getFullYear() + i
                            ).toString()
                            return (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          maxLength={4}
                          type="password"
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "")
                            field.onChange(value)
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        3 or 4 digit security code
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Billing Address</h3>
            <div className="mt-4 grid gap-4">
              <FormField
                control={form.control}
                name="billingAddress.line1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billingAddress.line2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 2</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="billingAddress.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="billingAddress.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="billingAddress.postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
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
                name="billingAddress.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        {/* Add more countries as needed */}
                      </SelectContent>
                    </Select>
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
              onClick={() => window.history.back()}
            >
              Back
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

