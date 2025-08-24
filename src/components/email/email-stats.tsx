"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Mail,
  Send,
  Clock,
  AlertCircle,
  Star,
  Inbox,
  Trash2,
  MailOpen,
  MailQuestion,
  CheckCircle2,
  XCircle,
  BarChart2,
} from "lucide-react"

interface EmailStatsProps {
  view: string
}

// This would normally come from an API
const stats = {
  overview: {
    total: 1250,
    unread: 45,
    flagged: 28,
    drafts: 12,
  },
  engagement: {
    sent: 320,
    opened: 280,
    replied: 150,
    forwarded: 90,
  },
  categories: [
    { name: "Clients", value: 35, color: "#2563eb" },
    { name: "Properties", value: 25, color: "#16a34a" },
    { name: "Deals", value: 20, color: "#ea580c" },
    { name: "Team", value: 15, color: "#9333ea" },
    { name: "Other", value: 5, color: "#64748b" },
  ],
  activity: [
    { day: "Mon", sent: 45, received: 65 },
    { day: "Tue", sent: 55, received: 78 },
    { day: "Wed", sent: 38, received: 52 },
    { day: "Thu", sent: 42, received: 58 },
    { day: "Fri", sent: 35, received: 47 },
    { day: "Sat", sent: 25, received: 32 },
    { day: "Sun", sent: 22, received: 28 },
  ],
  response: {
    averageTime: "2.5 hours",
    within1Hour: 45,
    within24Hours: 35,
    over24Hours: 20,
  },
}

export function EmailStats({ view }: EmailStatsProps) {
  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Inbox className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total Emails</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              This Month
            </Badge>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{stats.overview.total}</div>
            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MailOpen className="h-3 w-3" />
                <span>{stats.engagement.opened} opened</span>
              </div>
              <div className="flex items-center gap-1">
                <MailQuestion className="h-3 w-3" />
                <span>{stats.overview.unread} unread</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Sent Emails</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              This Month
            </Badge>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{stats.engagement.sent}</div>
            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-success" />
                <span>{stats.engagement.opened} delivered</span>
              </div>
              <div className="flex items-center gap-1">
                <XCircle className="h-3 w-3 text-destructive" />
                <span>2 failed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Response Time</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              Average
            </Badge>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{stats.response.averageTime}</div>
            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>{stats.response.within1Hour}% within 1h</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                <span>{stats.response.over24Hours}% over 24h</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Flagged</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              Active
            </Badge>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{stats.overview.flagged}</div>
            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                <span>{stats.overview.unread} unread</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>5 due today</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Email Activity</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              Last 7 Days
            </Badge>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.activity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sent" name="Sent" fill="#2563eb" />
                <Bar dataKey="received" name="Received" fill="#64748b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Email Categories</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              Distribution
            </Badge>
          </div>
          <div className="flex h-[200px] items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.categories}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={(entry) => entry.name}
                >
                  {stats.categories.map((entry, index) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {stats.categories.map((category) => (
              <div
                key={category.name}
                className="flex items-center gap-2 text-sm"
              >
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span>{category.name}</span>
                <span className="text-muted-foreground">
                  {category.value}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
