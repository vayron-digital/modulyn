"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/trade/overview"
import { RecentActivity } from "@/components/dashboard/trade/recent-activity"
import { UpcomingEvents } from "@/components/dashboard/trade/upcoming-events"
import { MemberInsights } from "@/components/dashboard/trade/member-insights"
import { KPICard } from "@/components/dashboard/kpi-card"
import { useDashboardKPIs } from "@/hooks/use-dashboard-kpis"
import { Users, Calendar, DollarSign, Target } from "lucide-react"

export function TradeDashboard() {
  const { tradeKPIs: kpis, isLoading: loading, error } = useDashboardKPIs()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Members"
          value={kpis?.totalMembers?.toLocaleString() || '0'}
          change={kpis?.totalMembersChange}
          changeLabel="from last month"
          icon={Users}
          loading={loading}
          error={error}
        />
        <KPICard
          title="Active Events"
          value={kpis?.activeEvents || '0'}
          change={kpis?.activeEventsChange}
          changeLabel="from last month"
          icon={Calendar}
          loading={loading}
          error={error}
        />
        <KPICard
          title="Revenue"
          value={formatCurrency(kpis?.revenue || 0)}
          change={kpis?.revenueChange}
          changeLabel="from last month"
          icon={DollarSign}
          loading={loading}
          error={error}
        />
        <KPICard
          title="Active Campaigns"
          value={kpis?.activeCampaigns || '0'}
          change={kpis?.activeCampaignsChange}
          changeLabel="from last month"
          icon={Target}
          loading={loading}
          error={error}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <UpcomingEvents />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Member Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <MemberInsights />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
