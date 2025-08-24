"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Calendar,
  ChevronRight,
  FileText,
  Globe,
  HelpCircle,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Shield,
  Users2,
  Zap,
} from "lucide-react"
import Link from "next/link"

const footerLinks = {
  product: [
    { name: "Real Estate CRM", href: "/crm", icon: Building2 },
    { name: "Association Management", href: "/ams", icon: Users2 },
    { name: "Features", href: "/features", icon: Zap },
    { name: "Pricing", href: "/pricing", icon: FileText },
    { name: "Integrations", href: "/integrations", icon: Globe },
  ],
  solutions: [
    { name: "Real Estate Agents", href: "/solutions/agents" },
    { name: "Brokerages", href: "/solutions/brokerages" },
    { name: "Trade Associations", href: "/solutions/associations" },
    { name: "Professional Groups", href: "/solutions/groups" },
    { name: "Enterprise", href: "/solutions/enterprise" },
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/api" },
    { name: "Help Center", href: "/help" },
    { name: "Community", href: "/community" },
    { name: "Blog", href: "/blog" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Partners", href: "/partners" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "GDPR", href: "/gdpr" },
    { name: "Security", href: "/security" },
  ],
}

const socialLinks = [
  { name: "Twitter", href: "#", icon: "𝕏" },
  { name: "LinkedIn", href: "#", icon: "in" },
  { name: "Facebook", href: "#", icon: "f" },
  { name: "YouTube", href: "#", icon: "▶" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="relative overflow-hidden border-t bg-slate-900 text-slate-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </div>

      <Container>
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Brand & Newsletter */}
            <div className="lg:col-span-4">
              <div className="space-y-6">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">Modulyn One+</span>
                </div>

                <p className="text-sm leading-relaxed text-slate-400">
                  Transform your business with intelligent solutions. Whether you're managing
                  real estate or associations, we provide the tools you need to succeed.
                </p>

                {/* Newsletter */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white">
                    Stay updated with our newsletter
                  </h3>
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <div className="flex space-x-2">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-indigo-500"
                        required
                      />
                      <Button
                        type="submit"
                        size="sm"
                        className="bg-indigo-600 hover:bg-indigo-700"
                        disabled={isSubscribed}
                      >
                        {isSubscribed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {isSubscribed && (
                      <p className="text-xs text-green-400">
                        Thanks for subscribing! We'll keep you updated.
                      </p>
                    )}
                  </form>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="text-sm">hello@usassociate.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span className="text-sm">San Francisco, CA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                {/* Product */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white">Product</h3>
                  <ul className="space-y-3">
                    {footerLinks.product.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="flex items-center space-x-2 text-sm text-slate-400 transition-colors hover:text-white"
                        >
                          <link.icon className="h-4 w-4" />
                          <span>{link.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solutions */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white">Solutions</h3>
                  <ul className="space-y-3">
                    {footerLinks.solutions.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-slate-400 transition-colors hover:text-white"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white">Resources</h3>
                  <ul className="space-y-3">
                    {footerLinks.resources.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-slate-400 transition-colors hover:text-white"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white">Company</h3>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-slate-400 transition-colors hover:text-white"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            {/* Copyright & Legal */}
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
              <p className="text-sm text-slate-400">
                © 2024 US Associate. All rights reserved.
              </p>
              <div className="flex space-x-6">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-400">Follow us:</span>
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-400 transition-colors hover:border-indigo-500 hover:bg-indigo-500 hover:text-white"
                  aria-label={link.name}
                >
                  <span className="text-sm font-semibold">{link.icon}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

// CheckCircle component for the newsletter success state
function CheckCircle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}
