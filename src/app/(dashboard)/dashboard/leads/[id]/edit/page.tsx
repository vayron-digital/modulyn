"use client"

import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadBasicForm } from "@/components/leads/forms/lead-basic-form"
import { LeadContactForm } from "@/components/leads/forms/lead-contact-form"
import { LeadPreferencesForm } from "@/components/leads/forms/lead-preferences-form"
import { LeadFinancialForm } from "@/components/leads/forms/lead-financial-form"
import { LeadAssignmentForm } from "@/components/leads/forms/lead-assignment-form"

export default function LeadEditPage() {
  const params = useParams()
  const isNew = params.id === "new"

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {isNew ? "Add New Lead" : "Edit Lead"}
        </h2>
        <p className="text-muted-foreground">
          {isNew
            ? "Add a new lead to your pipeline"
            : "Update lead information and preferences"}
        </p>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="assignment">Assignment</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <Card>
            <LeadBasicForm id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="contact">
          <Card>
            <LeadContactForm id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="preferences">
          <Card>
            <LeadPreferencesForm id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="financial">
          <Card>
            <LeadFinancialForm id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="assignment">
          <Card>
            <LeadAssignmentForm id={params.id as string} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
