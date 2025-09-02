"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Home, ListTodo, Mail, Plus, Search, Star, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export function UserDashboard() {
  const [selectedView, setSelectedView] = useState("all")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black_olive">Dashboard</h1>
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black_olive/40" />
          <Input 
            type="search"
            placeholder="Search transactions, customers, subscriptions"
            className="pl-9 border-0 bg-floral_white/50 text-black_olive placeholder:text-black_olive/40 focus-visible:ring-0 focus-visible:border-0"
          />
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-timberwolf/20 rounded-lg p-6">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-black_olive/60">Current MRR</h3>
            <p className="text-3xl font-semibold text-black_olive">$12.4k</p>
          </div>
        </div>
        <div className="bg-black_olive rounded-lg p-6">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-white/60">Current Customers</h3>
            <p className="text-3xl font-semibold text-white">16,601</p>
          </div>
        </div>
        <div className="bg-eerie_black rounded-lg p-6">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-white/60">Active Customers</h3>
            <p className="text-3xl font-semibold text-white">33%</p>
          </div>
        </div>
        <div className="bg-flame rounded-lg p-6">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-white/60">Churn Rate</h3>
            <p className="text-3xl font-semibold text-white">2%</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-6 md:grid-cols-7">
        {/* Left Column - Trend */}
        <div className="col-span-4 bg-white rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-black_olive">Trend</h2>
            <select className="text-sm text-black_olive/60 border-0 bg-transparent focus:ring-0">
              <option>This year</option>
              <option>Last year</option>
              <option>All time</option>
            </select>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-eerie_black" />
              <span className="text-sm text-black_olive/60">New</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-timberwolf" />
              <span className="text-sm text-black_olive/60">Renewals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-flame" />
              <span className="text-sm text-black_olive/60">Churn</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            {/* Chart will go here */}
          </div>
        </div>

        {/* Middle Column - Sales */}
        <div className="col-span-3 space-y-6">
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-black_olive">Sales</h2>
              <select className="text-sm text-black_olive/60 border-0 bg-transparent focus:ring-0">
                <option>This year</option>
                <option>Last year</option>
                <option>All time</option>
              </select>
            </div>
            <div className="relative h-[300px] flex items-center justify-center">
              {/* Donut chart will go here */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-black_olive">342</div>
                  <div className="text-sm text-black_olive/60">SALES</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-black_olive">Transactions</h2>
                <Button 
                  variant="outline"
                  size="sm"
                  className="text-black_olive/60 border-timberwolf hover:bg-floral_white"
                >
                  View all transactions
                </Button>
              </div>
              <div className="space-y-3">
                {[
                  { name: "S. Evergreen", status: "PAID", amount: "+$49" },
                  { name: "B. Sterling", status: "PENDING", amount: "+$99" },
                  { name: "O. Meadows", status: "PAID", amount: "+$19" },
                  { name: "H. Hawthorne", status: "PAID", amount: "+$19" },
                  { name: "I. Whitman", status: "ENTERPRISE", amount: "+$299" },
                  { name: "F. Frost", status: "PAID", amount: "+$19" },
                  { name: "M. Sinclair", status: "PAID", amount: "+$49" }
                ].map((transaction, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-black_olive/5 flex items-center justify-center">
                        <span className="text-xs font-medium text-black_olive">{transaction.name.split(" ").map(n => n[0]).join("")}</span>
                      </div>
                      <span className="text-sm font-medium text-black_olive">{transaction.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        transaction.status === "PAID" ? "bg-black_olive/5 text-black_olive" :
                        transaction.status === "PENDING" ? "bg-flame/10 text-flame" :
                        "bg-timberwolf/20 text-black_olive"
                      )}>
                        {transaction.status}
                      </span>
                      <span className="text-sm font-medium text-black_olive">{transaction.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Tickets & Demographics */}
      <div className="grid gap-6 md:grid-cols-7">
        <div className="col-span-4 bg-white rounded-lg p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-black_olive">Support Tickets</h2>
              <select className="text-sm text-black_olive/60 border-0 bg-transparent focus:ring-0">
                <option>This week</option>
                <option>Last week</option>
                <option>This month</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="text-black_olive bg-black_olive/5 border-0 hover:bg-black_olive/10">All</Button>
              <Button variant="outline" className="text-black_olive/60 border-0 hover:bg-black_olive/5">Open</Button>
              <Button variant="outline" className="text-black_olive/60 border-0 hover:bg-black_olive/5">Pending</Button>
              <Button variant="outline" className="text-black_olive/60 border-0 hover:bg-black_olive/5">Closed</Button>
            </div>
            <div className="space-y-4">
              {[
                { email: "jessica.smith123@example.com", issue: "Login Issue", status: "OPEN" },
                { email: "david.jones456@gmailkummy.com", issue: "Billing Inquiry", status: "PENDING" },
                { email: "emily.wilson789@ficticiousmail.net", issue: "Product Malfunction", status: "CLOSED" },
                { email: "andrew.johnson22@phonyinbox.org", issue: "Feature Request", status: "OPEN" }
              ].map((ticket, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-black_olive/5 flex items-center justify-center">
                      <span className="text-xs font-medium text-black_olive">{ticket.email[0].toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black_olive">{ticket.email}</p>
                      <p className="text-xs text-black_olive/60">{ticket.issue}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    ticket.status === "OPEN" ? "bg-flame/10 text-flame" :
                    ticket.status === "PENDING" ? "bg-black_olive/5 text-black_olive" :
                    "bg-timberwolf/20 text-black_olive/60"
                  )}>
                    {ticket.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-3 bg-white rounded-lg p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-black_olive">Customer Demographic</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-flame" />
                  <span className="text-xs text-black_olive/60">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-black_olive/20" />
                  <span className="text-xs text-black_olive/60">Inactive</span>
                </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              {/* World map will go here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
