"use client"

import { useUserRole } from "@/hooks/use-user-role"

interface RoleGateProps {
  children: React.ReactNode
  requireAdmin?: boolean
  requireMarketing?: boolean
  requireDetailedStats?: boolean
  fallback?: React.ReactNode
}

export function RoleGate({
  children,
  requireAdmin = false,
  requireMarketing = false,
  requireDetailedStats = false,
  fallback = null
}: RoleGateProps) {
  const { 
    isAdmin, 
    canViewMarketing, 
    canViewDetailedStats,
    isLoading 
  } = useUserRole()

  if (isLoading) {
    return null
  }

  if (requireAdmin && !isAdmin) {
    return fallback
  }

  if (requireMarketing && !canViewMarketing) {
    return fallback
  }

  if (requireDetailedStats && !canViewDetailedStats) {
    return fallback
  }

  return <>{children}</>
}
