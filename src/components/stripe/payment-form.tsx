"use client"

import { useState, useEffect } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, CreditCard, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaymentFormProps {
  onSubmit: (paymentMethodId: string) => Promise<void>
  onCancel?: () => void
  isLoading?: boolean
  disabled?: boolean
  className?: string
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#1f2937',
      fontFamily: 'Inter, system-ui, sans-serif',
      '::placeholder': {
        color: '#9ca3af',
      },
    },
    invalid: {
      color: '#ef4444',
    },
  },
}

export function PaymentForm({
  onSubmit,
  onCancel,
  isLoading = false,
  disabled = false,
  className,
}: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet. Please try again.')
      return
    }

    setProcessing(true)
    setError(null)

    try {
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) {
        throw new Error('Card element not found')
      }

      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      })

      if (stripeError) {
        throw new Error(stripeError.message || 'Payment method creation failed')
      }

      if (!paymentMethod) {
        throw new Error('Failed to create payment method')
      }

      await onSubmit(paymentMethod.id)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
    } finally {
      setProcessing(false)
    }
  }

  const isFormDisabled = disabled || isLoading || processing || !stripe

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Card Element */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Card Information
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <CreditCard className="h-4 w-4" />
          </div>
          <div className="pl-10">
            <CardElement
              options={cardElementOptions}
              className="p-3 border border-slate-300 rounded-md focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500"
            />
          </div>
        </div>
        <p className="text-xs text-slate-500">
          Your payment information is secure and encrypted
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isFormDisabled}
            className="flex-1"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isFormDisabled}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700"
        >
          {processing || isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Continue'
          )}
        </Button>
      </div>

      {/* Security Notice */}
      <div className="text-center">
        <p className="text-xs text-slate-500">
          🔒 Your payment is secured by Stripe
        </p>
      </div>
    </form>
  )
}
