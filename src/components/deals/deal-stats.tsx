"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DollarSign,
  ArrowUp,
  ArrowDown,
  Percent,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react"

// This would normally come from an API
const stats = {
  totalValue: {
    value: 12500000,
    change: 8.2,
    timeframe: "from last month",
  },
  averageValue: {
    value: 450000,
    change: 5.5,
    timeframe: "from last month",
  },
  conversionRate: {
    value: "32%",
    change: 2.1,
    timeframe: "from last month",
  },
  avgCycleTime: {
    value: "45 days",
    change: -12.5,
    timeframe: "from last month",
  },
  closedDeals: {
    value: 28,
    change: 15.3,
    timeframe: "from last month",
  },
  lostDeals: {
    value: 8,
    change: -5.2,
    timeframe: "from last month",
  },
}

export function DealStats() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">Deal Metrics</h3>
        <p className="text-sm text-muted-foreground">
          Key performance indicators
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.totalValue.value.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span
                  className={
                    stats.totalValue.change >= 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                >
                  <span className="flex items-center">
                    {stats.totalValue.change >= 0 ? (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    )}
                    {Math.abs(stats.totalValue.change)}%
                  </span>
                </span>
                <span className="ml-1">{stats.totalValue.timeframe}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.averageValue.value.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span
                  className={
                    stats.averageValue.change >= 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                >
                  <span className="flex items-center">
                    {stats.averageValue.change >= 0 ? (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    )}
                    {Math.abs(stats.averageValue.change)}%
                  </span>
                </span>
                <span className="ml-1">{stats.averageValue.timeframe}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Conversion Rate
              </CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.conversionRate.value}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span
                  className={
                    stats.conversionRate.change >= 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                >
                  <span className="flex items-center">
                    {stats.conversionRate.change >= 0 ? (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    )}
                    {Math.abs(stats.conversionRate.change)}%
                  </span>
                </span>
                <span className="ml-1">{stats.conversionRate.timeframe}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Cycle Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgCycleTime.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span
                  className={
                    stats.avgCycleTime.change <= 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                >
                  <span className="flex items-center">
                    {stats.avgCycleTime.change <= 0 ? (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    )}
                    {Math.abs(stats.avgCycleTime.change)}%
                  </span>
                </span>
                <span className="ml-1">{stats.avgCycleTime.timeframe}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closed Deals</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.closedDeals.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span
                  className={
                    stats.closedDeals.change >= 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                >
                  <span className="flex items-center">
                    {stats.closedDeals.change >= 0 ? (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    )}
                    {Math.abs(stats.closedDeals.change)}%
                  </span>
                </span>
                <span className="ml-1">{stats.closedDeals.timeframe}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lost Deals</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.lostDeals.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span
                  className={
                    stats.lostDeals.change <= 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                >
                  <span className="flex items-center">
                    {stats.lostDeals.change <= 0 ? (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    )}
                    {Math.abs(stats.lostDeals.change)}%
                  </span>
                </span>
                <span className="ml-1">{stats.lostDeals.timeframe}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
