'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@radix-ui/react-navigation-menu'
import { useAuthStore } from '@/lib/store'

export function MainNav() {
  const pathname = usePathname()
  const user = useAuthStore((state) => state.user)

  const routes = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      active: pathname === '/dashboard',
    },
    {
      href: '/members',
      label: 'Members',
      active: pathname === '/members',
    },
    {
      href: '/events',
      label: 'Events',
      active: pathname === '/events',
    },
    {
      href: '/communications',
      label: 'Communications',
      active: pathname === '/communications',
    },
  ]

  return (
    <NavigationMenu>
      <NavigationMenuList className="hidden md:flex items-center space-x-4">
        {routes.map((route) => (
          <NavigationMenuItem key={route.href}>
            <Link href={route.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
                )}
              >
                {route.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
