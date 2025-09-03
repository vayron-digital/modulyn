import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Modulyn One+",
  description: "A SaaS platform with a dual-mode architecture serving two distinct business models: Real Estate CRM and US Trade Association Management.",
  icons: {
    icon: [
      { url: '/logo-red-bg.png', type: 'image/png' },
      { url: '/logo-dark-bg.png', type: 'image/png' }
    ],
    shortcut: '/logo-red-bg.png',
    apple: '/logo-dark-bg.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  )
}