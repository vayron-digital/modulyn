'use client'

import { useRealtimeSubscription } from '@/hooks/use-realtime'

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  useRealtimeSubscription()
  return <>{children}</>
}
