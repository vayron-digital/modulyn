"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    stage: "Lead",
    deals: 45,
    value: 12500000,
  },
  {
    stage: "Qualified",
    deals: 32,
    value: 8900000,
  },
  {
    stage: "Proposal",
    deals: 24,
    value: 6700000,
  },
  {
    stage: "Negotiation",
    deals: 18,
    value: 5200000,
  },
  {
    stage: "Contract",
    deals: 12,
    value: 3800000,
  },
  {
    stage: "Closed",
    deals: 8,
    value: 2400000,
  },
]

export function DealsPipeline() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="stage"
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
          tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Deals
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].payload.deals}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Value
                      </span>
                      <span className="font-bold text-muted-foreground">
                        ${(payload[0].payload.value / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Bar
          dataKey="value"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
