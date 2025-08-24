import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface MemberActivityProps {
  id: string
}

// This would normally come from an API
const activities = [
  {
    id: 1,
    type: "event",
    title: "Annual Trade Conference 2024",
    action: "registered",
    date: new Date(2024, 2, 15),
    status: "upcoming",
  },
  {
    id: 2,
    type: "certification",
    title: "Advanced Trade Practices",
    action: "completed",
    date: new Date(2024, 2, 10),
    status: "completed",
  },
  {
    id: 3,
    type: "committee",
    title: "Policy Review Board",
    action: "joined",
    date: new Date(2024, 2, 5),
    status: "active",
  },
  {
    id: 4,
    type: "document",
    title: "Q1 Industry Report",
    action: "downloaded",
    date: new Date(2024, 2, 1),
    status: "completed",
  },
]

export function MemberActivity({ id }: MemberActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Badge
                  variant={
                    activity.status === "completed"
                      ? "success"
                      : activity.status === "upcoming"
                      ? "warning"
                      : "secondary"
                  }
                  className="h-8 w-8 rounded-full p-0 flex items-center justify-center"
                >
                  {activity.type === "event" && "E"}
                  {activity.type === "certification" && "C"}
                  {activity.type === "committee" && "B"}
                  {activity.type === "document" && "D"}
                </Badge>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.action} {activity.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(activity.date, { addSuffix: true })}
                </p>
              </div>
              <div>
                <Badge
                  variant={
                    activity.status === "completed"
                      ? "success"
                      : activity.status === "upcoming"
                      ? "warning"
                      : "secondary"
                  }
                >
                  {activity.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
