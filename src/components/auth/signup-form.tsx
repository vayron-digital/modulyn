"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { useStripe } from "@/hooks/use-stripe"
import { StripeProvider } from "@/components/stripe/stripe-provider"
import { PaymentForm } from "@/components/stripe/payment-form"

interface SignupFormProps {
  selectedPlan?: {
    id: string
    name: string
    price: number
  }
  selectedMode?: string
  isYearly?: boolean
  onSuccess?: () => void
  className?: string
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
  agreeToMarketing: boolean
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  company?: string
  password?: string
  confirmPassword?: string
  agreeToTerms?: string
  general?: string
}

export function SignupForm({
  selectedPlan,
  selectedMode,
  isYearly = false,
  onSuccess,
  className,
}: SignupFormProps) {
  const router = useRouter()
  const { createSubscription, isLoading: stripeLoading, error: stripeError } = useStripe()
  
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToMarketing: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters"
    }

    // Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters"
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Company
    if (!formData.company.trim()) {
      newErrors.company = "Company name is required"
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number"
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Terms Agreement
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // If no plan is selected, show payment form
    if (!selectedPlan) {
      setErrors({
        general: "Please select a plan to continue."
      })
      return
    }

    // Show payment form
    setShowPaymentForm(true)
  }

  const handlePaymentSubmit = async (paymentMethodId: string) => {
    setIsLoading(true)
    setErrors({})

    try {
      const name = `${formData.firstName} ${formData.lastName}`
      
      const result = await createSubscription({
        email: formData.email,
        name,
        paymentMethodId,
        planId: selectedPlan!.id,
        company: formData.company,
      })

      if (result) {
        // Success
        setIsSuccess(true)
        onSuccess?.()
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      }
      
    } catch (error) {
      setErrors({
        general: "Something went wrong. Please try again."
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePaymentCancel = () => {
    setShowPaymentForm(false)
    setClientSecret(null)
  }

  if (isSuccess) {
    return (
      <div className={cn("text-center", className)}>
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          Account Created Successfully!
        </h2>
        <p className="mb-6 text-slate-600">
          Welcome to US Associate. We're setting up your account...
        </p>
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
          <span className="text-sm text-slate-600">Redirecting to dashboard...</span>
        </div>
      </div>
    )
  }

  // Show payment form if plan is selected
  if (showPaymentForm && selectedPlan) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            Complete Your Subscription
          </h2>
          <p className="text-slate-600">
            You're signing up for {selectedPlan.name} at ${selectedPlan.price}/month
          </p>
        </div>

        <StripeProvider clientSecret={clientSecret || undefined}>
          <PaymentForm
            onSubmit={handlePaymentSubmit}
            onCancel={handlePaymentCancel}
            isLoading={isLoading || stripeLoading}
            disabled={isLoading || stripeLoading}
          />
        </StripeProvider>

        {stripeError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{stripeError}</AlertDescription>
          </Alert>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      {/* General Error */}
      {errors.general && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errors.general}</AlertDescription>
        </Alert>
      )}

      {/* Name Fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className={cn(
              errors.firstName && "border-red-500 focus:border-red-500 focus:ring-red-500"
            )}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className={cn(
              errors.lastName && "border-red-500 focus:border-red-500 focus:ring-red-500"
            )}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={cn(
            errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500"
          )}
          placeholder="Enter your email address"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Company */}
      <div className="space-y-2">
        <Label htmlFor="company">Company Name *</Label>
        <Input
          id="company"
          type="text"
          value={formData.company}
          onChange={(e) => handleInputChange("company", e.target.value)}
          className={cn(
            errors.company && "border-red-500 focus:border-red-500 focus:ring-red-500"
          )}
          placeholder="Enter your company name"
        />
        {errors.company && (
          <p className="text-sm text-red-600">{errors.company}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className={cn(
              "pr-10",
              errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500"
            )}
            placeholder="Create a strong password"
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
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password}</p>
        )}
        <p className="text-xs text-slate-500">
          Must be at least 8 characters with uppercase, lowercase, and number
        </p>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password *</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            className={cn(
              "pr-10",
              errors.confirmPassword && "border-red-500 focus:border-red-500 focus:ring-red-500"
            )}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Checkboxes */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => 
              handleInputChange("agreeToTerms", checked as boolean)
            }
            className="mt-1"
          />
          <div className="space-y-1">
            <Label htmlFor="agreeToTerms" className="text-sm">
              I agree to the{" "}
              <Link href="/terms" className="text-indigo-600 hover:text-indigo-500">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500">
                Privacy Policy
              </Link>{" "}
              *
            </Label>
            {errors.agreeToTerms && (
              <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
            )}
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreeToMarketing"
            checked={formData.agreeToMarketing}
            onCheckedChange={(checked) => 
              handleInputChange("agreeToMarketing", checked as boolean)
            }
            className="mt-1"
          />
          <Label htmlFor="agreeToMarketing" className="text-sm">
            I agree to receive marketing communications from US Associate
          </Label>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
        className="w-full bg-indigo-600 hover:bg-indigo-700"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          <>
            Start Free Trial
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      {/* Login Link */}
      <p className="text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
          Sign in here
        </Link>
      </p>
    </form>
  )
}
