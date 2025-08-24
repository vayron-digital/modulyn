"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  HandshakeIcon,
  LineChart,
  Users2,
} from "lucide-react"
import Link from "next/link"
import { PricingSection } from "@/components/marketing/pricing-section"
import { FeatureComparison } from "@/components/marketing/feature-comparison"

export function LandingPage() {
  const [selectedProduct, setSelectedProduct] = useState<"crm" | "ams">("crm")

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted px-4 py-32">
        {/* Background Grid */}
        <div className="pointer-events-none absolute inset-0 select-none">
          <div className="h-full w-full bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div>
            <h1 className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
              {selectedProduct === "crm"
                ? "Transform Your Real Estate Business"
                : "Elevate Your Trade Association"}
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              {selectedProduct === "crm"
                ? "Streamline your real estate operations with our powerful CRM solution"
                : "Modernize your association management with our comprehensive platform"}
            </p>
          </div>

          {/* Product Selector */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <Button
              variant={selectedProduct === "crm" ? "default" : "outline"}
              size="lg"
              onClick={() => setSelectedProduct("crm")}
              className="group relative"
            >
              <Building2 className="mr-2 h-4 w-4" />
              Real Estate CRM
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-1 bg-primary transition-all duration-300",
                  selectedProduct === "crm" ? "w-full" : "w-0"
                )}
              />
            </Button>
            <Button
              variant={selectedProduct === "ams" ? "default" : "outline"}
              size="lg"
              onClick={() => setSelectedProduct("ams")}
              className="group relative"
            >
              <Users2 className="mr-2 h-4 w-4" />
              Association Management
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-1 bg-primary transition-all duration-300",
                  selectedProduct === "ams" ? "w-full" : "w-0"
                )}
              />
            </Button>
          </div>

          {/* Feature Grid */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {selectedProduct === "crm" ? (
              <>
                <FeatureCard
                  icon={Building2}
                  title="Property Management"
                  description="Efficiently manage your property listings, viewings, and transactions"
                />
                <FeatureCard
                  icon={LineChart}
                  title="Lead Analytics"
                  description="Track and analyze leads with powerful insights and reporting"
                />
                <FeatureCard
                  icon={HandshakeIcon}
                  title="Client Relations"
                  description="Build lasting relationships with integrated communication tools"
                />
              </>
            ) : (
              <>
                <FeatureCard
                  icon={Users2}
                  title="Member Management"
                  description="Streamline member onboarding, engagement, and retention"
                />
                <FeatureCard
                  icon={LineChart}
                  title="Event Management"
                  description="Organize and track events, meetings, and conferences"
                />
                <FeatureCard
                  icon={HandshakeIcon}
                  title="Advocacy Tools"
                  description="Empower your advocacy efforts with powerful tools"
                />
              </>
            )}
          </div>

          {/* CTA */}
          <div className="mt-12">
            <Link
              href={selectedProduct === "crm" ? "/signup?mode=crm" : "/signup?mode=ams"}
            >
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronRight className="h-8 w-8 -rotate-90 animate-bounce text-muted-foreground" />
        </div>
      </section>

      {/* Feature Comparison */}
      <FeatureComparison />

      {/* Pricing */}
      <PricingSection />

      {/* Footer */}
      <footer className="border-t bg-muted/50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold">Product</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#compare" className="text-sm text-muted-foreground hover:text-foreground">
                    Compare
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-sm text-muted-foreground hover:text-foreground">
                    Guides
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-sm text-muted-foreground hover:text-foreground">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any
  title: string
  description: string
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all duration-300 hover:scale-105 hover:border-primary">
      <div className="flex items-center gap-4">
        <Icon className="h-8 w-8 text-primary" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4 flex items-center text-sm text-primary">
        Learn more
        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  )
}