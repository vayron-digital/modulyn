"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronDown, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface FAQ {
  question: string
  answer: string
  category: "general" | "crm" | "ams" | "pricing" | "security" | "support"
}

const faqs: FAQ[] = [
  {
    question: "What makes your platform different from other solutions?",
    answer:
      "Our platform is unique in offering both Real Estate CRM and Association Management capabilities in one solution. We provide enterprise-grade features with a user-friendly interface, advanced automation, and dedicated support. Our platform is built on modern technology, ensuring fast performance and regular updates.",
    category: "general",
  },
  {
    question: "How secure is my data on your platform?",
    answer:
      "We take security seriously. Your data is protected with bank-level encryption, regular security audits, and compliance with industry standards. We use secure data centers, implement role-based access control, and provide detailed audit logs. All data is backed up regularly with point-in-time recovery options.",
    category: "security",
  },
  {
    question: "Can I migrate my existing data to your platform?",
    answer:
      "Yes! We provide comprehensive data migration tools and services. Our team will help you migrate your data from your current system, ensuring a smooth transition. We support imports from major CRM platforms and can handle custom data formats.",
    category: "general",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We provide 24/7 customer support through multiple channels including email, phone, and live chat. Our support team is highly trained and can assist with technical issues, feature questions, and best practices. Premium plans include dedicated account management.",
    category: "support",
  },
  {
    question: "How does the Real Estate CRM handle property listings?",
    answer:
      "Our CRM provides comprehensive property listing management with features like automated MLS integration, virtual tour support, and detailed property analytics. You can track showings, manage inquiries, and generate property reports all in one place.",
    category: "crm",
  },
  {
    question: "What features are included in the Association Management System?",
    answer:
      "The AMS includes member management, event planning, dues collection, committee management, and communication tools. You can track member engagement, manage certifications, and generate detailed reports on association activities.",
    category: "ams",
  },
  {
    question: "Can I customize the platform to match my brand?",
    answer:
      "Yes! Both CRM and AMS solutions offer extensive customization options. You can add your logo, customize colors, create branded email templates, and modify workflows to match your processes. Premium plans include additional customization features.",
    category: "general",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes, we offer a 14-day free trial for all plans. During the trial, you'll have access to all features of your chosen plan. No credit card is required to start the trial, and you can upgrade, downgrade, or cancel at any time.",
    category: "pricing",
  },
  {
    question: "What happens to my data if I cancel my subscription?",
    answer:
      "You have 30 days after cancellation to export your data in standard formats. We provide export tools for all major data types. After 30 days, your data is securely deleted from our systems in accordance with our data retention policies.",
    category: "security",
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer:
      "Yes, you can change your plan at any time. When upgrading, you'll have immediate access to new features. When downgrading, changes take effect at the start of your next billing cycle. We provide prorated refunds for downgrades.",
    category: "pricing",
  },
  {
    question: "Do you provide training and onboarding?",
    answer:
      "Yes! All plans include access to our knowledge base, video tutorials, and webinars. Premium plans include personalized onboarding sessions, custom training materials, and ongoing consultation to ensure your team's success.",
    category: "support",
  },
  {
    question: "What integrations do you offer?",
    answer:
      "We integrate with popular tools including Gmail, Outlook, Zoom, DocuSign, and major payment processors. Our API allows for custom integrations, and we regularly add new integration partners based on customer needs.",
    category: "general",
  },
]

const categories = [
  { id: "all", name: "All Questions" },
  { id: "general", name: "General" },
  { id: "crm", name: "Real Estate CRM" },
  { id: "ams", name: "Association Management" },
  { id: "pricing", name: "Pricing" },
  { id: "security", name: "Security" },
  { id: "support", name: "Support" },
] as const

export function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof categories)[number]["id"] | "all"
  >("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (question: string) => {
    setOpenItems((current) =>
      current.includes(question)
        ? current.filter((q) => q !== question)
        : [...current, question]
    )
  }

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <Container>
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our platform. Can't find the answer you're looking for? Reach out to our support team."
        />

        {/* Search & Categories */}
        <div className="mt-16 space-y-8">
          {/* Search */}
          <div className="relative mx-auto max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search questions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                size="sm"
                className={cn(
                  "border-2 transition-colors",
                  selectedCategory === category.id
                    ? "border-indigo-600 bg-indigo-600/5 text-indigo-600 hover:bg-indigo-600/10"
                    : "hover:border-indigo-600/50 hover:bg-indigo-600/5 hover:text-indigo-600"
                )}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="mt-16">
          <div className="mx-auto max-w-3xl divide-y">
            {filteredFAQs.map((faq) => (
              <div key={faq.question} className="py-6">
                <button
                  className="flex w-full items-start justify-between text-left"
                  onClick={() => toggleItem(faq.question)}
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  <span className="ml-6 flex h-7 items-center">
                    <ChevronDown
                      className={cn(
                        "h-6 w-6 transition-transform duration-200",
                        openItems.includes(faq.question) ? "rotate-180" : ""
                      )}
                    />
                  </span>
                </button>
                <div
                  className={cn(
                    "mt-2 overflow-hidden transition-all duration-200 ease-in-out",
                    openItems.includes(faq.question)
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  )}
                >
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a
              href="/contact"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </Container>
    </section>
  )
}
