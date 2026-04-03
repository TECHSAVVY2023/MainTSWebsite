/**
 * Merchandise catalog page: CMS items, cart actions, placeholders, head meta.
 */
import type { MerchItem } from '~/composables/useMerchCatalog'
import { DEFAULT_MEDIA_FALLBACK } from '~/constants/defaultMediaAssets'

export function useMerchandisePage () {
  const { items } = useMerchCatalog()
  const { addItem, itemCount } = useCart()
  const defaultImage = DEFAULT_MEDIA_FALLBACK

  function merchPayload (item: MerchItem) {
    return {
      id: item.id,
      name: item.name,
      priceLabel: item.priceLabel,
      unitAmountPhp: item.unitAmountPhp,
      image: item.image
    }
  }

  function addToCart (item: MerchItem) {
    if (item.href) return
    addItem(merchPayload(item))
  }

  function addToCartAndGoToCart (item: MerchItem) {
    if (item.href) return
    addItem(merchPayload(item))
    navigateTo('/cart')
  }

  function onImgError (e: Event) {
    const img = e.target as HTMLImageElement
    if (img) img.src = defaultImage
  }

  useHead({
    title: 'Merchandise catalog',
    meta: [
      {
        name: 'description',
        content:
          'Browse official Code Camp and Tech Savvy community merchandise — tees, hoodies, and more. Contact us to inquire and order.'
      }
    ]
  })

  return {
    items,
    itemCount,
    defaultImage,
    addToCart,
    addToCartAndGoToCart,
    onImgError
  }
}
