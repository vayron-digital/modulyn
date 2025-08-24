"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RegistrationForm } from "@/components/events/registration-form"
import { TicketSelection } from "@/components/events/ticket-selection"
import { PaymentDetails } from "@/components/events/payment-details"
import { Separator } from "@/components/ui/separator"
import { Steps } from "@/components/events/steps"
import { useState } from "react"

export default function RegisterPage() {
  const params = useParams()
  const [step, setStep] = useState(1)
  const [registrationData, setRegistrationData] = useState({
    attendees: [],
    tickets: [],
    payment: null,
  })

  const steps = [
    { id: 1, name: "Ticket Selection" },
    { id: 2, name: "Registration Details" },
    { id: 3, name: "Payment" },
  ]

  const handleStepComplete = (stepData: any) => {
    setRegistrationData((prev) => ({ ...prev, ...stepData }))
    setStep((prev) => prev + 1)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Event Registration</h2>
        <p className="text-muted-foreground">
          Complete your registration for this event.
        </p>
      </div>

      <Steps steps={steps} currentStep={step} />

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1
              ? "Select Tickets"
              : step === 2
              ? "Registration Details"
              : "Payment Information"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <TicketSelection
              eventId={params.id as string}
              onComplete={handleStepComplete}
            />
          )}
          {step === 2 && (
            <RegistrationForm
              eventId={params.id as string}
              tickets={registrationData.tickets}
              onComplete={handleStepComplete}
            />
          )}
          {step === 3 && (
            <PaymentDetails
              eventId={params.id as string}
              registrationData={registrationData}
              onComplete={handleStepComplete}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

