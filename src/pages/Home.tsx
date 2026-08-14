import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { collections, type Project } from '../data/collections'
import RevealOnScroll from '../components/RevealOnScroll'
import Footer from '../components/Footer'
import { useSEO } from '../hooks/useSEO'
import heroImg from '../Photos/EARTH/INFI1450.jpg'

const TABS = ['All Works', 'Design', 'Earth', 'Human', 'Love'] as const
type Tab = (typeof TABS)[number]

// Flatten all projects from all collections for the Selected Work grid
const allProjects: (Project & { collectionName: string })[] = collections.flatMap((c) =>
  c.projects.map((p) => ({ ...p, collectionName: c.name }))
)

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeTab, setActiveTab] = useState<Tab>('All Works')
  const navigate = useNavigate()

  useSEO({
    title: 'Abishkar Joshi',
    description: 'Kathmandu-based photographer and filmmaker. Weddings, portraits, editorial, landscape, and documentary film across Nepal and South Asia.',
    url: '/',
  })

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrollY(y)
      if (y > 80) setScrolled(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const parallaxY = Math.min(scrollY * 0.3, 200)

  const filtered = activeTab === 'All Works'
    ? allProjects
    : allProjects.filter((p) => p.collectionName === activeTab)

  return (
    <div style={{ backgroundColor: 'var(--bone)', fontFamily: 'var(--font-body)' }}>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{ height: '100svh' }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImg}
            alt="Abishkar Joshi"
            className="w-full h-full object-cover"
            style={{ transform: `translateY(${parallaxY}px)`, transition: 'none' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(28,23,18,0.4) 0%, rgba(28,23,18,0.55) 55%, rgba(28,23,18,0.82) 100%)' }}
          />
        </div>

        <div
          ref={contentRef}
          className="parallax-layer relative z-10 h-full flex flex-col justify-end pb-20 px-6 md:px-12 lg:px-20"
          style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
        >
          <p className="text-xs tracking-[0.35em] uppercase mb-6 font-medium" style={{ color: '#ffffff' }}>
            PHOTOGRAPHY · FILMS · DESIGN
          </p>
          <h1
            className="font-light leading-[0.88] mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 12vw, 14rem)',
              color: 'var(--cream)',
              letterSpacing: '-0.02em',
            }}
          >
            Abishkar
            <br />
            <em style={{ fontWeight: 300 }}>Joshi</em>
          </h1>
          <p className="text-base tracking-widest uppercase" style={{ color: 'rgba(245,241,234,0.65)', letterSpacing: '0.2em' }}>
            Visual Storyteller
          </p>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 scroll-indicator transition-opacity duration-500"
          style={{ opacity: scrolled ? 0 : 1 }}
          aria-hidden="true"
        >
          <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, transparent, var(--cream))' }} />
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ color: 'var(--cream)' }}>
            <path d="M1 1L6 7L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ── Statement ─────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
        <RevealOnScroll>
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <div className="w-8 h-px mb-4" style={{ background: 'var(--terracotta)' }} />
              <p className="text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--terracotta)' }}>
                Based in Kathmandu
              </p>
            </div>
            <div>
              <p
                className="font-light leading-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 3vw, 3rem)',
                  color: 'var(--ink)',
                  letterSpacing: '-0.01em',
                }}
              >
                I make images that hold something — a quality of light, a moment of stillness, the texture of a place.
              </p>
              <p className="mt-6 text-sm leading-relaxed" style={{ color: 'rgba(33,29,24,0.6)', maxWidth: '52ch' }}>
                Fifteen years shooting across Nepal and South Asia. Weddings, portraits, landscapes, editorial,
                documentary film. The camera is always in service of the story.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ── Selected Work ─────────────────────────────────────────── */}
      <section
        className="pb-24 md:pb-36"
        style={{ backgroundColor: 'var(--charcoal)' }}
      >
        {/* Header row — matches screenshot exactly */}
        <RevealOnScroll>
          <div className="px-6 md:px-12 lg:px-16 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <h2
              className="font-light shrink-0"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 5vw, 5rem)',
                color: 'var(--cream)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              Selected Work
            </h2>

            {/* Filter tabs — gold active pill, ghost inactive, matching screenshot */}
            <div className="flex flex-wrap gap-2">
              {TABS.map((tab) => {
                const isActive = tab === activeTab
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="text-[10px] tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-250"
                    style={{
                      backgroundColor: isActive ? 'var(--gold)' : 'transparent',
                      borderColor: isActive ? 'var(--gold)' : 'rgba(245,241,234,0.25)',
                      color: isActive ? 'var(--charcoal)' : 'rgba(245,241,234,0.7)',
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {tab}
                  </button>
                )
              })}
            </div>
          </div>
        </RevealOnScroll>

        {/* Masonry grid of projects */}
        <div className="px-6 md:px-12 lg:px-16">
          <div
            className="masonry-grid"
            style={{ columnGap: '8px' }}
          >
            {filtered.map((project, i) => (
              <RevealOnScroll key={`${activeTab}-${project.id}`} delay={i * 50} className="masonry-grid-item">
                <div
                  className="relative group overflow-hidden cursor-pointer"
                  style={{ marginBottom: '8px', backgroundColor: '#0f0c09' }}
                  onClick={() => navigate(`/project/${project.slug}`)}
                  data-cursor-expand
                >
                  <img
                    src={project.coverSrc}
                    alt={project.coverAlt}
                    className="w-full block transition-transform duration-700 group-hover:scale-103"
                    loading="lazy"
                    style={{
                      display: 'block',
                      aspectRatio: i % 3 === 1 ? '3/4' : i % 4 === 0 ? '4/5' : '4/3',
                      objectFit: 'cover',
                    }}
                  />
                  {/* Hover reveal */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-350"
                    style={{ background: 'linear-gradient(to top, rgba(10,8,6,0.88) 0%, transparent 55%)' }}
                  >
                    <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--terracotta)' }}>
                      {project.collectionName} · {project.year}
                    </p>
                    <h3
                      className="font-light"
                      style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: 'var(--cream)', lineHeight: 1.1 }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs mt-1" style={{ color: 'rgba(245,241,234,0.55)' }}>{project.location}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* View all link */}
          <RevealOnScroll>
            <div className="flex justify-center mt-12">
              <Link
                to="/collections"
                className="text-xs tracking-[0.2em] uppercase px-8 py-3.5 border transition-all duration-300"
                style={{ borderColor: 'rgba(245,241,234,0.25)', color: 'rgba(245,241,234,0.7)' }}
                onMouseEnter={(e) => {
                  ; (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)'
                    ; (e.currentTarget as HTMLElement).style.color = 'var(--gold)'
                }}
                onMouseLeave={(e) => {
                  ; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,241,234,0.25)'
                    ; (e.currentTarget as HTMLElement).style.color = 'rgba(245,241,234,0.7)'
                }}
              >
                View all collections
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Pull-quote ────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 md:px-12 lg:px-20 text-center" style={{ backgroundColor: 'var(--bone)' }}>
        <RevealOnScroll>
          <blockquote>
            <p
              className="font-light italic"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 2.5vw, 2.8rem)',
                color: 'var(--ink)',
                maxWidth: '38ch',
                margin: '0 auto 2rem',
                lineHeight: 1.3,
              }}
            >
              "Great visuals are not a product of expensive cameras and lenses. It takes patience, keen observation and knowledge of the people or places in front of the camera lens."
            </p>
            <div className="w-12 h-px mx-auto" style={{ background: 'var(--gold)' }} />
            <p className="mt-6 text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(33,29,24,0.35)' }}>
              Abishkar Joshi
            </p>
          </blockquote>
        </RevealOnScroll>
      </section>

      {/* ── Films teaser ─────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
        <RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-8 h-px mb-6" style={{ background: 'var(--terracotta)' }} />
              <h2
                className="font-light mb-6"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 4rem)',
                  color: 'var(--ink)',
                  lineHeight: 1.05,
                }}
              >
                Moving<br /><em>image</em>
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(33,29,24,0.6)', maxWidth: '40ch' }}>
                Short documentaries, editorial films, and brand work. The same eye as the still work — just with more time to breathe.
              </p>
              <Link
                to="/films"
                className="inline-block text-xs tracking-[0.2em] uppercase px-6 py-3 border transition-all duration-300"
                style={{ borderColor: 'var(--terracotta)', color: 'var(--terracotta)' }}
                onMouseEnter={(e) => {
                  ; (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--terracotta)'
                    ; (e.currentTarget as HTMLElement).style.color = 'var(--cream)'
                }}
                onMouseLeave={(e) => {
                  ; (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                    ; (e.currentTarget as HTMLElement).style.color = 'var(--terracotta)'
                }}
              >
                Watch Films
              </Link>
            </div>
            <div className="relative aspect-video overflow-hidden" style={{ background: 'var(--charcoal)' }}>
              <img
                src="https://images.unsplash.com/photo-1690122644787-d20b6c6b51b9?w=1200&h=675&fit=crop&auto=format"
                alt="Cinematic Himalayan sunset"
                className="w-full h-full object-cover"
                style={{ opacity: 0.85 }}
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Link
                  to="/films"
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                  style={{ background: 'rgba(245,241,234,0.15)', backdropFilter: 'blur(4px)' }}
                  aria-label="Watch films"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="var(--cream)" style={{ marginLeft: '3px' }}>
                    <path d="M4 3L18 10L4 17V3Z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <Footer />
    </div>
  )
}
