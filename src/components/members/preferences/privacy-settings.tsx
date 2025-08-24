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

interface PrivacySettingsProps {
  id: string
}

export function PrivacySettings({ id }: PrivacySettingsProps) {
  const [settings, setSettings] = useState({
    profileVisibility: "members",
    showEmail: true,
    showPhone: false,
    showCertifications: true,
    allowMessaging: true,
    dataSharing: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally save the settings to your API
    toast.success("Your privacy settings have been saved.")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Profile Visibility</Label>
          <Select
            value={settings.profileVisibility}
            onValueChange={(value) =>
              setSettings((prev) => ({ ...prev, profileVisibility: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="members">Members Only</SelectItem>
              <SelectItem value="connections">Connections Only</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Control who can view your profile information
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Show Email Address</Label>
            <p className="text-sm text-muted-foreground">
              Display your email address on your profile
            </p>
          </div>
          <Switch
            checked={settings.showEmail}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, showEmail: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Show Phone Number</Label>
            <p className="text-sm text-muted-foreground">
              Display your phone number on your profile
            </p>
          </div>
          <Switch
            checked={settings.showPhone}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, showPhone: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Show Certifications</Label>
            <p className="text-sm text-muted-foreground">
              Display your certifications and achievements
            </p>
          </div>
          <Switch
            checked={settings.showCertifications}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({
                ...prev,
                showCertifications: checked,
              }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Allow Direct Messaging</Label>
            <p className="text-sm text-muted-foreground">
              Let other members send you direct messages
            </p>
          </div>
          <Switch
            checked={settings.allowMessaging}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, allowMessaging: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Data Sharing</Label>
            <p className="text-sm text-muted-foreground">
              Share your data with trusted partners for industry insights
            </p>
          </div>
          <Switch
            checked={settings.dataSharing}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, dataSharing: checked }))
            }
          />
        </div>
      </div>

      <Button type="submit">Save Settings</Button>
    </form>
  )
}
