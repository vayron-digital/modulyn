"use client"

import { ReactNode } from "react"
import { ThemeProvider } from "./theme-provider"
import { QueryProvider } from "./query-provider"
import { RealtimeProvider } from "./realtime-provider"
import { SettingsProvider } from "@/providers/settings-provider"
import { SettingsInitializer } from "@/components/settings/settings-initializer"
import { ColorSchemeProvider } from "@/components/color-scheme-provider"
import { Toaster } from "../ui/toaster"
import { LoadingScreen } from "../loading"
import { NavigationWrapper } from "../navigation/navigation-wrapper"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <RealtimeProvider>
                     <SettingsProvider>
             <SettingsInitializer />
             <ColorSchemeProvider />
             <NavigationWrapper>
              {children}
            </NavigationWrapper>
            <LoadingScreen />
            <Toaster />
          </SettingsProvider>
        </RealtimeProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
