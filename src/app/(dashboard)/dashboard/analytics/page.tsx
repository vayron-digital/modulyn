"use client"

import { useState } from "react"
import {
  Calendar,
  Download,
  TrendingUp,
  Users,
  DollarSign,
  Building2,
  ArrowUpRight,
  Filter
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RevenueChart } from "@/components/analytics/revenue-chart"
import { LeadConversionChart } from "@/components/analytics/lead-conversion-chart"
import { PropertyPerformance } from "@/components/analytics/property-performance"
import { MarketingROI } from "@/components/analytics/marketing-roi"
import { RegionalInsights } from "@/components/analytics/regional-insights"
import { TeamPerformance } from "@/components/analytics/team-performance"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30")
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-black_olive dark:text-white">Analytics & Insights</h2>
          <p className="text-black_olive/60 dark:text-gray-400">
            Comprehensive analytics to drive business decisions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="border-timberwolf text-black_olive hover:bg-timberwolf/20"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] bg-floral_white border-l border-timberwolf">
              <SheetHeader>
                <SheetTitle className="text-black_olive">Analytics Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* Add filter options here */}
              </div>
            </SheetContent>
          </Sheet>
          <Select
            value={dateRange}
            onValueChange={setDateRange}
          >
            <SelectTrigger className="w-[180px] border-timberwolf text-black_olive">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent className="bg-floral_white border-timberwolf">
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="border-timberwolf text-black_olive hover:bg-timberwolf/20"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white p-6 border-timberwolf">
          <div className="flex items-center justify-between">
            <div className="text-sm text-black_olive/60">Total Revenue</div>
            <DollarSign className="h-4 w-4 text-black_olive/40" />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="text-2xl font-semibold text-black_olive">$1.2M</div>
            <span className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              12%
            </span>
          </div>
          <div className="mt-2 text-sm text-black_olive/60">vs last period</div>
        </Card>

        <Card className="bg-white p-6 border-timberwolf">
          <div className="flex items-center justify-between">
            <div className="text-sm text-black_olive/60">Active Listings</div>
            <Building2 className="h-4 w-4 text-black_olive/40" />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="text-2xl font-semibold text-black_olive">342</div>
            <span className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              8%
            </span>
          </div>
          <div className="mt-2 text-sm text-black_olive/60">vs last period</div>
        </Card>

        <Card className="bg-white p-6 border-timberwolf">
          <div className="flex items-center justify-between">
            <div className="text-sm text-black_olive/60">Lead Conversion</div>
            <TrendingUp className="h-4 w-4 text-black_olive/40" />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="text-2xl font-semibold text-black_olive">18.5%</div>
            <span className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              2.3%
            </span>
          </div>
          <div className="mt-2 text-sm text-black_olive/60">vs last period</div>
        </Card>

        <Card className="bg-white p-6 border-timberwolf">
          <div className="flex items-center justify-between">
            <div className="text-sm text-black_olive/60">Active Users</div>
            <Users className="h-4 w-4 text-black_olive/40" />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="text-2xl font-semibold text-black_olive">2,847</div>
            <span className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              15%
            </span>
          </div>
          <div className="mt-2 text-sm text-black_olive/60">vs last period</div>
        </Card>
      </div>

      {/* Main Analytics Content */}
      <div className="space-y-6">
        {/* Revenue & Leads Section */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card className="bg-white p-6 border-timberwolf">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-black_olive">Revenue Trends</h3>
              <Select defaultValue="gross">
                <SelectTrigger className="w-[140px] border-timberwolf text-black_olive">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-floral_white border-timberwolf">
                  <SelectItem value="gross">Gross Revenue</SelectItem>
                  <SelectItem value="net">Net Revenue</SelectItem>
                  <SelectItem value="projected">Projected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <RevenueChart />
          </Card>

          <Card className="bg-white p-6 border-timberwolf">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-black_olive">Lead Conversion</h3>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px] border-timberwolf text-black_olive">
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent className="bg-floral_white border-timberwolf">
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <LeadConversionChart />
          </Card>
        </div>

        {/* Property & Marketing Section */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card className="bg-white p-6 border-timberwolf">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-black_olive">Property Performance</h3>
              <Select defaultValue="views">
                <SelectTrigger className="w-[140px] border-timberwolf text-black_olive">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent className="bg-floral_white border-timberwolf">
                  <SelectItem value="views">Views</SelectItem>
                  <SelectItem value="inquiries">Inquiries</SelectItem>
                  <SelectItem value="bookings">Bookings</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <PropertyPerformance />
          </Card>

          <Card className="bg-white p-6 border-timberwolf">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-black_olive">Marketing ROI</h3>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px] border-timberwolf text-black_olive">
                  <SelectValue placeholder="Select channel" />
                </SelectTrigger>
                <SelectContent className="bg-floral_white border-timberwolf">
                  <SelectItem value="all">All Channels</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <MarketingROI />
          </Card>
        </div>

        {/* Regional & Team Section */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card className="bg-white p-6 border-timberwolf">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-black_olive">Regional Insights</h3>
              <Select defaultValue="performance">
                <SelectTrigger className="w-[140px] border-timberwolf text-black_olive">
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent className="bg-floral_white border-timberwolf">
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="growth">Growth</SelectItem>
                  <SelectItem value="potential">Potential</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <RegionalInsights />
          </Card>

          <Card className="bg-white p-6 border-timberwolf">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-black_olive">Team Performance</h3>
              <Select defaultValue="deals">
                <SelectTrigger className="w-[140px] border-timberwolf text-black_olive">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent className="bg-floral_white border-timberwolf">
                  <SelectItem value="deals">Deals Closed</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="activity">Activity</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <TeamPerformance />
          </Card>
        </div>
      </div>
    </div>
  )
}
