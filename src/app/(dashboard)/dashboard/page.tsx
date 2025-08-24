"use client"

import { useSettingsStore } from "@/store/use-settings-store"
import { TradeDashboard } from "@/components/dashboard/trade/trade-dashboard"
import { CRMDashboard } from "@/components/dashboard/crm/crm-dashboard"
import { AuthCheck } from "@/components/auth/auth-check"

export default function DashboardPage() {
  const { userMode } = useSettingsStore()

  return (
    <>
      <AuthCheck />
      {userMode === "trade" ? <TradeDashboard /> : <CRMDashboard />}
    </>
  )
}