'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/lib/store'
import { signOut } from '@/lib/supabase'

export function UserNav() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Button variant="ghost" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/register">Register</Link>
        </Button>
      </div>
    )
  }

  const handleSignOut = async () => {
    await signOut()
    logout()
    router.push('/login')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} alt={user.email} />
            <AvatarFallback>{user.firstName?.[0]}{user.lastName?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings/organization">Organization</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings/subscription">Subscription</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
