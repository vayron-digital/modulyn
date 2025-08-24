import * as z from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const registerSchema = z.object({
  organizationName: z.string().min(2, 'Organization name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  membershipType: z.enum(['basic', 'professional', 'enterprise']),
})

export const organizationSchema = z.object({
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

export const eventSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  startDate: z.date(),
  endDate: z.date(),
  venue: z.string().min(2, 'Venue must be at least 2 characters'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  price: z.number().min(0, 'Price must be at least 0'),
  registrationDeadline: z.date(),
})
