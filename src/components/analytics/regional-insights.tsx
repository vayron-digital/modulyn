"use client"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MapPin, TrendingUp, DollarSign } from "lucide-react"

// Sample data - replace with real data
const data = [
  {
    region: "Downtown",
    value: 35,
    revenue: 450000,
    growth: 15,
    properties: 85,
    color: "#eb5e28"
  },
  {
    region: "Suburbs",
    value: 25,
    revenue: 320000,
    growth: 8,
    properties: 120,
    color: "#403d39"
  },
  {
    region: "Waterfront",
    value: 20,
    revenue: 280000,
    growth: 12,
    properties: 45,
    color: "#ccc5b9"
  },
  {
    region: "Business District",
    value: 20,
    revenue: 250000,
    growth: 10,
    properties: 65,
    color: "#252422"
  }
]

export function RegionalInsights() {
  const totalProperties = data.reduce((acc, curr) => acc + curr.properties, 0)
  const totalRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0)
  const avgGrowth = data.reduce((acc, curr) => acc + curr.growth, 0) / data.length

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 bg-floral_white border-timberwolf">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-black_olive/40" />
            <div className="text-sm text-black_olive/60">Properties</div>
          </div>
          <div className="mt-1 text-xl font-semibold text-black_olive">
            {totalProperties}
          </div>
        </Card>
        <Card className="p-4 bg-floral_white border-timberwolf">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-black_olive/40" />
            <div className="text-sm text-black_olive/60">Revenue</div>
          </div>
          <div className="mt-1 text-xl font-semibold text-black_olive">
            ${(totalRevenue / 1000000).toFixed(1)}M
          </div>
        </Card>
        <Card className="p-4 bg-floral_white border-timberwolf">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-black_olive/40" />
            <div className="text-sm text-black_olive/60">Avg Growth</div>
          </div>
          <div className="mt-1 text-xl font-semibold text-black_olive">
            {avgGrowth.toFixed(1)}%
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Distribution Chart */}
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={entry.color}
                    strokeWidth={1}
                    stroke="#fff"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fffcf2',
                  border: '1px solid #ccc5b9',
                  borderRadius: '6px',
                }}
                formatter={(value: number) => [`${value}%`, 'Market Share']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Regional Performance */}
        <div className="space-y-4">
          {data.map((region, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium text-black_olive">{region.region}</div>
                <div className="text-sm text-black_olive/60">
                  {region.properties} properties
                </div>
              </div>
              <Progress 
                value={region.value} 
                className="h-2 bg-timberwolf"
                indicatorClassName={`bg-[${region.color}]`}
              />
              <div className="flex items-center justify-between text-sm">
                <div className="text-black_olive/60">
                  ${(region.revenue / 1000).toFixed(0)}k revenue
                </div>
                <div className="text-green-600">
                  +{region.growth}% growth
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
