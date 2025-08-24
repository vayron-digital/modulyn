"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Home,
  Briefcase,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building,
  Users,
  Link,
} from "lucide-react"

interface ContactOverviewProps {
  id: string
}

// This would normally come from an API
const contact = {
  id: "1",
  personalInfo: {
    birthday: "March 15, 1980",
    occupation: "Real Estate Investor",
    company: "Smith Investments LLC",
    website: "www.smithinvestments.com",
    socialMedia: {
      linkedin: "linkedin.com/in/johnsmith",
      twitter: "twitter.com/johnsmith",
    },
  },
  address: {
    home: "123 Main Street, Apt 4B, Chicago, IL 60601",
    work: "456 Business Ave, Suite 200, Chicago, IL 60602",
  },
  preferences: {
    communicationPreference: "Email",
    bestTimeToContact: "Morning",
    language: "English",
    timezone: "America/Chicago",
  },
  relationships: {
    spouse: "Mary Smith",
    children: ["Sarah Smith", "Michael Smith"],
    referredBy: "Tom Wilson",
  },
  metrics: {
    totalDeals: 3,
    activeDeals: 1,
    totalValue: 750000,
    lastDeal: new Date(2024, 1, 15),
    nextMeeting: new Date(2024, 3, 1),
  },
}

export function ContactOverview({ id }: ContactOverviewProps) {
  return (
    <div className="grid gap-6 p-6 md:grid-cols-2">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold">Personal Information</h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Born {contact.personalInfo.birthday}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span>{contact.personalInfo.occupation}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span>{contact.personalInfo.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span>{contact.personalInfo.website}</span>
            </div>
            <div className="flex items-center gap-2">
              <Link className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2">
                <Button variant="link" className="h-auto p-0">
                  LinkedIn
                </Button>
                <span>•</span>
                <Button variant="link" className="h-auto p-0">
                  Twitter
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold">Contact Information</h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Button variant="link" className="h-auto p-0">
                Send Email
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <Button variant="link" className="h-auto p-0">
                Call Contact
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold">Addresses</h3>
          <div className="mt-4 space-y-3">
            <div className="flex gap-2">
              <Home className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <div className="font-medium">Home</div>
                <div className="text-sm text-muted-foreground">
                  {contact.address.home}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <div className="font-medium">Work</div>
                <div className="text-sm text-muted-foreground">
                  {contact.address.work}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold">Preferences</h3>
          <div className="mt-4 grid gap-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">Communication</div>
              <Badge variant="secondary">
                {contact.preferences.communicationPreference}
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">Best Time</div>
              <Badge variant="secondary">
                {contact.preferences.bestTimeToContact}
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">Language</div>
              <Badge variant="secondary">{contact.preferences.language}</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">Timezone</div>
              <Badge variant="secondary">{contact.preferences.timezone}</Badge>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold">Relationships</h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                Spouse: <span className="font-medium">{contact.relationships.spouse}</span>
              </span>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Children:</span>
              </div>
              <div className="ml-6 space-y-1">
                {contact.relationships.children.map((child) => (
                  <div key={child} className="text-sm">
                    {child}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                Referred by:{" "}
                <Button variant="link" className="h-auto p-0">
                  {contact.relationships.referredBy}
                </Button>
              </span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold">Metrics</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contact.metrics.totalDeals}</div>
                <p className="text-xs text-muted-foreground">
                  {contact.metrics.activeDeals} active
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${contact.metrics.totalValue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Last deal {contact.metrics.lastDeal.toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
