import React from 'react';
import RotatingLogo from './RotatingLogo';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { getBookingAppUrl } from '../utils/bookingUrl';

export default function Hero({ onBookClick, onExploreRooms }) {
  const handleReserveStay = () => {
    if (onBookClick) {
      onBookClick();
    } else {
      window.location.href = getBookingAppUrl();
    }
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '6.5rem',
        paddingBottom: '4.5rem',
        overflow: 'hidden',
        backgroundColor: '#091020',
      }}
    >
      {/* Hero Architectural Background Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/images/hotel-lara-hero.webp')",
          backgroundPosition: 'center 42%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 0.38,
          transform: 'scale(1.02)',
          transition: 'transform 8s ease-out',
        }}
      />

      {/* Atmospheric Luxury Dark Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 75% 25%, rgba(198, 161, 91, 0.08) 0%, transparent 60%), linear-gradient(180deg, rgba(9, 16, 32, 0.85) 0%, rgba(9, 16, 32, 0.68) 50%, rgba(9, 16, 32, 0.98) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Hero Content */}
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', alignItems: 'center' }}>
          
          <div style={{ maxWidth: '820px' }}>
            {/* Top Eyebrow Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.45rem 1.1rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(198, 161, 91, 0.12)',
                border: '1px solid rgba(198, 161, 91, 0.3)',
                backdropFilter: 'blur(8px)',
                marginBottom: '1.75rem',
              }}
            >
              <MapPin size={14} color="#C6A15B" />
              <span
                style={{
                  color: 'var(--color-gold-bright)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                Suchindram • Kanyakumari District
              </span>
            </div>

            {/* Single Clear H1 Heading on Homepage (SEO Best Practice) */}
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)',
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '0.02em',
                lineHeight: 1.15,
                marginBottom: '1.25rem',
              }}
            >
              Our Comfort, Our Priority.
            </h1>

            {/* Concise Verified 2-Line Description */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.05rem, 1.35vw, 1.2rem)',
                color: 'rgba(247, 244, 236, 0.92)',
                fontWeight: 300,
                lineHeight: 1.75,
                maxWidth: '680px',
                marginBottom: '2.25rem',
              }}
            >
              Enjoy a comfortable stay at Hotel Lara International in Suchindram. Discover welcoming rooms,
              essential comforts, and convenient access to nearby attractions.
            </p>

            {/* CTAs: Direct Booking Navigation & Room Exploration */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <button
                onClick={handleReserveStay}
                className="btn btn-gold"
                style={{
                  padding: '1rem 2.2rem',
                  fontSize: '0.92rem',
                }}
              >
                <span>Book a Room</span>
                <ArrowUpRight size={16} />
              </button>

              <button
                onClick={onExploreRooms}
                className="btn btn-outline-gold"
                style={{
                  padding: '1rem 1.8rem',
                  fontSize: '0.92rem',
                }}
              >
                <span>Explore Rooms</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Circular Rotating Emblem Badge */}
      <div
        className="hero-rotating-badge"
        style={{
          position: 'absolute',
          right: '5%',
          top: '32%',
          zIndex: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'auto',
        }}
      >
        <div
          style={{
            position: 'relative',
            background: 'rgba(16, 28, 53, 0.85)',
            padding: '14px',
            borderRadius: '9999px',
            border: '1.5px solid rgba(198, 161, 91, 0.45)',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5), 0 0 25px rgba(198, 161, 91, 0.15)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <RotatingLogo size={140} speed={18} theme="gold" idPrefix="hero" />
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-rotating-badge {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
