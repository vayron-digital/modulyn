"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

interface NotificationSettingsProps {
  id: string
}

export function NotificationSettings({ id }: NotificationSettingsProps) {
  const [settings, setSettings] = useState({
    eventReminders: true,
    duePayments: true,
    newMessages: true,
    certificationUpdates: true,
    membershipRenewal: true,
  })

  const [reminderTiming, setReminderTiming] = useState("1-day")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally save the settings to your API
    toast.success("Your notification settings have been saved.")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Event Reminders</Label>
            <p className="text-sm text-muted-foreground">
              Receive reminders about upcoming events
            </p>
          </div>
          <Switch
            checked={settings.eventReminders}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, eventReminders: checked }))
            }
          />
        </div>

        {settings.eventReminders && (
          <div className="ml-6">
            <Label>Reminder Timing</Label>
            <Select
              value={reminderTiming}
              onValueChange={setReminderTiming}
            >
              <SelectTrigger className="w-[180px] mt-2">
                <SelectValue placeholder="Select timing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-hour">1 hour before</SelectItem>
                <SelectItem value="1-day">1 day before</SelectItem>
                <SelectItem value="2-days">2 days before</SelectItem>
                <SelectItem value="1-week">1 week before</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Due Payments</Label>
            <p className="text-sm text-muted-foreground">
              Get notified about upcoming and overdue payments
            </p>
          </div>
          <Switch
            checked={settings.duePayments}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, duePayments: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>New Messages</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications for new messages and announcements
            </p>
          </div>
          <Switch
            checked={settings.newMessages}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, newMessages: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Certification Updates</Label>
            <p className="text-sm text-muted-foreground">
              Get notified about certification status changes and requirements
            </p>
          </div>
          <Switch
            checked={settings.certificationUpdates}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({
                ...prev,
                certificationUpdates: checked,
              }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Membership Renewal</Label>
            <p className="text-sm text-muted-foreground">
              Receive reminders about membership renewal
            </p>
          </div>
          <Switch
            checked={settings.membershipRenewal}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({
                ...prev,
                membershipRenewal: checked,
              }))
            }
          />
        </div>
      </div>

      <Button type="submit">Save Settings</Button>
    </form>
  )
}
