"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface CommunicationPreferencesProps {
  id: string
}

export function CommunicationPreferences({ id }: CommunicationPreferencesProps) {
  const [emailFormat, setEmailFormat] = useState("html")
  const [preferences, setPreferences] = useState({
    newsletters: true,
    events: true,
    updates: true,
    surveys: true,
    promotions: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally save the preferences to your API
    toast.success("Your communication preferences have been saved.")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-3">Email Format</h4>
          <RadioGroup
            value={emailFormat}
            onValueChange={setEmailFormat}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="html" id="html" />
              <Label htmlFor="html">HTML (rich text)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="plain" id="plain" />
              <Label htmlFor="plain">Plain text</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h4 className="font-medium mb-3">Email Subscriptions</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="newsletters"
                checked={preferences.newsletters}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({
                    ...prev,
                    newsletters: checked as boolean,
                  }))
                }
              />
              <Label htmlFor="newsletters">
                Monthly newsletters and industry updates
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="events"
                checked={preferences.events}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({
                    ...prev,
                    events: checked as boolean,
                  }))
                }
              />
              <Label htmlFor="events">
                Event announcements and invitations
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="updates"
                checked={preferences.updates}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({
                    ...prev,
                    updates: checked as boolean,
                  }))
                }
              />
              <Label htmlFor="updates">
                Association updates and announcements
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="surveys"
                checked={preferences.surveys}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({
                    ...prev,
                    surveys: checked as boolean,
                  }))
                }
              />
              <Label htmlFor="surveys">
                Surveys and feedback requests
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="promotions"
                checked={preferences.promotions}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({
                    ...prev,
                    promotions: checked as boolean,
                  }))
                }
              />
              <Label htmlFor="promotions">
                Partner promotions and special offers
              </Label>
            </div>
          </div>
        </div>
      </div>

      <Button type="submit">Save Preferences</Button>
    </form>
  )
}
