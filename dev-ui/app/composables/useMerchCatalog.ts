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

/** Initial / offline catalog (also used when API returns no merch rows). */
export const MERCH_CATALOG_STATIC: MerchItem[] = [
  {
    id: 'season-4-tee',
    name: 'Season 4 community tee',
    priceLabel: 'From ₱549',
    unitAmountPhp: 549,
    subtitle: 'Think smart. Code smart. Official Code Camp Season 4 print.',
    image: SAMPLE_MERCH.tee,
    alt: 'Code Camp Season 4 community t-shirt'
  },
  {
    id: 'tech-savvy-hoodie',
    name: 'Tech Savvy hoodie',
    priceLabel: 'From ₱1,090',
    unitAmountPhp: 1090,
    subtitle: 'Mid-weight fleece, embroidered mark — for meetups and late builds.',
    image: SAMPLE_MERCH.hoodie,
    alt: 'Tech Savvy hoodie'
  },
  {
    id: 'sticker-pin-set',
    name: 'Sticker & pin set',
    priceLabel: 'From ₱180',
    unitAmountPhp: 180,
    subtitle: 'Vinyl stickers and enamel pin — bundle for laptops and lanyards.',
    image: SAMPLE_MERCH.stickers,
    alt: 'Tech Savvy stickers and pin set'
  },
  {
    id: 'community-beanie',
    name: 'Community knit beanie',
    priceLabel: 'From ₱420',
    unitAmountPhp: 420,
    subtitle: 'Soft acrylic knit with woven label — for cool venues and night builds.',
    image: SAMPLE_MERCH.beanie,
    alt: 'Tech Savvy community beanie'
  },
  {
    id: 'canvas-tote',
    name: 'Canvas cohort tote',
    priceLabel: 'From ₱380',
    unitAmountPhp: 380,
    subtitle: 'Heavy cotton canvas, long handles — laptops, hoodies, and event swag.',
    image: SAMPLE_MERCH.tote,
    alt: 'Code Camp canvas tote bag'
  },
  {
    id: 'camp-mug',
    name: 'Ceramic camp mug',
    priceLabel: 'From ₱290',
    unitAmountPhp: 290,
    subtitle: 'Matte glaze with debossed mark — desk companion for stand-ups.',
    image: SAMPLE_MERCH.mug,
    alt: 'Code Camp ceramic mug'
  },
  {
    id: 'insulated-bottle',
    name: 'Insulated water bottle',
    priceLabel: 'From ₱650',
    unitAmountPhp: 650,
    subtitle: 'Double-wall steel, powder coat — keeps drinks cold through long sessions.',
    image: SAMPLE_MERCH.bottle,
    alt: 'Tech Savvy insulated water bottle'
  },
  {
    id: 'field-notebook',
    name: 'Field notes journal',
    priceLabel: 'From ₱220',
    unitAmountPhp: 220,
    subtitle: 'Dot grid, lay-flat binding — sketches, stand-up notes, and API doodles.',
    image: SAMPLE_MERCH.notebook,
    alt: 'Tech Savvy notebook journal'
  }
]

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
  const origin = apiBase.replace(/\/api\/?$/, '').replace(/\/$/, '')
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
  const apiBase = (config.public?.apiBase as string) || ''
  const catalogState = useState<MerchItem[]>(MERCH_CATALOG_STATE_KEY, () => [...MERCH_CATALOG_STATIC])

  useAsyncData(
    'merch-catalog-cms',
    async () => {
      if (!apiBase) return []
      try {
        const url = `${apiBase.replace(/\/$/, '')}/api/techsavvies/cms/list/`
        const data = await $fetch<unknown>(url)
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
