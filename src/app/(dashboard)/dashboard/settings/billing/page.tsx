import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SubscriptionManager } from '@/components/subscription/subscription-manager'
import { Loader2 } from 'lucide-react'

export default function BillingPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Billing & Subscription</h1>
          <p className="text-slate-600">
            Manage your subscription, update user count, and view billing history
          </p>
        </div>

        {/* Subscription Manager */}
        <Suspense fallback={
          <Card>
            <CardContent className="flex items-center justify-center p-6">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Loading billing information...</span>
            </CardContent>
          </Card>
        }>
          <SubscriptionManager 
            subscriptionId="sub_example" // This should come from user context/database
            currentQuantity={1} // This should come from user context/database
          />
        </Suspense>

        {/* Billing Information */}
        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
            <CardDescription>
              Your billing address and payment method details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Billing Address</h4>
                <p className="text-sm text-slate-600">
                  123 Business St<br />
                  Suite 100<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Payment Method</h4>
                <p className="text-sm text-slate-600">
                  •••• •••• •••• 4242<br />
                  Expires 12/25
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>
              View your past invoices and payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">Invoice #INV-001</p>
                  <p className="text-sm text-slate-600">December 1, 2024</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-slate-900">$99.00</p>
                  <p className="text-sm text-green-600">Paid</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">Invoice #INV-002</p>
                  <p className="text-sm text-slate-600">November 1, 2024</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-slate-900">$99.00</p>
                  <p className="text-sm text-green-600">Paid</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Contact our support team for billing assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">
              If you have any questions about your billing or subscription, our support team is here to help.
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:support@usassociate.com"
                className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
              >
                Email Support
              </a>
              <a
                href="/help"
                className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
              >
                Help Center
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
