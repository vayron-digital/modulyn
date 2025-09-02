"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from "recharts"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample data - replace with real data
const data = [
  {
    channel: "Social Media",
    spend: 5000,
    revenue: 15000,
    roi: 200,
    leads: 120
  },
  {
    channel: "Email",
    spend: 2000,
    revenue: 12000,
    roi: 500,
    leads: 85
  },
  {
    channel: "SEO",
    spend: 3000,
    revenue: 18000,
    roi: 500,
    leads: 150
  },
  {
    channel: "PPC",
    spend: 8000,
    revenue: 25000,
    roi: 212.5,
    leads: 200
  },
  {
    channel: "Content",
    spend: 4000,
    revenue: 16000,
    roi: 300,
    leads: 110
  }
]

export function MarketingROI() {
  const totalSpend = data.reduce((acc, curr) => acc + curr.spend, 0)
  const totalRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0)
  const totalROI = ((totalRevenue - totalSpend) / totalSpend) * 100
  const totalLeads = data.reduce((acc, curr) => acc + curr.leads, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-floral_white border-timberwolf">
          <div className="text-sm text-black_olive/60">Total Spend</div>
          <div className="mt-1 text-xl font-semibold text-black_olive">
            ${totalSpend.toLocaleString()}
          </div>
        </Card>
        <Card className="p-4 bg-floral_white border-timberwolf">
          <div className="text-sm text-black_olive/60">Total Revenue</div>
          <div className="mt-1 text-xl font-semibold text-black_olive">
            ${totalRevenue.toLocaleString()}
          </div>
        </Card>
        <Card className="p-4 bg-floral_white border-timberwolf">
          <div className="text-sm text-black_olive/60">Overall ROI</div>
          <div className="mt-1 text-xl font-semibold text-black_olive">
            {totalROI.toFixed(1)}%
          </div>
        </Card>
        <Card className="p-4 bg-floral_white border-timberwolf">
          <div className="text-sm text-black_olive/60">Total Leads</div>
          <div className="mt-1 text-xl font-semibold text-black_olive">
            {totalLeads}
          </div>
        </Card>
      </div>

      {/* ROI Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc5b9" />
            <XAxis 
              dataKey="channel"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#403d39', fontSize: 12 }}
            />
            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#403d39', fontSize: 12 }}
              tickFormatter={value => `$${value / 1000}k`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#403d39', fontSize: 12 }}
              tickFormatter={value => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fffcf2',
                border: '1px solid #ccc5b9',
                borderRadius: '6px',
              }}
              formatter={(value: any, name: string) => {
                if (name === "ROI") return [`${value}%`, name]
                return [`$${value.toLocaleString()}`, name]
              }}
            />
            <Legend />
            <Bar 
              dataKey="spend" 
              fill="#ccc5b9" 
              yAxisId="left"
              name="Spend"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="revenue" 
              fill="#eb5e28" 
              yAxisId="left"
              name="Revenue"
              radius={[4, 4, 0, 0]}
            />
                         <ReferenceLine
               y={0}
               yAxisId="left"
               stroke="#403d39"
               strokeDasharray="3 3"
             />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Channel Performance */}
      <div className="space-y-3">
        {data.map((channel, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 bg-floral_white rounded-lg border border-timberwolf"
          >
            <div>
              <div className="font-medium text-black_olive">{channel.channel}</div>
              <div className="text-sm text-black_olive/60">
                {channel.leads} leads generated
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge 
                variant="outline"
                className="border-timberwolf bg-white"
              >
                ${channel.spend.toLocaleString()} spent
              </Badge>
              <Badge 
                className="bg-flame/10 text-flame border-0"
              >
                {channel.roi}% ROI
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
