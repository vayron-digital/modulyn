"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
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
  AlertTriangle,
  KeyRound,
  Lock,
  LogOut,
  Mail,
  Shield,
  Smartphone,
  UserCog,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const securityFormSchema = z.object({
  twoFactorEnabled: z.boolean().default(false),
  twoFactorMethod: z.enum(["app", "sms", "email"]).optional(),
  passwordMinLength: z.number().min(8).max(128).default(12),
  passwordExpiration: z.number().min(0).max(365).default(90),
  sessionTimeout: z.number().min(5).max(1440).default(30),
  requirePasswordChange: z.boolean().default(true),
  allowMultipleSessions: z.boolean().default(true),
  ipWhitelist: z.array(z.string()).default([]),
  loginNotifications: z.boolean().default(true),
  securityAuditLog: z.boolean().default(true),
})

type SecurityFormValues = z.infer<typeof securityFormSchema>

// Mock data for active sessions
const activeSessions = [
  {
    id: 1,
    device: "Chrome on Windows",
    location: "New York, US",
    ip: "192.168.1.1",
    lastActive: "2024-03-20 14:30:00",
    current: true,
  },
  {
    id: 2,
    device: "Safari on iPhone",
    location: "Los Angeles, US",
    ip: "192.168.1.2",
    lastActive: "2024-03-20 13:45:00",
    current: false,
  },
  {
    id: 3,
    device: "Firefox on MacOS",
    location: "London, UK",
    ip: "192.168.1.3",
    lastActive: "2024-03-20 12:15:00",
    current: false,
  },
]

// Mock data for security audit log
const auditLog = [
  {
    id: 1,
    event: "Password changed",
    timestamp: "2024-03-20 14:30:00",
    ip: "192.168.1.1",
    location: "New York, US",
  },
  {
    id: 2,
    event: "Two-factor authentication enabled",
    timestamp: "2024-03-19 10:15:00",
    ip: "192.168.1.2",
    location: "Los Angeles, US",
  },
  {
    id: 3,
    event: "New device logged in",
    timestamp: "2024-03-18 09:45:00",
    ip: "192.168.1.3",
    location: "London, UK",
  },
]

const defaultValues: Partial<SecurityFormValues> = {
  twoFactorEnabled: false,
  twoFactorMethod: "app",
  passwordMinLength: 12,
  passwordExpiration: 90,
  sessionTimeout: 30,
  requirePasswordChange: true,
  allowMultipleSessions: true,
  ipWhitelist: [],
  loginNotifications: true,
  securityAuditLog: true,
}

export function SecuritySettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues,
  })

  function onSubmit(data: SecurityFormValues) {
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
          <div>
            <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Secure your account with 2FA
                    </p>
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="twoFactorEnabled"
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

              {form.watch("twoFactorEnabled") && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      name="twoFactorMethod"
                      value="app"
                      checked={form.watch("twoFactorMethod") === "app"}
                      onChange={(e) =>
                        form.setValue("twoFactorMethod", e.target.value as any)
                      }
                      className="h-4 w-4"
                    />
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Authenticator App</p>
                        <p className="text-sm text-muted-foreground">
                          Use an authenticator app like Google Authenticator
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      name="twoFactorMethod"
                      value="sms"
                      checked={form.watch("twoFactorMethod") === "sms"}
                      onChange={(e) =>
                        form.setValue("twoFactorMethod", e.target.value as any)
                      }
                      className="h-4 w-4"
                    />
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">SMS</p>
                        <p className="text-sm text-muted-foreground">
                          Receive codes via text message
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      name="twoFactorMethod"
                      value="email"
                      checked={form.watch("twoFactorMethod") === "email"}
                      onChange={(e) =>
                        form.setValue("twoFactorMethod", e.target.value as any)
                      }
                      className="h-4 w-4"
                    />
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">
                          Receive codes via email
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Password Settings</h4>
            <p className="text-sm text-muted-foreground">
              Manage your password security preferences
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label>Change Password</Label>
                  <div className="mt-2 space-y-4">
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="New password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <Button type="button">Update Password</Button>
                  </div>
                </div>

                <Separator />

                <FormField
                  control={form.control}
                  name="passwordMinLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Password Length</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Minimum number of characters required for passwords
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordExpiration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Expiration (days)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Number of days before password expires (0 for never)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requirePasswordChange"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Require Password Change</FormLabel>
                        <FormDescription>
                          Require password change on first login
                        </FormDescription>
                      </div>
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

        <Separator />

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Session Management</h4>
            <p className="text-sm text-muted-foreground">
              Manage your active sessions and session preferences
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="sessionTimeout"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Session Timeout (minutes)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Time of inactivity before session expires
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="allowMultipleSessions"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Allow Multiple Sessions</FormLabel>
                        <FormDescription>
                          Allow multiple active sessions across different devices
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Separator />

                <div>
                  <h5 className="text-sm font-medium">Active Sessions</h5>
                  <div className="mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Device</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>IP Address</TableHead>
                          <TableHead>Last Active</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activeSessions.map((session) => (
                          <TableRow key={session.id}>
                            <TableCell>{session.device}</TableCell>
                            <TableCell>{session.location}</TableCell>
                            <TableCell>{session.ip}</TableCell>
                            <TableCell>{session.lastActive}</TableCell>
                            <TableCell>
                              {session.current ? (
                                <span className="text-sm text-muted-foreground">
                                  Current session
                                </span>
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive"
                                >
                                  <LogOut className="mr-2 h-4 w-4" />
                                  Terminate
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Additional Security</h4>
            <p className="text-sm text-muted-foreground">
              Configure additional security measures
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="loginNotifications"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Login Notifications</FormLabel>
                        <FormDescription>
                          Receive notifications for new login attempts
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="securityAuditLog"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Security Audit Log</FormLabel>
                        <FormDescription>
                          Keep a log of security-related events
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("securityAuditLog") && (
                  <div className="mt-4">
                    <h5 className="text-sm font-medium">Recent Security Events</h5>
                    <div className="mt-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Event</TableHead>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>IP Address</TableHead>
                            <TableHead>Location</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {auditLog.map((event) => (
                            <TableRow key={event.id}>
                              <TableCell>{event.event}</TableCell>
                              <TableCell>{event.timestamp}</TableCell>
                              <TableCell>{event.ip}</TableCell>
                              <TableCell>{event.location}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save security settings
        </Button>
      </form>
    </Form>
  )
}
