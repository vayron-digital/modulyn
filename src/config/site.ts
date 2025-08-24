export const siteConfig = {
  name: "Modulyn One+",
  description: "A SaaS platform with a dual-mode architecture serving two distinct business models: Real Estate CRM and US Trade Association Management.",
  url: process.env.NEXT_PUBLIC_APP_URL,
  ogImage: "https://your-domain.com/og.jpg",
  links: {
    twitter: "https://twitter.com/your-handle",
    github: "https://github.com/your-org/your-repo",
  },
  contactEmail: "support@your-domain.com",
}

export type SiteConfig = typeof siteConfig
