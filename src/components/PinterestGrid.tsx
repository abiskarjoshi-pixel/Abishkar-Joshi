import { useState } from 'react'
import type { Photo } from '../data/collections'

interface PinterestGridProps {
  photos: Photo[]
}

export default function PinterestGrid({ photos }: PinterestGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  if (!photos || photos.length === 0) return null

  return (
    <>
      <div className="px-6 md:px-12 lg:px-20 py-12">
        <div
          className="max-w-[1440px] mx-auto"
          style={{
            columnCount: 3,
            columnGap: '16px',
          }}
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              style={{
                breakInside: 'avoid',
                marginBottom: '16px',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '4px',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.88'
                  e.currentTarget.style.transform = 'scale(1.01)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox overlay */}
      {selectedPhoto && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
            padding: '2rem',
          }}
          onClick={() => setSelectedPhoto(null)}
        >
          <img
            src={selectedPhoto.src}
            alt={selectedPhoto.alt}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: '4px',
            }}
          />
        </div>
      )}

      {/* Responsive column adjustments */}
      <style>{`
        @media (max-width: 1024px) {
          .max-w-\\[1440px\\] { column-count: 2 !important; }
        }
        @media (max-width: 640px) {
          .max-w-\\[1440px\\] { column-count: 1 !important; }
        }
      `}</style>
    </>
  )
}
