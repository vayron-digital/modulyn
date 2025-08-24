"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SignupForm } from "@/components/auth/signup-form"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Crown,
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
    icon: Star,
    color: "from-purple-500 to-pink-600",
    popular: true,
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
    icon: Crown,
    color: "from-green-500 to-teal-600",
  },
]

const modes = [
  {
    id: "crm",
    name: "Real Estate CRM",
    description: "Manage properties, clients, and transactions",
    icon: Building2,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "ams",
    name: "Association Management",
    description: "Manage members, events, and communications",
    icon: Users2,
    color: "from-purple-500 to-pink-600",
  },
]

export default function SignupPage() {
  const searchParams = useSearchParams()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [selectedMode, setSelectedMode] = useState<string | null>(null)
  const [isYearly, setIsYearly] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  // Initialize from URL params
  useEffect(() => {
    const plan = searchParams.get("plan")
    const mode = searchParams.get("mode")
    
    if (plan) {
      const foundPlan = plans.find(p => p.id === plan)
      if (foundPlan) {
        setSelectedPlan(foundPlan.id)
        setCurrentStep(2) // Skip to plan selection if plan is provided
      }
    }
    
    if (mode) {
      setSelectedMode(mode)
      if (!plan) setCurrentStep(2) // Skip to plan selection if mode is provided
    }
  }, [searchParams])

  // Filter plans based on selected mode
  const getFilteredPlans = () => {
    if (!selectedMode) return plans
    
    if (selectedMode === "crm") {
      return plans.filter(plan => plan.id.startsWith("remp-"))
    } else if (selectedMode === "ams") {
      return plans.filter(plan => plan.id.startsWith("ams-"))
    }
    
    return plans
  }

  const getSelectedPlanData = () => {
    return plans.find(p => p.id === selectedPlan)
  }

  const getPrice = (plan: typeof plans[0]) => {
    return isYearly ? plan.price.yearly : plan.price.monthly
  }

  const getSavings = (plan: typeof plans[0]) => {
    if (!isYearly) return null
    const savings = plan.price.monthly - plan.price.yearly
    return Math.round((savings / plan.price.monthly) * 100)
  }

  const canProceed = () => {
    if (currentStep === 1) return selectedMode
    if (currentStep === 2) return selectedPlan
    return true
  }

  const handleNext = () => {
    if (canProceed()) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1))
  }

  const handleSignupSuccess = () => {
    // Handle successful signup
    console.log("Signup successful!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">Modulyn One+</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">Already have an account?</span>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </header>

      <Container>
        <div className="py-12">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center space-x-4">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-colors",
                      step <= currentStep
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-slate-300 bg-white text-slate-400"
                    )}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={cn(
                        "h-1 w-16 rounded-full transition-colors",
                        step < currentStep ? "bg-indigo-600" : "bg-slate-200"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-slate-600">
                Step {currentStep} of 3: {
                  currentStep === 1 ? "Choose your solution" :
                  currentStep === 2 ? "Select your plan" :
                  "Create your account"
                }
              </p>
            </div>
          </div>

          {/* Step 1: Choose Solution */}
          {currentStep === 1 && (
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                  Choose your solution
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                  Select the solution that best fits your business needs
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {modes.map((mode) => (
                  <div
                    key={mode.id}
                    className={cn(
                      "group cursor-pointer rounded-2xl border bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg",
                      selectedMode === mode.id && "ring-2 ring-indigo-600 shadow-lg"
                    )}
                    onClick={() => setSelectedMode(mode.id)}
                  >
                    <div
                      className={cn(
                        "mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r text-white",
                        mode.color
                      )}
                    >
                      <mode.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{mode.name}</h3>
                    <p className="mt-2 text-slate-600">{mode.description}</p>
                    
                    {selectedMode === mode.id && (
                      <div className="mt-6 flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm font-medium text-green-600">Selected</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Button
                  size="lg"
                  disabled={!selectedMode}
                  onClick={handleNext}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Select Plan */}
          {currentStep === 2 && (
            <div className="mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                  Choose your plan
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                  Select the plan that's right for your business
                </p>
                {selectedMode && (
                  <div className="mt-4">
                    <Badge variant="outline" className="text-sm">
                      {modes.find(m => m.id === selectedMode)?.name}
                    </Badge>
                  </div>
                )}

                {/* Billing Toggle */}
                <div className="mt-8 flex items-center justify-center space-x-4">
                  <span className={cn("text-sm", !isYearly && "font-semibold text-slate-900")}>
                    Monthly
                  </span>
                  <button
                    onClick={() => setIsYearly(!isYearly)}
                    className={cn(
                      "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2",
                      isYearly ? "bg-indigo-600" : "bg-slate-200"
                    )}
                  >
                    <span
                      className={cn(
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        isYearly ? "translate-x-5" : "translate-x-0"
                      )}
                    />
                  </button>
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

              <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                {getFilteredPlans().map((plan) => (
                  <div
                    key={plan.id}
                    className={cn(
                      "group relative rounded-2xl border bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg cursor-pointer",
                      selectedPlan === plan.id && "ring-2 ring-indigo-600 shadow-lg",
                      plan.popular && "ring-2 ring-indigo-600"
                    )}
                    onClick={() => setSelectedPlan(plan.id)}
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
                        <span className="text-slate-600">/user/month</span>
                      </div>
                      {isYearly && (
                        <div className="mt-2 text-sm text-slate-600">
                          Billed annually (${getPrice(plan) * 12}/user/year)
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
                        {plan.features.slice(0, 6).map((feature) => (
                          <li key={feature} className="flex items-center space-x-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span className="text-sm text-slate-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedPlan === plan.id && (
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm font-medium text-green-600">Selected</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12 flex items-center justify-center space-x-4">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  size="lg"
                  disabled={!selectedPlan}
                  onClick={handleNext}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Account Creation */}
          {currentStep === 3 && (
            <div className="mx-auto max-w-2xl">
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                  Create your account
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                  Get started with your free trial
                </p>
              </div>

              {/* Summary */}
              <div className="mb-8 rounded-2xl border bg-slate-50 p-6">
                <h3 className="mb-4 font-semibold text-slate-900">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Solution:</span>
                    <span className="font-medium text-slate-900">
                      {modes.find(m => m.id === selectedMode)?.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Plan:</span>
                    <span className="font-medium text-slate-900">
                      {getSelectedPlanData()?.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Billing:</span>
                    <span className="font-medium text-slate-900">
                      {isYearly ? "Yearly" : "Monthly"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-3">
                    <span className="font-semibold text-slate-900">Price:</span>
                    <span className="font-bold text-slate-900">
                      ${getSelectedPlanData() ? getPrice(getSelectedPlanData()!) : 0}/user/month
                    </span>
                  </div>
                </div>
              </div>

              {/* Signup Form */}
              <div className="rounded-2xl border bg-white p-8">
                <SignupForm
                  selectedPlan={getSelectedPlanData() ? {
                    id: getSelectedPlanData()!.id,
                    name: getSelectedPlanData()!.name,
                    price: getPrice(getSelectedPlanData()!)
                  } : undefined}
                  selectedMode={selectedMode || undefined}
                  isYearly={isYearly}
                  onSuccess={handleSignupSuccess}
                />
              </div>

              <div className="mt-8 flex items-center justify-center">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
