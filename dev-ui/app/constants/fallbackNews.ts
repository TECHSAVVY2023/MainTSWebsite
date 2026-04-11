/**
 * Demo news rows when the CMS list is empty or unavailable.
 * Kept in sync with the landing strip; detail + list pages merge these for slug lookup.
 */
import { SAMPLE_NEWS } from './sampleMedia'

export type FallbackNewsItem = {
  id: string
  date: string
  title: string
  summary: string
  description: string
  imageUrl: string
  link: string
}

export const FALLBACK_NEWS_ITEMS: FallbackNewsItem[] = [
  {
    id: 'sample-news-1',
    date: '2026-03-10',
    title: 'Code Camp Batch Opens',
    summary: 'Applications are now open for the next full-stack learning batch.',
    description:
      'Applications are now open for the next full-stack learning batch with guided mentorship and practical project work.',
    imageUrl: SAMPLE_NEWS.codecamp,
    link: '/news'
  },
  {
    id: 'sample-news-2',
    date: '2026-03-05',
    title: 'Community Demo Night',
    summary: 'Learners showcased portfolio projects to mentors and peers.',
    description:
      'Learners showcased portfolio projects to mentors and peers during our monthly community demo night.',
    imageUrl: SAMPLE_NEWS.demoNight,
    link: '/news'
  },
  {
    id: 'sample-news-3',
    date: '2026-02-28',
    title: 'Mentor Spotlight Series',
    summary: 'A new talk series on modern frontend and backend workflows.',
    description:
      'A new talk series featuring practical sessions on modern frontend and backend development workflows.',
    imageUrl: SAMPLE_NEWS.mentor,
    link: '/news'
  },
  {
    id: 'sample-news-4',
    date: '2026-02-20',
    title: 'Student Success Stories',
    summary: 'Graduates shared real project journeys and career progress.',
    description:
      'Recent graduates shared real project journeys, lessons learned, and their career progress in tech.',
    imageUrl: SAMPLE_NEWS.success,
    link: '/news'
  }
]
