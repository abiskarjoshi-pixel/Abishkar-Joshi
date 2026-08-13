import { Link } from 'react-router-dom'
import { collections } from '../data/collections'
import RevealOnScroll from '../components/RevealOnScroll'
import Footer from '../components/Footer'
import { useSEO } from '../hooks/useSEO'

export default function Collections() {
  useSEO({
    title: 'Collections',
    description: 'Five bodies of work — Human, Love, Earth, Motion, Craft. Photography across Nepal and South Asia by Abishkar Joshi.',
    url: '/collections',
  })
  return (
    <div style={{ backgroundColor: 'var(--bone)', fontFamily: 'var(--font-body)' }}>
      <div className="pt-32 pb-16 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
        <RevealOnScroll>
          <div className="mb-16">
            <div className="w-8 h-px mb-4" style={{ background: 'var(--terracotta)' }} />
            <h1
              className="font-light"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 8vw, 8rem)',
                color: 'var(--ink)',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
              }}
            >
              Collections
            </h1>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {collections.map((col, i) => (
            <RevealOnScroll key={col.slug} delay={i * 60}>
              <Link
                to={`/collections/${col.slug}`}
                className="collection-tile group block relative overflow-hidden"
                style={{
                  background: 'var(--charcoal)',
                  aspectRatio: i % 3 === 0 ? '4/5' : i % 3 === 1 ? '3/4' : '1/1',
                }}
              >
                <img
                  src={col.coverSrc}
                  alt={col.coverAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(28,23,18,0.8) 0%, rgba(28,23,18,0.15) 60%, transparent 100%)' }}
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'rgba(28,23,18,0.3)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--terracotta)' }}>
                    {col.projects.length} {col.projects.length === 1 ? 'project' : 'projects'}
                  </p>
                  <h2
                    className="font-light mb-2"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2rem, 4vw, 4rem)',
                      color: 'var(--cream)',
                      lineHeight: 1,
                    }}
                  >
                    {col.name}
                  </h2>
                  <p className="text-sm mb-4" style={{ color: 'rgba(245,241,234,0.65)' }}>
                    {col.description}
                  </p>
                  <div className="collection-tile-line" />
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
