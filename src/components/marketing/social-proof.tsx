"use client"

import { useState, useEffect } from "react"
import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const logos = [
  { name: "Real Estate Pro", src: "/logos/logo1.svg" },
  { name: "Association Plus", src: "/logos/logo2.svg" },
  { name: "Trade Connect", src: "/logos/logo3.svg" },
  { name: "Professional Group", src: "/logos/logo4.svg" },
  { name: "Industry Leaders", src: "/logos/logo5.svg" },
  { name: "Business Network", src: "/logos/logo6.svg" },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Real Estate Broker",
    company: "Johnson Properties",
    content:
      "US Associate has transformed how we manage our properties and clients. The CRM features are intuitive and the automation saves us hours every week.",
    rating: 5,
    avatar: "/avatars/sarah.jpg",
  },
  {
    name: "Michael Chen",
    role: "Executive Director",
    company: "Tech Trade Association",
    content:
      "Our association has grown 40% since implementing US Associate. The member management tools are exceptional and the reporting gives us valuable insights.",
    rating: 5,
    avatar: "/avatars/michael.jpg",
  },
  {
    name: "Emily Rodriguez",
    role: "Property Manager",
    company: "Urban Real Estate",
    content:
      "The platform's ease of use and comprehensive features have made our operations much more efficient. Customer support is always helpful and responsive.",
    rating: 5,
    avatar: "/avatars/emily.jpg",
  },
]

export function SocialProof() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <Container>
        <div className="space-y-16">
          {/* Trusted By Section */}
          <div
            className={cn(
              "text-center transition-all duration-700",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <Badge
              variant="secondary"
              className="mb-4 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
            >
              Trusted by Industry Leaders
            </Badge>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Join thousands of professionals who trust our platform
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              From real estate brokers to association executives, our platform
              helps businesses of all sizes streamline their operations.
            </p>
          </div>

          {/* Logo Grid */}
          <div
            className={cn(
              "transition-all duration-700 delay-200",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
              {logos.map((logo, index) => (
                <div
                  key={logo.name}
                  className={cn(
                    "flex items-center justify-center transition-all duration-500",
                    `delay-${300 + index * 100}`
                  )}
                >
                  <div className="flex h-16 w-32 items-center justify-center rounded-lg border bg-white/50 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                    <div className="h-8 w-20 rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div
            className={cn(
              "transition-all duration-700 delay-400",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <div className="mx-auto max-w-4xl">
              {/* Testimonial Cards */}
              <div className="relative">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.name}
                    className={cn(
                      "absolute inset-0 transition-all duration-500",
                      index === activeTestimonial
                        ? "translate-x-0 opacity-100"
                        : index < activeTestimonial
                        ? "-translate-x-full opacity-0"
                        : "translate-x-full opacity-0"
                    )}
                  >
                    <div className="relative rounded-2xl border bg-white p-8 shadow-lg">
                      {/* Quote Icon */}
                      <div className="absolute -top-4 left-8">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
                          <Quote className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="mb-6 flex items-center space-x-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>

                      {/* Content */}
                      <blockquote className="mb-6 text-lg leading-relaxed text-slate-700">
                        "{testimonial.content}"
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-slate-200" />
                        <div>
                          <div className="font-semibold text-slate-900">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-slate-600">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial Indicators */}
              <div className="mt-8 flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-all duration-300",
                      index === activeTestimonial
                        ? "bg-indigo-600 w-8"
                        : "bg-slate-300 hover:bg-slate-400"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            className={cn(
              "grid grid-cols-2 gap-8 border-t pt-16 sm:grid-cols-4 transition-all duration-700 delay-600",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">10,000+</div>
              <div className="text-sm text-slate-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">98%</div>
              <div className="text-sm text-slate-600">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">24/7</div>
              <div className="text-sm text-slate-600">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">99.9%</div>
              <div className="text-sm text-slate-600">Uptime</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
