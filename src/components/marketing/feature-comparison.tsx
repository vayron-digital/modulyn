"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Building2,
  Calendar,
  CheckCircle2,
  FileText,
  LineChart,
  Mail,
  MessageSquare,
  Users2,
} from "lucide-react"

interface Feature {
  icon: any
  title: string
  description: string
  crmDescription?: string
  amsDescription?: string
}

const features: Feature[] = [
  {
    icon: Building2,
    title: "Property/Member Management",
    description: "Comprehensive management tools",
    crmDescription:
      "Manage properties, listings, and transactions with powerful tools and automation",
    amsDescription:
      "Streamline member onboarding, engagement, and retention with advanced features",
  },
  {
    icon: LineChart,
    title: "Analytics & Reporting",
    description: "Data-driven insights",
    crmDescription:
      "Track leads, sales, and performance metrics with detailed analytics",
    amsDescription:
      "Monitor member engagement, event success, and organizational growth",
  },
  {
    icon: Calendar,
    title: "Calendar & Events",
    description: "Scheduling and organization",
    crmDescription:
      "Manage showings, meetings, and follow-ups with integrated calendar",
    amsDescription:
      "Organize conferences, workshops, and member events seamlessly",
  },
  {
    icon: Mail,
    title: "Communication Tools",
    description: "Stay connected",
    crmDescription:
      "Automated follow-ups, drip campaigns, and client communications",
    amsDescription:
      "Member newsletters, announcements, and targeted communications",
  },
  {
    icon: FileText,
    title: "Document Management",
    description: "Organized documentation",
    crmDescription:
      "Store and manage contracts, listings, and client documents",
    amsDescription:
      "Maintain member records, policies, and organizational documents",
  },
  {
    icon: MessageSquare,
    title: "Collaboration",
    description: "Team coordination",
    crmDescription:
      "Team chat, task assignment, and deal collaboration tools",
    amsDescription:
      "Committee management, discussion forums, and member networking",
  },
]

export function FeatureComparison() {
  const [selectedProduct, setSelectedProduct] = useState<"crm" | "ams">("crm")

  return (
    <section className="bg-background px-4 py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Compare Solutions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See how our solutions adapt to your needs
          </p>
        </div>

        {/* Product Selector */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button
            variant={selectedProduct === "crm" ? "default" : "outline"}
            size="lg"
            onClick={() => setSelectedProduct("crm")}
          >
            <Building2 className="mr-2 h-4 w-4" />
            Real Estate CRM
          </Button>
          <Button
            variant={selectedProduct === "ams" ? "default" : "outline"}
            size="lg"
            onClick={() => setSelectedProduct("ams")}
          >
            <Users2 className="mr-2 h-4 w-4" />
            Association Management
          </Button>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all duration-300 hover:scale-105 hover:border-primary"
            >
              <div className="flex items-center gap-4">
                <feature.icon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold">{feature.title}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {selectedProduct === "crm"
                  ? feature.crmDescription
                  : feature.amsDescription}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-primary">
                <CheckCircle2 className="h-4 w-4" />
                Included in all plans
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-primary opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}