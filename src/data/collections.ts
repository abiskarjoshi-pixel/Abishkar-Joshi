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
        year: '2017-2026',
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
  { slug: 'design', name: 'Design', description: 'Ideas made visible through image,form, type and material.', folder: 'DESIGN' },
  { slug: 'earth', name: 'Earth', description: 'Mountains, places, fleeting moments, and the quiet poetry of everyday life.', folder: 'EARTH' },
  { slug: 'human', name: 'Human', description: 'Portraits caught somewhere between memory, feeling, and dream.', folder: 'HUMAN' },
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
    year: '2017-2026',
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
    title: 'Maili',
    subtitle: 'Ankita Pun',
    role: 'Assistant DOP / Gaffer',
    year: '',
    duration: '',
    coverSrc: 'https://img.youtube.com/vi/LFSU-SqMrgk/maxresdefault.jpg',
    coverAlt: 'Ankita Pun - Maili',
    videoId: 'LFSU-SqMrgk',
    description: 'Ankita Pun — Maili. Role: Assistant DOP / Gaffer.',
  },
  {
    id: 'f2',
    title: 'Char Din Char Juni',
    subtitle: 'Ankita Pun',
    role: 'Assistant DOP / Gaffer',
    year: '',
    duration: '',
    coverSrc: 'https://img.youtube.com/vi/HIL9fcQhm5k/maxresdefault.jpg',
    coverAlt: 'Ankita Pun - Char Din Char Juni',
    videoId: 'HIL9fcQhm5k',
    description: 'Ankita Pun — Char Din Char Juni. Role: Assistant DOP / Gaffer.',
  },
  {
    id: 'f3',
    title: 'Timi Sangai',
    subtitle: 'Abiskar Bikram Gautam',
    role: 'Production Manager',
    year: '',
    duration: '',
    coverSrc: 'https://img.youtube.com/vi/GhJuT4hQO6o/maxresdefault.jpg',
    coverAlt: 'Timi Sangai - Abiskar Bikram Gautam',
    videoId: 'GhJuT4hQO6o',
    description: 'Abiskar Bikram Gautam — Timi Sangai. Role: Production Manager.',
  },
  {
    id: 'f4',
    title: 'Kathai Ma Haina',
    subtitle: 'Anisha Thulung Rai',
    role: 'Director of Photography',
    year: '',
    duration: '',
    coverSrc: 'https://img.youtube.com/vi/5KfrycH9iXk/maxresdefault.jpg',
    coverAlt: 'Anisha Thulung Rai - Kathai Ma Haina',
    videoId: '5KfrycH9iXk',
    description: 'Anisha Thulung Rai — Kathai Ma Haina. Role: Director of Photography.',
  },
  {
    id: 'f5',
    title: 'मित्रता',
    subtitle: 'Void Turned To Message',
    role: 'Director of Photography',
    year: '',
    duration: '',
    coverSrc: 'https://img.youtube.com/vi/4a_Xhtc6w7U/maxresdefault.jpg',
    coverAlt: 'Void Turned To Message - मित्रता',
    videoId: '4a_Xhtc6w7U',
    description: 'Void Turned To Message — मित्रता. Role: Director of Photography.',
  },
  {
    id: 'f6',
    title: 'RECKLESS (Bass Playthrough)',
    subtitle: 'Ridesh Tamang / Sudip Tamang',
    role: 'Director of Photography',
    year: '',
    duration: '',
    coverSrc: 'https://img.youtube.com/vi/lBzsiQepMRo/maxresdefault.jpg',
    coverAlt: 'Ridesh Tamang - RECKLESS Bass Playthrough',
    videoId: 'lBzsiQepMRo',
    description: 'Ridesh Tamang — RECKLESS (Bass Playthrough) by Sudip Tamang. Role: Director of Photography.',
  },
  {
    id: 'f7',
    title: 'Kanchi Timro Naramro Bani',
    subtitle: 'Jhilkey and The Company',
    role: 'Assistant DOP',
    year: '',
    duration: '',
    coverSrc: 'https://img.youtube.com/vi/RRWLopbhfgg/maxresdefault.jpg',
    coverAlt: 'Kanchi Timro Naramro Bani - Jhilkey and The Company',
    videoId: 'RRWLopbhfgg',
    description: 'Jhilkey and The Company — Kanchi Timro Naramro Bani. Role: Assistant DOP.',
  },
  {
    id: 'f8',
    title: '182.',
    subtitle: 'Jhilkey and The Company',
    role: 'Assistant DOP',
    year: '',
    duration: '',
    coverSrc: 'https://img.youtube.com/vi/ezKyro__4T4/maxresdefault.jpg',
    coverAlt: '182 - Jhilkey and The Company',
    videoId: 'ezKyro__4T4',
    description: 'Jhilkey and The Company — 182. Role: Assistant DOP.',
  },
]

