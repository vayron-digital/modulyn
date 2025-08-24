'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAuthStore } from '@/lib/store'
import { updateOrganization } from '@/lib/supabase'

const organizationFormSchema = z.object({
  name: z.string().min(2, 'Organization name must be at least 2 characters'),
  type: z.string().min(2, 'Organization type must be at least 2 characters'),
  billingEmail: z.string().email('Invalid email address'),
  address: z.object({
    street: z.string().min(2, 'Street must be at least 2 characters'),
    city: z.string().min(2, 'City must be at least 2 characters'),
    state: z.string().min(2, 'State must be at least 2 characters'),
    zipCode: z.string().min(5, 'ZIP code must be at least 5 characters'),
    country: z.string().min(2, 'Country must be at least 2 characters'),
  }),
})

type OrganizationFormData = z.infer<typeof organizationFormSchema>

export function OrganizationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const organization = useAuthStore((state) => state.organization)
  const setOrganization = useAuthStore((state) => state.setOrganization)

  const form = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: {
      name: organization?.name || '',
      type: organization?.type || '',
      billingEmail: organization?.billingEmail || '',
      address: {
        street: organization?.address?.street || '',
        city: organization?.address?.city || '',
        state: organization?.address?.state || '',
        zipCode: organization?.address?.zipCode || '',
        country: organization?.address?.country || '',
      },
    },
  })

  async function onSubmit(data: OrganizationFormData) {
    if (!organization?.id) return

    try {
      setIsLoading(true)
      const { data: updatedOrg, error } = await updateOrganization(
        organization.id,
        {
          name: data.name,
          type: data.type,
          billing_email: data.billingEmail,
          address: data.address,
        }
      )

      if (error) throw error

      if (updatedOrg) {
        setOrganization({
          ...organization,
          name: updatedOrg.name,
          type: updatedOrg.type,
          billingEmail: updatedOrg.billing_email,
          address: updatedOrg.address,
        })
        toast.success('Organization updated successfully')
      }
    } catch (error) {
      toast.error('Failed to update organization')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Type</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="billingEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billing Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Address</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Textarea {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP Code</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  )
}
