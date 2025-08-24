"use client"

import { useState, useEffect } from "react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Globe,
  Shield,
  Star,
  X,
  Zap,
} from "lucide-react"
import Link from "next/link"

const competitors = [
  {
    name: "Salesforce",
    logo: "/logos/salesforce.svg",
    rating: 4.2,
    price: "$25/user/month",
    pros: [
      "Comprehensive CRM features",
      "Strong ecosystem",
      "Enterprise-grade security",
    ],
    cons: [
      "Complex setup and learning curve",
      "Expensive for small businesses",
      "Overkill for simple use cases",
    ],
    features: {
      "Real Estate CRM": "Limited",
      "Association Management": "None",
      "Mobile App": "Advanced",
      "Integrations": "Extensive",
      "Customization": "Advanced",
      "Support": "24/7",
    },
  },
  {
    name: "HubSpot",
    logo: "/logos/hubspot.svg",
    rating: 4.4,
    price: "$20/user/month",
    pros: [
      "User-friendly interface",
      "Excellent marketing tools",
      "Good free tier",
    ],
    cons: [
      "Limited real estate features",
      "Expensive scaling",
      "Complex pricing structure",
    ],
    features: {
      "Real Estate CRM": "Basic",
      "Association Management": "None",
      "Mobile App": "Good",
      "Integrations": "Good",
      "Customization": "Limited",
      "Support": "Business Hours",
    },
  },
  {
    name: "Zoho CRM",
    logo: "/logos/zoho.svg",
    rating: 4.1,
    price: "$14/user/month",
    pros: [
      "Affordable pricing",
      "Good feature set",
      "Multi-language support",
    ],
    cons: [
      "Limited real estate focus",
      "Basic reporting",
      "Slow performance",
    ],
    features: {
      "Real Estate CRM": "Basic",
      "Association Management": "None",
      "Mobile App": "Basic",
      "Integrations": "Limited",
      "Customization": "Moderate",
      "Support": "Email Only",
    },
  },
]

const ourFeatures = {
  "Real Estate CRM": "Advanced",
  "Association Management": "Complete",
  "Mobile App": "Native",
  "Integrations": "Extensive",
  "Customization": "Unlimited",
  "Support": "24/7 Premium",
}

