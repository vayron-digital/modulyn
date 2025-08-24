"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Camera, Loader2 } from "lucide-react"

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z
    .string()
    .min(1, { message: "This field is required." })
    .email("This is not a valid email."),
  bio: z.string().max(160).min(4),
  phone: z.string().min(10).max(15).optional(),
  title: z.string().min(2).max(50),
  timezone: z.string(),
  language: z.string(),
  marketingEmails: z.boolean().default(false),
  socialEmails: z.boolean().default(false),
  securityEmails: z.boolean().default(true),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This would normally come from an API
const defaultValues: Partial<ProfileFormValues> = {
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  bio: "Real estate professional with 5+ years of experience in luxury properties and commercial real estate.",
  phone: "(555) 123-4567",
  title: "Senior Real Estate Agent",
  timezone: "America/New_York",
  language: "en",
  marketingEmails: true,
  socialEmails: true,
  securityEmails: true,
}

export function ProfileSettings() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log(data)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <div className="flex flex-col gap-8 md:flex-row">
        <Card className="md:w-[300px]">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avatars/svg?seed=Sarah"
                    alt="Sarah Johnson"
                  />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center">
                <h4 className="text-base font-medium">Sarah Johnson</h4>
                <p className="text-sm text-muted-foreground">
                  Senior Real Estate Agent
                </p>
              </div>
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Member since</span>
                  <span>Jan 2024</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">License #</span>
                  <span>RE123456</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-success">Active</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1 space-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your primary contact email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Brief description for your profile.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Your job title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timezone</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a timezone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="America/New_York">
                            Eastern Time (ET)
                          </SelectItem>
                          <SelectItem value="America/Chicago">
                            Central Time (CT)
                          </SelectItem>
                          <SelectItem value="America/Denver">
                            Mountain Time (MT)
                          </SelectItem>
                          <SelectItem value="America/Los_Angeles">
                            Pacific Time (PT)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Email Notifications</h4>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="marketingEmails"
                    render={({ field }) => (
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label className="text-base">Marketing emails</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about new products, features, and more.
                          </p>
                        </div>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="socialEmails"
                    render={({ field }) => (
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label className="text-base">Social emails</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails for friend requests, follows, and more.
                          </p>
                        </div>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="securityEmails"
                    render={({ field }) => (
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label className="text-base">Security emails</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about your account activity and security.
                          </p>
                        </div>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled
                        />
                      </div>
                    )}
                  />
                </div>
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update profile
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
