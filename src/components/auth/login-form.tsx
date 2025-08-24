'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Icons } from '@/components/ui/icons'
import { Separator } from '@/components/ui/separator'

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
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
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
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
          {isLoading ? 'Logging in...' : 'Log in with Email'}
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
          className="w-full"
          onClick={async () => {
            try {
              setIsGoogleLoading(true)
              const { data, error } = await signInWithGoogle()
              if (error) {
                console.error('Google sign-in error:', error)
                throw error
              }
              console.log('Google sign-in response:', data)
              // The redirect will happen automatically via the OAuth flow
            } catch (error: any) {
              toast.error(error.message || 'Error signing in with Google')
              console.error('Full error:', error)
            } finally {
              setIsGoogleLoading(false)
            }
          }}
          disabled={isLoading || isGoogleLoading}
        >
          {isGoogleLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}
          Google
        </Button>
      </form>
    </Form>
  )
}