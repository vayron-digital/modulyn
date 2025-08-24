"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import {
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  FileText,
  DollarSign,
  Home,
  ClipboardCheck,
  Scale,
} from "lucide-react"

interface DealActivityProps {
  id: string
}

// This would normally come from an API
const activities = [
  {
    id: "1",
    type: "email",
    title: "Offer Submitted",
    description: "Sent offer documents to listing agent",
    date: new Date(2024, 2, 15, 14, 30),
    icon: Mail,
  },
  {
    id: "2",
    type: "call",
    title: "Lender Call",
    description: "Discussed loan terms and requirements",
    date: new Date(2024, 2, 14, 11, 15),
    duration: "25 minutes",
    icon: Phone,
  },
  {
    id: "3",
    type: "inspection",
    title: "Home Inspection",
    description: "Completed property inspection",
    date: new Date(2024, 2, 12, 15, 0),
    icon: ClipboardCheck,
  },
  {
    id: "4",
    type: "document",
    title: "Contract Review",
    description: "Reviewed purchase agreement",
    date: new Date(2024, 2, 12, 16, 0),
    icon: FileText,
  },
  {
    id: "5",
    type: "appraisal",
    title: "Appraisal Scheduled",
    description: "Property appraisal appointment set",
    date: new Date(2024, 2, 10, 9, 45),
    icon: Scale,
  },
]

const upcomingActivities = [
  {
    id: "1",
    type: "closing",
    title: "Closing Meeting",
    description: "Final walkthrough and closing",
    date: new Date(2024, 4, 1, 14, 0),
    icon: Home,
  },
  {
    id: "2",
    type: "payment",
    title: "Down Payment Due",
    description: "Transfer closing funds",
    date: new Date(2024, 3, 30, 10, 0),
    icon: DollarSign,
  },
]

export function DealActivity({ id }: DealActivityProps) {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="font-semibold">Upcoming Activities</h3>
        <div className="mt-4 space-y-4">
          {upcomingActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 rounded-lg border p-3"
            >
              <activity.icon className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{activity.title}</span>
                  <Badge variant="outline">
                    {formatDistanceToNow(activity.date, { addSuffix: true })}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Recent Activity</h3>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <div className="relative">
          <div className="absolute left-2 top-0 h-full w-px bg-border" />
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="relative pl-6">
                <div className="absolute left-0 top-2 h-2 w-2 rounded-full border border-primary bg-background" />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <activity.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{activity.title}</span>
                    </div>
                    <Badge variant="secondary">
                      {formatDistanceToNow(activity.date, { addSuffix: true })}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  {"duration" in activity && (
                    <p className="text-xs text-muted-foreground">
                      Duration: {activity.duration}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button variant="outline" size="sm" className="w-full">
          Load More
        </Button>
      </div>
    </div>
  )
}
