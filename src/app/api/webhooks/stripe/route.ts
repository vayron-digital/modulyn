import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe-server'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object)
        break

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleSubscriptionCreated(subscription: any) {
  console.log('Subscription created:', subscription.id)
  
  // Update your database with subscription details
  // Example: Update organization subscription status
  // await updateOrganizationSubscription(subscription.customer, subscription.id, subscription.status)
}

async function handleSubscriptionUpdated(subscription: any) {
  console.log('Subscription updated:', subscription.id)
  
  // Update your database with new subscription details
  // Example: Update organization subscription status and quantity
  // await updateOrganizationSubscription(subscription.customer, subscription.id, subscription.status, subscription.items.data[0]?.quantity)
}

async function handleSubscriptionDeleted(subscription: any) {
  console.log('Subscription deleted:', subscription.id)
  
  // Update your database to mark subscription as canceled
  // Example: Update organization subscription status
  // await updateOrganizationSubscription(subscription.customer, subscription.id, 'canceled')
}

async function handlePaymentSucceeded(invoice: any) {
  console.log('Payment succeeded for invoice:', invoice.id)
  
  // Handle successful payment
  // Example: Send confirmation email, update billing status
  // await sendPaymentConfirmationEmail(invoice.customer_email)
}

async function handlePaymentFailed(invoice: any) {
  console.log('Payment failed for invoice:', invoice.id)
  
  // Handle failed payment
  // Example: Send payment failure notification, update subscription status
  // await sendPaymentFailureNotification(invoice.customer_email)
}
