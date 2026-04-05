/**
 * News detail page composable: article, images, lightbox, head.
 */
import { computed, unref } from 'vue'
import type { NewsDetailItem } from './useNewsDetail'

export function useNewsDetailPage () {
  const detail = useNewsDetail()

  /** Unwrap ref/computed reliably (avoids bad heuristics when parent is reactive). */
  const article = computed(() =>
    unref(detail.article) as NewsDetailItem | undefined
  )

  const articleImagesArray = computed(() => {
    const v = unref(detail.articleImages)
    return Array.isArray(v) ? v : []
  })

  const lightboxIndexValue = computed(() => {
    const v = unref(detail.lightboxIndex)
    return v !== null && typeof v === 'number' ? v : 0
  })

  const lightboxVisible = computed(() => {
    const v = unref(detail.lightboxIndex)
    return v !== null
  })

  onMounted(() => {
    window.addEventListener('keydown', detail.onKeydown)
  })
  onUnmounted(() => {
    window.removeEventListener('keydown', detail.onKeydown)
  })
  onMounted(() => detail.loadData())

  useHead(() => ({
    title: article.value ? `${article.value.title} | News & Updates | TECH SAVVY Code Camp` : 'News not found | TECH SAVVY Code Camp',
    meta: [{ name: 'description', content: article.value?.summary || 'Detailed view for a TECH SAVVY Code Camp news item.' }],
    link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }]
  }))

  return {
    detail,
    article,
    articleImagesArray,
    lightboxIndexValue,
    lightboxVisible
  }
}