export function ComparisonSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedCompetitor, setExpandedCompetitor] = useState<string | null>(null)
  const [selectedFeature, setSelectedFeature] = useState<string>("Real Estate CRM")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const getFeatureScore = (score: string) => {
    switch (score) {
      case "Complete":
      case "Advanced":
      case "Extensive":
      case "Unlimited":
      case "24/7 Premium":
        return { color: "text-green-600", bg: "bg-green-50", icon: CheckCircle2 }
      case "Good":
      case "Moderate":
        return { color: "text-yellow-600", bg: "bg-yellow-50", icon: Star }
      case "Basic":
      case "Limited":
      case "Business Hours":
        return { color: "text-orange-600", bg: "bg-orange-50", icon: ChevronDown }
      case "None":
      case "Email Only":
        return { color: "text-red-600", bg: "bg-red-50", icon: X }
      default:
        return { color: "text-slate-600", bg: "bg-slate-50", icon: ChevronDown }
    }
  }

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <Container>
        <div className="space-y-16">
          {/* Header */}
          <div
            className={cn(
              "text-center transition-all duration-700",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <SectionHeading
              title="Why choose US Associate over the competition?"
              subtitle="See how we stack up against other solutions in the market. Our platform offers unique advantages that others simply can't match."
            />
          </div>

          {/* Feature Comparison */}
          <div
            className={cn(
              "transition-all duration-700 delay-200",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <div className="rounded-2xl border bg-white p-8 shadow-lg">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900">
                  Feature Comparison
                </h3>
                <p className="text-slate-600">
                  Select a feature to see how we compare
                </p>
              </div>

              {/* Feature Selector */}
              <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {Object.keys(ourFeatures).map((feature) => (
                  <button
                    key={feature}
                    onClick={() => setSelectedFeature(feature)}
                    className={cn(
                      "rounded-lg border p-3 text-sm font-medium transition-all duration-200",
                      selectedFeature === feature
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-25"
                    )}
                  >
                    {feature}
                  </button>
                ))}
              </div>

              {/* Comparison Table */}
              <div className="overflow-hidden rounded-xl border">
                <div className="grid grid-cols-1 divide-y lg:grid-cols-4 lg:divide-y-0 lg:divide-x">
                  {/* US Associate */}
                  <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                          <Zap className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">US Associate</h4>
                          <p className="text-sm text-slate-600">Our Platform</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        Winner
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">5.0</div>
                        <div className="flex justify-center space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-900">
                          $15/user/month
                        </div>
                        <div className="text-sm text-slate-600">Best value</div>
                      </div>

                      <div className="space-y-3">
                        <div className="text-sm font-medium text-slate-900">
                          {selectedFeature}
                        </div>
                        {(() => {
                          const score = getFeatureScore(ourFeatures[selectedFeature])
                          return (
                            <div
                              className={cn(
                                "flex items-center space-x-2 rounded-lg p-3 text-sm font-medium",
                                score.bg,
                                score.color
                              )}
                            >
                              <score.icon className="h-4 w-4" />
                              <span>{ourFeatures[selectedFeature]}</span>
                            </div>
                          )
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Competitors */}
                  {competitors.map((competitor) => (
                    <div key={competitor.name} className="bg-white p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                            <div className="h-6 w-6 rounded bg-slate-300" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">
                              {competitor.name}
                            </h4>
                            <p className="text-sm text-slate-600">Competitor</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-slate-900">
                            {competitor.rating}
                          </div>
                          <div className="flex justify-center space-x-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-4 w-4",
                                  i < Math.floor(competitor.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-slate-300"
                                )}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-900">
                            {competitor.price}
                          </div>
                          <div className="text-sm text-slate-600">Starting price</div>
                        </div>

                        <div className="space-y-3">
                          <div className="text-sm font-medium text-slate-900">
                            {selectedFeature}
                          </div>
                          {(() => {
                            const score = getFeatureScore(
                              competitor.features[selectedFeature]
                            )
                            return (
                              <div
                                className={cn(
                                  "flex items-center space-x-2 rounded-lg p-3 text-sm font-medium",
                                  score.bg,
                                  score.color
                                )}
                              >
                                <score.icon className="h-4 w-4" />
                                <span>{competitor.features[selectedFeature]}</span>
                              </div>
                            )
                          })()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Competitor Analysis */}
          <div
            className={cn(
              "space-y-6 transition-all duration-700 delay-400",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <h3 className="text-center text-2xl font-bold text-slate-900">
              Detailed Competitor Analysis
            </h3>

            <div className="grid gap-6 lg:grid-cols-3">
              {competitors.map((competitor) => (
                <div
                  key={competitor.name}
                  className="rounded-2xl border bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-lg font-bold text-slate-900">
                      {competitor.name}
                    </h4>
                    <button
                      onClick={() =>
                        setExpandedCompetitor(
                          expandedCompetitor === competitor.name
                            ? null
                            : competitor.name
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg border text-slate-600 transition-colors hover:bg-slate-50"
                    >
                      {expandedCompetitor === competitor.name ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Rating</span>
                      <span className="font-semibold text-slate-900">
                        {competitor.rating}/5
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Price</span>
                      <span className="font-semibold text-slate-900">
                        {competitor.price}
                      </span>
                    </div>

                    {expandedCompetitor === competitor.name && (
                      <div className="space-y-4 border-t pt-4">
                        <div>
                          <h5 className="mb-2 font-semibold text-green-700">
                            Pros
                          </h5>
                          <ul className="space-y-1">
                            {competitor.pros.map((pro) => (
                              <li
                                key={pro}
                                className="flex items-center space-x-2 text-sm text-slate-600"
                              >
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="mb-2 font-semibold text-red-700">Cons</h5>
                          <ul className="space-y-1">
                            {competitor.cons.map((con) => (
                              <li
                                key={con}
                                className="flex items-center space-x-2 text-sm text-slate-600"
                              >
                                <X className="h-4 w-4 text-red-500" />
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div
            className={cn(
              "rounded-2xl border bg-gradient-to-r from-indigo-50 to-purple-50 p-8 transition-all duration-700 delay-600",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <div className="text-center">
              <h3 className="mb-6 text-2xl font-bold text-slate-900">
                Why US Associate is the clear choice
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-slate-900">Enterprise Security</h4>
                  <p className="text-sm text-slate-600">
                    Bank-level encryption and compliance
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-slate-900">Lightning Fast</h4>
                  <p className="text-sm text-slate-600">
                    Optimized for speed and performance
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 text-white">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-slate-900">Global Support</h4>
                  <p className="text-sm text-slate-600">
                    24/7 support in multiple languages
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600 text-white">
                    <Star className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-slate-900">Best Value</h4>
                  <p className="text-sm text-slate-600">
                    More features at a better price
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            className={cn(
              "text-center transition-all duration-700 delay-700",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <Link href="/signup">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-slate-600">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
