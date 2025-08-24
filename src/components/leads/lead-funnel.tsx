"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// This would normally come from an API
const data = [
  {
    stage: "New Leads",
    count: 120,
    color: "#2563eb", // blue-600
  },
  {
    stage: "Contacted",
    count: 85,
    color: "#7c3aed", // violet-600
  },
  {
    stage: "Qualified",
    count: 64,
    color: "#9333ea", // purple-600
  },
  {
    stage: "Proposal",
    count: 42,
    color: "#c026d3", // fuchsia-600
  },
  {
    stage: "Negotiation",
    count: 28,
    color: "#db2777", // pink-600
  },
  {
    stage: "Closed",
    count: 15,
    color: "#16a34a", // green-600
  },
]

export function LeadFunnel() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">Lead Funnel</h3>
        <p className="text-sm text-muted-foreground">
          Conversion stages from lead to close
        </p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="stage"
              hide
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Stage
                          </span>
                          <span className="font-bold">
                            {payload[0].payload.stage}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Count
                          </span>
                          <span className="font-bold">
                            {payload[0].payload.count}
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
              dataKey="count"
              radius={[4, 4, 4, 4]}
              fill="currentColor"
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
        {data.map((stage) => (
          <div key={stage.stage} className="space-y-1">
            <div
              className="h-1.5 w-full rounded-lg"
              style={{ backgroundColor: stage.color }}
            />
            <div className="text-[0.70rem] uppercase text-muted-foreground">
              {stage.stage}
            </div>
            <div className="text-xl font-bold">{stage.count}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
