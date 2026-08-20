import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
}

// Module-level shared observer — one instance for the entire app instead of one per element.
// All RevealOnScroll elements register their callback here.
type Callback = () => void
const callbackMap = new Map<Element, Callback>()

let sharedObserver: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cb = callbackMap.get(entry.target)
            if (cb) {
              cb()
              sharedObserver?.unobserve(entry.target)
              callbackMap.delete(entry.target)
            }
          }
        }
      },
      { threshold: 0.15 }
    )
  }
  return sharedObserver
}

export default function RevealOnScroll({ children, delay = 0, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = getObserver()
    callbackMap.set(el, () => {
      setTimeout(() => el.classList.add('visible'), delay)
    })
    observer.observe(el)

    return () => {
      observer.unobserve(el)
      callbackMap.delete(el)
    }
  }, [delay])

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}
