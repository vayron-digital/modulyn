"use client"

import { Suspense } from "react"
import { LoadingScreen } from "@/components/loading"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      {children}
    </Suspense>
  )
}
