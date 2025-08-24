"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

// This would normally come from an API
const data = [
  {
    name: "Website",
    value: 45,
    color: "#2563eb", // blue-600
  },
  {
    name: "Referral",
    value: 25,
    color: "#16a34a", // green-600
  },
  {
    name: "Zillow",
    value: 15,
    color: "#9333ea", // purple-600
  },
  {
    name: "Social Media",
    value: 8,
    color: "#db2777", // pink-600
  },
  {
    name: "Open House",
    value: 5,
    color: "#ea580c", // orange-600
  },
  {
    name: "Other",
    value: 2,
    color: "#64748b", // slate-600
  },
]

export function LeadSources() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">Lead Sources</h3>
        <p className="text-sm text-muted-foreground">
          Distribution of leads by source
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                innerRadius="60%"
                paddingAngle={2}
                strokeWidth={2}
                stroke="hsl(var(--background))"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Source
                            </span>
                            <span className="font-bold">
                              {payload[0].name}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Percentage
                            </span>
                            <span className="font-bold">
                              {payload[0].value}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {data.map((source) => (
            <div key={source.name} className="space-y-1">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: source.color }}
                />
                <div className="text-sm font-medium">{source.name}</div>
              </div>
              <div className="text-2xl font-bold">{source.value}%</div>
              <div className="text-[0.70rem] uppercase text-muted-foreground">
                of total leads
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
