import { Suspense } from "react"
import { notFound } from "next/navigation"
import { MemberProfile } from "@/components/members/member-profile"
import { MemberActivity } from "@/components/members/member-activity"
import { MemberCertifications } from "@/components/members/member-certifications"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MemberPageProps {
  params: {
    id: string
  }
}

export default function MemberPage({ params }: MemberPageProps) {
  if (!params.id) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <div className="space-y-4">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-32 w-full" />
          </div>
        }
      >
        <MemberProfile id={params.id} />
      </Suspense>

      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="space-y-4">
          <Suspense
            fallback={
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            }
          >
            <MemberActivity id={params.id} />
          </Suspense>
        </TabsContent>
        <TabsContent value="certifications" className="space-y-4">
          <Suspense
            fallback={
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            }
          >
            <MemberCertifications id={params.id} />
          </Suspense>
        </TabsContent>
        <TabsContent value="events">
          <div className="text-sm text-muted-foreground">
            Event history will be implemented soon.
          </div>
        </TabsContent>
        <TabsContent value="billing">
          <div className="text-sm text-muted-foreground">
            Billing history will be implemented soon.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
