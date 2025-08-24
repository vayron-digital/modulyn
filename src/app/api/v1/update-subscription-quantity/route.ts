import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  updateSubscriptionQuantity,
  getSubscriptionDetails,
} from '@/lib/stripe-server'

// Validation schema for the request body
const updateSubscriptionQuantitySchema = z.object({
  subscriptionId: z.string().min(1, 'Subscription ID is required'),
  newQuantity: z.number().min(1, 'Quantity must be at least 1'),
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validatedData = updateSubscriptionQuantitySchema.parse(body)

    const { subscriptionId, newQuantity } = validatedData

    // Get current subscription details
    const currentSubscription = await getSubscriptionDetails(subscriptionId)
    
    if (!currentSubscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    // Check if subscription is active
    if (currentSubscription.status !== 'active' && currentSubscription.status !== 'trialing') {
      return NextResponse.json(
        { error: 'Subscription is not active' },
        { status: 400 }
      )
    }

    // Update subscription quantity
    const updatedSubscriptionItem = await updateSubscriptionQuantity(
      subscriptionId,
      newQuantity
    )

    // Get updated subscription details
    const updatedSubscription = await getSubscriptionDetails(subscriptionId)

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        subscriptionId,
        newQuantity,
        subscriptionStatus: updatedSubscription.status,
        currentPeriodEnd: updatedSubscription.cancel_at ? new Date(updatedSubscription.cancel_at * 1000).getTime() : undefined,
        quantity: updatedSubscriptionItem.quantity,
        totalAmount: updatedSubscriptionItem.amount_total,
      },
      message: 'Subscription quantity updated successfully',
    })

  } catch (error) {
    console.error('Error in update-subscription-quantity:', error)

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.errors 
        },
        { status: 400 }
      )
    }

    // Handle Stripe errors
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    // Handle unknown errors
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
