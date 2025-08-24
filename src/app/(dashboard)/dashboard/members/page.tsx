import { Suspense } from "react"
import { MemberList } from "@/components/members/member-list"
import { MemberFilters } from "@/components/members/member-filters"
import { MemberActions } from "@/components/members/member-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function MembersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Members</h2>
          <p className="text-muted-foreground">
            Manage your organization's members and their profiles.
          </p>
        </div>
        <MemberActions />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Member Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <MemberFilters />
            <Suspense
              fallback={
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              }
            >
              <MemberList />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
