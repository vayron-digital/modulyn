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
import { Textarea } from "@/components/ui/textarea"
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Copy,
  Eye,
  EyeOff,
  Key,
  Link,
  Loader2,
  Mail,
  MessageSquare,
  Plus,
  RefreshCw,
  Settings,
  Trash,
  Webhook,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const integrationFormSchema = z.object({
  emailIntegration: z.object({
    provider: z.enum(["gmail", "outlook", "smtp"]),
    enabled: z.boolean(),
    settings: z.object({
      apiKey: z.string().optional(),
      clientId: z.string().optional(),
      clientSecret: z.string().optional(),
      server: z.string().optional(),
      port: z.string().optional(),
    }),
  }),
  calendarIntegration: z.object({
    provider: z.enum(["google", "outlook", "ical"]),
    enabled: z.boolean(),
    settings: z.object({
      apiKey: z.string().optional(),
      clientId: z.string().optional(),
      clientSecret: z.string().optional(),
    }),
  }),
  chatIntegration: z.object({
    provider: z.enum(["slack", "teams", "discord"]),
    enabled: z.boolean(),
    settings: z.object({
      webhookUrl: z.string().optional(),
      apiKey: z.string().optional(),
      channel: z.string().optional(),
    }),
  }),
  apiKeys: z.array(
    z.object({
      name: z.string(),
      key: z.string(),
      scopes: z.array(z.string()),
      expiresAt: z.string().optional(),
    })
  ),
  webhooks: z.array(
    z.object({
      url: z.string().url(),
      events: z.array(z.string()),
      active: z.boolean(),
      secret: z.string(),
    })
  ),
})

type IntegrationFormValues = z.infer<typeof integrationFormSchema>

// Mock data for integrations
const integrations = {
  email: {
    providers: [
      { id: "gmail", name: "Gmail", icon: Mail },
      { id: "outlook", name: "Outlook", icon: Mail },
      { id: "smtp", name: "Custom SMTP", icon: Mail },
    ],
  },
  calendar: {
    providers: [
      { id: "google", name: "Google Calendar", icon: MessageSquare },
      { id: "outlook", name: "Outlook Calendar", icon: MessageSquare },
      { id: "ical", name: "iCal", icon: MessageSquare },
    ],
  },
  chat: {
    providers: [
      { id: "slack", name: "Slack", icon: MessageSquare },
      { id: "teams", name: "Microsoft Teams", icon: MessageSquare },
      { id: "discord", name: "Discord", icon: MessageSquare },
    ],
  },
}

// Mock data for API keys
const apiKeys = [
  {
    id: 1,
    name: "Production API Key",
    key: "pk_live_123456789",
    scopes: ["read", "write"],
    created: "2024-03-01",
    lastUsed: "2024-03-20",
  },
  {
    id: 2,
    name: "Development API Key",
    key: "pk_test_987654321",
    scopes: ["read"],
    created: "2024-03-15",
    lastUsed: "2024-03-19",
  },
]

// Mock data for webhooks
const webhooks = [
  {
    id: 1,
    url: "https://api.example.com/webhook",
    events: ["user.created", "user.updated"],
    active: true,
    lastDelivery: "2024-03-20 14:30:00",
    success: true,
  },
  {
    id: 2,
    url: "https://api.another.com/webhook",
    events: ["deal.created", "deal.updated"],
    active: false,
    lastDelivery: "2024-03-19 15:45:00",
    success: false,
  },
]

const defaultValues: Partial<IntegrationFormValues> = {
  emailIntegration: {
    provider: "gmail",
    enabled: true,
    settings: {},
  },
  calendarIntegration: {
    provider: "google",
    enabled: true,
    settings: {},
  },
  chatIntegration: {
    provider: "slack",
    enabled: false,
    settings: {},
  },
  apiKeys: [],
  webhooks: [],
}

