import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const collectionLinks = [
  { href: '/collections/design', label: 'Design' },
  { href: '/collections/earth', label: 'Earth' },
  { href: '/collections/human', label: 'Human' },
  { href: '/collections/love', label: 'Love' },
]

const topLinks = [
  { href: '/films', label: 'Films' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [collectionsOpen, setCollectionsOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setCollectionsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const solid = scrolled || !isHome
  const navBg = solid
    ? 'border-b'
    : 'bg-transparent border-b border-transparent'
  const solidStyle = solid
    ? { backgroundColor: 'var(--bone)', borderColor: 'rgba(181,88,58,0.25)' }
    : {}
  const textColor = solid ? 'var(--ink)' : 'var(--cream)'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
        style={{ fontFamily: 'var(--font-body)', ...solidStyle }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-14 flex items-center gap-6">
          {/* Wordmark */}
          <Link
            to="/"
            className="tracking-[0.25em] text-sm font-medium uppercase shrink-0 transition-colors"
            style={{ fontFamily: 'var(--font-display)', color: textColor, letterSpacing: '0.22em' }}
          >
            Abishkar
          </Link>

          {/* Desktop nav — split into collections + utility */}
          <div className="hidden lg:flex items-center gap-0 flex-1 ml-4">
            {/* Collections group with dropdown hint */}
            <div
              className="relative"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <Link
                to="/collections"
                className="nav-link text-[10px] tracking-[0.22em] uppercase px-3 py-1 transition-colors"
                style={{ color: textColor }}
              >
                Collections
              </Link>
              {/* Dropdown */}
              <div
                className="absolute top-full left-0 pt-3 transition-all duration-200"
                style={{
                  opacity: collectionsOpen ? 1 : 0,
                  pointerEvents: collectionsOpen ? 'all' : 'none',
                  transform: collectionsOpen ? 'translateY(0)' : 'translateY(-6px)',
                }}
              >
                <div
                  className="py-3 px-1 min-w-[140px] border"
                  style={{
                    backgroundColor: 'var(--bone)',
                    borderColor: 'rgba(33,29,24,0.1)',
                    boxShadow: '0 8px 32px rgba(33,29,24,0.08)',
                  }}
                >
                  {collectionLinks.map((l) => (
                    <Link
                      key={l.href}
                      to={l.href}
                      className="block px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition-colors hover:text-[#B5583A]"
                      style={{ color: 'var(--ink)' }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <span className="mx-1 opacity-20" style={{ color: textColor, fontSize: 10 }}>·</span>

            {collectionLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="nav-link text-[10px] tracking-[0.22em] uppercase px-3 py-1 transition-colors"
                style={{ color: textColor }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right utility links */}
          <div className="hidden lg:flex items-center gap-1 ml-auto">
            {topLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="nav-link text-[10px] tracking-[0.22em] uppercase px-3 py-1 transition-colors"
                style={{ color: textColor }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Tablet: condensed */}
          <div className="hidden md:flex lg:hidden items-center gap-5 ml-auto">
            <Link to="/collections" className="nav-link text-[10px] tracking-[0.2em] uppercase" style={{ color: textColor }}>Collections</Link>
            <Link to="/films" className="nav-link text-[10px] tracking-[0.2em] uppercase" style={{ color: textColor }}>Films</Link>
            <Link to="/about" className="nav-link text-[10px] tracking-[0.2em] uppercase" style={{ color: textColor }}>About</Link>
            <Link to="/contact" className="nav-link text-[10px] tracking-[0.2em] uppercase" style={{ color: textColor }}>Contact</Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 ml-auto"
            style={{ color: textColor }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="block w-5 h-px bg-current transition-transform duration-300"
              style={{ transform: menuOpen ? 'translateY(5px) rotate(45deg)' : 'none' }} />
            <span className="block w-5 h-px bg-current transition-opacity duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-5 h-px bg-current transition-transform duration-300"
              style={{ transform: menuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Navigation">
        <Link to="/" className="mobile-menu-link" style={{ transitionDelay: '0.05s' }}>Home</Link>
        {collectionLinks.map((l, i) => (
          <Link key={l.href} to={l.href} className="mobile-menu-link"
            style={{ transitionDelay: `${(i + 2) * 0.05}s`, fontSize: 'clamp(1.4rem, 5vw, 3rem)' }}>
            {l.label}
          </Link>
        ))}
        {topLinks.map((l, i) => (
          <Link key={l.href} to={l.href} className="mobile-menu-link"
            style={{ transitionDelay: `${(i + collectionLinks.length + 2) * 0.05}s` }}>
            {l.label}
          </Link>
        ))}
      </div>
    </>
  )
}
