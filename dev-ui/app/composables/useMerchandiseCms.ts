import { useCMS } from '~/composables/useCMS'
import { useAuth } from '~/composables/useAuth'

export interface MerchandiseCmsItem {
  id?: number
  item_id?: string
  name: string
  price_label?: string
  unit_amount_php: number
  subtitle?: string
  image?: string
  alt?: string
  stock: number
  is_active: boolean
  approval_status?: 'pending' | 'approved' | 'rejected'
  authors?: string
  created_at?: string
  updated_at?: string
}

export function useMerchandiseCms () {
  const config = useRuntimeConfig()
  const apiBase = (config.public?.apiBase as string || '').replace(/\/$/, '')
  const { uploadMultipleFiles } = useCMS()
  const { user } = useAuth()

  const merchandiseList = ref<MerchandiseCmsItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Fetch all Merchandise items from Django endpoint
   */
  async function refreshMerchandise () {
    if (!apiBase) return
    loading.value = true
    error.value = null

    try {
      const res = await $fetch<any[]>(`${apiBase}/merchandise/`).catch(() => [])
      if (Array.isArray(res)) {
        merchandiseList.value = res.map((m: any) => ({
          id: m.id,
          item_id: m.item_id || '',
          name: m.name || '',
          price_label: m.price_label || `₱${Math.round(Number(m.unit_amount_php) || 0)}`,
          unit_amount_php: Number(m.unit_amount_php) || 0,
          subtitle: m.subtitle || '',
          image: m.image || '',
          alt: m.alt || m.name || '',
          stock: m.stock ?? 100,
          is_active: m.is_active ?? true,
          approval_status: m.approval_status || 'approved',
          authors: m.authors || '',
          created_at: m.created_at,
          updated_at: m.updated_at
        }))
      }
    } catch (e: any) {
      console.error('Failed to load merchandise:', e)
      error.value = e.message || 'Failed to fetch merchandise items'
    } finally {
      loading.value = false
    }
  }

  /**
   * Create or Update a Merchandise item
   */
  async function saveMerchandise (item: Partial<MerchandiseCmsItem>) {
    if (!apiBase) return null
    loading.value = true
    error.value = null

    const authorEmail = user.value?.email || item.authors || 'Super Admin'
    const unitPrice = Number(item.unit_amount_php) || 0
    const priceLabel = item.price_label?.trim() || `₱${Math.round(unitPrice)}`

    const payload = {
      item_id: item.item_id?.trim() || undefined,
      name: item.name,
      price_label: priceLabel,
      unit_amount_php: unitPrice,
      subtitle: item.subtitle || '',
      image: item.image || '',
      alt: item.alt || item.name || '',
      stock: item.stock ?? 100,
      is_active: item.is_active ?? true,
      approval_status: item.approval_status || 'approved',
      authors: authorEmail
    }

    try {
      let saved: any
      if (item.id) {
        saved = await $fetch(`${apiBase}/merchandise/${item.id}/`, {
          method: 'PATCH',
          body: payload
        })
      } else {
        saved = await $fetch(`${apiBase}/merchandise/`, {
          method: 'POST',
          body: payload
        })
      }
      await refreshMerchandise()
      return saved
    } catch (e: any) {
      console.error('Failed to save merchandise item:', e)
      error.value = e.message || 'Failed to save merchandise item'
      throw e
    } finally {
      loading.value = false
    }
  }

  /**
   * Remove a Merchandise item
   */
  async function removeMerchandise (id: number) {
    if (!apiBase) return
    loading.value = true
    error.value = null

    try {
      await $fetch(`${apiBase}/merchandise/${id}/`, {
        method: 'DELETE'
      })
      await refreshMerchandise()
    } catch (e: any) {
      console.error('Failed to delete merchandise item:', e)
      error.value = e.message || 'Failed to delete merchandise item'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    merchandiseList,
    loading,
    error,
    refreshMerchandise,
    saveMerchandise,
    removeMerchandise,
    uploadMultipleFiles
  }
}
