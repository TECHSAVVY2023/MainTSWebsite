/**
 * Merch catalog: approved CMS items with category "Merchandise", merged with static fallback.
 */
import { SAMPLE_MERCH } from '~/constants/sampleMedia'
import { firstCmsImageUrl } from '~/utils/cmsMedia'

export type MerchItem = {
  id: string
  name: string
  priceLabel: string
  unitAmountPhp: number
  subtitle?: string
  image?: string
  alt?: string
  href?: string
}

/** Initial / empty catalog. */
export const MERCH_CATALOG_STATIC: MerchItem[] = []

/** @deprecated Use MERCH_CATALOG_STATIC */
export const MERCH_CATALOG = MERCH_CATALOG_STATIC

export const MERCH_CATALOG_STATE_KEY = 'merch-catalog-cms'

type CmsRaw = {
  id?: number
  title?: string
  descriptions?: string
  content_id?: string
  approval_status?: string
  filters?: string | Record<string, unknown> | null
  links?: string[]
  files?: { name?: string; url?: string }[] | { name?: string; url?: string } | null
  images?: unknown[]
}

function normalizeCmsList (body: unknown): unknown[] {
  if (Array.isArray(body)) return body
  if (body && typeof body === 'object' && !Array.isArray(body)) {
    const o = body as Record<string, unknown>
    if (Array.isArray(o.data)) return o.data
    if (Array.isArray(o.results)) return o.results
    if (Array.isArray(o.items)) return o.items
  }
  return []
}

function getCategoryFromFilters (filters: CmsRaw['filters']): string {
  if (!filters) return ''
  if (typeof filters === 'object' && filters !== null && 'category' in filters) {
    return String((filters as Record<string, unknown>).category || '').trim().toLowerCase()
  }
  if (typeof filters === 'string' && filters.trim().startsWith('{')) {
    try {
      const o = JSON.parse(filters) as Record<string, unknown>
      return String(o.category || '').trim().toLowerCase()
    } catch {
      return ''
    }
  }
  return ''
}

function getFirstFileUrl (files: CmsRaw['files']): string {
  if (!files) return ''
  if (Array.isArray(files)) return files[0]?.url || ''
  if (typeof files === 'object') return files.url || ''
  return ''
}

function resolveMediaUrl (url: string, apiBase: string): string {
  if (!url || url.startsWith('http')) return url
  const origin = apiBase.replace(/\/api\/techsavvy\/?$/i, '').replace(/\/$/, '')
  return origin ? `${origin}${url.startsWith('/') ? '' : '/'}${url}` : url
}

function mapCmsItemToMerch (cms: CmsRaw, apiBase: string): MerchItem | null {
  if (getCategoryFromFilters(cms.filters) !== 'merchandise') return null
  if (String(cms.approval_status || '').toLowerCase() !== 'approved') return null

  const filters =
    typeof cms.filters === 'object' && cms.filters !== null
      ? (cms.filters as Record<string, unknown>)
      : {}

  const rawId = String(cms.content_id || `cms-${cms.id ?? 0}`).trim()
  const id =
    rawId
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-_]/gi, '') || `cms-${cms.id}`

  const rawPrice = filters.unit_amount_php
  const rawStr =
    rawPrice === undefined || rawPrice === null ? '' : String(rawPrice).trim()
  const unitRaw = Number(rawStr)
  const hasPrice = rawStr !== '' && Number.isFinite(unitRaw) && unitRaw >= 0
  const unitAmountPhp = hasPrice ? unitRaw : 0
  const priceLabel = hasPrice ? `₱${Math.round(unitAmountPhp)}` : 'Price on request'

  const imgFromImages = firstCmsImageUrl(cms.images)
  let fileUrl = imgFromImages || getFirstFileUrl(cms.files)
  if (fileUrl) fileUrl = resolveMediaUrl(fileUrl, apiBase)

  return {
    id,
    name: cms.title || 'Product',
    priceLabel,
    unitAmountPhp,
    subtitle: (cms.descriptions || '').trim().slice(0, 280) || String(filters.tagline || ''),
    image: fileUrl || undefined,
    alt: cms.title || 'Product'
  }
}

export function useMerchCatalog () {
  const config = useRuntimeConfig()
  const apiBase = (config.public?.apiBase as string || '').replace(/\/$/, '')
  const catalogState = useState<MerchItem[]>(MERCH_CATALOG_STATE_KEY, () => [...MERCH_CATALOG_STATIC])

  useAsyncData(
    'merch-catalog-cms',
    async () => {
      if (!apiBase) return []
      try {
        // 1. Try fetching from dedicated MerchandiseItem endpoint
        const merchRes = await $fetch<any[]>(`${apiBase}/merchandise/?active_only=true`).catch(() => null)
        if (Array.isArray(merchRes) && merchRes.length > 0) {
          const mapped: MerchItem[] = merchRes
            .filter((m: any) => m.is_active !== false && (m.approval_status || 'approved').toLowerCase() === 'approved')
            .map((m: any) => {
              const unitAmount = Number(m.unit_amount_php) || 0
              const priceLabel = m.price_label?.trim() || `₱${Math.round(unitAmount).toLocaleString()}`
              const id = (m.item_id || `merch-${m.id}`)
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-_]/gi, '')
              return {
                id,
                name: m.name || 'Product',
                priceLabel,
                unitAmountPhp: unitAmount,
                subtitle: m.subtitle || '',
                image: m.image || undefined,
                alt: m.alt || m.name || 'Product'
              }
            })
          if (mapped.length > 0) {
            catalogState.value = mapped
            return mapped
          }
        }

        // 2. Fallback to generic CMS newsfeed items if any
        const url = `${apiBase}/cms/list/`
        const data = await $fetch<unknown>(url).catch(() => [])
        const list = normalizeCmsList(data) as CmsRaw[]
        const mapped = list
          .map((item) => mapCmsItemToMerch(item, apiBase))
          .filter((x): x is MerchItem => x != null)
        if (mapped.length > 0) {
          catalogState.value = mapped
        }
        return mapped
      } catch {
        return []
      }
    },
    { server: true, default: () => [] }
  )

  const items = computed(() => (catalogState.value.length > 0 ? catalogState.value : MERCH_CATALOG_STATIC))

  return { items }
}
