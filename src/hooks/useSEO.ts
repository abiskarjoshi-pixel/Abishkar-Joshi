import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  image?: string
  url?: string
}

const BASE_URL = 'https://abishkarjoshi.com'
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1696149479584-d2506b811ba2?w=1200&h=630&fit=crop&auto=format'

export function useSEO({ title, description, image = DEFAULT_IMAGE, url = '' }: SEOProps) {
  useEffect(() => {
    const fullTitle = title === 'Abishkar Joshi' ? title : `${title} — Abishkar Joshi`
    document.title = fullTitle

    const setMeta = (name: string, content: string, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.content = content
    }

    setMeta('description', description)
    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:image', image, 'property')
    setMeta('og:url', `${BASE_URL}${url}`, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', image)
  }, [title, description, image, url])
}
