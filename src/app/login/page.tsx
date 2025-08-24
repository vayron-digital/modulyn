"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import {
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  ArrowRight,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/50">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">US Associate</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">Don't have an account?</span>
              <Link href="/signup">
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </header>

      <Container>
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
              <p className="mt-2 text-slate-600">
                Sign in to your account to continue
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox id="rememberMe" />
                    <Label htmlFor="rememberMe" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-slate-600">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-indigo-600 hover:text-indigo-500">
                    Sign up here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
