import { useState, useCallback } from 'react'
import { loadStripe, Stripe, StripeElementsOptions } from '@stripe/stripe-js'
import { toast } from 'sonner'

// Types
interface CreateSubscriptionParams {
  email: string
  name: string
  paymentMethodId: string
  planId: string
  company?: string
}

interface UpdateSubscriptionQuantityParams {
  subscriptionId: string
  newQuantity: number
}

interface SubscriptionResponse {
  success: boolean
  data: {
    customerId: string
    subscriptionId: string
    subscriptionStatus: string
    clientSecret?: string
    planDetails: {
      planId: string
      productType: string
      priceId: string
    }
  }
  message: string
}

interface UpdateQuantityResponse {
  success: boolean
  data: {
    subscriptionId: string
    newQuantity: number
    subscriptionStatus: string
    currentPeriodEnd: number
    quantity: number
    totalAmount: number
  }
  message: string
}

// Initialize Stripe
let stripePromise: Promise<Stripe | null>

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

export const useStripe = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Create subscription
  const createSubscription = useCallback(async (params: CreateSubscriptionParams): Promise<SubscriptionResponse | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/v1/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create subscription')
      }

      toast.success('Subscription created successfully!')
      return data

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Update subscription quantity
  const updateSubscriptionQuantity = useCallback(async (params: UpdateSubscriptionQuantityParams): Promise<UpdateQuantityResponse | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/v1/update-subscription-quantity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update subscription quantity')
      }

      toast.success('Subscription updated successfully!')
      return data

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Get subscription details
  const getSubscription = useCallback(async (subscriptionId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/v1/subscription?subscriptionId=${subscriptionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get subscription details')
      }

      return data

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Cancel subscription
  const cancelSubscription = useCallback(async (subscriptionId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/v1/subscription?subscriptionId=${subscriptionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel subscription')
      }

      toast.success('Subscription canceled successfully')
      return data

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Reactivate subscription
  const reactivateSubscription = useCallback(async (subscriptionId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/v1/subscription', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId,
          action: 'reactivate',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reactivate subscription')
      }

      toast.success('Subscription reactivated successfully')
      return data

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Get Stripe Elements options
  const getStripeElementsOptions = useCallback((clientSecret: string): StripeElementsOptions => {
    return {
      clientSecret,
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
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    // State
    isLoading,
    error,
    
    // Actions
    createSubscription,
    updateSubscriptionQuantity,
    getSubscription,
    cancelSubscription,
    reactivateSubscription,
    getStripeElementsOptions,
    clearError,
    
    // Utilities
    getStripe,
  }
}
