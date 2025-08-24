import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  getSubscriptionDetails,
  cancelSubscription,
  reactivateSubscription,
} from '@/lib/stripe-server'

// Validation schema for subscription ID
const subscriptionIdSchema = z.object({
  subscriptionId: z.string().min(1, 'Subscription ID is required'),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const subscriptionId = searchParams.get('subscriptionId')

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription ID is required' },
        { status: 400 }
      )
    }

    // Validate subscription ID
    const validatedData = subscriptionIdSchema.parse({ subscriptionId })

    // Get subscription details
    const subscription = await getSubscriptionDetails(validatedData.subscriptionId)

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: subscription.id,
        status: subscription.status,
        currentPeriodStart: subscription.current_period_start,
        currentPeriodEnd: subscription.current_period_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        customer: {
          id: subscription.customer,
          email: (subscription.customer as any)?.email,
          name: (subscription.customer as any)?.name,
        },
        items: subscription.items.data.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: {
            id: item.price.id,
            unitAmount: (item.price as any)?.unit_amount,
            currency: (item.price as any)?.currency,
            recurring: (item.price as any)?.recurring,
          },
        })),
        discount: subscription.discount,
        totalAmount: subscription.items.data.reduce((total, item) => {
          return total + ((item.price as any)?.unit_amount || 0) * item.quantity
        }, 0),
      },
    })

  } catch (error) {
    console.error('Error in GET subscription:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.errors 
        },
        { status: 400 }
      )
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const subscriptionId = searchParams.get('subscriptionId')

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription ID is required' },
        { status: 400 }
      )
    }

    // Validate subscription ID
    const validatedData = subscriptionIdSchema.parse({ subscriptionId })

    // Cancel subscription
    const canceledSubscription = await cancelSubscription(validatedData.subscriptionId)

    return NextResponse.json({
      success: true,
      data: {
        id: canceledSubscription.id,
        status: canceledSubscription.status,
        cancelAtPeriodEnd: canceledSubscription.cancel_at_period_end,
        canceledAt: canceledSubscription.canceled_at,
      },
      message: 'Subscription canceled successfully',
    })

  } catch (error) {
    console.error('Error in DELETE subscription:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.errors 
        },
        { status: 400 }
      )
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { subscriptionId, action } = body

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription ID is required' },
        { status: 400 }
      )
    }

    if (action !== 'reactivate') {
      return NextResponse.json(
        { error: 'Invalid action. Only "reactivate" is supported' },
        { status: 400 }
      )
    }

    // Reactivate subscription
    const reactivatedSubscription = await reactivateSubscription(subscriptionId)

    return NextResponse.json({
      success: true,
      data: {
        id: reactivatedSubscription.id,
        status: reactivatedSubscription.status,
        cancelAtPeriodEnd: reactivatedSubscription.cancel_at_period_end,
      },
      message: 'Subscription reactivated successfully',
    })

  } catch (error) {
    console.error('Error in PATCH subscription:', error)

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
