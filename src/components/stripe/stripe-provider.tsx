"use client"

import { ReactNode } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

interface StripeProviderProps {
  children: ReactNode
  clientSecret?: string
}

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export function StripeProvider({ children, clientSecret }: StripeProviderProps) {
  const options = {
    ...(clientSecret && { clientSecret }),
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#6366f1',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#ef4444',
        fontFamily: 'Inter, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  )
}
