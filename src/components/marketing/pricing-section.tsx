"use client"

import { useState, useEffect } from "react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import {
  ArrowRight,
  CheckCircle2,
  Crown,
  Globe,
  Shield,
  Star,
  Users2,
  Zap,
} from "lucide-react"
import Link from "next/link"

const plans = [
  {
    id: "remp-momentum",
    name: "REMP Momentum",
    description: "The essential CRM for growing your real estate business.",
    price: { monthly: 8.75, yearly: 7.00 },
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
    limitations: [
      "No MLS Integration",
      "No Lead Scoring",
      "No Advanced Analytics",
      "No Email Campaigns",
    ],
    popular: false,
    icon: Users2,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "remp-arbor",
    name: "REMP Arbor",
    description: "The all-in-one solution for top-performing brokerages.",
    price: { monthly: 20.00, yearly: 16.00 },
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
    limitations: [],
    popular: true,
    icon: Star,
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "ams-starter",
    name: "AMS Starter",
    description: "Streamline your association's member and event management.",
    price: { monthly: 11.00, yearly: 9.00 },
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
    limitations: [
      "No Advanced Members Management",
      "No Certifications & Committees",
      "No Advanced Events Management",
      "No Email Campaigns",
    ],
    popular: false,
    icon: Crown,
    color: "from-orange-500 to-red-600",
  },
  {
    id: "ams-ethos",
    name: "AMS Ethos",
    description: "The comprehensive platform for professional associations.",
    price: { monthly: 22.00, yearly: 18.00 },
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
    limitations: [],
    popular: false,
    icon: Crown,
    color: "from-green-500 to-teal-600",
  },
]

const addons = [
  {
    name: "Advanced Analytics",
    description: "Deep insights and reporting",
    price: { monthly: 10, yearly: 8 },
    icon: Zap,
  },
  {
    name: "White Label",
    description: "Custom branding and domain",
    price: { monthly: 25, yearly: 20 },
    icon: Globe,
  },
  {
    name: "Priority Support",
    description: "24/7 phone and chat support",
    price: { monthly: 15, yearly: 12 },
    icon: Shield,
  },
]

export function PricingSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isYearly, setIsYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const getPrice = (plan: typeof plans[0]) => {
    return isYearly ? plan.price.yearly : plan.price.monthly
  }

  const getSavings = (plan: typeof plans[0]) => {
    if (!isYearly) return null
    const savings = plan.price.monthly - plan.price.yearly
    return Math.round((savings / plan.price.monthly) * 100)
  }

  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <Container>
        <div className="space-y-16">
          {/* Header */}
          <div
            className={cn(
              "text-center transition-all duration-700",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <SectionHeading
              title="Simple, transparent pricing"
              subtitle="Choose the plan that's right for your business. All plans include a 14-day free trial with no credit card required."
            />

            {/* Billing Toggle */}
            <div className="mt-8 flex items-center justify-center space-x-4">
              <span className={cn("text-sm", !isYearly && "font-semibold text-slate-900")}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-indigo-600"
              />
              <span className={cn("text-sm", isYearly && "font-semibold text-slate-900")}>
                Yearly
              </span>
              {isYearly && (
                <Badge className="bg-green-100 text-green-700">
                  Save up to 20%
                </Badge>
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <div
            className={cn(
              "grid gap-8 lg:grid-cols-3 transition-all duration-700 delay-200",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={cn(
                  "group relative rounded-2xl border bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg",
                  plan.popular && "ring-2 ring-indigo-600 shadow-lg",
                  `delay-${300 + index * 100}`
                )}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-indigo-600 text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6 text-center">
                  <div
                    className={cn(
                      "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r text-white",
                      plan.color
                    )}
                  >
                    <plan.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="mt-2 text-slate-600">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="mb-8 text-center">
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-4xl font-bold text-slate-900">
                      ${getPrice(plan)}
                    </span>
                    <span className="text-slate-600">/month</span>
                  </div>
                  {isYearly && (
                    <div className="mt-2 text-sm text-slate-600">
                      Billed annually (${getPrice(plan) * 12}/year)
                    </div>
                  )}
                  {getSavings(plan) && (
                    <div className="mt-2 text-sm font-medium text-green-600">
                      Save {getSavings(plan)}% with yearly billing
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="mb-8 space-y-4">
                  <h4 className="font-semibold text-slate-900">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div className="mb-8 space-y-4">
                    <h4 className="font-semibold text-slate-900">Not included:</h4>
                    <ul className="space-y-3">
                      {plan.limitations.map((limitation) => (
                        <li key={limitation} className="flex items-center space-x-3">
                          <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
                          <span className="text-sm text-slate-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <Link href={plan.id.startsWith('remp-') ? '/signup?mode=crm' : '/signup?mode=ams'}>
                  <Button
                    className={cn(
                      "w-full",
                      plan.popular
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-slate-900 hover:bg-slate-800"
                    )}
                  >
                    {plan.popular ? "Start Free Trial" : "Get Started"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Add-ons */}
          <div
            className={cn(
              "transition-all duration-700 delay-400",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <div className="rounded-2xl border bg-slate-50 p-8">
              <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold text-slate-900">
                  Add-ons for enhanced functionality
                </h3>
                <p className="mt-2 text-slate-600">
                  Customize your plan with powerful add-ons
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                {addons.map((addon, index) => (
                  <div
                    key={addon.name}
                    className={cn(
                      "rounded-xl border bg-white p-6 transition-all duration-300 hover:shadow-md",
                      `delay-${500 + index * 100}`
                    )}
                  >
                    <div className="mb-4 flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                        <addon.icon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{addon.name}</h4>
                        <p className="text-sm text-slate-600">{addon.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-slate-900">
                        ${isYearly ? addon.price.yearly : addon.price.monthly}/month
                      </div>
                      <Button variant="outline" size="sm">
                        Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ & Support */}
          <div
            className={cn(
              "text-center transition-all duration-700 delay-600",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <div className="mx-auto max-w-2xl">
              <h3 className="text-2xl font-bold text-slate-900">
                Questions about pricing?
              </h3>
              <p className="mt-4 text-lg text-slate-600">
                Our team is here to help you choose the right plan for your business.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}