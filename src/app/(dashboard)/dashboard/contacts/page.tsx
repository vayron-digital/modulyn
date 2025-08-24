"use client"

import { ContactStats } from "@/components/contacts/contact-stats"
import { ContactList } from "@/components/contacts/contact-list"
import { ContactFilters } from "@/components/contacts/contact-filters"
import { ContactActions } from "@/components/contacts/contact-actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Contacts</h2>
        <p className="text-muted-foreground">
          Manage your contacts, clients, and business relationships.
        </p>
      </div>

      <ContactStats />

      <div className="flex items-center justify-between">
        <ContactFilters />
        <ContactActions />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Contacts</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <ContactList type="all" />
          </Card>
        </TabsContent>
        <TabsContent value="clients">
          <Card>
            <ContactList type="clients" />
          </Card>
        </TabsContent>
        <TabsContent value="leads">
          <Card>
            <ContactList type="leads" />
          </Card>
        </TabsContent>
        <TabsContent value="vendors">
          <Card>
            <ContactList type="vendors" />
          </Card>
        </TabsContent>
        <TabsContent value="partners">
          <Card>
            <ContactList type="partners" />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
