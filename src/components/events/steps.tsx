"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: number
  name: string
}

interface StepsProps {
  steps: Step[]
  currentStep: number
}

export function Steps({ steps, currentStep }: StepsProps) {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="space-y-4 md:flex md:space-x-8 md:space-y-0"
      >
        {steps.map((step, index) => (
          <li key={step.name} className="md:flex-1">
            <div
              className={cn(
                "group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                step.id < currentStep
                  ? "border-primary"
                  : step.id === currentStep
                  ? "border-primary"
                  : "border-border"
              )}
            >
              <span className="text-sm font-medium">
                Step {step.id}
              </span>
              <span className="text-sm">
                {step.name}
              </span>
              {step.id < currentStep && (
                <span className="absolute -ml-10 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

