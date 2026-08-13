import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true)
      return
    }

    const el = cursorRef.current
    if (!el) return

    let raf: number
    let x = -100, y = -100

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element
      const clickable = target.closest('a, button, [data-cursor-expand]')
      setExpanded(!!clickable)
    }

    const loop = () => {
      if (el) el.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (isTouch) return null

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor${expanded ? ' expanded' : ''}`}
      aria-hidden="true"
    />
  )
}
