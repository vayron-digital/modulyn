import { Member, Organization, Event, Certification, LegislativeItem, Campaign } from "@/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

export async function fetchMembers(params?: {
  page?: number
  limit?: number
  filters?: Record<string, any>
}): Promise<{ data: Member[]; total: number }> {
  const queryParams = new URLSearchParams({
    page: params?.page?.toString() || "1",
    limit: params?.limit?.toString() || "10",
    ...params?.filters,
  })

  const response = await fetch(`${API_URL}/members?${queryParams}`)
  if (!response.ok) throw new Error("Failed to fetch members")
  return response.json()
}

export async function fetchMemberById(id: string): Promise<Member> {
  const response = await fetch(`${API_URL}/members/${id}`)
  if (!response.ok) throw new Error("Failed to fetch member")
  return response.json()
}

export async function fetchOrganizations(params?: {
  page?: number
  limit?: number
  filters?: Record<string, any>
}): Promise<{ data: Organization[]; total: number }> {
  const queryParams = new URLSearchParams({
    page: params?.page?.toString() || "1",
    limit: params?.limit?.toString() || "10",
    ...params?.filters,
  })

  const response = await fetch(`${API_URL}/organizations?${queryParams}`)
  if (!response.ok) throw new Error("Failed to fetch organizations")
  return response.json()
}

export async function fetchEvents(params?: {
  page?: number
  limit?: number
  filters?: Record<string, any>
}): Promise<{ data: Event[]; total: number }> {
  const queryParams = new URLSearchParams({
    page: params?.page?.toString() || "1",
    limit: params?.limit?.toString() || "10",
    ...params?.filters,
  })

  const response = await fetch(`${API_URL}/events?${queryParams}`)
  if (!response.ok) throw new Error("Failed to fetch events")
  return response.json()
}

export async function fetchCertifications(params?: {
  page?: number
  limit?: number
  filters?: Record<string, any>
}): Promise<{ data: Certification[]; total: number }> {
  const queryParams = new URLSearchParams({
    page: params?.page?.toString() || "1",
    limit: params?.limit?.toString() || "10",
    ...params?.filters,
  })

  const response = await fetch(`${API_URL}/certifications?${queryParams}`)
  if (!response.ok) throw new Error("Failed to fetch certifications")
  return response.json()
}

export async function fetchLegislativeItems(params?: {
  page?: number
  limit?: number
  filters?: Record<string, any>
}): Promise<{ data: LegislativeItem[]; total: number }> {
  const queryParams = new URLSearchParams({
    page: params?.page?.toString() || "1",
    limit: params?.limit?.toString() || "10",
    ...params?.filters,
  })

  const response = await fetch(`${API_URL}/legislative-items?${queryParams}`)
  if (!response.ok) throw new Error("Failed to fetch legislative items")
  return response.json()
}

export async function fetchCampaigns(params?: {
  page?: number
  limit?: number
  filters?: Record<string, any>
}): Promise<{ data: Campaign[]; total: number }> {
  const queryParams = new URLSearchParams({
    page: params?.page?.toString() || "1",
    limit: params?.limit?.toString() || "10",
    ...params?.filters,
  })

  const response = await fetch(`${API_URL}/campaigns?${queryParams}`)
  if (!response.ok) throw new Error("Failed to fetch campaigns")
  return response.json()
}

// Mutation functions
export async function createMember(data: Omit<Member, "id">): Promise<Member> {
  const response = await fetch(`${API_URL}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Failed to create member")
  return response.json()
}

export async function updateMember(id: string, data: Partial<Member>): Promise<Member> {
  const response = await fetch(`${API_URL}/members/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Failed to update member")
  return response.json()
}

export async function deleteMember(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/members/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) throw new Error("Failed to delete member")
}

// Similar mutation functions for other entities...
