"use client"

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createPortalSession } from '@/lib/stripe'
import { useAuthStore } from '@/lib/store'

interface SubscriptionCardProps {
  subscription: {
    plan: string
    status: string
    currentPeriodEnd: Date
    amount: number
  }
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const organization = useAuthStore((state) => state.organization)

  const handleManageSubscription = async () => {
    try {
      setIsLoading(true)
      await createPortalSession()
    } catch (error) {
      toast.error('Failed to open subscription portal')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Details</CardTitle>
        <CardDescription>
          Manage your subscription and billing information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Organization</p>
            <p className="text-lg font-semibold">{organization?.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Plan</p>
            <p className="text-lg font-semibold capitalize">{subscription.plan}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className="text-lg font-semibold capitalize">
              {subscription.status}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Amount</p>
            <p className="text-lg font-semibold">
              ${subscription.amount.toFixed(2)}/month
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Current Period End</p>
          <p className="text-lg font-semibold">
            {subscription.currentPeriodEnd.toLocaleDateString()}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleManageSubscription}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Loading...' : 'Manage Subscription'}
        </Button>
      </CardFooter>
    </Card>
  )
}
