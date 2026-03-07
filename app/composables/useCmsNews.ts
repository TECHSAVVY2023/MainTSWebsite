/**
 * Composable for TechSavvy CMS API (techsavvy_app).
 * Backend: GET {apiBase}/techsavvy_app/cms/list/ and GET .../cms/<pk>/
 */

export type CmsNewsItem = {
  id: string
  date: string
  title: string
  summary: string
  description: string
  imageUrl: string
  link: string
  images?: string[]
}

type CmsRawItem = {
  id?: number
  title?: string
  authors?: string
  descriptions?: string
  approval_status?: string
  links?: string[]
  files?: { name?: string; url?: string }[]
  created_at?: string
}

const CMS_LIST_PATH = '/techsavvy_app/cms/list/'

export function useCmsNews () {
  const config = useRuntimeConfig()
  const apiBase = (config.public?.apiBase as string) || ''

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

  function mapCmsToNewsItem (cms: CmsRawItem, baseUrl?: string): CmsNewsItem {
    const base = baseUrl ?? apiBase
    let fileUrl = Array.isArray(cms.files) && cms.files[0]?.url ? cms.files[0].url : ''
    if (fileUrl && base && !fileUrl.startsWith('http')) {
      fileUrl = `${base.replace(/\/$/, '')}${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`
    }
    const images = Array.isArray(cms.files)
      ? cms.files.map((f) => f?.url).filter(Boolean) as string[]
      : []
    const link = Array.isArray(cms.links) && cms.links[0] ? cms.links[0] : ''
    return {
      id: String(cms.id ?? ''),
      date: cms.created_at || '',
      title: cms.title || 'Untitled',
      summary: cms.descriptions || '',
      description: cms.descriptions || '',
      imageUrl: fileUrl,
      link: link || '#',
      images: images.length > 0 ? images : undefined
    }
  }

  async function fetchCmsList (): Promise<CmsNewsItem[]> {
    if (!apiBase) return []
    try {
      const url = `${apiBase.replace(/\/$/, '')}${CMS_LIST_PATH}`
      const data = await $fetch<unknown>(url)
      const list = normalizeCmsList(data)
      return list
        .filter((item: CmsRawItem) => item.approval_status !== 'rejected')
        .map((item: unknown) => mapCmsToNewsItem(item as CmsRawItem, apiBase))
    } catch {
      return []
    }
  }

  return {
    apiBase,
    CMS_LIST_PATH,
    normalizeCmsList,
    mapCmsToNewsItem,
    fetchCmsList
  }
}
