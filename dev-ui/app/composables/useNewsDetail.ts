/**
 * News detail page composable: article, images, lightbox.
 */
import { FALLBACK_NEWS_ITEMS } from '~/constants/fallbackNews'
import { DEFAULT_NEWS_IMAGE } from '~/constants/sampleMedia'

export type NewsDetailItem = {
  id?: string
  date?: string
  title?: string
  summary?: string
  description?: string
  imageUrl?: string
  images?: string[]
  link?: string
}

const APPROVED_NEWS_KEY = 'approvedNewsForLanding'
const DEFAULT_IMAGE = DEFAULT_NEWS_IMAGE

export function useNewsDetail () {
  const route = useRoute()
  const { getNewsSlug } = useNewsSlug()
  const { getItem: getStorage } = useSafeStorage()
  const { fetchCmsList } = useCmsNews()

  const { data: cmsListFromApi } = useAsyncData(
    'news-slug-cms-list',
    () => fetchCmsList(),
    { server: true, default: () => [] }
  )

  const newsItems = ref<NewsDetailItem[]>([])
  const lightboxIndex = ref<number | null>(null)

  function mergeDetailItems (api: NewsDetailItem[]): NewsDetailItem[] {
    if (api.length > 0) return [...api]
    return FALLBACK_NEWS_ITEMS.map((f) => ({ ...f }))
  }

  /** CMS list + same demo rows as the landing strip so /news/[slug] resolves for fallback cards. */
  watch(
    cmsListFromApi,
    (v) => {
      const api = Array.isArray(v) ? (v as NewsDetailItem[]) : []
      newsItems.value = mergeDetailItems(api)
    },
    { immediate: true }
  )

  const slugParam = computed(() => String(route.params.slug || ''))

  const article = computed<NewsDetailItem | undefined>(() => {
    const slug = slugParam.value
    const fromList = newsItems.value.find((n) => getNewsSlug(n) === slug)
    if (fromList) return fromList
    // Legacy links used `id` in the URL (e.g. /news/sample-news-2) before slugs were title+date.
    if (/^sample-news-\d+$/i.test(slug)) {
      return FALLBACK_NEWS_ITEMS.find((n) => n.id.toLowerCase() === slug.toLowerCase()) as
        | NewsDetailItem
        | undefined
    }
    return undefined
  })

  const articleImages = computed(() => {
    const a = article.value
    if (!a) return [DEFAULT_IMAGE]
    const arr = a.images
    let urls: string[] = []
    if (Array.isArray(arr) && arr.length > 0) {
      urls = arr.slice(0, 6).filter(Boolean).map((u) => u || DEFAULT_IMAGE)
    } else {
      const single = a.imageUrl
      urls = [single && single.trim() ? single : DEFAULT_IMAGE]
    }
    // Deduplicate: if all images are the same (e.g. fallback), show only one
    const unique = [...new Set(urls)]
    if (unique.length === 1 && urls.length > 1) return [unique[0]]
    return urls
  })

  function fullArticle (item: { summary?: string; description?: string }) {
    if (item.description && item.description.trim()) return item.description.trim()
    return item.summary || ''
  }

  function openLightbox (idx: number) {
    lightboxIndex.value = idx
  }

  function closeLightbox () {
    lightboxIndex.value = null
  }

  function prevImage () {
    if (lightboxIndex.value === null) return
    const len = articleImages.value.length
    lightboxIndex.value = (lightboxIndex.value - 1 + len) % len
  }

  function nextImage () {
    if (lightboxIndex.value === null) return
    const len = articleImages.value.length
    lightboxIndex.value = (lightboxIndex.value + 1) % len
  }

  function onKeydown (e: KeyboardEvent) {
    if (lightboxIndex.value === null) return
    if (e.key === 'Escape') closeLightbox()
    else if (e.key === 'ArrowLeft') prevImage()
    else if (e.key === 'ArrowRight') nextImage()
  }

  async function loadData () {
    let api: NewsDetailItem[] = []
    const fromApi = cmsListFromApi.value
    if (Array.isArray(fromApi) && fromApi.length > 0) {
      api = fromApi as NewsDetailItem[]
    } else {
      try {
        const list = await fetchCmsList()
        if (list.length > 0) api = list as NewsDetailItem[]
      } catch { /* fall through */ }
    }

    let merged = mergeDetailItems(api)
    try {
      const raw = getStorage(APPROVED_NEWS_KEY)
      const approved = JSON.parse(raw || '[]')
      if (Array.isArray(approved) && approved.length > 0) {
        merged = [...approved, ...merged]
      }
    } catch { /* ignore */ }
    newsItems.value = merged
  }

  return {
    article,
    articleImages,
    lightboxIndex,
    fullArticle,
    openLightbox,
    closeLightbox,
    prevImage,
    nextImage,
    onKeydown,
    loadData
  }
}
