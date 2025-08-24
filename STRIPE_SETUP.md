# Stripe Billing Integration Setup Guide

This guide will help you set up the complete Stripe billing integration for the Modulyn One+ SaaS platform.

## 🚀 Quick Start

### 1. Environment Variables Setup

Create or update your `.env.local` file with the following Stripe environment variables:

```bash
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Optional: Webhook endpoint secret (for production)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 2. Stripe Dashboard Configuration

#### Step 1: Create Products and Prices

In your Stripe Dashboard, create the following products and prices:

**REMP (Real Estate Management Platform) Products:**

1. **REMP Momentum (Basic Plan)**
   - Product Name: `REMP Momentum`
   - Price ID: `price_1RzO0QHCvmsg3GIvnCwJpwxU`
   - Price: `$8.75/month` per user
   - Billing: Recurring monthly

2. **REMP Arbor (Premium Plan)**
   - Product Name: `REMP Arbor`
   - Price ID: `price_1RzO9mHCvmsg3GIvf9J6lkwF`
   - Price: `$20.00/month` per user
   - Billing: Recurring monthly

**AMS (Associate Management System) Products:**

3. **AMS Starter (Basic Plan)**
   - Product Name: `AMS Starter`
   - Price ID: `price_1RzOC0HCvmsg3GIvM1jPyGkU`
   - Price: `$11.00/month` per user
   - Billing: Recurring monthly

4. **AMS Ethos (Premium Plan)**
   - Product Name: `AMS Ethos`
   - Price ID: `price_1RzOCrHCvmsg3GIv74TPBq4x`
   - Price: `$22.00/month` per user
   - Billing: Recurring monthly

#### Step 2: Create Coupons

Create the following coupons for the 50% discount promotion:

1. **REMP Coupon**
   - Coupon ID: `remp-50-off-3mo`
   - Name: `REMP 3-Month 50% Discount`
   - Discount: `50% off`
   - Duration: `3 months`
   - Applies to: All REMP products

2. **AMS Coupon**
   - Coupon ID: `ams-50-off-3mo`
   - Name: `AMS 3-Month 50% Discount`
   - Discount: `50% off`
   - Duration: `3 months`
   - Applies to: All AMS products

#### Step 3: Configure Webhooks (Optional for Production)

For production, set up webhooks to handle subscription events:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

## 📁 File Structure

```
src/
├── app/
│   └── api/
│       └── v1/
│           ├── create-subscription/
│           │   └── route.ts
│           ├── update-subscription-quantity/
│           │   └── route.ts
│           └── subscription/
│               └── route.ts
├── components/
│   ├── stripe/
│   │   ├── payment-form.tsx
│   │   └── stripe-provider.tsx
│   └── subscription/
│       └── subscription-manager.tsx
├── hooks/
│   └── use-stripe.ts
└── lib/
    └── stripe-server.ts
```

## 🔧 API Endpoints

### 1. Create Subscription
**POST** `/api/v1/create-subscription`

Creates a new customer and subscription with payment method.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "paymentMethodId": "pm_1234567890",
  "planId": "remp-momentum",
  "company": "Acme Corp"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "customerId": "cus_1234567890",
    "subscriptionId": "sub_1234567890",
    "subscriptionStatus": "incomplete",
    "clientSecret": "pi_1234567890_secret_1234567890",
    "planDetails": {
      "planId": "remp-momentum",
      "productType": "REMP",
      "priceId": "price_REMP_Momentum"
    }
  },
  "message": "Subscription created successfully"
}
```

### 2. Update Subscription Quantity
**POST** `/api/v1/update-subscription-quantity`

Updates the number of users in a subscription.

**Request Body:**
```json
{
  "subscriptionId": "sub_1234567890",
  "newQuantity": 5
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "subscriptionId": "sub_1234567890",
    "newQuantity": 5,
    "subscriptionStatus": "active",
    "currentPeriodEnd": 1640995200,
    "quantity": 5,
    "totalAmount": 49500
  },
  "message": "Subscription quantity updated successfully"
}
```

### 3. Get Subscription Details
**GET** `/api/v1/subscription?subscriptionId=sub_1234567890`

Retrieves subscription details.

### 4. Cancel Subscription
**DELETE** `/api/v1/subscription?subscriptionId=sub_1234567890`

