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
  MapPin,
  Building2,
  Users,
  Link,
  Clock,
  ArrowUpRight,
  Bed,
  Bath,
  Square,
  Car,
  Trees,
} from "lucide-react"

interface DealOverviewProps {
  id: string
}

// This would normally come from an API
const deal = {
  id: "1",
  property: {
    address: "123 Main Street",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    type: "Single Family",
    beds: 4,
    baths: 3,
    sqft: 2500,
    lotSize: "0.25 acres",
    yearBuilt: 2020,
    stories: 2,
    garage: "2 Car Attached",
    parking: "4 spaces",
    features: [
      "Modern Kitchen",
      "Hardwood Floors",
      "Central Air",
      "Fireplace",
      "Deck",
    ],
  },
  financial: {
    listPrice: 750000,
    offerPrice: 725000,
    downPayment: 145000,
    loanAmount: 580000,
    loanType: "Conventional",
    lender: "ABC Bank",
    preApproved: true,
    closingCosts: 15000,
    estimatedPayment: 3500,
  },
  timeline: {
    listDate: new Date(2024, 2, 1),
    offerDate: new Date(2024, 2, 15),
    inspectionDate: new Date(2024, 3, 1),
    appraisalDate: new Date(2024, 3, 15),
    closingDate: new Date(2024, 4, 1),
  },
  contacts: {
    lender: {
      name: "Michael Thompson",
      company: "ABC Bank",
      email: "michael.thompson@abcbank.com",
      phone: "(555) 345-6789",
    },
    inspector: {
      name: "David Wilson",
      company: "Quality Home Inspections",
      email: "david.wilson@qhi.com",
      phone: "(555) 456-7890",
    },
    title: {
      name: "Jennifer Lee",
      company: "First Title Company",
      email: "jennifer.lee@firsttitle.com",
      phone: "(555) 567-8901",
    },
  },
}

export function DealOverview({ id }: DealOverviewProps) {
  return (
    <div className="grid gap-6 p-6 md:grid-cols-2">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold">Property Details</h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>
                {deal.property.address}, {deal.property.city}, {deal.property.state}{" "}
                {deal.property.zipCode}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span>{deal.property.type}</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4 text-muted-foreground" />
                <span>{deal.property.beds} beds</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4 text-muted-foreground" />
                <span>{deal.property.baths} baths</span>
              </div>
              <div className="flex items-center gap-1">
                <Square className="h-4 w-4 text-muted-foreground" />
                <span>{deal.property.sqft.toLocaleString()} sqft</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-muted-foreground" />
              <span>{deal.property.garage}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trees className="h-4 w-4 text-muted-foreground" />
              <span>{deal.property.lotSize}</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-1">
            {deal.property.features.map((feature) => (
              <Badge key={feature} variant="secondary">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold">Key Contacts</h3>
          <div className="mt-4 space-y-4">
            <div>
              <div className="font-medium">Lender</div>
              <div className="mt-1 space-y-1 text-sm">
                <div>{deal.contacts.lender.name}</div>
                <div className="text-muted-foreground">
                  {deal.contacts.lender.company}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  <span>{deal.contacts.lender.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  <span>{deal.contacts.lender.phone}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="font-medium">Inspector</div>
              <div className="mt-1 space-y-1 text-sm">
                <div>{deal.contacts.inspector.name}</div>
                <div className="text-muted-foreground">
                  {deal.contacts.inspector.company}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  <span>{deal.contacts.inspector.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  <span>{deal.contacts.inspector.phone}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="font-medium">Title Company</div>
              <div className="mt-1 space-y-1 text-sm">
                <div>{deal.contacts.title.name}</div>
                <div className="text-muted-foreground">
                  {deal.contacts.title.company}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  <span>{deal.contacts.title.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  <span>{deal.contacts.title.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold">Financial Details</h3>
          <div className="mt-4 grid gap-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">List Price</div>
              <Badge variant="secondary">
                ${deal.financial.listPrice.toLocaleString()}
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">Offer Price</div>
              <Badge variant="secondary">
                ${deal.financial.offerPrice.toLocaleString()}
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">Down Payment</div>
              <Badge variant="secondary">
                ${deal.financial.downPayment.toLocaleString()}
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">Loan Amount</div>
              <Badge variant="secondary">
                ${deal.financial.loanAmount.toLocaleString()}
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">Loan Type</div>
              <Badge variant="secondary">{deal.financial.loanType}</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">Monthly Payment</div>
              <Badge variant="secondary">
                ${deal.financial.estimatedPayment.toLocaleString()}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold">Timeline</h3>
          <div className="mt-4 grid gap-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">List Date</div>
              <Badge variant="secondary">
                {deal.timeline.listDate.toLocaleDateString()}
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">Offer Date</div>
              <Badge variant="secondary">
                {deal.timeline.offerDate.toLocaleDateString()}
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">Inspection Date</div>
              <Badge variant="secondary">
                {deal.timeline.inspectionDate.toLocaleDateString()}
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">Appraisal Date</div>
              <Badge variant="secondary">
                {deal.timeline.appraisalDate.toLocaleDateString()}
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">Closing Date</div>
              <Badge variant="secondary">
                {deal.timeline.closingDate.toLocaleDateString()}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
