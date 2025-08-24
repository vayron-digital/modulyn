"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// This would normally come from an API
const data = [
  {
    month: "Jan",
    projected: 3200000,
    actual: 2800000,
  },
  {
    month: "Feb",
    projected: 3500000,
    actual: 3100000,
  },
  {
    month: "Mar",
    projected: 3800000,
    actual: 3600000,
  },
  {
    month: "Apr",
    projected: 4200000,
    actual: 3900000,
  },
  {
    month: "May",
    projected: 4500000,
    actual: 4300000,
  },
  {
    month: "Jun",
    projected: 4800000,
    actual: 4600000,
  },
]

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)

export function DealForecast() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">Sales Forecast</h3>
        <p className="text-sm text-muted-foreground">
          Projected vs actual sales volume
        </p>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
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
              tickFormatter={(value) => formatCurrency(value)}
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
                            Projected
                          </span>
                          <span className="font-bold">
                            {formatCurrency(payload[0].payload.projected)}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Actual
                          </span>
                          <span className="font-bold">
                            {formatCurrency(payload[0].payload.actual)}
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
              dataKey="projected"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary/30"
            />
            <Bar
              dataKey="actual"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-[0.70rem] uppercase text-muted-foreground">
            Projected Volume
          </div>
          <div className="text-2xl font-bold">
            {formatCurrency(data.reduce((acc, curr) => acc + curr.projected, 0))}
          </div>
        </div>
        <div>
          <div className="text-[0.70rem] uppercase text-muted-foreground">
            Actual Volume
          </div>
          <div className="text-2xl font-bold">
            {formatCurrency(data.reduce((acc, curr) => acc + curr.actual, 0))}
          </div>
        </div>
      </div>
    </div>
  )
}
