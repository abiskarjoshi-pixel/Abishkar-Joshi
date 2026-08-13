export interface Photo {
  id: string
  src: string
  alt: string
  width: number
  height: number
  title?: string
  year?: string
  location?: string
  tags?: string[]
}

export interface Project {
  id: string
  slug: string
  title: string
  collection: string
  collectionSlug: string
  year: string
  location: string
  coverSrc: string
  coverAlt: string
  description: string
  photos: Photo[]
  gear?: string
  client?: string
  colorStory?: string
}

export interface Collection {
  slug: string
  name: string
  description: string
  coverSrc: string
  coverAlt: string
  projects: Project[]
}

const MAX_PHOTOS = 50

const imageModules = import.meta.glob('../Photos/**/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const normalizePath = (value: string) => value.replace(/\\/g, '/').toLowerCase()

const slugify = (value: string): string => value
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

const folderTitle = (value: string): string => value
  .replace(/[_-]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const isInsideFolder = (path: string, folderName: string) => normalizePath(path).includes(`/photos/${folderName.toLowerCase()}/`)

const createPhoto = (src: string, path: string): Photo => {
  const fileName = path.split('/').pop() ?? 'image'
  const baseName = fileName.replace(/\.[^.]+$/, '')
  return {
    id: slugify(`${baseName}-${src}`),
    src,
    alt: folderTitle(baseName),
    width: 1200,
    height: 1500,
  }
}

const getPhotosForFolder = (folderName: string): Photo[] => {
  return Object.entries(imageModules)
    .filter(([path]) => isInsideFolder(path, folderName))
    .map(([path, src]) => createPhoto(src, path))
    .filter((photo) => photo.src)
    .slice(0, MAX_PHOTOS)
}

const buildHumanProjects = (): Project[] => {
  const grouped = new Map<string, { title: string; photos: Photo[] }>()

  for (const [path, src] of Object.entries(imageModules)) {
    const normalized = normalizePath(path)
    if (!normalized.includes('/photos/human/')) continue

    const relative = normalized.split('/photos/human/')[1]
    if (!relative) continue

    const folderName = relative.split('/')[0]?.trim()
    if (!folderName) continue

    const title = folderTitle(folderName)
    const existing = grouped.get(folderName) ?? { title, photos: [] }
    existing.photos.push({
      ...createPhoto(src, path),
      title,
      alt: `${title} portrait study`,
    })
    grouped.set(folderName, existing)
  }

  return [...grouped.entries()]
    .map(([folderKey, group]) => {
      const photos = group.photos.slice(0, MAX_PHOTOS)
      const title = folderTitle(folderKey)
      return {
        id: slugify(title),
        slug: slugify(title),
        title,
        collection: 'Human',
        collectionSlug: 'human',
        year: '2024',
        location: 'Nepal',
        coverSrc: photos[0]?.src ?? '',
        coverAlt: `${title} portrait study`,
        description: `A portrait collection focused on ${title}, capturing presence, atmosphere, and human character in a natural visual narrative.`,
        photos,
      } satisfies Project
    })
    .filter((project) => project.photos.length > 0)
    .sort((a, b) => a.title.localeCompare(b.title))
}

const collectionMeta = [
  { slug: 'design', name: 'Design', description: 'Creative direction, still-life studies, and visual identities.', folder: 'DESIGN' },
  { slug: 'earth', name: 'Earth', description: 'Landscape, mountains, and sacred geography.', folder: 'EARTH' },
  { slug: 'human', name: 'Human', description: 'Portraits, people, and intimate character studies.', folder: 'HUMAN' },
  { slug: 'love', name: 'Love', description: 'Weddings, union rituals, and tender emotion.', folder: 'LOVE' },
] as const

const buildStaticCollectionProjects = (slug: string): Project[] => {
  const entry = collectionMeta.find((item) => item.slug === slug)
  if (!entry) return []

  if (slug === 'human') {
    return buildHumanProjects()
  }

  const photos = getPhotosForFolder(entry.folder).slice(0, MAX_PHOTOS)
  if (photos.length === 0) return []

  return [{
    id: slug,
    slug,
    title: entry.name,
    collection: entry.name,
    collectionSlug: slug,
    year: '2024',
    location: 'Nepal',
    coverSrc: photos[0].src,
    coverAlt: `${entry.name} collection cover`,
    description: entry.description,
    photos,
  }]
}

export const collections: Collection[] = collectionMeta.map((entry) => {
  const projects = buildStaticCollectionProjects(entry.slug)
  return {
    slug: entry.slug,
    name: entry.name,
    description: entry.description,
    coverSrc: projects[0]?.coverSrc ?? '',
    coverAlt: `${entry.name} collection cover`,
    projects,
  }
})

export const allProjects: Project[] = collections.flatMap((collection) => collection.projects)

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug)
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((collection) => collection.slug === slug)
}

export function getNextProject(currentSlug: string): Project | undefined {
  const currentIndex = allProjects.findIndex((project) => project.slug === currentSlug)
  if (currentIndex === -1) return undefined
  return allProjects[(currentIndex + 1) % allProjects.length]
}

export const films = [
  {
    id: 'f1',
    title: 'Season of Fire',
    subtitle: 'Mustang Apple Blossom',
    year: '2024',
    duration: '8:32',
    coverSrc: Object.values(imageModules)[0] ?? '',
    coverAlt: 'Cinematic landscape Mustang',
    videoId: 'dQw4w9WgXcQ',
    description: 'A short documentary about the spring blossom season in Lo Manthang, the ancient walled city of Upper Mustang.',
  },
  {
    id: 'f2',
    title: 'The Long Way Down',
    subtitle: 'Annapurna Circuit',
    year: '2023',
    duration: '12:14',
    coverSrc: Object.values(imageModules)[1] ?? '',
    coverAlt: 'Mountain range at golden hour',
    videoId: 'dQw4w9WgXcQ',
    description: 'A meditation on walking — the Annapurna Circuit in early winter, stripped of crowds and full of sky.',
  },
  {
    id: 'f3',
    title: 'Colour & Thread',
    subtitle: 'Patan Weaving Collective',
    year: '2023',
    duration: '5:48',
    coverSrc: Object.values(imageModules)[2] ?? '',
    coverAlt: 'Fashion editorial film still',
    videoId: 'dQw4w9WgXcQ',
    description: 'A short film made for the Patan Weaving Collective, following the journey of a Dhaka silk sari from loom to body.',
  },
  {
    id: 'f4',
    title: 'Sacred Geography',
    subtitle: 'Pashupatinath',
    year: '2022',
    duration: '9:20',
    coverSrc: Object.values(imageModules)[3] ?? '',
    coverAlt: 'Temple at dusk',
    videoId: 'dQw4w9WgXcQ',
    description: 'Pashupatinath at dawn and dusk. One of the oldest Hindu temples in the world, alive with daily ritual.',
  },
]
