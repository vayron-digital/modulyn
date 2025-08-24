"use client"

import { useState, useEffect } from "react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Play,
  Star,
  Users2,
  Zap,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const features = [
  "Real Estate CRM & Association Management",
  "Advanced Analytics & Reporting",
  "Automated Workflows & Integrations",
  "24/7 Customer Support",
]

const stats = [
  { label: "Active Users", value: "10,000+", icon: Users2 },
  { label: "Properties Managed", value: "50,000+", icon: Building2 },
  { label: "Customer Rating", value: "4.9/5", icon: Star },
]

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<"crm" | "ams">("crm")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/50 py-24 sm:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <div className="absolute -left-4 top-0 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute -right-4 top-1/4 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        {/* Border Lines */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div
              className={cn(
                "inline-flex items-center space-x-2 rounded-full border bg-white/50 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-700",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
            >
              <Zap className="h-4 w-4 text-indigo-600" />
              <span>Now with AI-powered insights</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1
                className={cn(
                  "text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl transition-all duration-700 delay-200",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}
              >
                Transform Your{" "}
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Business
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 h-3 w-full text-indigo-200"
                    viewBox="0 0 100 20"
                    fill="currentColor"
                  >
                    <path d="M0 10 Q25 0 50 10 T100 10" />
                  </svg>
                </span>{" "}
                with Intelligent Solutions
              </h1>
              
              <p
                className={cn(
                  "text-xl leading-relaxed text-slate-600 transition-all duration-700 delay-300",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}
              >
                Whether you're managing real estate or associations, our platform
                provides the tools you need to streamline operations, boost
                productivity, and drive growth.
              </p>
            </div>

            {/* Product Selector */}
            <div
              className={cn(
                "space-y-4 transition-all duration-700 delay-400",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
            >
              <div className="flex items-center space-x-4">
                <Button
                  size="lg"
                  variant="outline"
                  className={cn(
                    "relative border-2 transition-all duration-300",
                    selectedProduct === "crm"
                      ? "border-indigo-600 bg-indigo-600/5 text-indigo-600 shadow-lg"
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
                    "relative border-2 transition-all duration-300",
                    selectedProduct === "ams"
                      ? "border-indigo-600 bg-indigo-600/5 text-indigo-600 shadow-lg"
                      : "hover:border-indigo-600/50 hover:bg-indigo-600/5 hover:text-indigo-600"
                  )}
                  onClick={() => setSelectedProduct("ams")}
                >
                  <Users2 className="mr-2 h-4 w-4" />
                  Association Management
                </Button>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div
                    key={feature}
                    className={cn(
                      "flex items-center space-x-3 transition-all duration-700",
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0",
                      `delay-${500 + index * 100}`
                    )}
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className={cn(
                "flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 transition-all duration-700 delay-600",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
            >
              <Link
                href={selectedProduct === "crm" ? "/signup?mode=crm" : "/signup?mode=ams"}
              >
                <Button
                  size="lg"
                  className="group w-full bg-indigo-600 px-8 py-3 text-lg font-semibold hover:bg-indigo-700 sm:w-auto"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="group w-full border-2 px-8 py-3 text-lg font-semibold hover:bg-muted/50 sm:w-auto"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div
              className={cn(
                "grid grid-cols-3 gap-6 pt-8 transition-all duration-700 delay-700",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <stat.icon className="h-5 w-5 text-indigo-600" />
                    <span className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div
            className={cn(
              "relative transition-all duration-700 delay-300",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
          >
            {/* Main Dashboard Mockup */}
            <div className="relative mx-auto max-w-lg">
              {/* Browser Frame */}
              <div className="relative overflow-hidden rounded-xl border bg-white shadow-2xl">
                {/* Browser Header */}
                <div className="flex items-center space-x-2 border-b bg-slate-50 px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <div className="ml-4 flex-1 rounded-md bg-white px-3 py-1 text-sm text-slate-600">
                    usassociate.com/dashboard
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {selectedProduct === "crm" ? "Property Dashboard" : "Member Dashboard"}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {selectedProduct === "crm" 
                          ? "Manage your real estate portfolio" 
                          : "Track association growth"
                        }
                      </p>
                    </div>
                    <div className="h-8 w-8 rounded-lg bg-indigo-600" />
                  </div>

                  {/* Stats Grid */}
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    {selectedProduct === "crm" ? (
                      <>
                        <div className="rounded-lg bg-green-50 p-4">
                          <div className="text-2xl font-bold text-green-600">24</div>
                          <div className="text-sm text-green-700">Active Listings</div>
                        </div>
                        <div className="rounded-lg bg-blue-50 p-4">
                          <div className="text-2xl font-bold text-blue-600">156</div>
                          <div className="text-sm text-blue-700">Leads This Month</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="rounded-lg bg-green-50 p-4">
                          <div className="text-2xl font-bold text-green-600">1,247</div>
                          <div className="text-sm text-green-700">Total Members</div>
                        </div>
                        <div className="rounded-lg bg-blue-50 p-4">
                          <div className="text-2xl font-bold text-blue-600">89%</div>
                          <div className="text-sm text-blue-700">Engagement Rate</div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Chart Placeholder */}
                  <div className="space-y-3">
                    <div className="h-2 rounded-full bg-slate-200" />
                    <div className="h-2 w-3/4 rounded-full bg-slate-200" />
                    <div className="h-2 w-1/2 rounded-full bg-slate-200" />
                    <div className="h-2 w-5/6 rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-xl" />
              <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 blur-xl" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
