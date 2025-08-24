"use client"

import { useState, useEffect } from "react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  ChevronDown,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const navigation = {
  solutions: [
    { name: "Real Estate CRM", href: "/solutions/crm" },
    { name: "Association Management", href: "/solutions/ams" },
  ],
  features: [
    { name: "Analytics", href: "/features/analytics" },
    { name: "Automation", href: "/features/automation" },
    { name: "Collaboration", href: "/features/collaboration" },
    { name: "Integrations", href: "/features/integrations" },
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "Guides", href: "/guides" },
    { name: "Blog", href: "/blog" },
    { name: "Case Studies", href: "/case-studies" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Partners", href: "/partners" },
  ],
}

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-lg"
          : "bg-white/0"
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <div className="relative h-8 w-32">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("solutions")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-foreground hover:text-indigo-600"
                aria-expanded="false"
              >
                Solutions
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition",
                    openDropdown === "solutions" && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>
              {openDropdown === "solutions" && (
                <div className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {navigation.solutions.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex-auto">
                          <Link
                            href={item.href}
                            className="block font-semibold text-foreground"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("features")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-foreground hover:text-indigo-600"
                aria-expanded="false"
              >
                Features
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition",
                    openDropdown === "features" && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>
              {openDropdown === "features" && (
                <div className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {navigation.features.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex-auto">
                          <Link
                            href={item.href}
                            className="block font-semibold text-foreground"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className="text-sm font-semibold leading-6 text-foreground hover:text-indigo-600"
            >
              Pricing
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("resources")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-foreground hover:text-indigo-600"
                aria-expanded="false"
              >
                Resources
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition",
                    openDropdown === "resources" && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>
              {openDropdown === "resources" && (
                <div className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {navigation.resources.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex-auto">
                          <Link
                            href={item.href}
                            className="block font-semibold text-foreground"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <Link href="/login">
              <Button variant="ghost" className="h-9">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="h-9 bg-indigo-600 hover:bg-indigo-700">
                Get started
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Background */}
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />

            {/* Panel */}
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <div className="relative h-8 w-32">
                    <Image
                      src="/logo.svg"
                      alt="Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-muted-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <div className="-mx-3">
                      <div className="space-y-1">
                        <div className="px-3 py-2 text-sm font-semibold">
                          Solutions
                        </div>
                        {navigation.solutions.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-foreground hover:bg-gray-50"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="-mx-3">
                      <div className="space-y-1">
                        <div className="px-3 py-2 text-sm font-semibold">
                          Features
                        </div>
                        {navigation.features.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-foreground hover:bg-gray-50"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <Link
                      href="/pricing"
                      className="-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-foreground hover:bg-gray-50"
                    >
                      Pricing
                    </Link>
                    <div className="-mx-3">
                      <div className="space-y-1">
                        <div className="px-3 py-2 text-sm font-semibold">
                          Resources
                        </div>
                        {navigation.resources.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-foreground hover:bg-gray-50"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="py-6">
                    <Link
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-sm font-semibold leading-7 text-foreground hover:bg-gray-50"
                    >
                      Log in
                    </Link>
                    <Link href="/signup">
                      <Button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700">
                        Get started
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
