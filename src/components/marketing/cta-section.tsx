"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  LineChart,
  Users2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function CTASection() {
  const [selectedProduct, setSelectedProduct] = useState<"crm" | "ams">("crm")

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-0 ml-[-38rem] h-[36.125rem] w-[81.1875rem] dark:[mask-image:linear-gradient(white,transparent)]"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-indigo-500/30 dark:via-purple-500/30 dark:to-pink-500/30">
            <svg
              className="absolute inset-0 h-full w-full stroke-white/10"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="grid"
                  width="24"
                  height="24"
                  patternUnits="userSpaceOnUse"
                  x="100%"
                  patternTransform="translate(0 -1)"
                >
                  <path d="M.5 24V.5H24" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90" />
        </div>
      </div>

      <Container>
        <div className="relative">
          {/* Main CTA */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Transform your business today with{" "}
              <span className="inline-flex animate-background-shine bg-[linear-gradient(110deg,#1e1e1e,45%,#4b556b,55%,#1e1e1e)] bg-[length:250%_100%] bg-clip-text text-transparent">
                intelligent solutions
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Choose the solution that best fits your needs and start optimizing
              your operations today. Get started with a 14-day free trial.
            </p>

            {/* Product Selector */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  "relative border-2 transition-colors",
                  selectedProduct === "crm"
                    ? "border-indigo-600 bg-indigo-600/5 text-indigo-600 hover:bg-indigo-600/10"
                    : "hover:border-indigo-600/50 hover:bg-indigo-600/5 hover:text-indigo-600"
                )}
                onClick={() => setSelectedProduct("crm")}
              >
                <Building2 className="mr-2 h-4 w-4" />
                Real Estate CRM
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  "relative border-2 transition-colors",
                  selectedProduct === "ams"
                    ? "border-indigo-600 bg-indigo-600/5 text-indigo-600 hover:bg-indigo-600/10"
                    : "hover:border-indigo-600/50 hover:bg-indigo-600/5 hover:text-indigo-600"
                )}
                onClick={() => setSelectedProduct("ams")}
              >
                <Users2 className="mr-2 h-4 w-4" />
                Association Management
              </Button>
            </div>

            {/* Quick Benefits */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-left sm:grid-cols-3">
              {selectedProduct === "crm" ? (
                <>
                  <div className="flex items-center gap-2 rounded-lg border bg-white/50 p-3 shadow-sm">
                    <Building2 className="h-5 w-5 text-indigo-600" />
                    <span className="text-sm">Property Management</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border bg-white/50 p-3 shadow-sm">
                    <LineChart className="h-5 w-5 text-indigo-600" />
                    <span className="text-sm">Lead Analytics</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border bg-white/50 p-3 shadow-sm">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                    <span className="text-sm">Smart Scheduling</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 rounded-lg border bg-white/50 p-3 shadow-sm">
                    <Users2 className="h-5 w-5 text-indigo-600" />
                    <span className="text-sm">Member Management</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border bg-white/50 p-3 shadow-sm">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                    <span className="text-sm">Event Planning</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border bg-white/50 p-3 shadow-sm">
                    <LineChart className="h-5 w-5 text-indigo-600" />
                    <span className="text-sm">Growth Analytics</span>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={selectedProduct === "crm" ? "/signup?mode=crm" : "/signup?mode=ams"}
              >
                <Button
                  size="lg"
                  className="group w-full bg-indigo-600 hover:bg-indigo-700 sm:w-auto"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-2 hover:bg-muted/50 sm:w-auto"
              >
                Schedule Demo
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 border-t pt-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm">14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
