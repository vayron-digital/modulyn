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
  DollarSign,
  Calendar,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building2,
  Users,
  Link,
  Clock,
  Star,
} from "lucide-react"

interface LeadOverviewProps {
  id: string
}

// This would normally come from an API
const lead = {
  id: "1",
  personalInfo: {
    occupation: "Software Engineer",
    company: "Tech Corp",
    website: "www.techcorp.com",
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
  propertyPreferences: {
    type: "Single Family",
    priceRange: "$600k-$800k",
    location: "North Side",
    bedrooms: "3-4",
    bathrooms: "2+",
    features: [
      "Modern Kitchen",
      "Hardwood Floors",
      "Garage",
      "Backyard",
      "Home Office",
    ],
  },
  financials: {
    preApproved: true,
    preApprovalAmount: 800000,
    lender: "ABC Bank",
    downPayment: "20%",
    timeline: "3-6 months",
  },
  metrics: {
    score: 85,
    totalViews: 12,
    savedProperties: 5,
    inquiries: 3,
    lastActivity: new Date(2024, 2, 15),
    nextFollowUp: new Date(2024, 3, 1),
  },
}

export function LeadOverview({ id }: LeadOverviewProps) {
  return (
    <div className="grid gap-6 p-6 md:grid-cols-2">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold">Personal Information</h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{lead.personalInfo.occupation}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{lead.personalInfo.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span>{lead.personalInfo.website}</span>
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
                Call Lead
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
                  {lead.address.home}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <div className="font-medium">Work</div>
                <div className="text-sm text-muted-foreground">
                  {lead.address.work}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold">Property Preferences</h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span>{lead.propertyPreferences.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>{lead.propertyPreferences.priceRange}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{lead.propertyPreferences.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span>
                {lead.propertyPreferences.bedrooms} beds,{" "}
                {lead.propertyPreferences.bathrooms} baths
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {lead.propertyPreferences.features.map((feature) => (
                <Badge key={feature} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold">Financial Information</h3>
          <div className="mt-4 grid gap-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">Pre-approved</div>
              <Badge variant={lead.financials.preApproved ? "success" : "secondary"}>
                {lead.financials.preApproved ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">Pre-approval Amount</div>
              <Badge variant="secondary">
                ${lead.financials.preApprovalAmount.toLocaleString()}
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">Down Payment</div>
              <Badge variant="secondary">{lead.financials.downPayment}</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">Timeline</div>
              <Badge variant="secondary">{lead.financials.timeline}</Badge>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold">Lead Metrics</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lead Score</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lead.metrics.score}</div>
                <p className="text-xs text-muted-foreground">
                  Based on engagement and activity
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Activity</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {lead.metrics.totalViews} views
                </div>
                <p className="text-xs text-muted-foreground">
                  {lead.metrics.savedProperties} saved properties
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
