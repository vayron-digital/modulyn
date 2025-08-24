import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CommunicationPreferences } from "@/components/members/preferences/communication-preferences"
import { NotificationSettings } from "@/components/members/preferences/notification-settings"
import { PrivacySettings } from "@/components/members/preferences/privacy-settings"

interface MemberPreferencesPageProps {
  params: {
    id: string
  }
}

export default function MemberPreferencesPage({
  params,
}: MemberPreferencesPageProps) {
  if (!params.id) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Communication Preferences
        </h2>
        <p className="text-muted-foreground">
          Manage how we communicate with you and what information you receive.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Email Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <CommunicationPreferences id={params.id} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <NotificationSettings id={params.id} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <PrivacySettings id={params.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
