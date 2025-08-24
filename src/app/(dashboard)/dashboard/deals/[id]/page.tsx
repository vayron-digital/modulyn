"use client"

import { useParams } from "next/navigation"
import { DealHeader } from "@/components/deals/deal-header"
import { DealOverview } from "@/components/deals/deal-overview"
import { DealActivity } from "@/components/deals/deal-activity"
import DealDocuments from "@/components/deals/deal-documents"
import DealTasks from "@/components/deals/deal-tasks"
import DealNotes from "@/components/deals/deal-notes"
import { DealTimeline } from "@/components/deals/deal-timeline"
import { DealFinancials } from "@/components/deals/deal-financials"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

export default function DealPage() {
  const params = useParams()

  return (
    <div className="space-y-6">
      <DealHeader id={params.id as string} />

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <DealOverview id={params.id as string} />
        </Card>
        <Card>
          <DealActivity id={params.id as string} />
        </Card>
      </div>

      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="timeline">
          <Card>
            <DealTimeline id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="financials">
          <Card>
            <DealFinancials id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="tasks">
          <Card>
            <DealTasks />
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <DealDocuments />
          </Card>
        </TabsContent>
        <TabsContent value="notes">
          <Card>
            <DealNotes />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
