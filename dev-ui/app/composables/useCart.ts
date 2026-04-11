/**
 * Merchandise cart (client-only, persisted). Used for catalog → cart → checkout flow.
 */
import { MERCH_CATALOG_STATIC, MERCH_CATALOG_STATE_KEY, type MerchItem } from '~/composables/useMerchCatalog'

const STORAGE_KEY = 'merch_cart_v1'

export type CartLine = {
  id: string
  name: string
  priceLabel: string
  unitAmountPhp: number
  image?: string
  quantity: number
}

function catalogById (id: string): MerchItem | undefined {
  const state = useState<MerchItem[]>(MERCH_CATALOG_STATE_KEY, () => [...MERCH_CATALOG_STATIC])
  return state.value.find((p) => p.id === id) ?? MERCH_CATALOG_STATIC.find((p) => p.id === id)
}

function storedImageUrl (raw: Partial<CartLine>): string | undefined {
  const v = raw.image
  if (typeof v !== 'string') return undefined
  const t = v.trim()
  return t.length ? t : undefined
}

/** Repair lines from storage (missing unitAmountPhp, string quantities, etc.) so totals never become NaN. */
export function normalizeCartLine (raw: Partial<CartLine>): CartLine | null {
  const id = raw.id
  if (!id || typeof id !== 'string') return null
  const cat = catalogById(id)
  const unitRaw = Number(raw.unitAmountPhp)
  const unitAmountPhp =
    Number.isFinite(unitRaw) && unitRaw >= 0
      ? unitRaw
      : (cat?.unitAmountPhp ?? 0)
  const qtyRaw = Number(raw.quantity)
  const quantity = Math.max(1, Math.min(99, Math.floor(Number.isFinite(qtyRaw) ? qtyRaw : 1)))
  return {
    id,
    name: (raw.name && String(raw.name)) || cat?.name || 'Item',
    priceLabel: (raw.priceLabel && String(raw.priceLabel)) || cat?.priceLabel || '',
    unitAmountPhp,
    /** Prefer live catalog URL so updated assets fix stale localStorage lines. */
    image: cat?.image ?? storedImageUrl(raw),
    quantity
  }
}

function loadFromStorage (): CartLine[] {
  if (!import.meta.client) return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Partial<CartLine>[]
    if (!Array.isArray(parsed)) return []
    return parsed.map(normalizeCartLine).filter((l): l is CartLine => l != null)
  } catch {
    return []
  }
}

function saveToStorage (lines: CartLine[]) {
  if (!import.meta.client) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  } catch {
    /* ignore quota */
  }
}

export function useCart () {
  const lines = useState<CartLine[]>('merch-cart-lines', () => [])
  const hydrated = useState('merch-cart-hydrated', () => false)

  onMounted(() => {
    if (hydrated.value) return
    hydrated.value = true
    const stored = loadFromStorage()
    if (stored.length && lines.value.length === 0) {
      lines.value = stored
    } else if (lines.value.length > 0) {
      lines.value = lines.value.map((l) => normalizeCartLine(l)!).filter(Boolean)
    }
  })

  watch(
    lines,
    (v) => {
      saveToStorage(v)
    },
    { deep: true }
  )

  const itemCount = computed(() =>
    lines.value.reduce((sum, l) => sum + l.quantity, 0)
  )

  const subtotalPhp = computed(() =>
    lines.value.reduce((sum, l) => {
      const unit = Number(l.unitAmountPhp)
      const q = Number(l.quantity)
      const lineTotal = (Number.isFinite(unit) ? unit : 0) * (Number.isFinite(q) ? q : 0)
      return sum + lineTotal
    }, 0)
  )

  function addItem (input: Omit<CartLine, 'quantity'> & { quantity?: number }) {
    const normalized = normalizeCartLine({
      ...input,
      unitAmountPhp: Number(input.unitAmountPhp),
      quantity: input.quantity ?? 1
    })
    if (!normalized) return
    const qty = normalized.quantity
    const idx = lines.value.findIndex((l) => l.id === normalized.id)
    if (idx >= 0) {
      const next = [...lines.value]
      const cur = normalizeCartLine(next[idx])
      if (!cur) return
      const mergedQty = Math.min(99, cur.quantity + qty)
      next[idx] = { ...cur, quantity: mergedQty }
      lines.value = next
      return
    }
    lines.value = [...lines.value, normalized]
  }

  function setQuantity (id: string, quantity: number) {
    const q = Math.max(0, Math.min(99, Math.floor(quantity)))
    if (q <= 0) {
      removeItem(id)
      return
    }
    const idx = lines.value.findIndex((l) => l.id === id)
    if (idx < 0) return
    const next = [...lines.value]
    const cur = normalizeCartLine(next[idx])
    if (!cur) return
    next[idx] = { ...cur, quantity: q }
    lines.value = next
  }

  function removeItem (id: string) {
    lines.value = lines.value.filter((l) => l.id !== id)
  }

  function clearCart () {
    lines.value = []
    saveToStorage([])
  }

  return {
    lines,
    itemCount,
    subtotalPhp,
    addItem,
    setQuantity,
    removeItem,
    clearCart
  }
}
