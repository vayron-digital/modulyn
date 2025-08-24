"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Loader2, Users, CreditCard, Calendar, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import { useStripe } from '@/hooks/use-stripe'
import { cn } from '@/lib/utils'

interface SubscriptionManagerProps {
  subscriptionId?: string
  currentQuantity?: number
  className?: string
}

interface SubscriptionDetails {
  id: string
  status: string
  currentPeriodEnd: number
  cancelAtPeriodEnd: boolean
  customer: {
    id: string
    email: string
    name: string
  }
  items: Array<{
    id: string
    quantity: number
    price: {
      id: string
      unitAmount: number
      currency: string
      recurring: {
        interval: string
      }
    }
  }>
  discount?: {
    coupon: {
      id: string
      name: string
      percentOff: number
    }
  }
  totalAmount: number
}

export function SubscriptionManager({
  subscriptionId,
  currentQuantity = 1,
  className,
}: SubscriptionManagerProps) {
  const { updateSubscriptionQuantity, getSubscription, cancelSubscription, reactivateSubscription, isLoading, error } = useStripe()
  
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null)
  const [newQuantity, setNewQuantity] = useState(currentQuantity)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)

  // Load subscription details
  useEffect(() => {
    if (subscriptionId) {
      loadSubscriptionDetails()
    }
  }, [subscriptionId])

  const loadSubscriptionDetails = async () => {
    if (!subscriptionId) return

    setIsLoadingDetails(true)
    try {
      const result = await getSubscription(subscriptionId)
      if (result?.data) {
        setSubscription(result.data)
        setNewQuantity(result.data.items[0]?.quantity || 1)
      }
    } catch (error) {
      console.error('Failed to load subscription details:', error)
    } finally {
      setIsLoadingDetails(false)
    }
  }

  const handleUpdateQuantity = async () => {
    if (!subscriptionId || newQuantity === currentQuantity) return

    setIsUpdating(true)
    try {
      const result = await updateSubscriptionQuantity({
        subscriptionId,
        newQuantity,
      })

      if (result) {
        // Reload subscription details
        await loadSubscriptionDetails()
      }
    } catch (error) {
      console.error('Failed to update subscription quantity:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCancelSubscription = async () => {
    if (!subscriptionId) return

    if (confirm('Are you sure you want to cancel your subscription? It will remain active until the end of the current billing period.')) {
      try {
        const result = await cancelSubscription(subscriptionId)
        if (result) {
          await loadSubscriptionDetails()
        }
      } catch (error) {
        console.error('Failed to cancel subscription:', error)
      }
    }
  }

  const handleReactivateSubscription = async () => {
    if (!subscriptionId) return

    try {
      const result = await reactivateSubscription(subscriptionId)
      if (result) {
        await loadSubscriptionDetails()
      }
    } catch (error) {
      console.error('Failed to reactivate subscription:', error)
    }
  }

  const formatCurrency = (amount: number, currency: string = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100)
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getStatusBadge = (status: string, cancelAtPeriodEnd: boolean) => {
    if (cancelAtPeriodEnd) {
      return <Badge variant="destructive">Canceling</Badge>
    }

    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
      case 'trialing':
        return <Badge variant="secondary">Trial</Badge>
      case 'canceled':
        return <Badge variant="destructive">Canceled</Badge>
      case 'past_due':
        return <Badge variant="destructive">Past Due</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (isLoadingDetails) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading subscription details...</span>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Subscription Details */}
      {subscription && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Subscription Details
            </CardTitle>
            <CardDescription>
              Manage your subscription and billing information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              {getStatusBadge(subscription.status, subscription.cancelAtPeriodEnd)}
            </div>

            {/* Current Period */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Current Period Ends</span>
              <span className="text-sm text-slate-600">
                {formatDate(subscription.currentPeriodEnd)}
              </span>
            </div>

            {/* Current Quantity */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Current Users</span>
              <span className="text-sm text-slate-600">
                {subscription.items[0]?.quantity || 0} users
              </span>
            </div>

            {/* Price per User */}
            {subscription.items[0] && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Price per User</span>
                <span className="text-sm text-slate-600">
                  {formatCurrency(subscription.items[0].price.unitAmount, subscription.items[0].price.currency)} / {subscription.items[0].price.recurring.interval}
                </span>
              </div>
            )}

            {/* Discount */}
            {subscription.discount && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Discount</span>
                <span className="text-sm text-green-600">
                  {subscription.discount.coupon.percentOff}% off
                </span>
              </div>
            )}

            <Separator />

            {/* Total Amount */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Total Amount</span>
              <span className="text-lg font-semibold">
                {formatCurrency(subscription.totalAmount)}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Update Quantity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Update User Count
          </CardTitle>
          <CardDescription>
            Add or remove users from your subscription
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="quantity">Number of Users</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={newQuantity}
                onChange={(e) => setNewQuantity(parseInt(e.target.value) || 1)}
                className="mt-1"
              />
            </div>
            <Button
              onClick={handleUpdateQuantity}
              disabled={isUpdating || newQuantity === currentQuantity || !subscriptionId}
              className="mt-6"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update'
              )}
            </Button>
          </div>

          {newQuantity !== currentQuantity && (
            <div className="text-sm text-slate-600">
              {newQuantity > currentQuantity ? (
                <span className="text-green-600">
                  <CheckCircle className="inline h-4 w-4 mr-1" />
                  Adding {newQuantity - currentQuantity} user(s)
                </span>
              ) : (
                <span className="text-orange-600">
                  <XCircle className="inline h-4 w-4 mr-1" />
                  Removing {currentQuantity - newQuantity} user(s)
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Subscription Actions */}
      {subscription && (
        <Card>
          <CardHeader>
            <CardTitle>Subscription Actions</CardTitle>
            <CardDescription>
              Manage your subscription status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subscription.cancelAtPeriodEnd ? (
              <Button
                onClick={handleReactivateSubscription}
                variant="outline"
                className="w-full"
              >
                Reactivate Subscription
              </Button>
            ) : (
              <Button
                onClick={handleCancelSubscription}
                variant="destructive"
                className="w-full"
              >
                Cancel Subscription
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
