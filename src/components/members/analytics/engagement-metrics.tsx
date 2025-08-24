"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const data = [
  {
    name: "Events",
    attended: 65,
    registered: 85,
  },
  {
    name: "Webinars",
    attended: 75,
    registered: 90,
  },
  {
    name: "Workshops",
    attended: 45,
    registered: 60,
  },
  {
    name: "Meetings",
    attended: 55,
    registered: 70,
  },
]

export function EngagementMetrics() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="registered"
          name="Registered"
          fill="#8884d8"
          unit="%"
        />
        <Bar
          dataKey="attended"
          name="Attended"
          fill="#82ca9d"
          unit="%"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
