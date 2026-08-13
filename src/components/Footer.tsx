export default function Footer() {
  return (
    <footer
      className="py-12 px-6 md:px-12"
      style={{ backgroundColor: 'var(--forest)', fontFamily: 'var(--font-body)' }}
    >
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span
          className="text-sm tracking-[0.2em] uppercase"
          style={{ color: 'var(--cream)', fontFamily: 'var(--font-display)', opacity: 0.7 }}
        >
          Abishkar Joshi
        </span>

        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com/abishkarjoshi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.15em] uppercase transition-opacity hover:opacity-100"
            style={{ color: 'var(--cream)', opacity: 0.6 }}
          >
            Instagram
          </a>
          <a
            href="https://behance.net/abishkarjoshi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.15em] uppercase transition-opacity hover:opacity-100"
            style={{ color: 'var(--cream)', opacity: 0.6 }}
          >
            Behance
          </a>
          <a
            href="mailto:hello@abishkarjoshi.com"
            className="text-xs tracking-[0.15em] uppercase transition-opacity hover:opacity-100"
            style={{ color: 'var(--cream)', opacity: 0.6 }}
          >
            Email
          </a>
        </div>

        <span className="text-xs" style={{ color: 'var(--cream)', opacity: 0.4 }}>
          © 2026 Abishkar Joshi
        </span>
      </div>
    </footer>
  )
}
