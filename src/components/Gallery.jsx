import React, { useState, useEffect } from 'react';
import { Eye, ChevronLeft, ChevronRight, X, Camera } from 'lucide-react';

const galleryImages = [
  {
    src: '/images/hotel-lara-facade-exterior.webp',
    alt: 'Hotel Lara International contemporary facade and entrance in Suchindram',
    title: 'Hotel Facade & Portico',
    category: 'exterior',
    tag: 'Property Exterior'
  },
  {
    src: '/images/hotel-lara-deluxe-blue-room.webp',
    alt: 'Deluxe AC bedroom with teakwood King bed and armchairs',
    title: 'Deluxe King Suite',
    category: 'rooms',
    tag: 'Bedrooms & Suites'
  },
  {
    src: '/images/hotel-lara-signage-entrance.webp',
    alt: '3D illuminated signage board of Hotel Lara International',
    title: 'Illuminated 3D Signboard',
    category: 'exterior',
    tag: 'Building Signage'
  },
  {
    src: '/images/hotel-lara-executive-marble-room.webp',
    alt: 'Executive double bedroom with Italian marble inlay flooring and lighting',
    title: 'Executive Marble Suite',
    category: 'rooms',
    tag: 'Bedrooms & Suites'
  },
  {
    src: '/images/hotel-lara-ensuite-bathroom-1.webp',
    alt: 'Modern attached ensuite bathroom with sunflower tile feature and chrome fixtures',
    title: 'Ensuite Designer Bathroom',
    category: 'amenities',
    tag: 'Modern Bathrooms'
  },
  {
    src: '/images/hotel-lara-deluxe-room-tv.webp',
    alt: 'Wall-mounted flat-screen smart LED TV, split AC unit, and wooden seating',
    title: 'In-Room Entertainment & AC',
    category: 'rooms',
    tag: 'Bedrooms & Suites'
  },
  {
    src: '/images/hotel-lara-room-view-window.webp',
    alt: 'Guest bedroom featuring a large picture window overlooking tropical greenery',
    title: 'Nature-Facing Guest Room',
    category: 'rooms',
    tag: 'Bedrooms & Suites'
  },
  {
    src: '/images/hotel-lara-kitchenette-pantry.webp',
    alt: 'Private in-room granite wash counter and stainless steel sink',
    title: 'In-Room Granite Counter & Sink',
    category: 'amenities',
    tag: 'Kitchenette & Amenities'
  },
  {
    src: '/images/hotel-lara-standard-comfort-room.webp',
    alt: 'Standard comfort room with solid wood bed and mint pastel walls',
    title: 'Standard Comfort Room',
    category: 'rooms',
    tag: 'Bedrooms & Suites'
  },
  {
    src: '/images/hotel-lara-ensuite-bathroom-2.webp',
    alt: 'Spacious attached ensuite bathroom with overhead shower and sanitaryware',
    title: 'Private Shower & Vanity',
    category: 'amenities',
    tag: 'Modern Bathrooms'
  },
  {
    src: '/images/hotel-lara-bedroom-suite-wide.webp',
    alt: 'Panoramic perspective of spacious guest suite with king bed and mirrored wardrobe',
    title: 'Panoramic Guest Suite',
    category: 'rooms',
    tag: 'Bedrooms & Suites'
  },
  {
    src: '/images/hotel-lara-exterior-day.webp',
    alt: 'Daytime perspective of Hotel Lara International building in Suchindram',
    title: 'Suchindram Landmark Property',
    category: 'exterior',
    tag: 'Property Exterior'
  }
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredImages = activeFilter === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeFilter);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <section
      id="gallery"
      style={{
        padding: 'var(--section-padding)',
        backgroundColor: '#091020',
        color: '#FFFFFF',
        position: 'relative',
      }}
    >
      <div className="container-wide">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <div className="eyebrow" style={{ marginBottom: '0.85rem' }}>
            <span>Visual Tour</span>
          </div>
          <h2 className="heading-section" style={{ color: '#FFFFFF', marginBottom: '1rem' }}>
            Genuine Impressions of Our Property
          </h2>
          <div className="gold-line-center" />
          <p className="lead-text" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
            Experience an authentic look into the accommodations, real guest rooms, exterior architecture,
            and clean en-suite facilities at Hotel Lara International.
          </p>

          {/* Filter Tabs */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center',
              marginTop: '2rem',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '6px',
              borderRadius: '9999px',
              border: '1px solid rgba(198, 161, 91, 0.25)',
            }}
          >
            {[
              { label: 'All Photographs', key: 'all' },
              { label: 'Exterior & Facade', key: 'exterior' },
              { label: 'Bedrooms & Suites', key: 'rooms' },
              { label: 'Bathrooms & Amenities', key: 'amenities' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                style={{
                  padding: '0.55rem 1.35rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  transition: 'all 0.3s ease',
                  backgroundColor: activeFilter === tab.key ? 'var(--color-gold)' : 'transparent',
                  color: activeFilter === tab.key ? '#101C35' : 'rgba(255, 255, 255, 0.85)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Editorial Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {filteredImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              style={{
                position: 'relative',
                height: idx % 3 === 0 ? '360px' : '280px',
                borderRadius: '10px',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: '#101C35',
                border: '1px solid rgba(198, 161, 91, 0.2)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              }}
              className="gallery-card"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
              />

              {/* Overlay on Hover */}
              <div
                className="gallery-card-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(16, 28, 53, 0.1) 0%, rgba(10, 18, 34, 0.88) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.35s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.5rem',
                }}
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-gold-bright)',
                    marginBottom: '4px',
                  }}
                >
                  {img.tag}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '8px' }}>
                  {img.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-gold)', fontSize: '0.8rem' }}>
                  <Eye size={14} />
                  <span>Tap to view high-resolution</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            backgroundColor: 'rgba(5, 10, 20, 0.96)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              color: '#FFFFFF',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '10px',
              borderRadius: '50%',
              border: '1px solid rgba(198, 161, 91, 0.4)',
              cursor: 'pointer',
              zIndex: 3010,
            }}
            aria-label="Close lightbox"
          >
            <X size={24} color="#C6A15B" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
            style={{
              position: 'absolute',
              left: '20px',
              color: '#FFFFFF',
              background: 'rgba(16, 28, 53, 0.8)',
              padding: '12px',
              borderRadius: '50%',
              border: '1px solid rgba(198, 161, 91, 0.4)',
              cursor: 'pointer',
              zIndex: 3010,
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={28} color="#C6A15B" />
          </button>

          {/* Image & Caption Container */}
          <div
            style={{
              maxWidth: '1100px',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].alt}
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(198, 161, 91, 0.3)',
              }}
            />
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '4px' }}>
                {filteredImages[lightboxIndex].title}
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                Photograph {lightboxIndex + 1} of {filteredImages.length} • Genuine Property Visual
              </p>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
            style={{
              position: 'absolute',
              right: '20px',
              color: '#FFFFFF',
              background: 'rgba(16, 28, 53, 0.8)',
              padding: '12px',
              borderRadius: '50%',
              border: '1px solid rgba(198, 161, 91, 0.4)',
              cursor: 'pointer',
              zIndex: 3010,
            }}
            aria-label="Next image"
          >
            <ChevronRight size={28} color="#C6A15B" />
          </button>
        </div>
      )}

      <style>{`
        .gallery-card:hover .gallery-card-overlay {
          opacity: 1 !important;
        }
        .gallery-card:hover img {
          transform: scale(1.06) !important;
        }
      `}</style>
    </section>
  );
}
