const SITE_URL = 'https://www.rathaglobal.com'
const DEFAULT_IMAGE = `${SITE_URL}/ratha_global_bg.png`

export interface MetaOptions {
  title: string
  description: string
  path?: string
  image?: string
}

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function setMeta({ title, description, path = '/', image = DEFAULT_IMAGE }: MetaOptions) {
  const url = `${SITE_URL}${path}`

  document.title = title

  setMetaTag('name', 'description', description)
  setMetaTag('property', 'og:title', title)
  setMetaTag('property', 'og:description', description)
  setMetaTag('property', 'og:url', url)
  setMetaTag('property', 'og:image', image)
  setMetaTag('name', 'twitter:title', title)
  setMetaTag('name', 'twitter:description', description)
  setMetaTag('name', 'twitter:image', image)

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', url)
}
