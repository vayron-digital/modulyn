import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  createStripeCustomer,
  attachPaymentMethodToCustomer,
  createStripeSubscription,
  getPlanDetails,
} from '@/lib/stripe-server'

// Validation schema for the request body
const createSubscriptionSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required'),
  paymentMethodId: z.string().min(1, 'Payment method ID is required'),
  planId: z.string().min(1, 'Plan ID is required'),
  company: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validatedData = createSubscriptionSchema.parse(body)

    const { email, name, paymentMethodId, planId, company } = validatedData

    // Get plan details
    const planDetails = getPlanDetails(planId)
    if (!planDetails) {
      return NextResponse.json(
        { error: 'Invalid plan ID' },
        { status: 400 }
      )
    }

    // Create Stripe customer
    const customer = await createStripeCustomer(email, name)

    // Attach payment method to customer
    await attachPaymentMethodToCustomer(customer.id, paymentMethodId)

    // Create subscription with coupon
    const subscription = await createStripeSubscription(
      customer.id,
      planDetails.priceId,
      planDetails.couponId,
      1 // Start with 1 user (the tenant)
    )

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        customerId: customer.id,
        subscriptionId: subscription.id,
        subscriptionStatus: subscription.status,
        clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
        planDetails: {
          planId,
          productType: planDetails.productType,
          priceId: planDetails.priceId,
        },
      },
      message: 'Subscription created successfully',
    })

  } catch (error) {
    console.error('Error in create-subscription:', error)

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
