"use client"

import { DealStats } from "@/components/deals/deal-stats"
import { DealPipeline } from "@/components/deals/deal-pipeline"
import { DealFilters } from "@/components/deals/deal-filters"
import { DealActions } from "@/components/deals/deal-actions"
import { DealList } from "@/components/deals/deal-list"
import { DealForecast } from "@/components/deals/deal-forecast"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DealsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Deal Pipeline</h2>
        <p className="text-muted-foreground">
          Track and manage your real estate deals
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <DealForecast />
        </Card>
        <Card className="p-6">
          <DealStats />
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <DealFilters />
        <DealActions />
      </div>

      <Card>
        <DealPipeline />
      </Card>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Deals</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
          <TabsTrigger value="lost">Lost</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <DealList status="all" />
          </Card>
        </TabsContent>
        <TabsContent value="active">
          <Card>
            <DealList status="active" />
          </Card>
        </TabsContent>
        <TabsContent value="pending">
          <Card>
            <DealList status="pending" />
          </Card>
        </TabsContent>
        <TabsContent value="closed">
          <Card>
            <DealList status="closed" />
          </Card>
        </TabsContent>
        <TabsContent value="lost">
          <Card>
            <DealList status="lost" />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
