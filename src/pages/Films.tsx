import { useState } from 'react'
import { films } from '../data/collections'
import RevealOnScroll from '../components/RevealOnScroll'
import Footer from '../components/Footer'
import { useSEO } from '../hooks/useSEO'

export default function Films() {
  useSEO({
    title: 'Films',
    description: 'Short documentaries, editorial films, and brand work by Abishkar Joshi — photographer and filmmaker based in Kathmandu.',
    url: '/films',
  })
  const [activeFilm, setActiveFilm] = useState<string | null>(null)
  const [hoverFilm, setHoverFilm] = useState<string | null>(null)

  const openModal = (id: string) => {
    setActiveFilm(id)
    document.body.style.overflow = 'hidden'
  }
  const closeModal = () => {
    setActiveFilm(null)
    document.body.style.overflow = ''
  }

  const activeData = films.find((f) => f.id === activeFilm)

  return (
    <div style={{ backgroundColor: 'var(--charcoal)', fontFamily: 'var(--font-body)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="pt-32 pb-16 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
        <RevealOnScroll>
          <div className="mb-4 w-8 h-px" style={{ background: 'var(--terracotta)' }} />
          <h1
            className="font-light"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              color: 'var(--cream)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
            }}
          >
            Films
          </h1>
          <p className="mt-6 text-sm" style={{ color: 'rgba(245,241,234,0.5)', maxWidth: '48ch' }}>
            Short documentaries, editorial films, and brand work — the same eye as the still photography, with more time to breathe.
          </p>
        </RevealOnScroll>
      </div>

      {/* Films grid */}
      <div className="pb-24 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {films.map((film, i) => (
            <RevealOnScroll key={film.id} delay={i * 80}>
              <div
                className="relative group overflow-hidden cursor-pointer"
                style={{ backgroundColor: '#0a0906', aspectRatio: '16/9' }}
                onClick={() => openModal(film.id)}
                onMouseEnter={() => setHoverFilm(film.id)}
                onMouseLeave={() => setHoverFilm(null)}
                data-cursor-expand
              >
                <img
                  src={film.coverSrc}
                  alt={film.coverAlt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:opacity-70"
                  loading="lazy"
                  style={{
                    opacity: hoverFilm === film.id ? 0.7 : 1,
                    transform: hoverFilm === film.id ? 'scale(1.04)' : 'scale(1)',
                    transition: 'opacity 0.5s ease, transform 0.7s ease',
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(10,9,6,0.9) 0%, rgba(10,9,6,0.2) 50%, transparent 100%)' }}
                />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: hoverFilm === film.id ? 'var(--terracotta)' : 'rgba(245,241,234,0.15)',
                      backdropFilter: 'blur(4px)',
                      transform: hoverFilm === film.id ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--cream)" style={{ marginLeft: '3px' }}>
                      <path d="M3 2L14 8L3 14V2Z" />
                    </svg>
                  </div>
                </div>

                {/* Film info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--terracotta)' }}>
                    {film.year} · {film.duration}
                  </p>
                  <h2
                    className="font-light"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                      color: 'var(--cream)',
                      lineHeight: 1.1,
                    }}
                  >
                    {film.title}
                  </h2>
                  <p className="text-xs mt-1" style={{ color: 'rgba(245,241,234,0.55)' }}>
                    {film.subtitle}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* Video modal */}
      <div
        className={`video-modal${activeFilm ? ' open' : ''}`}
        onClick={closeModal}
        role="dialog"
        aria-modal="true"
        aria-label={activeData?.title}
      >
        <button
          className="absolute top-6 right-6 z-10 text-xs tracking-[0.2em] uppercase flex items-center gap-2"
          style={{ color: 'rgba(245,241,234,0.7)' }}
          onClick={closeModal}
          aria-label="Close"
        >
          <span>Close</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {activeData && (
          <div
            className="w-full max-w-4xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative" style={{ paddingBottom: '56.25%', background: '#000' }}>
              {activeFilm && (
                <iframe
                  src={`https://www.youtube.com/embed/${activeData.videoId}?autoplay=1&controls=1&rel=0`}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title={activeData.title}
                />
              )}
            </div>
            <div className="mt-4">
              <h2
                className="font-light text-xl"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)' }}
              >
                {activeData.title}
              </h2>
              <p className="text-xs mt-1" style={{ color: 'rgba(245,241,234,0.5)' }}>
                {activeData.description}
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
