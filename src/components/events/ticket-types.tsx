"use client"

import { useState } from "react"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"

const ticketTypeSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.number().min(0, {
    message: "Price must be 0 or greater.",
  }),
  quantity: z.number().min(1, {
    message: "Quantity must be at least 1.",
  }),
})

type TicketTypeValues = z.infer<typeof ticketTypeSchema>

interface TicketTypesProps {
  id: string
}

// This would normally come from an API
const ticketTypes = [
  {
    id: "1",
    name: "Early Bird",
    description: "Limited time offer with special pricing",
    price: 199,
    quantity: 100,
    sold: 75,
  },
  {
    id: "2",
    name: "Regular",
    description: "Standard conference ticket",
    price: 299,
    quantity: 300,
    sold: 120,
  },
  {
    id: "3",
    name: "VIP",
    description: "Access to exclusive sessions and networking events",
    price: 499,
    quantity: 50,
    sold: 20,
  },
]

export function TicketTypes({ id }: TicketTypesProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<TicketTypeValues>({
    resolver: zodResolver(ticketTypeSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 1,
    },
  })

  async function onSubmit(data: TicketTypeValues) {
    try {
      setIsLoading(true)
      // Here you would normally save the ticket type to your API
      // const response = await fetch("/api/events/${id}/ticket-types", {
      //   method: "POST",
      //   body: JSON.stringify(data),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Ticket type added successfully!")
      setIsAdding(false)
      form.reset()
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Available</TableHead>
            <TableHead>Sold</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ticketTypes.map((type) => (
            <TableRow key={type.id}>
              <TableCell className="font-medium">{type.name}</TableCell>
              <TableCell>{type.description}</TableCell>
              <TableCell>${type.price}</TableCell>
              <TableCell>{type.quantity - type.sold}</TableCell>
              <TableCell>{type.sold}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isAdding ? (
        <div className="border rounded-lg p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Early Bird" {...field} />
                    </FormControl>
                    <FormDescription>
                      A descriptive name for this ticket type.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what's included with this ticket..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Help attendees understand what they get.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Set to 0 for free tickets.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Number of tickets available.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAdding(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add Ticket Type"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <Button onClick={() => setIsAdding(true)}>Add Ticket Type</Button>
      )}
    </div>
  )
}