Cancels a subscription (effective at period end).

### 5. Reactivate Subscription
**PATCH** `/api/v1/subscription`

Reactivate a canceled subscription.

**Request Body:**
```json
{
  "subscriptionId": "sub_1234567890",
  "action": "reactivate"
}
```

## 🎯 Usage Examples

### 1. Signup Flow with Stripe

```tsx
import { useStripe } from '@/hooks/use-stripe'
import { PaymentForm } from '@/components/stripe/payment-form'
import { StripeProvider } from '@/components/stripe/stripe-provider'

function SignupPage() {
  const { createSubscription } = useStripe()

  const handlePaymentSubmit = async (paymentMethodId: string) => {
    const result = await createSubscription({
      email: 'user@example.com',
      name: 'John Doe',
      paymentMethodId,
      planId: 'remp-momentum',
      company: 'Acme Corp'
    })

    if (result) {
      // Handle success
      console.log('Subscription created:', result.data)
    }
  }

  return (
    <StripeProvider>
      <PaymentForm onSubmit={handlePaymentSubmit} />
    </StripeProvider>
  )
}
```

### 2. Update User Count

```tsx
import { useStripe } from '@/hooks/use-stripe'

function UserManagement() {
  const { updateSubscriptionQuantity } = useStripe()

  const handleAddUser = async () => {
    const result = await updateSubscriptionQuantity({
      subscriptionId: 'sub_1234567890',
      newQuantity: 5
    })

    if (result) {
      console.log('Users updated:', result.data)
    }
  }

  return (
    <button onClick={handleAddUser}>
      Add User
    </button>
  )
}
```

### 3. Subscription Management

```tsx
import { SubscriptionManager } from '@/components/subscription/subscription-manager'

function BillingPage() {
  return (
    <SubscriptionManager
      subscriptionId="sub_1234567890"
      currentQuantity={3}
    />
  )
}
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit your Stripe secret key to version control
2. **Client-Side Security**: Only use the publishable key on the client-side
3. **Server-Side Validation**: Always validate requests on the server-side
4. **Webhook Verification**: Verify webhook signatures in production
5. **Error Handling**: Don't expose sensitive error details to clients

## 🧪 Testing

### Test Card Numbers

Use these test card numbers in development:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Insufficient Funds**: `4000 0000 0000 9995`
- **Expired Card**: `4000 0000 0000 0069`

### Test Coupons

- **Valid Coupon**: `TEST50OFF` (50% off)
- **Expired Coupon**: `EXPIRED50OFF`

## 🚀 Production Deployment

### 1. Update Environment Variables

Switch to live Stripe keys:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
```

### 2. Set Up Webhooks

Configure webhooks for production events:

```bash
STRIPE_WEBHOOK_SECRET=whsec_your_production_webhook_secret
```

### 3. Database Integration

Connect subscription data to your user/organization database:

```sql
-- Example: Add subscription fields to organizations table
ALTER TABLE organizations ADD COLUMN stripe_customer_id VARCHAR(255);
ALTER TABLE organizations ADD COLUMN stripe_subscription_id VARCHAR(255);
ALTER TABLE organizations ADD COLUMN subscription_status VARCHAR(50);
ALTER TABLE organizations ADD COLUMN user_count INTEGER DEFAULT 1;
```

## 🐛 Troubleshooting

### Common Issues

1. **"Invalid API key"**: Check your environment variables
2. **"Price not found"**: Verify price IDs in Stripe dashboard
3. **"Coupon not found"**: Ensure coupon IDs match exactly
4. **"Payment method not found"**: Check payment method ID format

### Debug Mode

Enable debug logging:

```typescript
// In stripe-server.ts
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
  typescript: true,
  // Enable debug logging
  logger: {
    debug: console.log,
    info: console.log,
    warn: console.warn,
    error: console.error,
  },
})
```

## 📞 Support

For issues with this integration:

1. Check the [Stripe Documentation](https://stripe.com/docs)
2. Review the [Stripe API Reference](https://stripe.com/docs/api)
3. Contact support at support@usassociate.com

## 📝 Changelog

- **v1.0.0**: Initial implementation with subscription creation and management
- **v1.1.0**: Added coupon support and quantity updates
- **v1.2.0**: Enhanced error handling and user feedback
