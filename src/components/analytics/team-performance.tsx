"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Sample data - replace with real data
const teamMembers = [
  {
    id: 1,
    name: "Sarah Wilson",
    role: "Senior Agent",
    deals: 24,
    revenue: 850000,
    target: 1000000,
    progress: 85,
    performance: [
      { month: "Jan", deals: 8, revenue: 280000 },
      { month: "Feb", deals: 6, revenue: 210000 },
      { month: "Mar", deals: 10, revenue: 360000 }
    ]
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Property Specialist",
    deals: 18,
    revenue: 620000,
    target: 800000,
    progress: 77.5,
    performance: [
      { month: "Jan", deals: 5, revenue: 180000 },
      { month: "Feb", deals: 7, revenue: 240000 },
      { month: "Mar", deals: 6, revenue: 200000 }
    ]
  },
  {
    id: 3,
    name: "Emily Brown",
    role: "Client Relations",
    deals: 15,
    revenue: 520000,
    target: 600000,
    progress: 86.7,
    performance: [
      { month: "Jan", deals: 4, revenue: 150000 },
      { month: "Feb", deals: 5, revenue: 170000 },
      { month: "Mar", deals: 6, revenue: 200000 }
    ]
  }
]

export function TeamPerformance() {
  // Combine all performance data for the chart
  const chartData = teamMembers[0].performance.map(month => {
    const data: any = { month: month.month }
    teamMembers.forEach(member => {
      const monthData = member.performance.find(p => p.month === month.month)
      data[member.name] = monthData?.revenue || 0
    })
    return data
  })

  return (
    <div className="space-y-6">
      {/* Performance Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc5b9" />
            <XAxis 
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#403d39', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#403d39', fontSize: 12 }}
              tickFormatter={value => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fffcf2',
                border: '1px solid #ccc5b9',
                borderRadius: '6px',
              }}
              formatter={(value: number) => [`$${(value / 1000).toFixed(0)}k`, 'Revenue']}
            />
            <Legend />
            {teamMembers.map((member, index) => (
              <Line
                key={member.id}
                type="monotone"
                dataKey={member.name}
                stroke={index === 0 ? "#eb5e28" : index === 1 ? "#403d39" : "#ccc5b9"}
                strokeWidth={2}
                dot={{
                  r: 4,
                  strokeWidth: 2,
                  fill: "#fff",
                }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Team Members List */}
      <div className="space-y-4">
        {teamMembers.map((member) => (
          <div 
            key={member.id}
            className="p-4 bg-floral_white rounded-lg border border-timberwolf"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`} />
                  <AvatarFallback>{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-black_olive">{member.name}</div>
                  <div className="text-sm text-black_olive/60">{member.role}</div>
                </div>
              </div>
              <Badge 
                variant="outline"
                className="border-timberwolf bg-white"
              >
                {member.deals} deals closed
              </Badge>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="text-black_olive/60">
                  ${(member.revenue / 1000).toFixed(0)}k / ${(member.target / 1000).toFixed(0)}k
                </div>
                <div className="font-medium text-black_olive">
                  {member.progress}%
                </div>
              </div>
              <Progress 
                value={member.progress} 
                className="h-2 bg-timberwolf"
                indicatorClassName="bg-flame"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
