"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EventForm } from "@/components/events/event-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TicketTypes } from "@/components/events/ticket-types"
import { EventSchedule } from "@/components/events/event-schedule"
import { EventSpeakers } from "@/components/events/event-speakers"

export default function EventPage() {
  const params = useParams()
  const isNew = params.id === "new"

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {isNew ? "Create Event" : "Edit Event"}
        </h2>
        <p className="text-muted-foreground">
          {isNew
            ? "Create a new event for your organization"
            : "Edit event details and settings"}
        </p>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Event Details</TabsTrigger>
          <TabsTrigger value="tickets">Ticket Types</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="speakers">Speakers</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
            </CardHeader>
            <CardContent>
              <EventForm id={params.id as string} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Types</CardTitle>
            </CardHeader>
            <CardContent>
              <TicketTypes id={params.id as string} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Event Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <EventSchedule id={params.id as string} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="speakers">
          <Card>
            <CardHeader>
              <CardTitle>Event Speakers</CardTitle>
            </CardHeader>
            <CardContent>
              <EventSpeakers id={params.id as string} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
