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
      {/* Hero split */}
      <div className="min-h-[90vh] grid md:grid-cols-2" style={{ paddingTop: '4rem' }}>
        {/* Portrait */}
        <div className="relative flex items-center justify-center p-4 md:p-8 min-h-[60vh] md:min-h-[85vh]" style={{ backgroundColor: 'var(--charcoal)' }}>
          <img
            src={abishkarImg}
            alt="Abishkar Joshi — portrait"
            className="w-full h-auto max-h-[85vh] object-contain"
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col justify-end px-8 md:px-16 py-16 md:py-24">
          <RevealOnScroll>
            <div className="w-8 h-px mb-8" style={{ background: 'var(--terracotta)' }} />
            <h1
              className="font-light mb-8"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                color: 'var(--ink)',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
              }}
            >
              Abishkar<br /><em>Joshi</em>
            </h1>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(33,29,24,0.75)', maxWidth: '50ch' }}>
              I am an artist working out of Nepal, specialising in photography, films and design. In my career thus far, I have gotten the opportunity to capture various events, ranging from intimate weddings and fashion editorials to tranquil landscapes and portraitures.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(33,29,24,0.65)', maxWidth: '50ch' }}>
              I like capturing candid moments—genuine expressions, natural lighting and the stories revealed through them. Whether I am capturing people in a photograph, making a film or designing visual branding, my philosophy remains the same—keep it simple, intentional and genuine.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(33,29,24,0.65)', maxWidth: '50ch' }}>
              Great visuals are not a product of expensive cameras and lenses. It takes patience, keen observation and knowledge of the people or places in front of the camera lens.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(33,29,24,0.65)', maxWidth: '50ch' }}>
              This platform is a compilation of the work that inspires me—the people, places, emotions and ideas that I have been blessed to create over the course of my career.
            </p>
            <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--terracotta)', maxWidth: '50ch' }}>
              Thank you for visiting.
            </p>
          </RevealOnScroll>
        </div>
      </div>

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
