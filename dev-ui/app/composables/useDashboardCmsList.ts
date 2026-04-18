/**
 * Shared CMS list fetch + display helpers for dashboard / contents pages.
 */
// @ts-ignore
import moment from 'moment'

export interface CmsFileEntry {
  name?: string
  url?: string
}

export interface CmsRaw {
  id: number
  title: string
  authors?: string
  filters?: string | Record<string, unknown> | null
  approval_status?: string
  created_at?: string
  /** Full body from API (list responses include this when present). */
  descriptions?: string
  links?: string[]
  files?: CmsFileEntry[] | unknown
  images?: unknown[]
  content_id?: string
  logs?: unknown[]
}

/** True if `authors` (comma-separated) lists this email (case-insensitive). */
export function cmsItemHasAuthorEmail (item: CmsRaw, email: string | null | undefined): boolean {
  const e = (email || '').trim().toLowerCase()
  if (!e) return false
  const raw = (item.authors || '').trim()
  if (!raw) return false
  return raw.split(',').some(part => part.trim().toLowerCase() === e)
}

export function useDashboardCmsList () {
  const config = useRuntimeConfig()
  const apiBase = (config.public?.apiBase as string || '').replace(/\/$/, '')

  const allItems = ref<CmsRaw[]>([])
  const loadingItems = ref(true)

  async function fetchItems () {
    if (!apiBase) {
      loadingItems.value = false
      return
    }
    try {
      const data = await $fetch<unknown>(`${apiBase}/cms/list/`)
      const list = Array.isArray(data)
        ? data
        : (data as Record<string, unknown>)?.data
          ? (data as Record<string, unknown>).data as CmsRaw[]
          : []
      allItems.value = list as CmsRaw[]
    } catch {
      /* silent */
    } finally {
      loadingItems.value = false
    }
  }

  function getFiltersText (filters: CmsRaw['filters']): string {
    if (!filters) return ''
    if (typeof filters === 'string') return filters
    if (typeof filters === 'object') return JSON.stringify(filters)
    return String(filters)
  }

  function getPrimaryCategory (filters: CmsRaw['filters']): string {
    if (!filters) return 'News'
    if (typeof filters === 'object') {
      const category = filters.category
      return typeof category === 'string' && category.trim() ? category.trim() : 'News'
    }
    const text = String(filters)
    if (!text.trim()) return 'News'
    return text.split(',')[0]?.trim() || 'News'
  }

  function getStatusClass (status?: string) {
    if (status === 'approved' || status === 'verified') return 'text-green-400'
    if (status === 'pending') return 'text-amber-400'
    if (status === 'rejected') return 'text-red-400'
    return 'text-dark/50'
  }

  function getStatusDot (status?: string) {
    if (status === 'approved' || status === 'verified') return 'bg-green-400'
    if (status === 'pending') return 'bg-amber-400'
    if (status === 'rejected') return 'bg-red-400'
    return 'bg-white/25'
  }

  function formatItemDate (iso?: string) {
    return iso ? moment(iso).format('MMM DD, YYYY') : '—'
  }

  return {
    apiBase,
    allItems,
    loadingItems,
    fetchItems,
    getFiltersText,
    getPrimaryCategory,
    getStatusClass,
    getStatusDot,
    formatItemDate
  }
}
