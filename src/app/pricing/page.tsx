import { PricingPlans } from '@/components/shared/pricing-plans'

export default function PricingPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Choose the plan that best fits your organization&apos;s needs
        </p>
      </div>
      <PricingPlans />
    </div>
  )
}
