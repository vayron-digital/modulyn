"use client"

import { useState } from "react"
import { PropertyList } from "@/components/properties/property-list"
import { PropertyFilters } from "@/components/properties/property-filters"
import { PropertyActions } from "@/components/properties/property-actions"
import { PropertyGrid } from "@/components/properties/property-grid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyStats } from "@/components/properties/property-stats"

export default function PropertiesPage() {
  const [view, setView] = useState<"list" | "grid">("grid")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Properties</h2>
          <p className="text-muted-foreground">
            Manage and track your real estate listings.
          </p>
        </div>
        <PropertyActions />
      </div>

      <PropertyStats />

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle>Property Listings</CardTitle>
            <Tabs
              value={view}
              onValueChange={(value) => setView(value as "list" | "grid")}
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <PropertyFilters />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {view === "list" ? <PropertyList /> : <PropertyGrid />}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
