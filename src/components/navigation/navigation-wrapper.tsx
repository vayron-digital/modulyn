'use client'

import { useNavigation } from '@/hooks/use-navigation'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const { handleNavigation } = useNavigation()
  const pathname = usePathname()

  useEffect(() => {
    // Trigger loading on route change
    handleNavigation()
  }, [pathname, handleNavigation])

  return <>{children}</>
}
