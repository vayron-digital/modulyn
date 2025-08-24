import { loadStripe, Stripe } from '@stripe/stripe-js'
import { supabase } from './supabase'

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

export const createCheckoutSession = async (priceId: string) => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.functions.invoke('create-checkout-session', {
      body: { priceId },
    })

    if (error) throw error

    const stripe = await getStripe()
    if (!stripe) throw new Error('Stripe failed to initialize')

    const { error: stripeError } = await stripe.redirectToCheckout({
      sessionId: session.id,
    })

    if (stripeError) throw stripeError
  } catch (error) {
    console.error('Error in createCheckoutSession:', error)
    throw error
  }
}

export const createPortalSession = async () => {
  try {
    const {
      data: { url },
      error,
    } = await supabase.functions.invoke('create-portal-session')

    if (error) throw error

    window.location.assign(url)
  } catch (error) {
    console.error('Error in createPortalSession:', error)
    throw error
  }
}

export const getSubscription = async (organizationId: string) => {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('organization_id', organizationId)
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error('Error in getSubscription:', error)
    throw error
  }
}

export const updateSubscription = async (
  subscriptionId: string,
  updates: Partial<{
    status: string
    current_period_end: string
    cancel_at_period_end: boolean
  }>
) => {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .update(updates)
      .eq('id', subscriptionId)
      .select()
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error('Error in updateSubscription:', error)
    throw error
  }
}
