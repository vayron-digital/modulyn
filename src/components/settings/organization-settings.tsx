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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Building2, Globe, Image as ImageIcon, Loader2, Upload } from "lucide-react"

const organizationFormSchema = z.object({
  name: z
    .string()
    .min(2, "Organization name must be at least 2 characters")
    .max(50, "Organization name must not exceed 50 characters"),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),
  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .max(200, "Address must not exceed 200 characters")
    .optional(),
  customDomain: z
    .string()
    .regex(/^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/, "Please enter a valid domain")
    .optional()
    .or(z.literal("")),
})

type OrganizationFormValues = z.infer<typeof organizationFormSchema>

export function OrganizationSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [publicProfile, setPublicProfile] = useState(true)
  const [customEmailEnabled, setCustomEmailEnabled] = useState(false)

  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: {
      name: "ModulynEthos",
      description: "Leading real estate solutions provider",
      website: "https://modulynethos.com",
      email: "contact@modulynethos.com",
      address: "123 Business Ave, Suite 100, New York, NY 10001",
      customDomain: "",
    },
  })

  async function onSubmit(data: OrganizationFormValues) {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    console.log(data)
  }

  return (
    <div className="space-y-6">
      {/* Organization Profile */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-black_olive">Organization Profile</h3>
          <p className="text-sm text-black_olive/60">
            Manage your organization's public profile and information
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-black_olive">Public Profile</Label>
            <p className="text-sm text-black_olive/60">
              Make your organization profile visible to the public
            </p>
          </div>
          <Switch
            checked={publicProfile}
            onCheckedChange={setPublicProfile}
          />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black_olive">Organization Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter organization name"
                      className="border-timberwolf text-black_olive placeholder:text-black_olive/40"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black_olive">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter organization description"
                      className="resize-none border-timberwolf text-black_olive placeholder:text-black_olive/40"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-black_olive/60">
                    Brief description of your organization. This will be visible on your public profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black_olive">Website</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://"
                        className="border-timberwolf text-black_olive placeholder:text-black_olive/40"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black_olive">Contact Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="contact@example.com"
                        type="email"
                        className="border-timberwolf text-black_olive placeholder:text-black_olive/40"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black_olive">Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter organization address"
                      className="resize-none border-timberwolf text-black_olive placeholder:text-black_olive/40"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <Label className="text-black_olive">Organization Logo</Label>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-lg border-2 border-dashed border-timberwolf bg-floral_white flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-black_olive/40" />
                </div>
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-timberwolf text-black_olive hover:bg-timberwolf/20"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Logo
                  </Button>
                  <p className="text-xs text-black_olive/60">
                    Recommended: Square image, at least 512x512px
                  </p>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="bg-flame hover:bg-flame/90 text-white"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </Form>
      </div>

      <Separator className="bg-timberwolf" />

      {/* Custom Domain Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-black_olive">Custom Domain</h3>
          <p className="text-sm text-black_olive/60">
            Configure your organization's custom domain settings
          </p>
        </div>

        <div className="rounded-lg border border-timberwolf p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-black_olive/60" />
              <div>
                <p className="font-medium text-black_olive">Custom Domain</p>
                <p className="text-sm text-black_olive/60">Use your own domain for your organization</p>
              </div>
            </div>
            <Badge variant="outline" className="border-flame/20 bg-flame/10 text-flame">
              Enterprise
            </Badge>
          </div>

          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="customDomain"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          placeholder="your-domain.com"
                          className="border-timberwolf text-black_olive placeholder:text-black_olive/40"
                          {...field}
                        />
                        <Button
                          type="button"
                          className="bg-flame hover:bg-flame/90 text-white"
                        >
                          Verify
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription className="text-black_olive/60">
                      Enter your domain name without http:// or https://
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <Alert className="bg-timberwolf/10 border-timberwolf">
            <Building2 className="h-4 w-4 text-black_olive/60" />
            <AlertDescription className="text-black_olive/60">
              To configure your custom domain, you'll need to update your DNS records. We'll provide the necessary information after domain verification.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      <Separator className="bg-timberwolf" />

      {/* Custom Email Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-black_olive">Custom Email Domain</h3>
            <p className="text-sm text-black_olive/60">
              Send emails from your organization's domain
            </p>
          </div>
          <Switch
            checked={customEmailEnabled}
            onCheckedChange={setCustomEmailEnabled}
          />
        </div>

        {customEmailEnabled && (
          <Alert className="bg-flame/5 border-flame/20">
            <AlertDescription className="text-flame/80">
              Custom email domain is enabled. Configure your DNS settings to start sending emails from your domain.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
