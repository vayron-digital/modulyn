"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  UserCheck,
  UserPlus,
  Building2,
  Handshake,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

// This would normally come from an API
const stats = {
  totalContacts: {
    value: 1248,
    change: 12.5,
    timeframe: "from last month",
  },
  activeClients: {
    value: 342,
    change: 8.2,
    timeframe: "from last month",
  },
  newLeads: {
    value: 64,
    change: -2.8,
    timeframe: "from last month",
  },
  vendors: {
    value: 86,
    change: 1.5,
    timeframe: "from last month",
  },
  partners: {
    value: 28,
    change: 4.2,
    timeframe: "from last month",
  },
}

export function ContactStats() {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalContacts.value}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span
              className={
                stats.totalContacts.change >= 0
                  ? "text-emerald-500"
                  : "text-red-500"
              }
            >
              <span className="flex items-center">
                {stats.totalContacts.change >= 0 ? (
                  <ArrowUp className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3" />
                )}
                {Math.abs(stats.totalContacts.change)}%
              </span>
            </span>
            <span className="ml-1">{stats.totalContacts.timeframe}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeClients.value}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span
              className={
                stats.activeClients.change >= 0
                  ? "text-emerald-500"
                  : "text-red-500"
              }
            >
              <span className="flex items-center">
                {stats.activeClients.change >= 0 ? (
                  <ArrowUp className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3" />
                )}
                {Math.abs(stats.activeClients.change)}%
              </span>
            </span>
            <span className="ml-1">{stats.activeClients.timeframe}</span>
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
          <CardTitle className="text-sm font-medium">Vendors</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.vendors.value}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span
              className={
                stats.vendors.change >= 0 ? "text-emerald-500" : "text-red-500"
              }
            >
              <span className="flex items-center">
                {stats.vendors.change >= 0 ? (
                  <ArrowUp className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3" />
                )}
                {Math.abs(stats.vendors.change)}%
              </span>
            </span>
            <span className="ml-1">{stats.vendors.timeframe}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Partners</CardTitle>
          <Handshake className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.partners.value}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span
              className={
                stats.partners.change >= 0 ? "text-emerald-500" : "text-red-500"
              }
            >
              <span className="flex items-center">
                {stats.partners.change >= 0 ? (
                  <ArrowUp className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3" />
                )}
                {Math.abs(stats.partners.change)}%
              </span>
            </span>
            <span className="ml-1">{stats.partners.timeframe}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
