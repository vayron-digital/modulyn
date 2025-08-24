import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: {
      name: "John Smith",
      initials: "JS",
    },
    action: "registered for",
    target: "Annual Trade Conference 2024",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Sarah Johnson",
      initials: "SJ",
    },
    action: "completed",
    target: "Industry Certification Course",
    time: "4 hours ago",
  },
  {
    id: 3,
    user: {
      name: "Michael Brown",
      initials: "MB",
    },
    action: "submitted",
    target: "Membership Renewal",
    time: "6 hours ago",
  },
  {
    id: 4,
    user: {
      name: "Emily Davis",
      initials: "ED",
    },
    action: "commented on",
    target: "Legislative Update #127",
    time: "8 hours ago",
  },
  {
    id: 5,
    user: {
      name: "David Wilson",
      initials: "DW",
    },
    action: "joined",
    target: "Policy Review Committee",
    time: "1 day ago",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user.name}
              <span className="text-muted-foreground"> {activity.action} </span>
              {activity.target}
            </p>
            <p className="text-sm text-muted-foreground">
              {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
