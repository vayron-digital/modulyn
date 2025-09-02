"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Basic Plan", value: 120 },
  { name: "Pro Plan", value: 80 },
  { name: "Enterprise Plan", value: 142 },
]

const COLORS = ["#1C1C1C", "#F85C3A", "#E5E5E5"]

export function SalesChart() {
  return (
    <div className="w-full h-[300px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="circle"
            iconSize={8}
            formatter={(value, entry) => (
              <span className="text-sm text-gray-600">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute text-center">
        <div className="text-4xl font-bold text-gray-900">342</div>
        <div className="text-sm text-gray-600">Total Sales</div>
      </div>
    </div>
  )
}
