"use client"

import { useParams } from "next/navigation"
import { LeadHeader } from "@/components/leads/lead-header"
import { LeadOverview } from "@/components/leads/lead-overview"
import { LeadActivity } from "@/components/leads/lead-activity"
import { LeadProperties } from "@/components/leads/lead-properties"
import { LeadNotes } from "@/components/leads/lead-notes"
import { LeadTasks } from "@/components/leads/lead-tasks"
import { LeadDocuments } from "@/components/leads/lead-documents"
import { LeadCommunication } from "@/components/leads/lead-communication"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

export default function LeadPage() {
  const params = useParams()

  return (
    <div className="space-y-6">
      <LeadHeader id={params.id as string} />

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <LeadOverview id={params.id as string} />
        </Card>
        <Card>
          <LeadActivity id={params.id as string} />
        </Card>
      </div>

      <Tabs defaultValue="properties" className="space-y-4">
        <TabsList>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="properties">
          <Card>
            <LeadProperties id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="communication">
          <Card>
            <LeadCommunication id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="tasks">
          <Card>
            <LeadTasks id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="notes">
          <Card>
            <LeadNotes id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <LeadDocuments id={params.id as string} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
