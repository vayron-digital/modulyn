"use client"

import { ReactNode } from "react"
import { ThemeProvider } from "./theme-provider"
import { Toaster } from "../ui/toaster"

export function MarketingProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </ThemeProvider>
  )
}
