"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  UserCheck,
  UserPlus,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Phone,
  Clock,
} from "lucide-react"

// This would normally come from an API
const stats = {
  totalLeads: {
    value: 354,
    change: 12.5,
    timeframe: "from last month",
  },
  activeLeads: {
    value: 245,
    change: 8.2,
    timeframe: "from last month",
  },
  newLeads: {
    value: 64,
    change: -2.8,
    timeframe: "from last month",
  },
  qualifiedLeads: {
    value: 42,
    change: 4.5,
    timeframe: "from last month",
  },
  conversionRate: {
    value: "18.5%",
    change: 1.2,
    timeframe: "from last month",
  },
  avgResponseTime: {
    value: "2.4h",
    change: -15.3,
    timeframe: "from last month",
  },
  potentialValue: {
    value: 2450000,
    change: 6.8,
    timeframe: "from last month",
  },
  followUps: {
    value: 128,
    change: 3.2,
    timeframe: "from last month",
  },
}

export function LeadStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalLeads.value}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span
              className={
                stats.totalLeads.change >= 0
                  ? "text-emerald-500"
                  : "text-red-500"
              }
            >
              <span className="flex items-center">
                {stats.totalLeads.change >= 0 ? (
                  <ArrowUp className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3" />
                )}
                {Math.abs(stats.totalLeads.change)}%
              </span>
            </span>
            <span className="ml-1">{stats.totalLeads.timeframe}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeLeads.value}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span
              className={
                stats.activeLeads.change >= 0
                  ? "text-emerald-500"
                  : "text-red-500"
              }
            >
              <span className="flex items-center">
                {stats.activeLeads.change >= 0 ? (
                  <ArrowUp className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3" />
                )}
                {Math.abs(stats.activeLeads.change)}%
              </span>
            </span>
            <span className="ml-1">{stats.activeLeads.timeframe}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Leads</CardTitle>
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.newLeads.value}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span
              className={
                stats.newLeads.change >= 0 ? "text-emerald-500" : "text-red-500"
              }
            >
              <span className="flex items-center">
                {stats.newLeads.change >= 0 ? (
                  <ArrowUp className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3" />
                )}
                {Math.abs(stats.newLeads.change)}%
              </span>
            </span>
            <span className="ml-1">{stats.newLeads.timeframe}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.qualifiedLeads.value}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span
              className={
                stats.qualifiedLeads.change >= 0
                  ? "text-emerald-500"
                  : "text-red-500"
              }
            >
              <span className="flex items-center">
                {stats.qualifiedLeads.change >= 0 ? (
                  <ArrowUp className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3" />
                )}
                {Math.abs(stats.qualifiedLeads.change)}%
              </span>
            </span>
            <span className="ml-1">{stats.qualifiedLeads.timeframe}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.conversionRate.value}</div>
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
          <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.avgResponseTime.value}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span
              className={
                stats.avgResponseTime.change <= 0
                  ? "text-emerald-500"
                  : "text-red-500"
              }
            >
              <span className="flex items-center">
                {stats.avgResponseTime.change <= 0 ? (
                  <ArrowDown className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowUp className="mr-1 h-3 w-3" />
                )}
                {Math.abs(stats.avgResponseTime.change)}%
              </span>
            </span>
            <span className="ml-1">{stats.avgResponseTime.timeframe}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Potential Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${stats.potentialValue.value.toLocaleString()}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span
              className={
                stats.potentialValue.change >= 0
                  ? "text-emerald-500"
                  : "text-red-500"
              }
            >
              <span className="flex items-center">
                {stats.potentialValue.change >= 0 ? (
                  <ArrowUp className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3" />
                )}
                {Math.abs(stats.potentialValue.change)}%
              </span>
            </span>
            <span className="ml-1">{stats.potentialValue.timeframe}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Follow-ups</CardTitle>
          <Phone className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.followUps.value}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span
              className={
                stats.followUps.change >= 0
                  ? "text-emerald-500"
                  : "text-red-500"
              }
            >
              <span className="flex items-center">
                {stats.followUps.change >= 0 ? (
                  <ArrowUp className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3" />
                )}
                {Math.abs(stats.followUps.change)}%
              </span>
            </span>
            <span className="ml-1">{stats.followUps.timeframe}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
