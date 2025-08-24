"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DealsPipeline } from "@/components/dashboard/crm/deals-pipeline"
import { LeadsSummary } from "@/components/dashboard/crm/leads-summary"
import { RecentListings } from "@/components/dashboard/crm/recent-listings"
import { UpcomingTasks } from "@/components/dashboard/crm/upcoming-tasks"
import { AgentPerformance } from "@/components/dashboard/crm/agent-performance"
import { MarketStats } from "@/components/dashboard/crm/market-stats"
import { KPICard } from "@/components/dashboard/kpi-card"
import { useDashboardKPIs } from "@/hooks/use-dashboard-kpis"
import { Home, Target, DollarSign, Calendar, Users, TrendingUp } from "lucide-react"

export function CRMDashboard() {
  const { crmKPIs: kpis, isLoading: loading, error } = useDashboardKPIs()

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <KPICard
          title="Active Listings"
          value={kpis?.activeListings || '0'}
          change={kpis?.activeListingsChange}
          changeLabel="new this month"
          icon={Home}
          loading={loading}
          error={error}
        />
        <KPICard
          title="Active Leads"
          value={kpis?.activeLeads || '0'}
          change={kpis?.activeLeadsChange}
          changeLabel="from last month"
          icon={Target}
          loading={loading}
          error={error}
        />
        <KPICard
          title="Deals Value"
          value={formatCurrency(kpis?.dealsValue || 0)}
          change={kpis?.dealsValueChange}
          changeLabel="from last month"
          icon={DollarSign}
          loading={loading}
          error={error}
        />
        <KPICard
          title="Tasks Due"
          value={kpis?.tasksDue || '0'}
          change={kpis?.tasksDueChange}
          changeLabel="from last week"
          icon={Calendar}
          loading={loading}
          error={error}
        />
        <KPICard
          title="Active Clients"
          value={kpis?.activeClients || '0'}
          change={kpis?.activeClientsChange}
          changeLabel="from last month"
          icon={Users}
          loading={loading}
          error={error}
        />
        <KPICard
          title="Conversion Rate"
          value={formatPercentage(kpis?.conversionRate || 0)}
          change={kpis?.conversionRateChange}
          changeLabel="from last month"
          icon={TrendingUp}
          loading={loading}
          error={error}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Deals Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <DealsPipeline />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Leads Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <LeadsSummary />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentListings />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <UpcomingTasks />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Agent Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <AgentPerformance />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Market Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <MarketStats />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
