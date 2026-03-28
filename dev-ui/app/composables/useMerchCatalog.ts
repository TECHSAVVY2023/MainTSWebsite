/**
 * Shared merch catalog for the landing Merch section and /merchandise page.
 */
import { SAMPLE_MERCH } from '~/constants/sampleMedia'

export type MerchItem = {
  /** Stable id for cart / checkout */
  id: string
  name: string
  priceLabel: string
  /** Unit price in PHP for cart totals (demo checkout) */
  unitAmountPhp: number
  subtitle?: string
  image?: string
  alt?: string
  /** Optional external product or form link */
  href?: string
}

export const MERCH_CATALOG: MerchItem[] = [
  {
    id: 'season-4-tee',
    name: 'Season 4 community tee',
    priceLabel: 'From ₱549',
    unitAmountPhp: 549,
    subtitle: 'Think smart. Code smart. Official Code Camp Season 4 print.',
    image: SAMPLE_MERCH.tee,
    alt: 'Code Camp Season 4 community t-shirt'
  },
  {
    id: 'tech-savvy-hoodie',
    name: 'Tech Savvy hoodie',
    priceLabel: 'From ₱1,090',
    unitAmountPhp: 1090,
    subtitle: 'Mid-weight fleece, embroidered mark — for meetups and late builds.',
    image: SAMPLE_MERCH.hoodie,
    alt: 'Tech Savvy hoodie'
  },
  {
    id: 'sticker-pin-set',
    name: 'Sticker & pin set',
    priceLabel: 'From ₱180',
    unitAmountPhp: 180,
    subtitle: 'Vinyl stickers and enamel pin — bundle for laptops and lanyards.',
    image: SAMPLE_MERCH.stickers,
    alt: 'Tech Savvy stickers and pin set'
  },
  {
    id: 'community-beanie',
    name: 'Community knit beanie',
    priceLabel: 'From ₱420',
    unitAmountPhp: 420,
    subtitle: 'Soft acrylic knit with woven label — for cool venues and night builds.',
    image: SAMPLE_MERCH.beanie,
    alt: 'Tech Savvy community beanie'
  },
  {
    id: 'canvas-tote',
    name: 'Canvas cohort tote',
    priceLabel: 'From ₱380',
    unitAmountPhp: 380,
    subtitle: 'Heavy cotton canvas, long handles — laptops, hoodies, and event swag.',
    image: SAMPLE_MERCH.tote,
    alt: 'Code Camp canvas tote bag'
  },
  {
    id: 'camp-mug',
    name: 'Ceramic camp mug',
    priceLabel: 'From ₱290',
    unitAmountPhp: 290,
    subtitle: 'Matte glaze with debossed mark — desk companion for stand-ups.',
    image: SAMPLE_MERCH.mug,
    alt: 'Code Camp ceramic mug'
  },
  {
    id: 'insulated-bottle',
    name: 'Insulated water bottle',
    priceLabel: 'From ₱650',
    unitAmountPhp: 650,
    subtitle: 'Double-wall steel, powder coat — keeps drinks cold through long sessions.',
    image: SAMPLE_MERCH.bottle,
    alt: 'Tech Savvy insulated water bottle'
  },
  {
    id: 'field-notebook',
    name: 'Field notes journal',
    priceLabel: 'From ₱220',
    unitAmountPhp: 220,
    subtitle: 'Dot grid, lay-flat binding — sketches, stand-up notes, and API doodles.',
    image: SAMPLE_MERCH.notebook,
    alt: 'Tech Savvy notebook journal'
  }
]

export function useMerchCatalog () {
  return { items: MERCH_CATALOG }
}
