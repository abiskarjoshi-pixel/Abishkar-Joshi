import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: 'var(--charcoal)', fontFamily: 'var(--font-body)' }}
    >
      <p
        className="font-light mb-4"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(6rem, 20vw, 18rem)',
          color: 'rgba(245,241,234,0.06)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        404
      </p>
      <div className="relative" style={{ marginTop: '-4rem' }}>
        <div className="w-8 h-px mx-auto mb-6" style={{ background: 'var(--terracotta)' }} />
        <h1
          className="font-light mb-4"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            color: 'var(--cream)',
          }}
        >
          Lost in the mountains
        </h1>
        <p className="text-sm mb-10" style={{ color: 'rgba(245,241,234,0.5)' }}>
          This page doesn't exist — or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="text-xs tracking-[0.2em] uppercase px-6 py-3 border transition-all duration-300 hover:bg-[#B5583A] hover:border-[#B5583A] hover:text-[#F5F1EA]"
            style={{ borderColor: 'var(--terracotta)', color: 'var(--terracotta)' }}
          >
            Go home
          </Link>
          <Link
            to="/collections"
            className="text-xs tracking-[0.2em] uppercase px-6 py-3 border transition-all duration-300"
            style={{ borderColor: 'rgba(245,241,234,0.2)', color: 'rgba(245,241,234,0.5)' }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,241,234,0.5)'
              ;(e.currentTarget as HTMLElement).style.color = 'var(--cream)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,241,234,0.2)'
              ;(e.currentTarget as HTMLElement).style.color = 'rgba(245,241,234,0.5)'
            }}
          >
            Browse work
          </Link>
        </div>
      </div>
    </div>
  )
}
