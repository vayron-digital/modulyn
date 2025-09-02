"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { BarChart, Globe, Search, User } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// KPI Card Component
function KPICard({ title, value, className }: { title: string; value: string; className?: string }) {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-2">
        <h3 className="text-text-muted text-sm font-medium">{title}</h3>
        <p className="text-4xl font-semibold">{value}</p>
      </div>
    </Card>
  )
}

// Support Ticket Component
function SupportTicket({ email, issue, status }: { email: string; issue: string; status: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <Avatar>
          <User className="h-5 w-5" />
        </Avatar>
        <div>
          <p className="text-sm font-medium">{email}</p>
          <p className="text-sm text-olive">{issue}</p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className={status === 'OPEN' ? 'text-status-error border-status-error' : 'text-status-info border-status-info'}
      >
        {status}
      </Button>
    </div>
  )
}

export function NexaVerseDashboard() {
  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-olive" />
            <Input
              type="search"
              placeholder="Search transactions, customers, subscriptions"
              className="pl-10"
            />
          </div>
          <Avatar className="h-10 w-10">
            <User className="h-6 w-6" />
          </Avatar>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-4 gap-6">
        <KPICard
          title="Current MRR"
          value="$12.4k"
          className="bg-muted"
        />
        <KPICard
          title="Current Customers"
          value="16,601"
          className="bg-secondary text-text-inverted"
        />
        <KPICard
          title="Active Customers"
          value="33%"
          className="bg-dark text-text-inverted"
        />
        <KPICard
          title="Churn Rate"
          value="2%"
          className="bg-primary text-text-inverted"
        />
      </div>

      {/* Charts and Tables Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Trend Chart */}
        <Card className="col-span-7 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Trend</h3>
            <Select defaultValue="this-year">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-year">This year</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
                <SelectItem value="all-time">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-64">
            {/* Chart will be implemented here */}
          </div>
        </Card>

        {/* Sales Chart */}
        <Card className="col-span-5 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Sales</h3>
            <Select defaultValue="this-year">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-year">This year</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
                <SelectItem value="all-time">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-64">
            {/* Donut chart will be implemented here */}
          </div>
        </Card>

        {/* Support Tickets */}
        <Card className="col-span-7 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Support Tickets</h3>
            <Select defaultValue="this-week">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-week">This week</SelectItem>
                <SelectItem value="last-week">Last week</SelectItem>
                <SelectItem value="this-month">This month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-text-muted">
                All
              </Button>
              <Button variant="outline" size="sm" className="text-status-error border-status-error">
                Open
              </Button>
              <Button variant="outline" size="sm" className="text-status-warning border-status-warning">
                Pending
              </Button>
              <Button variant="outline" size="sm" className="text-status-success border-status-success">
                Closed
              </Button>
            </div>
            <div className="mt-4 divide-y">
              <SupportTicket
                email="jessica.smith123@example.com"
                issue="Login Issue"
                status="OPEN"
              />
              <SupportTicket
                email="david.jones456@gmail.dummy.com"
                issue="Billing Inquiry"
                status="PENDING"
              />
              <SupportTicket
                email="emily.wilson789@fictitious.net"
                issue="Product Malfunction"
                status="CLOSED"
              />
            </div>
          </div>
        </Card>

        {/* Customer Demographics */}
        <Card className="col-span-5 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Customer Demographic</h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-erie" />
                Active
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-flame" />
                Inactive
              </span>
            </div>
          </div>
          <div className="h-64">
            {/* World map will be implemented here */}
          </div>
        </Card>
      </div>
    </div>
  )
}
