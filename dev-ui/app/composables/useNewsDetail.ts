/**
 * News detail page composable: article, images, lightbox.
 */
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

  const slugParam = computed(() => String(route.params.slug || ''))

  const article = computed<NewsDetailItem | undefined>(() =>
    newsItems.value.find((n) => getNewsSlug(n) === slugParam.value)
  )

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
    const fromApi = cmsListFromApi.value
    if (Array.isArray(fromApi) && fromApi.length > 0) {
      newsItems.value = fromApi as NewsDetailItem[]
    } else {
      try {
        const list = await fetchCmsList()
        if (list.length > 0) newsItems.value = list as NewsDetailItem[]
      } catch { /* fall through */ }
    }

    try {
      const raw = getStorage(APPROVED_NEWS_KEY)
      const approved = JSON.parse(raw || '[]')
      if (Array.isArray(approved) && approved.length > 0) {
        newsItems.value = [...approved, ...newsItems.value]
      }
    } catch { /* ignore */ }
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
