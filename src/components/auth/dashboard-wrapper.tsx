'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { LoadingScreen } from '@/components/loading'

export function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasSession, setHasSession] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/login')
        return
      }
      
      setHasSession(true)
      setIsLoading(false)
    }

    checkSession()
  }, [router])

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!hasSession) {
    return null
  }

  return <>{children}</>
}
