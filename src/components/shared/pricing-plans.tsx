"use client"

import { useState } from 'react'
import { toast } from 'sonner'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createCheckoutSession } from '@/lib/stripe'

const plans = [
  {
    name: 'REMP Momentum',
    priceId: 'remp-momentum',
    price: 8.75,
    description: 'The essential CRM for growing your real estate business.',
    features: [
      'User Management',
      'Task Management', 
      'Calendar',
      'Email & Communication',
      'Role-Based Access Control',
      'Mode-aware Dashboard',
      'Contacts Management',
      'Leads Management',
      'Deals Management',
      'Active Leads KPI',
      'Deals Value KPI',
      'Tasks Due KPI',
      'Active Clients KPI',
    ],
  },
  {
    name: 'REMP Arbor',
    priceId: 'remp-arbor',
    price: 20.00,
    description: 'The all-in-one solution for top-performing brokerages.',
    features: [
      'All REMP Momentum features',
      'Properties Management (with MLS Integration)',
      'Lead Scoring',
      'Email & Communication Campaigns',
      'Advanced Analytics & Reporting',
      'Active Listings KPI',
      'Conversion Rate KPI',
      'Priority support',
      'Advanced integrations',
      '25GB storage',
      'White-label options',
      'API access',
    ],
  },
  {
    name: 'AMS Starter',
    priceId: 'ams-starter',
    price: 11.00,
    description: 'Streamline your association\'s member and event management.',
    features: [
      'User Management',
      'Task Management',
      'Calendar', 
      'Email & Communication',
      'Role-Based Access Control',
      'Mode-aware Dashboard',
      'Members Management',
      'Event Management (Basic)',
      'Total Members KPI',
      'Active Events KPI',
      'Tasks Due KPI',
      'Active Campaigns KPI',
      'Mobile app access',
      '10GB storage',
    ],
  },
  {
    name: 'AMS Ethos',
    priceId: 'ams-ethos',
    price: 22.00,
    description: 'The comprehensive platform for professional associations.',
    features: [
      'All AMS Starter features',
      'Advanced Members Management (Subscriptions, Invoicing)',
      'Certifications & Committees Management',
      'Advanced Events Management (Speakers, Feedback)',
      'Email Campaigns',
      'Advanced Analytics & Reporting',
      'Revenue KPI (from subscriptions & events)',
      'Priority support',
      'Advanced integrations',
      '50GB storage',
      'White-label options',
      'API access',
      'Custom onboarding',
    ],
  },
]

export function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleSubscribe = async (priceId: string) => {
    try {
      setSelectedPlan(priceId)
      // Redirect to signup with appropriate mode
      const mode = priceId.startsWith('remp-') ? 'crm' : 'ams'
      window.location.href = `/signup?mode=${mode}`
    } catch (error) {
      toast.error('Failed to start subscription process')
      console.error(error)
    } finally {
      setSelectedPlan(null)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <Card key={plan.priceId} className="flex flex-col">
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="text-3xl font-bold mb-6">
              ${plan.price}
              <span className="text-base font-normal text-gray-500">/month</span>
            </div>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleSubscribe(plan.priceId)}
              disabled={!!selectedPlan}
              className="w-full"
            >
              {selectedPlan === plan.priceId
                ? 'Processing...'
                : `Subscribe to ${plan.name}`}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
