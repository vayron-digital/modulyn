'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { OrganizationForm } from '@/components/shared/organization-form'

export default function OrganizationSettingsPage() {
  return (
    <div className="container space-y-8 py-8">
      <h1 className="text-3xl font-bold">Organization Settings</h1>
      
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Organization Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <OrganizationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
