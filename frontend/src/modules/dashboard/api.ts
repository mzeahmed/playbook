import { apiFetch } from '@/http/client'
import { getToken } from '@/modules/auth/session'

export type IncidentStatus = 'draft' | 'published' | 'archived'

export interface IncidentCategory {
  name: string
  slug: string
}

export interface IncidentAuthor {
  first_name: string
  last_name: string
}

export interface IncidentSummary {
  id: string
  title: string
  slug: string
  summary: string
  status: IncidentStatus
  category: IncidentCategory
  author: IncidentAuthor
  tags: string[]
  created_at: string
  updated_at: string
}

export interface ListIncidentsResult {
  incidents: IncidentSummary[]
  total: number
  page: number
  per_page: number
}

export interface ListIncidentsFilter {
  category?: string
  status?: string
  tag?: string
  q?: string
  page?: number
  perPage?: number
}

// listIncidents fetches a page of incidents matching filter. The route is
// protected, so the caller's access token (if any) is attached as a
// bearer header; an expired or missing token surfaces as an ApiError with
// code 401, which callers should handle by sending the user back to
// /login.
export function listIncidents(filter: ListIncidentsFilter = {}): Promise<ListIncidentsResult> {
  const params = new URLSearchParams()

  if (filter.category) params.set('category', filter.category)
  if (filter.status) params.set('status', filter.status)
  if (filter.tag) params.set('tag', filter.tag)
  if (filter.q) params.set('q', filter.q)
  if (filter.page) params.set('page', String(filter.page))
  if (filter.perPage) params.set('per_page', String(filter.perPage))

  const qs = params.toString()
  const token = getToken()

  return apiFetch<ListIncidentsResult>(`/api/incidents${qs ? `?${qs}` : ''}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
}
