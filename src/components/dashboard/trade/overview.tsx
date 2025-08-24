"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    month: "Jan",
    revenue: 4000,
    members: 240,
    events: 8,
  },
  {
    month: "Feb",
    revenue: 3000,
    members: 139,
    events: 5,
  },
  {
    month: "Mar",
    revenue: 2000,
    members: 980,
    events: 12,
  },
  {
    month: "Apr",
    revenue: 2780,
    members: 390,
    events: 9,
  },
  {
    month: "May",
    revenue: 1890,
    members: 480,
    events: 7,
  },
  {
    month: "Jun",
    revenue: 2390,
    members: 380,
    events: 11,
  },
  {
    month: "Jul",
    revenue: 3490,
    members: 430,
    events: 14,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Revenue
                      </span>
                      <span className="font-bold text-muted-foreground">
                        ${payload[0].value}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Members
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[1].value}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="revenue"
          activeDot={{
            r: 6,
            style: { fill: "var(--theme-primary)", opacity: 0.8 },
          }}
          style={{
            stroke: "var(--theme-primary)",
            opacity: 0.8,
          }}
        />
        <Line
          type="monotone"
          dataKey="members"
          strokeWidth={2}
          activeDot={{
            r: 8,
            style: { fill: "var(--theme-secondary)" },
          }}
          style={{
            stroke: "var(--theme-secondary)",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
