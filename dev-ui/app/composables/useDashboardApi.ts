/**
 * Dashboard API composable – all data from API only.
 * Set NUXT_PUBLIC_API_BASE to the API host (e.g. http://127.0.0.1:8000) or full prefix (…/api/techsavvy).
 * Calendar requests always resolve to …/api/techsavvy/calendar-events.
 */

export interface SubmissionItem {
  id: string
  title: string
  summary: string
  description?: string
  imageUrl: string
  date: string
  link: string
  status: string
  author?: string
  createdAt?: string
  /** Up to 6 images for gallery. When present, imageUrl is the headline (card) image. */
  images?: string[]
  /** Index of headline image in images[] for card display. Default 0. */
  headlineIndex?: number
}

export interface ApprovedItem {
  id: string
  title: string
  summary: string
  description?: string
  imageUrl: string
  date: string
  link: string
  images?: string[]
  headlineIndex?: number
}

export interface ProfileData {
  firstName?: string
  lastName?: string
  email?: string
  address?: string
  contactNumber?: string
  city?: string
  state?: string
  avatar?: string
  middleName?: string
  dateOfBirth?: string
  gender?: string
  occupation?: string
  bio?: string
}

export interface NotificationItem {
  title?: string
  text?: string
  time?: string
  read?: boolean
  icon?: string
}

export interface CalendarEventItem {
  id: string
  title: string
  date: string
  time?: string
  /** API may send snake_case from Django */
  end_time?: string
  endTime?: string
  description?: string
  link?: string
  kind?: string
}

function getBase (): string {
  if (import.meta.server) return ''
  const config = useRuntimeConfig()
  return (config.public?.apiBase as string) || ''
}

/** Host-only base (e.g. http://127.0.0.1:8000) or full API root (…/api/techsavvy) — both supported. */
function calendarEventsBaseUrl (base: string): string {
  const t = base.replace(/\/$/, '')
  if (/\/api\/techsavvy$/i.test(t)) return `${t}calendar-events`
  return `${t}/calendar-events`
}

async function apiGet<T> (path: string, defaultValue: T): Promise<T> {
  const base = getBase()
  if (!base) return defaultValue
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`)
    if (!res.ok) return defaultValue
    return (await res.json()) as T
  } catch {
    return defaultValue
  }
}

async function apiPost (path: string, body: unknown): Promise<boolean> {
  const base = getBase()
  if (!base) return true
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    return res.ok
  } catch {
    return false
  }
}

async function apiPut (path: string, body: unknown): Promise<boolean> {
  const base = getBase()
  if (!base) return true
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    return res.ok
  } catch {
    return false
  }
}

async function apiPatch (path: string, body: unknown): Promise<boolean> {
  const base = getBase()
  if (!base) return true
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    return res.ok
  } catch {
    return false
  }
}

async function apiDelete (path: string): Promise<boolean> {
  const base = getBase()
  if (!base) return true
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`, { method: 'DELETE' })
    return res.ok
  } catch {
    return false
  }
}

export function useDashboardApi () {
  return {
    async getSubmissions (): Promise<SubmissionItem[]> {
      return apiGet<SubmissionItem[]>('submissions', [])
    },
    async createSubmission (data: Omit<SubmissionItem, 'id'> & { id?: string; status?: string; createdAt?: string }): Promise<SubmissionItem | null> {
      const base = getBase()
      if (!base) return null
      try {
        const res = await fetch(`${base.replace(/\/$/, '')}/submissions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        if (!res.ok) return null
        return (await res.json()) as SubmissionItem
      } catch {
        return null
      }
    },
    async updateSubmission (id: string, data: Partial<SubmissionItem>): Promise<boolean> {
      return apiPatch(`submissions/${id}`, data)
    },
    async setSubmissionStatus (id: string, status: string): Promise<boolean> {
      return apiPatch(`submissions/${id}`, { status })
    },
    async getApprovedNews (): Promise<ApprovedItem[]> {
      return apiGet<ApprovedItem[]>('approved-news', [])
    },
    async saveApprovedNews (items: ApprovedItem[]): Promise<boolean> {
      return apiPut('approved-news', items)
    },
    async getProfile (): Promise<ProfileData> {
      return apiGet<ProfileData>('profile', {})
    },
    async saveProfile (data: ProfileData): Promise<boolean> {
      return apiPut('profile', data)
    },
    async getNotifications (): Promise<NotificationItem[]> {
      return apiGet<NotificationItem[]>('notifications', [])
    },
    async saveNotifications (items: NotificationItem[]): Promise<boolean> {
      return apiPut('notifications', items)
    },
    async getCalendarEvents (): Promise<CalendarEventItem[]> {
      const base = getBase()
      if (!base) return []
      const url = calendarEventsBaseUrl(base)
      try {
        const res = await fetch(url)
        if (!res.ok) return []
        return (await res.json()) as CalendarEventItem[]
      } catch {
        return []
      }
    },
    async saveCalendarEvents (events: CalendarEventItem[]): Promise<boolean> {
      const base = getBase()
      if (!base) return true
      const url = calendarEventsBaseUrl(base)
      try {
        const res = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(events)
        })
        return res.ok
      } catch {
        return false
      }
    },
    async createCalendarEvent (payload: Omit<CalendarEventItem, 'id'>): Promise<CalendarEventItem | null> {
      const base = getBase()
      if (!base) return null
      const url = calendarEventsBaseUrl(base)
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        if (!res.ok) return null
        return (await res.json()) as CalendarEventItem
      } catch {
        return null
      }
    },
    async updateCalendarEvent (id: string, payload: Partial<CalendarEventItem>): Promise<boolean> {
      const base = getBase()
      if (!base) return false
      const url = `${calendarEventsBaseUrl(base)}/${id}`
      try {
        const res = await fetch(url, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        return res.ok
      } catch {
        return false
      }
    },
    async deleteCalendarEvent (id: string): Promise<boolean> {
      const base = getBase()
      if (!base) return false
      const url = `${calendarEventsBaseUrl(base)}/${id}`
      try {
        const res = await fetch(url, { method: 'DELETE' })
        return res.ok
      } catch {
        return false
      }
    },
    hasApi (): boolean {
      return !!getBase()
    }
  }
}
