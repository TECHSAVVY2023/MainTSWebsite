/**
 * Thematic stock images for demo / fallback content (stable Unsplash URLs).
 * Replace with CMS or local /public/assets files in production as needed.
 */
const q = 'auto=format&fit=crop&q=80'

/** When a thumbnail is missing or fails to load */
export const DEFAULT_MEDIA_FALLBACK = `https://images.unsplash.com/photo-1498050108023-c5249f4df085?${q}&w=1200`

export const DEFAULT_NEWS_IMAGE = `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?${q}&w=1200`
export const DEFAULT_COURSE_IMAGE = `https://images.unsplash.com/photo-1633356122544-f134324a6cee?${q}&w=1200`
export const DEFAULT_PROJECT_IMAGE = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?${q}&w=1200`

export const SAMPLE_MERCH = {
  tee: `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?${q}&w=800`,
  hoodie: `https://images.unsplash.com/photo-1620799140408-fcc09b81e6e2?${q}&w=800`,
  stickers: `https://images.unsplash.com/photo-1611532736597-de2d4265fba3?${q}&w=800`,
  beanie: `https://images.unsplash.com/photo-1576871337622-98d48a1ced01?${q}&w=800`,
  tote: `https://images.unsplash.com/photo-1590874103328-eac38a683ce7?${q}&w=800`,
  mug: `https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?${q}&w=800`,
  bottle: `https://images.unsplash.com/photo-1523362628745-0f58cd2cabe5?${q}&w=800`,
  notebook: `https://images.unsplash.com/photo-1517842645767-c639b880afb6?${q}&w=800`
} as const

export const SAMPLE_NEWS = {
  codecamp: `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?${q}&w=1200`,
  demoNight: `https://images.unsplash.com/photo-1540575467063-178a50c2df87?${q}&w=1200`,
  mentor: `https://images.unsplash.com/photo-1524178232363-8983f799f945?${q}&w=1200`,
  success: `https://images.unsplash.com/photo-1522071820081-009f0129c71c?${q}&w=1200`
} as const

export const SAMPLE_PROJECTS = {
  ecommerce: `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?${q}&w=1200`,
  books: `https://images.unsplash.com/photo-1507842217343-583bb7270b66?${q}&w=1200`,
  farm: `https://images.unsplash.com/photo-1542838132-92c53300491e?${q}&w=1200`,
  lms: `https://images.unsplash.com/photo-1501504905252-033d90b36a7d?${q}&w=1200`
} as const

export const SAMPLE_COURSES = {
  frontend: `https://images.unsplash.com/photo-1633356122544-f134324a6cee?${q}&w=1200`,
  backend: `https://images.unsplash.com/photo-1558494949-ef010cbdcc31?${q}&w=1200`,
  nuxt: `https://images.unsplash.com/photo-1593720213428-28b5b18e9a98?${q}&w=1200`,
  devops: `https://images.unsplash.com/photo-1451187580459-43490279c0fa?${q}&w=1200`
} as const

/** Square-friendly crops for sponsor / partner “logo” tiles */
const sq = `${q}&w=400&h=400`

export const SAMPLE_BRAND_LOGOS = {
  codebev: '/assets/codebev-logo.png',
  cloud: `https://images.unsplash.com/photo-1451187580459-43490279c0fa?${sq}`,
  diversity: `https://images.unsplash.com/photo-1522071820081-009f0129c71c?${sq}`,
  youth: `https://images.unsplash.com/photo-1503676260728-1c00da094a0b?${sq}`,
  openSource: `https://images.unsplash.com/photo-1555066931-4365d14bab8c?${sq}`,
  green: `https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?${sq}`,
  devrel: `https://images.unsplash.com/photo-1475721027785-f74eccf877e2?${sq}`,
  print: `https://images.unsplash.com/photo-1582735689369-4fe89db7114c?${sq}`,
  venue: `https://images.unsplash.com/photo-1497366216548-37526070297c?${sq}`,
  education: `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?${sq}`,
  advocacy: `https://images.unsplash.com/photo-1556761175-5973dc0f32e7?${sq}`,
  coffee: `https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?${sq}`,
  campus: `https://images.unsplash.com/photo-1523240795612-9a054b0db644?${sq}`,
  startup: `https://images.unsplash.com/photo-1553877522-43269d4ea984?${sq}`,
  freelance: `https://images.unsplash.com/photo-1521737604893-d14cc237f11d?${sq}`
} as const