export function IntegrationSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({})
  const [showWebhookSecret, setShowWebhookSecret] = useState<Record<string, boolean>>({})
  const [showNewApiKey, setShowNewApiKey] = useState(false)
  const [showNewWebhook, setShowNewWebhook] = useState(false)

  const form = useForm<IntegrationFormValues>({
    resolver: zodResolver(integrationFormSchema),
    defaultValues,
  })

  function onSubmit(data: IntegrationFormValues) {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log(data)
    }, 1000)
  }

  const toggleApiKey = (id: number) => {
    setShowApiKey((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const toggleWebhookSecret = (id: number) => {
    setShowWebhookSecret((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Email Integration</h4>
            <p className="text-sm text-muted-foreground">
              Connect your email provider to send and receive emails
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email Provider</p>
                      <p className="text-sm text-muted-foreground">
                        Choose your email service provider
                      </p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="emailIntegration.enabled"
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

                {form.watch("emailIntegration.enabled") && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="emailIntegration.provider"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select email provider" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {integrations.email.providers.map((provider) => (
                                <SelectItem
                                  key={provider.id}
                                  value={provider.id}
                                >
                                  {provider.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("emailIntegration.provider") === "smtp" && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="emailIntegration.settings.server"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SMTP Server</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="smtp.example.com" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="emailIntegration.settings.port"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SMTP Port</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="587" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {(form.watch("emailIntegration.provider") === "gmail" ||
                      form.watch("emailIntegration.provider") === "outlook") && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="emailIntegration.settings.clientId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Client ID</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="emailIntegration.settings.clientSecret"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Client Secret</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="password"
                                  autoComplete="off"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Calendar Integration</h4>
            <p className="text-sm text-muted-foreground">
              Connect your calendar provider to sync events
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Calendar Provider</p>
                      <p className="text-sm text-muted-foreground">
                        Choose your calendar service provider
                      </p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="calendarIntegration.enabled"
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

                {form.watch("calendarIntegration.enabled") && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="calendarIntegration.provider"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select calendar provider" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {integrations.calendar.providers.map((provider) => (
                                <SelectItem
                                  key={provider.id}
                                  value={provider.id}
                                >
                                  {provider.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="calendarIntegration.settings.clientId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client ID</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="calendarIntegration.settings.clientSecret"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client Secret</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              autoComplete="off"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Chat Integration</h4>
            <p className="text-sm text-muted-foreground">
              Connect your chat platform for notifications
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Chat Provider</p>
                      <p className="text-sm text-muted-foreground">
                        Choose your chat platform
                      </p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="chatIntegration.enabled"
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

                {form.watch("chatIntegration.enabled") && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="chatIntegration.provider"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select chat provider" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {integrations.chat.providers.map((provider) => (
                                <SelectItem
                                  key={provider.id}
                                  value={provider.id}
                                >
                                  {provider.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="chatIntegration.settings.webhookUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Webhook URL</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="chatIntegration.settings.channel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Channel</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">API Keys</h4>
              <p className="text-sm text-muted-foreground">
                Manage API keys for external integrations
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowNewApiKey(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create API key
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Scopes</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((apiKey) => (
                    <TableRow key={apiKey.id}>
                      <TableCell>{apiKey.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <code className="rounded bg-muted px-2 py-1">
                            {showApiKey[apiKey.id]
                              ? apiKey.key
                              : "•".repeat(20)}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleApiKey(apiKey.id)}
                          >
                            {showApiKey[apiKey.id] ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(apiKey.key)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {apiKey.scopes.map((scope) => (
                            <Badge key={scope} variant="outline">
                              {scope}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{apiKey.created}</TableCell>
                      <TableCell>{apiKey.lastUsed}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Dialog open={showNewApiKey} onOpenChange={setShowNewApiKey}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create API Key</DialogTitle>
                <DialogDescription>
                  Create a new API key for external integrations
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input placeholder="API Key Name" />
                </div>
                <div className="space-y-2">
                  <Label>Scopes</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      read
                      <Check className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      write
                    </Button>
                    <Button variant="outline" size="sm">
                      delete
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Expiration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select expiration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="30d">30 days</SelectItem>
                      <SelectItem value="60d">60 days</SelectItem>
                      <SelectItem value="90d">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewApiKey(false)}>
                  Cancel
                </Button>
                <Button>Create API key</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Webhooks</h4>
              <p className="text-sm text-muted-foreground">
                Manage webhook endpoints for real-time updates
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowNewWebhook(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add webhook
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>URL</TableHead>
                    <TableHead>Events</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Delivery</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webhooks.map((webhook) => (
                    <TableRow key={webhook.id}>
                      <TableCell>
                        <code className="rounded bg-muted px-2 py-1">
                          {webhook.url}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {webhook.events.map((event) => (
                            <Badge key={event} variant="outline">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={webhook.active ? "outline" : "secondary"}
                        >
                          {webhook.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {webhook.lastDelivery}
                          <Badge
                            variant={webhook.success ? "outline" : "destructive"}
                          >
                            {webhook.success ? "Success" : "Failed"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Dialog open={showNewWebhook} onOpenChange={setShowNewWebhook}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Webhook</DialogTitle>
                <DialogDescription>
                  Create a new webhook endpoint for real-time updates
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Endpoint URL</Label>
                  <Input placeholder="https://api.example.com/webhook" />
                </div>
                <div className="space-y-2">
                  <Label>Events</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      user.created
                      <Check className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      user.updated
                    </Button>
                    <Button variant="outline" size="sm">
                      deal.created
                    </Button>
                    <Button variant="outline" size="sm">
                      deal.updated
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Secret</Label>
                  <Input type="password" />
                  <p className="text-sm text-muted-foreground">
                    This secret will be used to sign webhook payloads
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewWebhook(false)}>
                  Cancel
                </Button>
                <Button>Add webhook</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save integration settings
        </Button>
      </form>
    </Form>
  )
}
