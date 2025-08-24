"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertTriangle,
  CreditCard,
  Download,
  FileText,
  Loader2,
  Package,
  Receipt,
  RefreshCw,
  Settings,
  Star,
  Wallet,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const billingFormSchema = z.object({
  plan: z.enum(["remp-momentum", "remp-arbor", "ams-starter", "ams-ethos"]),
  billingCycle: z.enum(["monthly", "annual"]),
  paymentMethod: z.object({
    type: z.enum(["credit_card", "bank_account", "paypal"]),
    default: z.boolean(),
  }),
  autoRenew: z.boolean(),
  taxId: z.string().optional(),
  billingEmail: z.string().email(),
  billingAddress: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
})

type BillingFormValues = z.infer<typeof billingFormSchema>

// Mock data for subscription plans
const plans = [
  {
    id: "remp-momentum",
    name: "REMP Momentum",
    price: {
      monthly: 8.75,
      annual: 87.50,
    },
    features: [
      "User Management",
      "Task Management", 
      "Calendar",
      "Email & Communication",
      "Role-Based Access Control",
      "Mode-aware Dashboard",
      "Contacts Management",
      "Leads Management",
      "Deals Management",
      "Active Leads KPI",
      "Deals Value KPI",
      "Tasks Due KPI",
      "Active Clients KPI",
    ],
  },
  {
    id: "remp-arbor",
    name: "REMP Arbor",
    price: {
      monthly: 20.00,
      annual: 200.00,
    },
    features: [
      "All REMP Momentum features",
      "Properties Management (with MLS Integration)",
      "Lead Scoring",
      "Email & Communication Campaigns",
      "Advanced Analytics & Reporting",
      "Active Listings KPI",
      "Conversion Rate KPI",
      "Priority support",
      "Advanced integrations",
      "25GB storage",
      "White-label options",
      "API access",
    ],
  },
  {
    id: "ams-starter",
    name: "AMS Starter",
    price: {
      monthly: 11.00,
      annual: 110.00,
    },
    features: [
      "User Management",
      "Task Management",
      "Calendar", 
      "Email & Communication",
      "Role-Based Access Control",
      "Mode-aware Dashboard",
      "Members Management",
      "Event Management (Basic)",
      "Total Members KPI",
      "Active Events KPI",
      "Tasks Due KPI",
      "Active Campaigns KPI",
      "Mobile app access",
      "10GB storage",
    ],
  },
  {
    id: "ams-ethos",
    name: "AMS Ethos",
    price: {
      monthly: 22.00,
      annual: 220.00,
    },
    features: [
      "All AMS Starter features",
      "Advanced Members Management (Subscriptions, Invoicing)",
      "Certifications & Committees Management",
      "Advanced Events Management (Speakers, Feedback)",
      "Email Campaigns",
      "Advanced Analytics & Reporting",
      "Revenue KPI (from subscriptions & events)",
      "Priority support",
      "Advanced integrations",
      "50GB storage",
      "White-label options",
      "API access",
      "Custom onboarding",
    ],
  },
]

// Mock data for payment methods
const paymentMethods = [
  {
    id: 1,
    type: "credit_card",
    last4: "4242",
    expiry: "12/24",
    brand: "Visa",
    default: true,
  },
  {
    id: 2,
    type: "credit_card",
    last4: "8888",
    expiry: "03/25",
    brand: "Mastercard",
    default: false,
  },
]

// Mock data for billing history
const billingHistory = [
  {
    id: "INV-001",
    date: "2024-03-01",
    amount: 20.00,
    status: "paid",
    description: "REMP Arbor Plan - Monthly",
  },
  {
    id: "INV-002",
    date: "2024-02-01",
    amount: 20.00,
    status: "paid",
    description: "REMP Arbor Plan - Monthly",
  },
  {
    id: "INV-003",
    date: "2024-01-01",
    amount: 20.00,
    status: "paid",
    description: "REMP Arbor Plan - Monthly",
  },
]

// Mock data for current subscription
const currentSubscription = {
  plan: "remp-arbor",
  billingCycle: "monthly",
  status: "active",
  nextBilling: "2024-04-01",
  amount: 20.00,
}

const defaultValues: Partial<BillingFormValues> = {
  plan: "remp-arbor",
  billingCycle: "monthly",
  paymentMethod: {
    type: "credit_card",
    default: true,
  },
  autoRenew: true,
  billingEmail: "billing@company.com",
  billingAddress: {
    line1: "123 Business St",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States",
  },
}

export function BillingSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [showAddCard, setShowAddCard] = useState(false)

  const form = useForm<BillingFormValues>({
    resolver: zodResolver(billingFormSchema),
    defaultValues,
  })

  function onSubmit(data: BillingFormValues) {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log(data)
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Current Subscription</h4>
            <p className="text-sm text-muted-foreground">
              Manage your subscription and billing preferences
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      {plans.find((p) => p.id === currentSubscription.plan)?.name}{" "}
                      Plan
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {currentSubscription.billingCycle === "monthly"
                        ? "Monthly billing"
                        : "Annual billing"}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {currentSubscription.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Next billing date</p>
                    <p className="text-sm text-muted-foreground">
                      {currentSubscription.nextBilling}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    ${currentSubscription.amount}/month
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" size="sm">
                    <Package className="mr-2 h-4 w-4" />
                    Change plan
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Change billing cycle
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Available Plans</h4>
            <p className="text-sm text-muted-foreground">
              Choose the plan that best fits your needs
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={
                  currentSubscription.plan === plan.id
                    ? "border-primary"
                    : undefined
                }
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {plan.name}
                    {currentSubscription.plan === plan.id && (
                      <Star className="h-4 w-4 text-primary" />
                    )}
                  </CardTitle>
                  <CardDescription>
                    Starting at ${plan.price.monthly}/month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Star className="mr-2 h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={
                      currentSubscription.plan === plan.id
                        ? "outline"
                        : "default"
                    }
                    className="w-full"
                  >
                    {currentSubscription.plan === plan.id
                      ? "Current plan"
                      : "Switch plan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Payment Methods</h4>
            <p className="text-sm text-muted-foreground">
              Manage your payment methods and billing information
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">
                          {method.brand} ending in {method.last4}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expires {method.expiry}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.default && (
                        <Badge variant="outline">Default</Badge>
                      )}
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={() => setShowAddCard(true)}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add payment method
                </Button>
              </div>
            </CardContent>
          </Card>

          <Dialog open={showAddCard} onOpenChange={setShowAddCard}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
                <DialogDescription>
                  Add a new credit card or debit card
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Card number</Label>
                  <Input placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Expiry month</Label>
                    <Input placeholder="MM" />
                  </div>
                  <div className="space-y-2">
                    <Label>Expiry year</Label>
                    <Input placeholder="YY" />
                  </div>
                  <div className="space-y-2">
                    <Label>CVC</Label>
                    <Input placeholder="CVC" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddCard(false)}>
                  Cancel
                </Button>
                <Button>Add card</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Billing Information</h4>
            <p className="text-sm text-muted-foreground">
              Manage your billing details and preferences
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="billingEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <div className="grid grid-cols-2 gap-4">
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
                </div>

                <div className="grid grid-cols-2 gap-4">
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

                  <FormField
                    control={form.control}
                    name="billingAddress.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
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
                  name="taxId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax ID (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your VAT number or tax ID
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Billing History</h4>
            <p className="text-sm text-muted-foreground">
              View and download your billing history
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingHistory.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={invoice.status === "paid" ? "outline" : "destructive"}
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save billing settings
        </Button>
      </form>
    </Form>
  )
}
