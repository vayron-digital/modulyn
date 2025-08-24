import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MembershipTrends } from "@/components/members/analytics/membership-trends"
import { MembershipDistribution } from "@/components/members/analytics/membership-distribution"
import { RetentionRate } from "@/components/members/analytics/retention-rate"
import { EngagementMetrics } from "@/components/members/analytics/engagement-metrics"
import { Skeleton } from "@/components/ui/skeleton"

export default function MemberAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Member Analytics</h2>
        <p className="text-muted-foreground">
          Analyze member trends, engagement, and growth metrics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">
              +180 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,890</div>
            <p className="text-xs text-muted-foreground">
              80.4% of total members
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New Members (MTD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Retention Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              +2% from last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Membership Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
              <MembershipTrends />
            </Suspense>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Membership Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
              <MembershipDistribution />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
              <RetentionRate />
            </Suspense>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
              <EngagementMetrics />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
