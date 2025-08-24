import Stripe from 'stripe'

// Initialize Stripe with server-side secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
  typescript: true,
})

// Product and Price IDs mapping
export const STRIPE_PRODUCTS = {
  REMP: {
    MOMENTUM: 'price_1RzO0QHCvmsg3GIvnCwJpwxU', // $8.75/user/month
    ARBOR: 'price_1RzO9mHCvmsg3GIvf9J6lkwF',    // $20.00/user/month
  },
  AMS: {
    STARTER: 'price_1RzOC0HCvmsg3GIvM1jPyGkU',  // $11.00/user/month
    ETHOS: 'price_1RzOCrHCvmsg3GIv74TPBq4x',    // $22.00/user/month
  },
} as const

// Coupon IDs
export const STRIPE_COUPONS = {
  REMP: 'remp-50-off-3mo',
  AMS: 'ams-50-off-3mo',
} as const

// Plan mapping for easy lookup
export const PLAN_MAPPING = {
  'remp-momentum': {
    priceId: STRIPE_PRODUCTS.REMP.MOMENTUM,
    couponId: STRIPE_COUPONS.REMP,
    productType: 'REMP',
  },
  'remp-arbor': {
    priceId: STRIPE_PRODUCTS.REMP.ARBOR,
    couponId: STRIPE_COUPONS.REMP,
    productType: 'REMP',
  },
  'ams-starter': {
    priceId: STRIPE_PRODUCTS.AMS.STARTER,
    couponId: STRIPE_COUPONS.AMS,
    productType: 'AMS',
  },
  'ams-ethos': {
    priceId: STRIPE_PRODUCTS.AMS.ETHOS,
    couponId: STRIPE_COUPONS.AMS,
    productType: 'AMS',
  },
} as const

export type PlanId = keyof typeof PLAN_MAPPING

// Helper function to get plan details
export const getPlanDetails = (planId: string) => {
  return PLAN_MAPPING[planId as PlanId]
}

// Helper function to create a customer
export const createStripeCustomer = async (email: string, name: string) => {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        source: 'us-associate-saas',
      },
    })
    return customer
  } catch (error) {
    console.error('Error creating Stripe customer:', error)
    throw new Error('Failed to create customer')
  }
}

// Helper function to attach payment method to customer
export const attachPaymentMethodToCustomer = async (
  customerId: string,
  paymentMethodId: string
) => {
  try {
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    })

    // Set as default payment method
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    })

    return true
  } catch (error) {
    console.error('Error attaching payment method:', error)
    throw new Error('Failed to attach payment method')
  }
}

// Helper function to create subscription
export const createStripeSubscription = async (
  customerId: string,
  priceId: string,
  couponId?: string,
  quantity: number = 1
) => {
  try {
    const subscriptionData: Stripe.SubscriptionCreateParams = {
      customer: customerId,
      items: [
        {
          price: priceId,
          quantity,
        },
      ],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
    }

    // Add coupon if provided
    if (couponId) {
      (subscriptionData as any).coupon = couponId
    }

    const subscription = await stripe.subscriptions.create(subscriptionData)
    return subscription
  } catch (error) {
    console.error('Error creating Stripe subscription:', error)
    throw new Error('Failed to create subscription')
  }
}

// Helper function to update subscription quantity
export const updateSubscriptionQuantity = async (
  subscriptionId: string,
  newQuantity: number
) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    
    if (!subscription.items.data.length) {
      throw new Error('No subscription items found')
    }

    const subscriptionItemId = subscription.items.data[0].id

    const updatedSubscription = await stripe.subscriptionItems.update(
      subscriptionItemId,
      {
        quantity: newQuantity,
      }
    )

    return updatedSubscription
  } catch (error) {
    console.error('Error updating subscription quantity:', error)
    throw new Error('Failed to update subscription quantity')
  }
}

// Helper function to get subscription details
export const getSubscriptionDetails = async (subscriptionId: string) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['customer', 'items.data.price'],
    })
    return subscription
  } catch (error) {
    console.error('Error retrieving subscription:', error)
    throw new Error('Failed to retrieve subscription')
  }
}

// Helper function to cancel subscription
export const cancelSubscription = async (subscriptionId: string) => {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })
    return subscription
  } catch (error) {
    console.error('Error canceling subscription:', error)
    throw new Error('Failed to cancel subscription')
  }
}

// Helper function to reactivate subscription
export const reactivateSubscription = async (subscriptionId: string) => {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    })
    return subscription
  } catch (error) {
    console.error('Error reactivating subscription:', error)
    throw new Error('Failed to reactivate subscription')
  }
}
