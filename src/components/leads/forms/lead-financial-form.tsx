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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const leadFinancialSchema = z.object({
  preApproved: z.boolean(),
  preApprovalAmount: z.string().regex(/^\d+$/, {
    message: "Please enter a valid amount.",
  }),
  lender: z.string().min(1, {
    message: "Please enter the lender name.",
  }),
  loanType: z.string({
    required_error: "Please select a loan type.",
  }),
  downPayment: z.string().regex(/^\d+$/, {
    message: "Please enter a valid amount.",
  }),
  downPaymentPercentage: z.string().regex(/^\d+$/, {
    message: "Please enter a valid percentage.",
  }),
  monthlyPayment: z.string().regex(/^\d+$/, {
    message: "Please enter a valid amount.",
  }),
  creditScore: z.string().regex(/^\d{3}$/, {
    message: "Please enter a valid credit score.",
  }),
  annualIncome: z.string().regex(/^\d+$/, {
    message: "Please enter a valid amount.",
  }),
  employmentStatus: z.string({
    required_error: "Please select employment status.",
  }),
  notes: z.string().optional(),
})

type LeadFinancialValues = z.infer<typeof leadFinancialSchema>

interface LeadFinancialFormProps {
  id: string
}

export function LeadFinancialForm({ id }: LeadFinancialFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LeadFinancialValues>({
    resolver: zodResolver(leadFinancialSchema),
    defaultValues: {
      preApproved: false,
      preApprovalAmount: "",
      lender: "",
      loanType: "",
      downPayment: "",
      downPaymentPercentage: "20",
      monthlyPayment: "",
      creditScore: "",
      annualIncome: "",
      employmentStatus: "",
      notes: "",
    },
  })

  async function onSubmit(data: LeadFinancialValues) {
    try {
      setIsLoading(true)
      // Here you would normally save the data to your API
      // const response = await fetch("/api/leads/${id}/financial", {
      //   method: "PUT",
      //   body: JSON.stringify(data),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Lead financial information saved successfully!")
      router.push(`/dashboard/leads/${id}`)
    } catch (error) {
      toast.error("Failed to save financial information")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
        <FormField
          control={form.control}
          name="preApproved"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Pre-approved for mortgage</FormLabel>
            </FormItem>
          )}
        />

        {form.watch("preApproved") && (
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="preApprovalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pre-approval Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder="800000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lender</FormLabel>
                  <FormControl>
                    <Input placeholder="Bank name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="loanType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="conventional">Conventional</SelectItem>
                    <SelectItem value="fha">FHA</SelectItem>
                    <SelectItem value="va">VA</SelectItem>
                    <SelectItem value="jumbo">Jumbo</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employmentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="full-time">Full Time</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="self-employed">Self Employed</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="downPayment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Down Payment Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="160000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="downPaymentPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Down Payment Percentage</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="monthlyPayment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Monthly Payment</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="3500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="creditScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credit Score</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="300"
                    max="850"
                    placeholder="750"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="annualIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Annual Income</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="120000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Financial Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional financial notes..."
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
