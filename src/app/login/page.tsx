"use client"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
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
              <LoginForm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
