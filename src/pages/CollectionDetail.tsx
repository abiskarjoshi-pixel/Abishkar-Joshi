import { useParams, Link, useNavigate } from 'react-router-dom'
import { getCollectionBySlug } from '../data/collections'
import RevealOnScroll from '../components/RevealOnScroll'
import Footer from '../components/Footer'
import { useSEO } from '../hooks/useSEO'

const getPinterestAspectRatio = (index: number) => {
  switch (index % 5) {
    case 0:
      return '4/5'
    case 1:
      return '3/4'
    case 2:
      return '5/6'
    case 3:
      return '4/3'
    default:
      return '1/1.1'
  }
}

export default function CollectionDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const collection = slug ? getCollectionBySlug(slug) : undefined

  useSEO({
    title: collection ? `${collection.name} — Collection` : 'Collection',
    description: collection
      ? `${collection.description}. Photography by Abishkar Joshi.`
      : 'Photography collection by Abishkar Joshi.',
    image: collection?.coverSrc,
    url: `/collections/${slug}`,
  })

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bone)' }}>
        <div className="text-center">
          <p className="text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--terracotta)' }}>Not Found</p>
          <Link to="/collections" className="text-xs tracking-[0.2em] uppercase nav-link" style={{ color: 'var(--ink)' }}>
            Back to Collections
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'var(--bone)', fontFamily: 'var(--font-body)' }}>
      <div className="px-6 md:px-12 lg:px-20 pt-28 pb-10 max-w-[1800px] mx-auto">
        <div className="mb-10">
          <Link
            to="/collections"
            className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
            style={{ color: 'var(--terracotta)' }}
          >
            <span aria-hidden="true" style={{ fontSize: '1.1rem' }}>←</span>
            <span>{collection.name}</span>
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr] items-end">
          <div>
            <h1
              className="font-light"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(5rem, 11vw, 17rem)',
                color: 'var(--ink)',
                lineHeight: 0.9,
                letterSpacing: '-0.06em',
              }}
            >
              {collection.name.toLowerCase()}
            </h1>

            <div className="mt-8 mb-6 h-px w-20" style={{ background: 'rgba(33,29,24,0.35)' }} />

            <p
              className="max-w-[52rem] text-lg md:text-2xl leading-relaxed"
              style={{ color: 'rgba(33,29,24,0.78)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              {collection.description}
            </p>
          </div>

          <div className="justify-self-end lg:justify-self-center w-full max-w-[260px]">
            <div className="space-y-8">
              <div>
                <p className="text-xs tracking-[0.26em] uppercase mb-2" style={{ color: 'var(--terracotta)' }}>Year</p>
                <p className="text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
                  {collection.projects[0]?.year ?? '2024'}
                </p>
              </div>

              <div>
                <p className="text-xs tracking-[0.26em] uppercase mb-2" style={{ color: 'var(--terracotta)' }}>Location</p>
                <p className="text-xl md:text-2xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
                  {collection.projects[0]?.location ?? 'Nepal'}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <span
                  className="inline-block rounded-full"
                  style={{ width: '18px', height: '18px', backgroundColor: 'var(--terracotta)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-24 px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto">
        {collection.slug === 'human' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1">
            {collection.projects.map((project, projectIndex) => (
              <RevealOnScroll key={project.slug} delay={projectIndex * 60}>
                <Link
                  to={`/project/${project.slug}`}
                  className="group block relative overflow-hidden bg-[#0f0c09]"
                  data-cursor-expand
                >
                  <img
                    src={project.coverSrc}
                    alt={project.coverAlt}
                    className="w-full block transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                    style={{
                      aspectRatio: projectIndex % 3 === 0 ? '4/5' : projectIndex % 3 === 1 ? '3/4' : '1/1',
                      objectFit: 'cover',
                    }}
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(10,8,6,0.88) 0%, transparent 58%)' }}
                  >
                    <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--terracotta)' }}>
                      Human / Subfolder
                    </p>
                    <h2
                      className="font-light"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.5rem, 3vw, 3rem)',
                        color: 'var(--cream)',
                        lineHeight: 1.05,
                      }}
                    >
                      {project.title}
                    </h2>
                    <p className="mt-2 text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(245,241,234,0.72)' }}>
                      Open subfolder
                    </p>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        ) : (
          <div className="masonry-grid">
            {collection.projects.flatMap((project) =>
              project.photos.map((photo, pi) => (
                <RevealOnScroll key={photo.id} delay={pi * 40} className="masonry-grid-item">
                  <button
                    type="button"
                    className="group relative w-full cursor-pointer overflow-hidden text-left"
                    onClick={() => navigate(`/project/${project.slug}`)}
                    data-cursor-expand
                    style={{ backgroundColor: '#0f0c09', padding: 0, border: 0 }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full block transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                      style={{
                        aspectRatio: getPinterestAspectRatio(pi),
                        objectFit: 'cover',
                      }}
                    />
                    <div
                      className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(to top, rgba(10,8,6,0.88) 0%, transparent 58%)' }}
                    >
                      <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--terracotta)' }}>
                        {project.collection} · {project.year}
                      </p>
                      <h3
                        className="font-light"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                          color: 'var(--cream)',
                          lineHeight: 1.1,
                        }}
                      >
                        {photo.title ?? project.title}
                      </h3>
                    </div>
                  </button>
                </RevealOnScroll>
              ))
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
