import { Nav } from "@/components/marketing/nav"
import { HeroSection } from "@/components/marketing/hero-section"
import { SocialProof } from "@/components/marketing/social-proof"
import { FeatureShowcase } from "@/components/marketing/feature-showcase"
import { StatsSection } from "@/components/marketing/stats-section"
import { ComparisonSection } from "@/components/marketing/comparison-section"
import { PricingSection } from "@/components/marketing/pricing-section"
import { FAQSection } from "@/components/marketing/faq-section"
import { CTASection } from "@/components/marketing/cta-section"
import { Footer } from "@/components/marketing/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <HeroSection />
        <SocialProof />
        <FeatureShowcase />
        <StatsSection />
        <ComparisonSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}