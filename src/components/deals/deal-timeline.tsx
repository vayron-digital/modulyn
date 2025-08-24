"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DollarSign,
  FileText,
  ClipboardCheck,
  Scale,
  Home,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface DealTimelineProps {
  id: string
}

// This would normally come from an API
const timeline = [
  {
    id: "1",
    stage: "Offer",
    status: "completed",
    title: "Offer Submitted",
    description: "Initial offer of $725,000 submitted",
    date: new Date(2024, 2, 15),
    icon: DollarSign,
    items: [
      {
        id: "1.1",
        title: "Purchase Agreement",
        status: "completed",
        date: new Date(2024, 2, 15),
      },
      {
        id: "1.2",
        title: "Earnest Money",
        status: "completed",
        date: new Date(2024, 2, 16),
      },
      {
        id: "1.3",
        title: "Pre-approval Letter",
        status: "completed",
        date: new Date(2024, 2, 15),
      },
    ],
  },
  {
    id: "2",
    stage: "Inspection",
    status: "completed",
    title: "Home Inspection",
    description: "Property inspection completed with minor issues",
    date: new Date(2024, 2, 20),
    icon: ClipboardCheck,
    items: [
      {
        id: "2.1",
        title: "Schedule Inspection",
        status: "completed",
        date: new Date(2024, 2, 18),
      },
      {
        id: "2.2",
        title: "Inspection Report",
        status: "completed",
        date: new Date(2024, 2, 21),
      },
      {
        id: "2.3",
        title: "Repair Request",
        status: "completed",
        date: new Date(2024, 2, 22),
      },
    ],
  },
  {
    id: "3",
    stage: "Appraisal",
    status: "in_progress",
    title: "Property Appraisal",
    description: "Appraisal scheduled for next week",
    date: new Date(2024, 3, 1),
    icon: Scale,
    items: [
      {
        id: "3.1",
        title: "Order Appraisal",
        status: "completed",
        date: new Date(2024, 2, 25),
      },
      {
        id: "3.2",
        title: "Appraisal Visit",
        status: "pending",
        date: new Date(2024, 3, 1),
      },
      {
        id: "3.3",
        title: "Appraisal Report",
        status: "pending",
        date: new Date(2024, 3, 5),
      },
    ],
  },
  {
    id: "4",
    stage: "Closing",
    status: "pending",
    title: "Closing Process",
    description: "Final walkthrough and closing scheduled",
    date: new Date(2024, 4, 1),
    icon: Home,
    items: [
      {
        id: "4.1",
        title: "Title Search",
        status: "in_progress",
        date: new Date(2024, 3, 15),
      },
      {
        id: "4.2",
        title: "Final Walkthrough",
        status: "pending",
        date: new Date(2024, 3, 30),
      },
      {
        id: "4.3",
        title: "Closing Meeting",
        status: "pending",
        date: new Date(2024, 4, 1),
      },
    ],
  },
]

export function DealTimeline({ id }: DealTimelineProps) {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Deal Timeline</h3>
          <p className="text-sm text-muted-foreground">
            Track the progress of your deal
          </p>
        </div>
        <Button variant="outline">Export Timeline</Button>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 h-full w-px bg-border" />
        <div className="space-y-8">
          {timeline.map((stage) => (
            <div key={stage.id} className="relative">
              <div className="flex items-center gap-4">
                <div
                  className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 bg-background ${
                    stage.status === "completed"
                      ? "border-primary"
                      : stage.status === "in_progress"
                      ? "border-warning"
                      : "border-muted"
                  }`}
                >
                  <stage.icon
                    className={`h-6 w-6 ${
                      stage.status === "completed"
                        ? "text-primary"
                        : stage.status === "in_progress"
                        ? "text-warning"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{stage.title}</h4>
                        <Badge
                          variant={
                            stage.status === "completed"
                              ? "success"
                              : stage.status === "in_progress"
                              ? "warning"
                              : "secondary"
                          }
                        >
                          {stage.status === "completed"
                            ? "Completed"
                            : stage.status === "in_progress"
                            ? "In Progress"
                            : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {stage.description}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {formatDistanceToNow(stage.date, { addSuffix: true })}
                    </Badge>
                  </div>
                  <div className="mt-4 grid gap-2">
                    {stage.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-2">
                          {item.status === "completed" ? (
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          ) : item.status === "in_progress" ? (
                            <Clock className="h-4 w-4 text-warning" />
                          ) : item.status === "pending" ? (
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <XCircle className="h-4 w-4 text-destructive" />
                          )}
                          <span
                            className={
                              item.status === "completed"
                                ? "text-success"
                                : item.status === "in_progress"
                                ? "text-warning"
                                : ""
                            }
                          >
                            {item.title}
                          </span>
                        </div>
                        <Badge variant="outline">
                          {item.date.toLocaleDateString()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
