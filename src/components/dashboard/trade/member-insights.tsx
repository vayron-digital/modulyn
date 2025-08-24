"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Professional", value: 45 },
  { name: "Enterprise", value: 30 },
  { name: "Basic", value: 25 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

export function MemberInsights() {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => 
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
