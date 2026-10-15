import React, { useState, useEffect } from 'react';
import { Eye, ChevronLeft, ChevronRight, X, ArrowLeft, Camera, Sparkles } from 'lucide-react';

const galleryCategories = [
  {
    id: 'exterior',
    title: 'Exterior & Facade',
    count: 3,
    description: 'Landmark contemporary building facade, entrance portico, and illuminated 3D signage.',
    previewImage: '/images/hotel-lara-facade-exterior.webp',
    images: [
      {
        src: '/images/hotel-lara-facade-exterior.webp',
        alt: 'Hotel Lara International contemporary facade and entrance portico in Suchindram',
        title: 'Hotel Facade & Main Entrance',
        caption: 'Multi-storey hotel building located directly on the main highway corridor in Suchindram.'
      },
      {
        src: '/images/hotel-lara-exterior-day.webp',
        alt: 'Daytime perspective of Hotel Lara International landmark property',
        title: 'Property Overview & Parking',
        caption: 'Convenient ground-level vehicular parking and accessible approach road.'
      },
      {
        src: '/images/hotel-lara-signage-entrance.webp',
        alt: 'Illuminated 3D signage board of Hotel Lara International',
        title: '3D Building Signboard',
        caption: 'High-visibility front signage welcoming guests and pilgrims arriving 24/7.'
      }
    ]
  },
  {
    id: 'bedrooms',
    title: 'Bedroom Ensuite',
    count: 6,
    description: 'Teakwood king beds, split air-conditioning, Italian marble tile flooring, and smart LED TVs.',
    previewImage: '/images/hotel-lara-deluxe-blue-room.webp',
    images: [
      {
        src: '/images/hotel-lara-deluxe-blue-room.webp',
        alt: 'Deluxe AC King bedroom suite with teakwood bed and upholstered armchairs',
        title: 'Deluxe AC King Suite',
        caption: 'Sky-blue feature wall, solid teakwood King bed, armchairs, and tea table.'
      },
      {
        src: '/images/hotel-lara-executive-marble-room.webp',
        alt: 'Executive Double AC room featuring polished Italian marble tile inlays',
        title: 'Executive Marble Room',
        caption: 'Polished Italian marble inlays with quiet split AC and bedside charging ports.'
      },
      {
        src: '/images/hotel-lara-standard-comfort-room.webp',
        alt: 'Standard comfort room with solid wood bed and mint pastel walls',
        title: 'Standard Comfort Room',
        caption: 'Calming mint walls with daylight window, clean textiles, and wooden headboard.'
      },
      {
        src: '/images/hotel-lara-bedroom-suite-wide.webp',
        alt: 'Spacious panoramic perspective of guest bedroom suite',
        title: 'Panoramic Guest Suite View',
        caption: 'Generous room proportions with mirrored wardrobe and recessed warm LED lighting.'
      },
      {
        src: '/images/hotel-lara-deluxe-room-tv.webp',
        alt: 'Wall-mounted flat-screen smart LED TV and split air conditioner',
        title: 'In-Room Entertainment & Split AC',
        caption: 'Wall-mounted smart television and energy-efficient split AC.'
      },
      {
        src: '/images/hotel-lara-room-view-window.webp',
        alt: 'Guest bedroom window overlooking green surroundings',
        title: 'Daylight Picture Window',
        caption: 'Natural ventilation and tranquil views overlooking lush greenery.'
      }
    ]
  },
  {
    id: 'bathrooms',
    title: 'Bathroom Amenities',
    count: 2,
    description: 'Attached private washrooms with modern chrome fixtures, overhead shower, and hot water.',
    previewImage: '/images/hotel-lara-ensuite-bathroom-1.webp',
    images: [
      {
        src: '/images/hotel-lara-ensuite-bathroom-1.webp',
        alt: 'Designer attached ensuite bathroom with decorative wall tiles and vanity',
        title: 'Designer Attached Bathroom',
        caption: 'Pristine wall tiling, western commode, washbasin, and vanity mirror.'
      },
      {
        src: '/images/hotel-lara-ensuite-bathroom-2.webp',
        alt: 'Spacious ensuite shower with overhead faucet and chrome fixtures',
        title: 'Private Shower & Hot Water',
        caption: 'Overhead shower, continuous water supply, and clean sanitary fittings.'
      }
    ]
  }
];

