'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Icons } from '@/components/ui/icons'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/lib/validations'
import { signIn, signInWithGoogle, supabase } from '@/lib/supabase'

type FormData = {
  email: string
  password: string
}

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [isRetrying, setIsRetrying] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check for auth callback errors
  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
      setAuthError(decodeURIComponent(error))
      // Clear the error from URL
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete('error')
      window.history.replaceState({}, '', newUrl.toString())
    }
  }, [searchParams])

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    setAuthError(null)
    
    try {
      console.log('Attempting to sign in with:', data.email)
      const { data: authData, error } = await signIn(data.email, data.password)
      console.log('Sign in response:', { authData, error })
      
      if (error) throw error

      if (authData.user) {
        toast.success('Successfully logged in')
        window.location.href = '/dashboard'
      } else {
        toast.error('Login failed - no user data')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      setAuthError('Invalid email or password')
      toast.error('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    setAuthError(null)
    
    try {
      const { data, error } = await signInWithGoogle()
      
      if (error) {
        console.error('Google sign-in error:', error)
        throw error
      }
      
      console.log('Google sign-in response:', data)
      
      // Check if we have a redirect URL
      if (data?.url) {
        console.log('OAuth redirect URL received:', data.url)
        
        // Show success message before redirect
        toast.success('Redirecting to Google...')
        
        // Try automatic redirect first
        setTimeout(() => {
          // If automatic redirect doesn't work, do manual redirect
          console.log('Attempting manual redirect to:', data.url)
          window.location.href = data.url
        }, 1000)
        
      } else {
        console.warn('No redirect URL received from OAuth')
        toast.error('OAuth configuration error - no redirect URL received')
        setAuthError('OAuth configuration error - please contact support')
      }
      
    } catch (error: any) {
      console.error('Full error:', error)
      
      // Enhanced error handling
      let errorMessage = error.message || 'Error signing in with Google'
      
      // Handle specific error types
      if (errorMessage.includes('popup')) {
        errorMessage = 'Popup blocked! Please allow popups for this site and try again.'
      } else if (errorMessage.includes('network')) {
        errorMessage = 'Network error! Please check your internet connection and try again.'
      } else if (errorMessage.includes('timeout')) {
        errorMessage = 'Request timed out! Please try again.'
      } else if (errorMessage.includes('redirect')) {
        errorMessage = 'OAuth configuration error! Please check your Supabase OAuth settings.'
      }
      
      setAuthError(errorMessage)
      toast.error(errorMessage)
      
      // Auto-retry for network errors
      if (errorMessage.includes('network') && !isRetrying) {
        setIsRetrying(true)
        toast.info('Retrying in 3 seconds...')
        
        setTimeout(async () => {
          try {
            setIsRetrying(false)
            await handleGoogleSignIn()
          } catch (retryError) {
            console.error('Retry failed:', retryError)
          }
        }, 3000)
      }
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Error Display */}
      {authError && (
        <Alert variant="destructive">
          <Icons.warning className="h-4 w-4" />
          <AlertDescription>{authError}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    disabled={isLoading || isGoogleLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    disabled={isLoading || isGoogleLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Log in with Email'
            )}
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full relative"
            onClick={handleGoogleSignIn}
            disabled={isLoading || isGoogleLoading || isRetrying}
          >
            {isGoogleLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                {isRetrying ? 'Retrying...' : 'Connecting to Google...'}
              </>
            ) : (
              <>
                <Icons.google className="mr-2 h-4 w-4" />
                {isRetrying ? 'Retry Google Sign In' : 'Continue with Google'}
              </>
            )}
          </Button>

          {/* Help Text */}
          <div className="text-center text-xs text-muted-foreground space-y-1">
            <p>Having trouble signing in?</p>
            <p>Try refreshing the page or check your internet connection</p>
          </div>
        </form>
      </Form>
    </div>
  )
}