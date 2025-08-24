"use client"

import { LeadStats } from "@/components/leads/lead-stats"
import { LeadList } from "@/components/leads/lead-list"
import { LeadFilters } from "@/components/leads/lead-filters"
import { LeadActions } from "@/components/leads/lead-actions"
import { LeadFunnel } from "@/components/leads/lead-funnel"
import { LeadSources } from "@/components/leads/lead-sources"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Lead Management</h2>
        <p className="text-muted-foreground">
          Track, manage, and convert your real estate leads
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <LeadFunnel />
        </Card>
        <Card className="p-6">
          <LeadSources />
        </Card>
      </div>

      <LeadStats />

      <div className="flex items-center justify-between">
        <LeadFilters />
        <LeadActions />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Leads</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="contacted">Contacted</TabsTrigger>
          <TabsTrigger value="qualified">Qualified</TabsTrigger>
          <TabsTrigger value="proposal">Proposal</TabsTrigger>
          <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
          <TabsTrigger value="lost">Lost</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <LeadList status="all" />
          </Card>
        </TabsContent>
        <TabsContent value="new">
          <Card>
            <LeadList status="new" />
          </Card>
        </TabsContent>
        <TabsContent value="contacted">
          <Card>
            <LeadList status="contacted" />
          </Card>
        </TabsContent>
        <TabsContent value="qualified">
          <Card>
            <LeadList status="qualified" />
          </Card>
        </TabsContent>
        <TabsContent value="proposal">
          <Card>
            <LeadList status="proposal" />
          </Card>
        </TabsContent>
        <TabsContent value="negotiation">
          <Card>
            <LeadList status="negotiation" />
          </Card>
        </TabsContent>
        <TabsContent value="closed">
          <Card>
            <LeadList status="closed" />
          </Card>
        </TabsContent>
        <TabsContent value="lost">
          <Card>
            <LeadList status="lost" />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
