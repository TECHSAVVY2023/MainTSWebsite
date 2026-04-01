/**
 * Shopping cart page: cart state, PHP formatter, image fallback, head meta.
 */
import { DEFAULT_MEDIA_FALLBACK } from '~/constants/defaultMediaAssets'

export function useCartPage () {
  const { lines, subtotalPhp, setQuantity, removeItem } = useCart()
  const defaultImage = DEFAULT_MEDIA_FALLBACK

  function onLineImgError (e: Event) {
    const el = e.target as HTMLImageElement | null
    if (!el || el.dataset.fallback === '1') return
    el.dataset.fallback = '1'
    el.src = defaultImage
  }

  function formatPhp (n: number) {
    return `₱${n.toLocaleString('en-PH')}`
  }

  useHead({
    title: 'Shopping cart',
    meta: [{ name: 'description', content: 'Review your Tech Savvy merchandise cart before checkout.' }]
  })

  return {
    lines,
    subtotalPhp,
    setQuantity,
    removeItem,
    defaultImage,
    onLineImgError,
    formatPhp
  }
}