export default function Gallery() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('exterior');
  const [lightboxImage, setLightboxImage] = useState(null);

  const currentCategory = galleryCategories.find(c => c.id === selectedCategoryId) || galleryCategories[0];

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxImage) return;
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage]);

  return (
    <section
      id="gallery"
      style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: 'var(--color-ivory)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
          <div className="eyebrow" style={{ marginBottom: '0.65rem' }}>
            <span>Visual Tour</span>
          </div>
          <h2 className="heading-section" style={{ color: 'var(--color-navy)', marginBottom: '0.85rem' }}>
            Authentic Property Photographs
          </h2>
          <div className="gold-line-center" style={{ marginBottom: '1.25rem' }} />
          <p className="lead-text" style={{ fontSize: '1.05rem', color: 'var(--color-charcoal-muted)' }}>
            Explore verified photographs of Hotel Lara International across 3 dedicated galleries.
          </p>
        </div>

        {/* 3 Clear Category Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          {galleryCategories.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: isSelected ? '2px solid #C49A45' : '1px solid var(--color-warm-border)',
                  boxShadow: isSelected ? '0 10px 25px rgba(196, 154, 69, 0.25)' : 'var(--shadow-sm)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                }}
              >
                <div style={{ height: '180px', overflow: 'hidden', position: 'relative', backgroundColor: '#091020' }}>
                  <img
                    src={cat.previewImage}
                    alt={cat.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                      transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: isSelected ? '#C49A45' : 'rgba(16, 28, 53, 0.85)',
                      color: isSelected ? '#17243D' : '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                    }}
                  >
                    {cat.count} Photos
                  </div>
                </div>

                <div style={{ padding: '1.25rem' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: isSelected ? '#A77B2E' : 'var(--color-dark-brown)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {cat.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-muted-brown)', lineHeight: 1.5 }}>
                    {cat.description}
                  </p>
                  <div
                    style={{
                      marginTop: '0.75rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: isSelected ? '#A77B2E' : 'var(--color-navy)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <span>{isSelected ? 'Currently Viewing' : 'Click to View Gallery'}</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Category Header & Clean Grid */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-navy)' }}>
              {currentCategory.title} ({currentCategory.images.length} Photos)
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-muted-brown)' }}>
              Click any photograph to view enlarged details
            </span>
          </div>
        </div>

        {/* Category Image Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {currentCategory.images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxImage(img)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid var(--color-warm-border)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative', backgroundColor: '#091020' }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(16, 28, 53, 0.35)',
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = 0; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(0,0,0,0.6)', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem' }}>
                    <Eye size={15} /> View Full
                  </div>
                </div>
              </div>

              <div style={{ padding: '1rem' }}>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--color-dark-brown)', marginBottom: '0.25rem' }}>
                  {img.title}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-muted-brown)', lineHeight: 1.4 }}>
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            backgroundColor: 'rgba(10, 17, 32, 0.92)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
          onClick={() => setLightboxImage(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '900px',
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(16, 28, 53, 0.85)',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                zIndex: 10,
              }}
              aria-label="Close photo"
            >
              <X size={18} />
            </button>

            <div style={{ maxHeight: '70vh', overflow: 'hidden', backgroundColor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }}
              />
            </div>

            <div style={{ padding: '1.25rem 1.5rem', backgroundColor: '#FAF7F1' }}>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--color-navy)', fontWeight: 600 }}>
                {lightboxImage.title}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-muted)', marginTop: '0.25rem' }}>
                {lightboxImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
