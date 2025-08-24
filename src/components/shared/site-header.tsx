'use client'

import Link from 'next/link'
import { MainNav } from '@/components/shared/main-nav'
import { UserNav } from '@/components/shared/user-nav'
import { useAuthStore } from '@/lib/store'
import { siteConfig } from '@/config/site'

export function SiteHeader() {
  const user = useAuthStore((state) => state.user)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">{siteConfig.name}</span>
          </Link>
          {user && <MainNav />}
        </div>
        <UserNav />
      </div>
    </header>
  )
}