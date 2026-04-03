/**
 * Default / fallback media URLs for the Nuxt app (placeholders when CMS has no image).
 * No payment or API secrets — those live only in the Django API `.env`.
 */

const unsplashQuery = 'auto=format&fit=crop&q=80'

/** Hero/card fallback when a thumbnail is missing or fails to load */
export const DEFAULT_MEDIA_FALLBACK = `https://images.unsplash.com/photo-1498050108023-c5249f4df085?${unsplashQuery}&w=1200`

export const DEFAULT_NEWS_IMAGE = `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?${unsplashQuery}&w=1200`
export const DEFAULT_COURSE_IMAGE = `https://images.unsplash.com/photo-1633356122544-f134324a6cee?${unsplashQuery}&w=1200`
export const DEFAULT_PROJECT_IMAGE = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?${unsplashQuery}&w=1200`

/** Static merch demo images when CMS catalog is empty */
export const MERCH_CATALOG_IMAGE_URLS = {
  tee: `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?${unsplashQuery}&w=800`,
  hoodie: `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?${unsplashQuery}&w=800`,
  stickers: `https://images.unsplash.com/photo-1611532736597-de2d4265fba3?${unsplashQuery}&w=800`,
  beanie: `https://images.unsplash.com/photo-1521369909029-2afed882baee?${unsplashQuery}&w=800`,
  tote: `https://images.unsplash.com/photo-1590874103328-eac38a683ce7?${unsplashQuery}&w=800`,
  mug: `https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?${unsplashQuery}&w=800`,
  bottle: `https://images.unsplash.com/photo-1602143407151-7111542de6e8?${unsplashQuery}&w=800`,
  notebook: `https://images.unsplash.com/photo-1503602642458-232111445657?${unsplashQuery}&w=800`
} as const

/** Landing news section fallback when CMS returns no items */
export const LANDING_FALLBACK_NEWS_IMAGES = {
  codecamp: `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?${unsplashQuery}&w=1200`,
  demoNight: `https://images.unsplash.com/photo-1540575467063-178a50c2df87?${unsplashQuery}&w=1200`,
  mentor: `https://images.unsplash.com/photo-1524178232363-8983f799f945?${unsplashQuery}&w=1200`,
  success: `https://images.unsplash.com/photo-1522071820081-009f0129c71c?${unsplashQuery}&w=1200`
} as const

/** Landing featured projects fallback */
export const LANDING_FALLBACK_PROJECT_IMAGES = {
  ecommerce: `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?${unsplashQuery}&w=1200`,
  books: `https://images.unsplash.com/photo-1507842217343-583bb7270b66?${unsplashQuery}&w=1200`,
  farm: `https://images.unsplash.com/photo-1542838132-92c53300491e?${unsplashQuery}&w=1200`,
  lms: `https://images.unsplash.com/photo-1501504905252-033d90b36a7d?${unsplashQuery}&w=1200`
} as const

/** Landing courses preview fallback */
export const LANDING_FALLBACK_COURSE_IMAGES = {
  frontend: `https://images.unsplash.com/photo-1633356122544-f134324a6cee?${unsplashQuery}&w=1200`,
  backend: `https://images.unsplash.com/photo-1558494949-ef010cbdcc31?${unsplashQuery}&w=1200`,
  nuxt: `https://images.unsplash.com/photo-1593720213428-28b5b18e9a98?${unsplashQuery}&w=1200`,
  devops: `https://images.unsplash.com/photo-1451187580459-43490279c0fa?${unsplashQuery}&w=1200`
} as const

/** Square crops for sponsor / partner logo tiles when CMS has no logos */
const squareCrop = `${unsplashQuery}&w=400&h=400`

export const LANDING_FALLBACK_PARTNER_LOGOS = {
  codebev: '/assets/codebev-logo.png',
  cloud: `https://images.unsplash.com/photo-1451187580459-43490279c0fa?${squareCrop}`,
  diversity: `https://images.unsplash.com/photo-1522071820081-009f0129c71c?${squareCrop}`,
  youth: `https://images.unsplash.com/photo-1503676260728-1c00da094a0b?${squareCrop}`,
  openSource: `https://images.unsplash.com/photo-1555066931-4365d14bab8c?${squareCrop}`,
  green: `https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?${squareCrop}`,
  devrel: `https://images.unsplash.com/photo-1475721027785-f74eccf877e2?${squareCrop}`,
  print: `https://images.unsplash.com/photo-1582735689369-4fe89db7114c?${squareCrop}`,
  venue: `https://images.unsplash.com/photo-1497366216548-37526070297c?${squareCrop}`,
  education: `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?${squareCrop}`,
  advocacy: `https://images.unsplash.com/photo-1556761175-5973dc0f32e7?${squareCrop}`,
  coffee: `https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?${squareCrop}`,
  campus: `https://images.unsplash.com/photo-1523240795612-9a054b0db644?${squareCrop}`,
  startup: `https://images.unsplash.com/photo-1553877522-43269d4ea984?${squareCrop}`,
  freelance: `https://images.unsplash.com/photo-1521737604893-d14cc237f11d?${squareCrop}`
} as const
