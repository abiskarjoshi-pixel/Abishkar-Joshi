import { useEffect, useRef, useState } from 'react'
import RevealOnScroll from '../components/RevealOnScroll'
import Footer from '../components/Footer'
import { useSEO } from '../hooks/useSEO'
import abishkarImg from '../Abishkar.jpg'

const lines = [
  'Artist working out of Nepal — photography, films & design.',
  'Capturing candid moments, genuine expressions & natural lighting.',
  'Keep it simple, intentional & genuine.',
]

function TypeInLine({ text, active }: { text: string; active: boolean }) {
  const [displayed, setDisplayed] = useState('')
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!active || reduced) {
      setDisplayed(text)
      return
    }
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [active, text, reduced])

  return <span>{displayed}</span>
}

function TypeInSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true)
        obs.unobserve(el)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => {
      if (lineIndex < lines.length - 1) setLineIndex((i) => i + 1)
    }, lines[lineIndex].length * 40 + 400)
    return () => clearTimeout(t)
  }, [active, lineIndex])

  return (
    <div ref={ref} className="space-y-4">
      {lines.map((line, i) => (
        <p
          key={i}
          className="text-sm leading-relaxed"
          style={{
            color: 'rgba(33,29,24,0.65)',
            opacity: i <= lineIndex || !active ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          {i <= lineIndex ? <TypeInLine text={line} active={i === lineIndex && active} /> : null}
        </p>
      ))}
    </div>
  )
}

export default function About() {
  useSEO({
    title: 'About',
    description: 'Artist working out of Nepal, specialising in photography, films and design. Photography, films, and visual branding.',
    url: '/about',
  })
  return (
    <div style={{ backgroundColor: 'var(--bone)', fontFamily: 'var(--font-body)' }}>
      {/* Background Image Hero with Left-aligned Text */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ paddingTop: '4rem' }}>
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={abishkarImg}
            alt="Abishkar Joshi"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark Overlay for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(15,12,9,0.92) 0%, rgba(15,12,9,0.85) 45%, rgba(15,12,9,0.4) 100%)',
            }}
          />
        </div>

        {/* Content Overlaid on Left */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-[650px]">
            <RevealOnScroll>
              <div className="w-8 h-px mb-8" style={{ background: 'var(--terracotta)' }} />
              <h1
                className="font-light mb-8"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                  color: 'var(--cream)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                }}
              >
                Abishkar<br /><em style={{ fontStyle: 'italic' }}>Joshi</em>
              </h1>
              <div className="space-y-5 text-sm md:text-base leading-relaxed" style={{ color: 'rgba(245,241,234,0.88)' }}>
                <p>
                  I am an artist working out of Nepal, specialising in photography, films and design. In my career thus far, I have gotten the opportunity to capture various events, ranging from intimate weddings and fashion editorials to tranquil landscapes and portraitures.
                </p>
                <p>
                  I like capturing candid moments—genuine expressions, natural lighting and the stories revealed through them. Whether I am capturing people in a photograph, making a film or designing visual branding, my philosophy remains the same—keep it simple, intentional and genuine.
                </p>
                <p>
                  Great visuals are not a product of expensive cameras and lenses. It takes patience, keen observation and knowledge of the people or places in front of the camera lens.
                </p>
                <p>
                  This platform is a compilation of the work that inspires me—the people, places, emotions and ideas that I have been blessed to create over the course of my career.
                </p>
                <p className="font-medium pt-2" style={{ color: 'var(--gold)' }}>
                  Thank you for visiting.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Type-in section */}
      <section className="py-24 md:py-36 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
        <RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-8 h-px mb-6" style={{ background: 'var(--terracotta)' }} />
              <h2
                className="font-light italic"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 3rem)',
                  color: 'var(--ink)',
                  lineHeight: 1.2,
                }}
              >
                In three sentences
              </h2>
            </div>
            <TypeInSection />
          </div>
        </RevealOnScroll>
      </section>

      {/* Services */}
      <section
        className="py-24 md:py-36 px-6 md:px-12 lg:px-20"
        style={{ backgroundColor: 'var(--charcoal)' }}
      >
        <div className="max-w-[1440px] mx-auto">
          <RevealOnScroll>
            <h2
              className="font-light mb-16"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 4rem)',
                color: 'var(--cream)',
              }}
            >
              What I do
            </h2>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-px" style={{ background: 'rgba(245,241,234,0.08)' }}>
            {[
              { title: 'Weddings', desc: 'Full coverage from ceremony to celebration. Candid-led, respectful of the ritual.' },
              { title: 'Editorial & Fashion', desc: 'Commercial commissions for brands, collectives, and publications.' },
              { title: 'Landscape & Travel', desc: 'Nepal, India, Southeast Asia. Long-form assignments and personal work.' },
              { title: 'Portraits', desc: 'Environmental and studio. Individuals, families, and corporate.' },
              { title: 'Documentary Film', desc: 'Short-form documentary, brand film, and event coverage.' },
              { title: 'Design', desc: 'Visual identity and art direction for small studios and cultural organisations.' },
            ].map((item, i) => (
              <RevealOnScroll key={i} delay={i * 60}>
                <div className="p-8 md:p-10" style={{ background: 'var(--charcoal)' }}>
                  <h3
                    className="font-light mb-3"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.4rem',
                      color: 'var(--cream)',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,241,234,0.55)' }}>
                    {item.desc}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
