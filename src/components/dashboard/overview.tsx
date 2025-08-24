"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import { useAuthStore } from "@/lib/store"

function useOverviewData() {
  const user = useAuthStore((state) => state.user)

  return useQuery({
    queryKey: ['overview', user?.organizationId],
    queryFn: async () => {
      const today = new Date()
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(today.getMonth() - 6)

      // Get monthly revenue, members, and events for the past 6 months
      const { data, error } = await supabase
        .from('business_metrics')
        .select('*')
        .eq('tenant_id', user?.organizationId)
        .eq('category', 'revenue')
        .gte('period_start', sixMonthsAgo.toISOString())
        .lte('period_end', today.toISOString())
        .order('period_start', { ascending: true })

      if (error) throw error

      // Transform data into chart format
      return data.map((metric) => ({
        revenue: Math.round(metric.metric_value / 1000), // Convert to thousands
        members: metric.comparison_value || 0,
        events: metric.metadata?.events_count || 0,
      }))
    },
    enabled: !!user?.organizationId,
  })
}

export function Overview() {
  const { data, isLoading } = useOverviewData()

  if (isLoading) {
    return (
      <div className="flex h-[350px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data || []}>
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
                        ${payload[0].value}k
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
