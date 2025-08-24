"use client"

import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyBasicForm } from "@/components/properties/forms/property-basic-form"
import { PropertyDetailsForm } from "@/components/properties/forms/property-details-form"
import { PropertyFeaturesForm } from "@/components/properties/forms/property-features-form"
import { PropertyLocationForm } from "@/components/properties/forms/property-location-form"
import { PropertyMediaForm } from "@/components/properties/forms/property-media-form"
import { PropertyPricingForm } from "@/components/properties/forms/property-pricing-form"

export default function PropertyEditPage() {
  const params = useParams()
  const isNew = params.id === "new"

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {isNew ? "Add New Property" : "Edit Property"}
        </h2>
        <p className="text-muted-foreground">
          {isNew
            ? "Add a new property listing to your portfolio"
            : "Update property listing information"}
        </p>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <Card>
            <PropertyBasicForm id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="details">
          <Card>
            <PropertyDetailsForm id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="features">
          <Card>
            <PropertyFeaturesForm id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="location">
          <Card>
            <PropertyLocationForm id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="media">
          <Card>
            <PropertyMediaForm id={params.id as string} />
          </Card>
        </TabsContent>
        <TabsContent value="pricing">
          <Card>
            <PropertyPricingForm id={params.id as string} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
