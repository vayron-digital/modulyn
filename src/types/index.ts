export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "admin" | "user"
  organizationId?: string
  profileImage?: string
  phone?: string
  createdAt: Date
  updatedAt: Date
}

export interface Member {
  id: string
  organizationId: string
  email: string
  firstName: string
  lastName: string
  role: "admin" | "member"
  membershipType: string
  memberSince: Date
  subscriptionStatus: "active" | "expired" | "pending"
  profileImage?: string
  phone?: string
  certifications: string[]
  specializations: string[]
  committees: string[]
}

export interface Organization {
  id: string
  name: string
  type: string
  billingEmail: string
  address: Address
  subscriptionTier: string
  industry: string
  size: string
  foundedYear: number
  website: string
  socialMedia: SocialMedia
  primaryContact: Contact
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface SocialMedia {
  linkedin?: string
  twitter?: string
  facebook?: string
  instagram?: string
}

export interface Contact {
  name: string
  email: string
  phone: string
  role: string
}

export interface Event {
  id: string
  organizationId: string
  title: string
  description: string
  startDate: Date
  endDate: Date
  venue: string
  capacity: number
  price: number
  registrationDeadline: Date
  type: "conference" | "webinar" | "workshop" | "networking"
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  speakers: Speaker[]
  agenda: AgendaItem[]
  registrations: Registration[]
}

export interface Speaker {
  id: string
  name: string
  bio: string
  company: string
  role: string
  image?: string
  topics: string[]
}

export interface AgendaItem {
  id: string
  title: string
  description: string
  startTime: Date
  endTime: Date
  speakers: string[]
  location: string
  type: "keynote" | "session" | "workshop" | "break"
}

export interface Registration {
  id: string
  eventId: string
  memberId: string
  status: "confirmed" | "cancelled" | "waitlist"
  paymentStatus: "paid" | "pending" | "refunded"
  registrationDate: Date
  ticketType: string
  amount: number
}

export interface Certification {
  id: string
  name: string
  description: string
  validityPeriod: number
  requirements: string[]
  status: "active" | "archived"
  createdAt: Date
  updatedAt: Date
}

export interface CertificationProgress {
  id: string
  memberId: string
  certificationId: string
  status: "in_progress" | "completed" | "expired"
  completedRequirements: string[]
  startDate: Date
  completionDate?: Date
  expiryDate?: Date
}

export interface LegislativeItem {
  id: string
  title: string
  description: string
  status: "proposed" | "active" | "passed" | "rejected"
  category: string
  impactLevel: "high" | "medium" | "low"
  relevantSectors: string[]
  documents: Document[]
  updates: LegislativeUpdate[]
}

export interface LegislativeUpdate {
  id: string
  legislativeItemId: string
  date: Date
  description: string
  status: string
  source: string
}

export interface Document {
  id: string
  title: string
  type: string
  url: string
  uploadedBy: string
  uploadedAt: Date
  size: number
  format: string
}

export interface Campaign {
  id: string
  title: string
  description: string
  status: "draft" | "scheduled" | "active" | "completed"
  type: "email" | "survey" | "advocacy"
  targetAudience: string[]
  startDate: Date
  endDate?: Date
  metrics: CampaignMetrics
}

export interface CampaignMetrics {
  sent: number
  opened: number
  clicked: number
  responded: number
  converted: number
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
  variables: string[]
  category: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface EmailCampaign {
  id: string
  name: string
  subject: string
  content: string
  templateId?: string
  status: "draft" | "scheduled" | "sending" | "sent" | "cancelled"
  targetAudience: string[]
  scheduledDate?: Date
  sentDate?: Date
  metrics: {
    sent: number
    delivered: number
    opened: number
    clicked: number
    bounced: number
    unsubscribed: number
  }
  createdAt: Date
  updatedAt: Date
}