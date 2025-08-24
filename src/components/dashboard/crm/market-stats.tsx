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
    "Average Price": 450000,
    "Days on Market": 35,
  },
  {
    month: "Feb",
    "Average Price": 460000,
    "Days on Market": 32,
  },
  {
    month: "Mar",
    "Average Price": 475000,
    "Days on Market": 30,
  },
  {
    month: "Apr",
    "Average Price": 490000,
    "Days on Market": 28,
  },
  {
    month: "May",
    "Average Price": 510000,
    "Days on Market": 25,
  },
  {
    month: "Jun",
    "Average Price": 525000,
    "Days on Market": 22,
  },
]

export function MarketStats() {
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
        <YAxis
          yAxisId="left"
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Average Price
                      </span>
                      <span className="font-bold text-muted-foreground">
                        ${(Number(payload[0].value) / 1000).toFixed(0)}k
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Days on Market
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[1].value} days
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="Average Price"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="Days on Market"
          stroke="#82ca9d"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
