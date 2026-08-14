import { useParams, Link } from 'react-router-dom'
import { getProjectBySlug, getNextProject } from '../data/collections'
import RevealOnScroll from '../components/RevealOnScroll'
import Footer from '../components/Footer'
import { useSEO } from '../hooks/useSEO'
import PinterestGrid from '../components/PinterestGrid'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  const next = project ? getNextProject(project.slug) : undefined

  useSEO({
    title: project ? project.title : 'Project',
    description: project
      ? `${project.description.slice(0, 140)}…`
      : 'Photography project by Abishkar Joshi.',
    image: project?.coverSrc,
    url: `/project/${slug}`,
  })

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bone)' }}>
        <div className="text-center">
          <p className="text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--terracotta)' }}>Project not found</p>
          <Link to="/collections" className="text-xs tracking-[0.2em] uppercase nav-link" style={{ color: 'var(--ink)' }}>
            Back to Collections
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'var(--bone)', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div className="pt-32 pb-16 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
        <Link
          to={`/collections/${project.collectionSlug}`}
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase mb-10 transition-opacity hover:opacity-70"
          style={{ color: 'var(--terracotta)' }}
        >
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M15 5H1M5 1L1 5L5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {project.collection}
        </Link>

        <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-end">
          <div>
            <h1
              className="font-light"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 7rem)',
                color: 'var(--ink)',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
              }}
            >
              {project.title}
            </h1>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--terracotta)' }}>Year</p>
              <p className="text-sm" style={{ color: 'var(--ink)' }}>{project.year}</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--terracotta)' }}>Location</p>
              <p className="text-sm" style={{ color: 'var(--ink)' }}>{project.location}</p>
            </div>
            {project.client && (
              <div>
                <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--terracotta)' }}>Client</p>
                <p className="text-sm" style={{ color: 'var(--ink)' }}>{project.client}</p>
              </div>
            )}
            {project.gear && (
              <div>
                <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--terracotta)' }}>Gear</p>
                <p className="text-sm" style={{ color: 'var(--ink)' }}>{project.gear}</p>
              </div>
            )}
            {project.colorStory && (
              <div>
                <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--terracotta)' }}>Colour Story</p>
                <p className="text-sm italic" style={{ color: 'var(--ink)', fontFamily: 'var(--font-display)' }}>
                  {project.colorStory}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 max-w-[60ch]">
          <div className="w-8 h-px mb-6" style={{ background: 'var(--terracotta)' }} />
          <p className="text-base leading-relaxed" style={{ color: 'rgba(33,29,24,0.75)' }}>
            {project.description}
          </p>
        </div>
      </div>

      {/* Pinterest style image grid */}
      <PinterestGrid photos={project.photos} />


      {/* Next project */}
      {next && (
        <div className="py-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="w-full h-px mb-16" style={{ background: 'rgba(33,29,24,0.12)' }} />
            <p className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: 'var(--terracotta)' }}>Next Project</p>
            <Link
              to={`/project/${next.slug}`}
              className="group flex items-center gap-6"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 overflow-hidden flex-shrink-0" style={{ backgroundColor: 'var(--charcoal)' }}>
                <img
                  src={next.coverSrc}
                  alt={next.coverAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div>
                <h2
                  className="font-light group-hover:italic transition-all duration-300"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 3vw, 3rem)',
                    color: 'var(--ink)',
                    lineHeight: 1.1,
                  }}
                >
                  {next.title}
                </h2>
                <p className="text-xs tracking-widest uppercase mt-2" style={{ color: 'rgba(33,29,24,0.5)' }}>
                  {next.collection} · {next.year}
                </p>
              </div>
              <svg
                className="ml-auto flex-shrink-0 transition-transform duration-300 group-hover:translate-x-2"
                width="32"
                height="16"
                viewBox="0 0 32 16"
                fill="none"
                style={{ color: 'var(--terracotta)' }}
              >
                <path d="M1 8H31M25 2L31 8L25 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
