"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const data = [
  {
    month: "Jan",
    total: 1800,
    active: 1500,
    new: 150,
  },
  {
    month: "Feb",
    total: 1900,
    active: 1600,
    new: 180,
  },
  {
    month: "Mar",
    total: 2050,
    active: 1700,
    new: 200,
  },
  {
    month: "Apr",
    total: 2150,
    active: 1800,
    new: 160,
  },
  {
    month: "May",
    total: 2250,
    active: 1850,
    new: 190,
  },
  {
    month: "Jun",
    total: 2350,
    active: 1890,
    new: 245,
  },
]

export function MembershipTrends() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="total"
          name="Total Members"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="active"
          name="Active Members"
          stroke="#82ca9d"
        />
        <Line
          type="monotone"
          dataKey="new"
          name="New Members"
          stroke="#ffc658"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
