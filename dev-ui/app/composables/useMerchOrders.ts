export interface MerchOrderLine {
  id?: string
  name: string
  quantity: number
  unitAmountPhp?: number
  priceLabel?: string
  image?: string
}

export interface MerchShippingSnapshot {
  fullName?: string
  email?: string
  phone?: string
  region?: string
  province?: string
  city?: string
  barangay?: string
  street?: string
  notes?: string
}

export interface MerchOrder {
  id: number
  reference_number: string
  checkout_session_id?: string
  status: 'paid' | 'pending' | 'failed' | 'cancelled'
  buyer_email: string
  receipt_email_sent_at?: string | null
  lines_json: MerchOrderLine[]
  shipping_snapshot: MerchShippingSnapshot
  total_centavos: number
  total_php: number
  payment_method?: string
  stock_deducted: boolean
  created_at: string
  updated_at: string
}

export function useMerchOrders () {
  const config = useRuntimeConfig()
  const apiBase = (config.public?.apiBase as string || '').replace(/\/$/, '')

  const orders = ref<MerchOrder[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchOrders (statusFilter = 'all', searchQuery = '') {
    if (!apiBase) return
    loading.value = true
    error.value = null

    try {
      const params = new URLSearchParams()
      if (statusFilter && statusFilter !== 'all') {
        params.append('status', statusFilter)
      }
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim())
      }

      const queryString = params.toString() ? `?${params.toString()}` : ''
      const res = await $fetch<any[]>(`${apiBase}/merch/orders/${queryString}`).catch(() => [])

      if (Array.isArray(res)) {
        orders.value = res.map((o: any) => ({
          id: o.id,
          reference_number: o.reference_number || '',
          checkout_session_id: o.checkout_session_id || '',
          status: (o.status || 'pending').toLowerCase() as any,
          buyer_email: o.buyer_email || '',
          receipt_email_sent_at: o.receipt_email_sent_at || null,
          lines_json: Array.isArray(o.lines_json) ? o.lines_json : [],
          shipping_snapshot: typeof o.shipping_snapshot === 'object' && o.shipping_snapshot !== null ? o.shipping_snapshot : {},
          total_centavos: Number(o.total_centavos) || 0,
          total_php: o.total_php != null ? Number(o.total_php) : (Number(o.total_centavos) || 0) / 100.0,
          payment_method: o.payment_method || '',
          stock_deducted: Boolean(o.stock_deducted),
          created_at: o.created_at,
          updated_at: o.updated_at
        }))
      }
    } catch (e: any) {
      console.error('Failed to fetch merchandise orders:', e)
      error.value = e.message || 'Failed to fetch orders'
    } finally {
      loading.value = false
    }
  }

  return {
    orders,
    loading,
    error,
    fetchOrders
  }
}
