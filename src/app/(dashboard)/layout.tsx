"use client"

import { RequireAuth } from "@/components/auth/auth-guard"
import { DashboardWrapper } from "@/components/auth/dashboard-wrapper"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RequireAuth>
      <DashboardWrapper>
        {children}
      </DashboardWrapper>
    </RequireAuth>
  )
}