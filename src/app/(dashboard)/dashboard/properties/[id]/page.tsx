"use client"

import { useParams } from "next/navigation"
import { PropertyHeader } from "@/components/properties/property-header"
import { PropertyGallery } from "@/components/properties/property-gallery"
import { PropertyDetails } from "@/components/properties/property-details"
import { PropertyFeatures } from "@/components/properties/property-features"
import { PropertyLocation } from "@/components/properties/property-location"
import { PropertyDocuments } from "@/components/properties/property-documents"
import { PropertyHistory } from "@/components/properties/property-history"
import { PropertyLeads } from "@/components/properties/property-leads"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

export default function PropertyPage() {
  const params = useParams()

  return (
    <div className="space-y-6">
      <PropertyHeader id={params.id as string} />
      
      <div className="grid gap-6 md:grid-cols-6">
        <Card className="md:col-span-4">
          <PropertyGallery id={params.id as string} />
        </Card>
        <Card className="md:col-span-2">
          <PropertyDetails id={params.id as string} />
        </Card>
      </div>

      <Tabs defaultValue="features" className="space-y-4">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>
        <TabsContent value="features">
          <Card>
            <PropertyFeatures id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="location">
          <Card>
            <PropertyLocation id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <PropertyDocuments id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <PropertyHistory id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="leads">
          <Card>
            <PropertyLeads id={params.id as string} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
