"use client"

import { useState, useEffect } from "react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  Database,
  LineChart,
  Mail,
  MessageSquare,
  Shield,
  Users2,
  Zap,
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    id: "crm",
    title: "Real Estate CRM",
    description: "Comprehensive property and client management",
    icon: Building2,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    features: [
      "Property listing management",
      "Lead tracking & nurturing",
      "Client relationship management",
      "Transaction pipeline",
      "Document management",
      "Market analytics",
    ],
  },
  {
    id: "ams",
    title: "Association Management",
    description: "Complete member and event management",
    icon: Users2,
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50",
    features: [
      "Member database management",
      "Event planning & registration",
      "Dues collection & tracking",
      "Committee management",
      "Communication tools",
      "Growth analytics",
    ],
  },
  {
    id: "analytics",
    title: "Advanced Analytics",
    description: "Data-driven insights and reporting",
    icon: LineChart,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    features: [
      "Real-time dashboards",
      "Custom reports",
      "Performance metrics",
      "Trend analysis",
      "ROI tracking",
      "Predictive insights",
    ],
  },
  {
    id: "automation",
    title: "Smart Automation",
    description: "Automate repetitive tasks and workflows",
    icon: Zap,
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50",
    features: [
      "Email automation",
      "Task scheduling",
      "Follow-up reminders",
      "Data synchronization",
      "Workflow automation",
      "Integration triggers",
    ],
  },
  {
    id: "communication",
    title: "Communication Hub",
    description: "Centralized messaging and collaboration",
    icon: MessageSquare,
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-50",
    features: [
      "Internal messaging",
      "Email integration",
      "SMS notifications",
      "Video conferencing",
      "File sharing",
      "Team collaboration",
    ],
  },
  {
    id: "security",
    title: "Enterprise Security",
    description: "Bank-level security and compliance",
    icon: Shield,
    color: "from-slate-500 to-gray-600",
    bgColor: "bg-slate-50",
    features: [
      "End-to-end encryption",
      "Role-based access control",
      "Audit logging",
      "GDPR compliance",
      "SOC 2 certified",
      "Regular security audits",
    ],
  },
]

export function FeatureShowcase() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState(features[0])
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
              title="Powerful Features for Modern Businesses"
              subtitle="Everything you need to streamline operations, boost productivity, and drive growth. Choose the features that matter most to your business."
            />
          </div>

          {/* Feature Grid */}
          <div
            className={cn(
              "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700 delay-200",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={cn(
                  "group relative cursor-pointer rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg",
                  hoveredFeature === feature.id && "ring-2 ring-indigo-500/20",
                  `delay-${300 + index * 100}`
                )}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
                onClick={() => setSelectedFeature(feature)}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r text-white transition-transform duration-300 group-hover:scale-110",
                    feature.color
                  )}
                >
                  <feature.icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {feature.description}
                  </p>

                  {/* Feature List */}
                  <div className="space-y-2">
                    {feature.features.slice(0, 3).map((item, itemIndex) => (
                      <div
                        key={item}
                        className="flex items-center space-x-2 text-sm text-slate-600"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More */}
                  <div className="flex items-center space-x-2 text-sm font-medium text-indigo-600 transition-colors group-hover:text-indigo-700">
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>

          {/* Detailed Feature View */}
          <div
            className={cn(
              "rounded-2xl border bg-white p-8 shadow-lg transition-all duration-700 delay-400",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left Side - Content */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div
                    className={cn(
                      "flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r text-white",
                      selectedFeature.color
                    )}
                  >
                    <selectedFeature.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {selectedFeature.title}
                    </h3>
                    <p className="text-slate-600">
                      {selectedFeature.description}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {selectedFeature.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center space-x-3 rounded-lg border bg-slate-50 p-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-slate-700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <Link href="/signup">
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline">View Demo</Button>
                </div>
              </div>

              {/* Right Side - Visual */}
              <div className="relative">
                <div className="rounded-xl border bg-slate-50 p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-900">
                        {selectedFeature.title} Dashboard
                      </h4>
                      <Badge variant="secondary">Live Preview</Badge>
                    </div>
                    
                    {/* Mock Dashboard */}
                    <div className="space-y-3">
                      <div className="h-3 w-full rounded-full bg-slate-200" />
                      <div className="h-3 w-3/4 rounded-full bg-slate-200" />
                      <div className="h-3 w-1/2 rounded-full bg-slate-200" />
                      <div className="h-3 w-5/6 rounded-full bg-slate-200" />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-white p-3 text-center">
                        <div className="text-lg font-bold text-indigo-600">24</div>
                        <div className="text-xs text-slate-600">Active Items</div>
                      </div>
                      <div className="rounded-lg bg-white p-3 text-center">
                        <div className="text-lg font-bold text-green-600">89%</div>
                        <div className="text-xs text-slate-600">Success Rate</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-xl" />
                <div className="absolute -bottom-4 -left-4 h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
