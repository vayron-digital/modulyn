"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Bell,
  Mail,
  MessageSquare,
  Calendar,
  Building2,
  Home,
  Users,
  FileText,
  DollarSign,
  AlertTriangle,
  Smartphone,
  Globe,
  Loader2,
} from "lucide-react"

const notificationFormSchema = z.object({
  emailDigest: z.enum(["none", "daily", "weekly", "monthly"], {
    required_error: "Please select an email digest frequency.",
  }),
  pushNotifications: z.boolean().default(true),
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  browserNotifications: z.boolean().default(true),
  notifyOn: z.object({
    newMessages: z.boolean().default(true),
    newLeads: z.boolean().default(true),
    taskAssignments: z.boolean().default(true),
    taskDue: z.boolean().default(true),
    propertyUpdates: z.boolean().default(true),
    dealUpdates: z.boolean().default(true),
    teamUpdates: z.boolean().default(true),
    systemUpdates: z.boolean().default(true),
  }),
  quietHours: z.object({
    enabled: z.boolean().default(false),
    start: z.string().optional(),
    end: z.string().optional(),
  }),
})

type NotificationFormValues = z.infer<typeof notificationFormSchema>

// This would normally come from an API
const defaultValues: Partial<NotificationFormValues> = {
  emailDigest: "weekly",
  pushNotifications: true,
  emailNotifications: true,
  smsNotifications: false,
  browserNotifications: true,
  notifyOn: {
    newMessages: true,
    newLeads: true,
    taskAssignments: true,
    taskDue: true,
    propertyUpdates: true,
    dealUpdates: true,
    teamUpdates: true,
    systemUpdates: true,
  },
  quietHours: {
    enabled: false,
    start: "22:00",
    end: "07:00",
  },
}

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues,
  })

  function onSubmit(data: NotificationFormValues) {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log(data)
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Notification Channels</h4>
              <p className="text-sm text-muted-foreground">
                Choose how you want to receive notifications.
              </p>
            </div>
            <FormField
              control={form.control}
              name="emailDigest"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Email digest frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">No digest</SelectItem>
                      <SelectItem value="daily">Daily digest</SelectItem>
                      <SelectItem value="weekly">Weekly digest</SelectItem>
                      <SelectItem value="monthly">Monthly digest</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications on your devices
                      </p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="pushNotifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications
                      </p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive SMS notifications
                      </p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="smsNotifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Browser Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Show browser notifications
                      </p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="browserNotifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Notification Types</h4>
            <p className="text-sm text-muted-foreground">
              Select which activities you want to be notified about.
            </p>
          </div>

          <div className="grid gap-4">
            <Card>
              <CardContent className="grid gap-6 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label>New Messages</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when you receive new messages
                      </p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="notifyOn.newMessages"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label>New Leads</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when new leads are assigned to you
                      </p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="notifyOn.newLeads"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label>Task Assignments</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when tasks are assigned to you
                      </p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="notifyOn.taskAssignments"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label>Task Due Dates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when tasks are due
                      </p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="notifyOn.taskDue"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Home className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label>Property Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about property changes
                      </p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="notifyOn.propertyUpdates"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label>Deal Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about deal status changes
                      </p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="notifyOn.dealUpdates"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label>Team Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about team activities
                      </p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="notifyOn.teamUpdates"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label>System Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about system updates
                      </p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="notifyOn.systemUpdates"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Quiet Hours</h4>
            <p className="text-sm text-muted-foreground">
              Set times when you don't want to receive notifications.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Quiet Hours</Label>
                  <p className="text-sm text-muted-foreground">
                    Mute notifications during specific hours
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="quietHours.enabled"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {form.watch("quietHours.enabled") && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="quietHours.start"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <input
                            type="time"
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="quietHours.end"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                          <input
                            type="time"
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save preferences
        </Button>
      </form>
    </Form>
  )
}
