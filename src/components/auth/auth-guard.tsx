'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { Icons } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireRole?: string[]
  fallback?: React.ReactNode
  redirectTo?: string
}

export function AuthGuard({
  children,
  requireAuth = true,
  requireRole = [],
  fallback,
  redirectTo = '/login'
}: AuthGuardProps) {
  const { user, isLoading, isAuthenticated, error } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    if (isLoading) return

    // If authentication is not required, allow access
    if (!requireAuth) return

    // If user is not authenticated, redirect to login
    if (!isAuthenticated || !user) {
      if (!isRedirecting) {
        setIsRedirecting(true)
        console.log('Redirecting to login - user not authenticated')
        router.push(`${redirectTo}?redirect=${encodeURIComponent(pathname)}`)
      }
      return
    }

    // If role is required, check user role
    if (requireRole.length > 0 && !requireRole.includes(user.role)) {
      if (!isRedirecting) {
        setIsRedirecting(true)
        console.log('Redirecting to login - insufficient role')
        router.push(`${redirectTo}?error=${encodeURIComponent('Insufficient permissions')}`)
      }
      return
    }

    // User is authenticated and has required role
    setIsRedirecting(false)
  }, [isLoading, isAuthenticated, user, requireAuth, requireRole, redirectTo, pathname, router, isRedirecting])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Icons.spinner className="h-8 w-8 animate-spin mx-auto text-indigo-600" />
          <p className="text-slate-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-4">
          <Alert variant="destructive">
            <Icons.warning className="h-4 w-4" />
            <AlertDescription>
              Authentication Error: {error}
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <Button 
              onClick={() => window.location.reload()} 
              className="w-full"
            >
              Retry
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push('/login')}
              className="w-full"
            >
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Show custom fallback if provided
  if (fallback && (!isAuthenticated || !user)) {
    return <>{fallback}</>
  }

  // Show redirecting state
  if (isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Icons.spinner className="h-8 w-8 animate-spin mx-auto text-indigo-600" />
          <p className="text-slate-600">Redirecting...</p>
        </div>
      </div>
    )
  }

  // If authentication is not required, show children
  if (!requireAuth) {
    return <>{children}</>
  }

  // If user is authenticated and has required role, show children
  if (isAuthenticated && user && (requireRole.length === 0 || requireRole.includes(user.role))) {
    return <>{children}</>
  }

  // Fallback - should not reach here
  return null
}

// Convenience components for common use cases
export function RequireAuth({ children, ...props }: Omit<AuthGuardProps, 'requireAuth'>) {
  return (
    <AuthGuard requireAuth={true} {...props}>
      {children}
    </AuthGuard>
  )
}

export function RequireRole({ children, role, ...props }: Omit<AuthGuardProps, 'requireRole'> & { role: string | string[] }) {
  return (
    <AuthGuard 
      requireAuth={true} 
      requireRole={Array.isArray(role) ? role : [role]} 
      {...props}
    >
      {children}
    </AuthGuard>
  )
}

export function OptionalAuth({ children, ...props }: Omit<AuthGuardProps, 'requireAuth'>) {
  return (
    <AuthGuard requireAuth={false} {...props}>
      {children}
    </AuthGuard>
  )
}
