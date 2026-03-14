/**
 * News detail page composable: article, images, lightbox, head.
 */
export function useNewsDetailPage () {
  const detail = useNewsDetail()

  const article = computed(() => {
    const r = detail.article
    return (r && typeof r === 'object' && 'value' in r) ? (r as { value: { title?: string; summary?: string; date?: string } | undefined }).value : undefined
  })

  const articleImagesArray = computed(() => {
    const r = detail.articleImages
    const v = (r && typeof r === 'object' && 'value' in r) ? (r as { value: unknown }).value : r
    return Array.isArray(v) ? v : []
  })

  const lightboxIndexValue = computed(() => {
    const r = detail.lightboxIndex
    const v = (r && typeof r === 'object' && 'value' in r) ? (r as { value: number | null }).value : r
    return v !== null && typeof v === 'number' ? v : 0
  })

  const lightboxVisible = computed(() => {
    const r = detail.lightboxIndex
    const v = (r && typeof r === 'object' && 'value' in r) ? (r as { value: number | null }).value : r
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
