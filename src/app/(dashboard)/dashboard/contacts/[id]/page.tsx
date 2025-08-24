"use client"

import { useParams } from "next/navigation"
import { ContactHeader } from "@/components/contacts/contact-header"
import { ContactOverview } from "@/components/contacts/contact-overview"
import { ContactActivity } from "@/components/contacts/contact-activity"
import { ContactDeals } from "@/components/contacts/contact-deals"
import { ContactProperties } from "@/components/contacts/contact-properties"
import { ContactDocuments } from "@/components/contacts/contact-documents"
import { ContactTasks } from "@/components/contacts/contact-tasks"
import { ContactNotes } from "@/components/contacts/contact-notes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

export default function ContactPage() {
  const params = useParams()

  return (
    <div className="space-y-6">
      <ContactHeader id={params.id as string} />

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <ContactOverview id={params.id as string} />
        </Card>
        <Card>
          <ContactActivity id={params.id as string} />
        </Card>
      </div>

      <Tabs defaultValue="deals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="deals">Deals</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="deals">
          <Card>
            <ContactDeals id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="properties">
          <Card>
            <ContactProperties id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <ContactDocuments id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="tasks">
          <Card>
            <ContactTasks id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="notes">
          <Card>
            <ContactNotes id={params.id as string} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
