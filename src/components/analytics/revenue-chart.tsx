"use client"

import { useMemo } from "react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts"

// Sample data - replace with real data
const data = [
  { date: "Jan", revenue: 65000, projected: 62000 },
  { date: "Feb", revenue: 72000, projected: 70000 },
  { date: "Mar", revenue: 85000, projected: 80000 },
  { date: "Apr", revenue: 93000, projected: 88000 },
  { date: "May", revenue: 102000, projected: 98000 },
  { date: "Jun", revenue: 115000, projected: 110000 },
  { date: "Jul", revenue: 125000, projected: 120000 },
  { date: "Aug", revenue: 132000, projected: 128000 },
  { date: "Sep", revenue: 142000, projected: 138000 },
  { date: "Oct", revenue: 155000, projected: 148000 },
  { date: "Nov", revenue: 162000, projected: 158000 },
  { date: "Dec", revenue: 178000, projected: 170000 },
]

export function RevenueChart() {
  const chartData = useMemo(() => {
    return data.map(item => ({
      ...item,
      revenue: item.revenue / 1000, // Convert to K
      projected: item.projected / 1000
    }))
  }, [])

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#eb5e28" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#eb5e28" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="projected" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#403d39" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#403d39" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#403d39', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#403d39', fontSize: 12 }}
            tickFormatter={value => `$${value}K`}
          />
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#ccc5b9" 
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fffcf2',
              border: '1px solid #ccc5b9',
              borderRadius: '6px',
            }}
            formatter={(value: number) => [`$${value}K`, 'Revenue']}
          />
          <Area
            type="monotone"
            dataKey="projected"
            stroke="#403d39"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#projected)"
            dot={false}
            strokeDasharray="3 3"
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#eb5e28"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#revenue)"
            dot={{
              stroke: '#eb5e28',
              strokeWidth: 2,
              fill: '#fff',
              r: 4,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
