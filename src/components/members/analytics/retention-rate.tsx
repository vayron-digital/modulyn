"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  {
    month: "Jan",
    rate: 88,
  },
  {
    month: "Feb",
    rate: 89,
  },
  {
    month: "Mar",
    rate: 90,
  },
  {
    month: "Apr",
    rate: 89,
  },
  {
    month: "May",
    rate: 91,
  },
  {
    month: "Jun",
    rate: 92,
  },
]

export function RetentionRate() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis domain={[80, 100]} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="rate"
          name="Retention Rate"
          stroke="#8884d8"
          fill="#8884d8"
          unit="%"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
