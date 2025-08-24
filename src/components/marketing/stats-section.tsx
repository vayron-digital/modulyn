"use client"

import { useState, useEffect, useRef } from "react"
import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Building2,
  Calendar,
  CheckCircle2,
  DollarSign,
  Globe,
  LineChart,
  Star,
  TrendingUp,
  Users2,
  Zap,
} from "lucide-react"

const stats = [
  {
    id: "users",
    label: "Active Users",
    value: 10000,
    suffix: "+",
    icon: Users2,
    color: "from-blue-500 to-indigo-600",
    description: "Professionals trust our platform",
  },
  {
    id: "properties",
    label: "Properties Managed",
    value: 50000,
    suffix: "+",
    icon: Building2,
    color: "from-green-500 to-emerald-600",
    description: "Real estate assets tracked",
  },
  {
    id: "revenue",
    label: "Revenue Generated",
    value: 250,
    suffix: "M+",
    prefix: "$",
    icon: DollarSign,
    color: "from-purple-500 to-pink-600",
    description: "For our customers",
  },
  {
    id: "satisfaction",
    label: "Customer Satisfaction",
    value: 98,
    suffix: "%",
    icon: Star,
    color: "from-orange-500 to-red-600",
    description: "Happy customers worldwide",
  },
  {
    id: "uptime",
    label: "Platform Uptime",
    value: 99.9,
    suffix: "%",
    icon: Zap,
    color: "from-teal-500 to-cyan-600",
    description: "Reliable service delivery",
  },
  {
    id: "growth",
    label: "Monthly Growth",
    value: 25,
    suffix: "%",
    icon: TrendingUp,
    color: "from-indigo-500 to-purple-600",
    description: "Consistent platform growth",
  },
]

const achievements = [
  {
    title: "Industry Recognition",
    description: "Named Top CRM Platform 2024",
    icon: Star,
    color: "text-yellow-500",
  },
  {
    title: "Security Certified",
    description: "SOC 2 Type II Compliant",
    icon: CheckCircle2,
    color: "text-green-500",
  },
  {
    title: "Global Reach",
    description: "Available in 50+ Countries",
    icon: Globe,
    color: "text-blue-500",
  },
]

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({})
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          startAnimation()
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const startAnimation = () => {
    stats.forEach((stat) => {
      const duration = 2000 // 2 seconds
      const steps = 60
      const increment = stat.value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          current = stat.value
          clearInterval(timer)
        }

        setAnimatedValues((prev) => ({
          ...prev,
          [stat.id]: Math.floor(current),
        }))
      }, duration / steps)
    })
  }

  const formatValue = (stat: typeof stats[0]) => {
    const value = animatedValues[stat.id] || 0
    if (stat.id === "revenue") {
      return `${stat.prefix}${value}${stat.suffix}`
    }
    if (stat.id === "satisfaction" || stat.id === "uptime") {
      return `${value}${stat.suffix}`
    }
    return `${value}${stat.suffix}`
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-24">
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
            <Badge
              variant="secondary"
              className="mb-4 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
            >
              Trusted by Industry Leaders
            </Badge>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              Numbers that speak for themselves
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              Our platform has helped thousands of businesses achieve remarkable
              results. Here's what we've accomplished together.
            </p>
          </div>

          {/* Stats Grid */}
          <div
            className={cn(
              "grid gap-8 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700 delay-200",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-lg",
                  `delay-${300 + index * 100}`
                )}
              >
                {/* Background Gradient */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r opacity-5 transition-opacity duration-300 group-hover:opacity-10",
                    stat.color
                  )}
                />

                {/* Icon */}
                <div
                  className={cn(
                    "mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r text-white transition-transform duration-300 group-hover:scale-110",
                    stat.color
                  )}
                >
                  <stat.icon className="h-8 w-8" />
                </div>

                {/* Content */}
                <div className="relative space-y-2">
                  <div className="text-3xl font-bold text-slate-900 sm:text-4xl">
                    {formatValue(stat)}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-slate-600">{stat.description}</p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div
            className={cn(
              "rounded-2xl border bg-gradient-to-r from-slate-50 to-indigo-50 p-8 transition-all duration-700 delay-400",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <div className="text-center">
              <h3 className="mb-8 text-2xl font-bold text-slate-900">
                Industry Recognition & Achievements
              </h3>
              <div className="grid gap-6 sm:grid-cols-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.title}
                    className={cn(
                      "flex items-center space-x-4 rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md",
                      `delay-${500 + index * 100}`
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100",
                        achievement.color
                      )}
                    >
                      <achievement.icon className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-slate-900">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div
            className={cn(
              "text-center transition-all duration-700 delay-600",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <div className="mx-auto max-w-2xl">
              <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Join thousands of successful businesses
              </h3>
              <p className="mt-4 text-lg text-slate-600">
                Start your journey today and see why industry leaders choose our
                platform for their business needs.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="flex items-center space-x-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center space-x-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                  <Users2 className="h-4 w-4" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
                  <Zap className="h-4 w-4" />
                  <span>Setup in minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
