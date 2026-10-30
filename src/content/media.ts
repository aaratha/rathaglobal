export interface MediaItem {
  outlet: string
  date: string // YYYY-MM-DD
  title?: string
  description?: string
  cta: 'Listen' | 'Read' | 'Watch'
  // External links open in a new tab; paths starting with '/' stay on site.
  url: string
}

// Newest first is handled by the page, so order here doesn't matter.
export const mediaItems: MediaItem[] = [
  {
    outlet: 'BBC World Service · Business Daily',
    date: '2026-10-19',
    title: 'Follow the Money: The cost of sending money home',
    description: 'With Sam Fenwick and Gideon Long.',
    cta: 'Listen',
    url: 'https://www.bbc.com/audio/play/w3ct8grj',
  },
  {
    outlet: 'The Daily Star',
    date: '2026-10-13',
    title: "Half of Bangladesh's remittance growth may reflect shift from hundi, says Dilip Ratha",
    cta: 'Read',
    url: 'https://www.thedailystar.net/news/work-and-migration/news/half-bangladeshs-remittance-growth-may-reflect-shift-hundi-says-dilip-ratha-4297981',
  },
  {
    outlet: 'Project Syndicate',
    date: '2026-10-05',
    title: 'To Support Nepal, Waive Remittance Fees',
    description: 'Op-ed with Ngozi Okonjo-Iweala.',
    cta: 'Read',
    url: '/blog/to-support-nepal-waive-remittance-fees',
  },
  {
    outlet: 'Bloomberg',
    date: '2026-06-22',
    cta: 'Read',
    url: 'https://www.bloomberg.com/news/articles/2026-06-22/iran-war-puts-uae-saudi-arabia-s-foreign-workers-under-strain',
  },
]
