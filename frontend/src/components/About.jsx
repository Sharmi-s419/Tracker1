import React from 'react';
import RotatingLogo from './RotatingLogo';
import { ShieldCheck, MapPin, BedDouble } from 'lucide-react';

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: '5rem 1.5rem',
        backgroundColor: 'var(--color-ivory)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
          <div className="eyebrow" style={{ marginBottom: '0.65rem' }}>
            <span>About Hotel Lara International</span>
          </div>
          <h2 className="heading-section" style={{ color: 'var(--color-navy)', marginBottom: '0.85rem' }}>
            Thoughtful Hospitality in Suchindram
          </h2>
          <div className="gold-line-center" style={{ marginBottom: '1.25rem' }} />
          <p className="lead-text" style={{ fontSize: '1.05rem', color: 'var(--color-charcoal-muted)' }}>
            Quiet, clean, and reliable lodging situated along the main arterial corridor in Suchindram, Kanyakumari.
          </p>
        </div>

        {/* 2-Column Layout: Genuine Hotel Photograph on Left, Concise Copy on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
            marginBottom: '3.5rem',
          }}
        >
          {/* Left Column: Genuine Hotel Facade Photo */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--color-warm-border)',
                background: '#0B1324',
              }}
            >
              <img
                src="/images/hotel-lara-facade-exterior.png"
                alt="Hotel Lara International exterior facade and front entrance on main road Suchindram"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '380px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Subtle Overlay Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '-18px',
                right: '18px',
                background: '#101C35',
                color: '#FFFFFF',
                padding: '0.85rem 1.25rem',
                borderRadius: '8px',
                border: '1px solid var(--color-gold)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
              }}
            >
              <RotatingLogo size={28} speed={15} theme="gold" />
              <span style={{ fontSize: '0.78rem', color: 'var(--color-gold-bright)', letterSpacing: '0.08em', fontWeight: 600 }}>
                SUCHINDRAM • 14 ROOMS
              </span>
            </div>
          </div>

          {/* Right Column: Concise, Well-Organized Information */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.65rem',
                color: 'var(--color-navy)',
                marginBottom: '1rem',
                lineHeight: 1.3,
              }}
            >
              Comfortable Accommodation for Pilgrims, Families, and Travelers
            </h3>

            <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              <strong>Hotel Lara International</strong> provides comfortable, air-conditioned rooms designed
              for travelers seeking a peaceful stay in Suchindram. Located on the main road, the hotel offers
              direct vehicular access, on-site parking, and immediate proximity to the sacred
              Thanumalayan Temple and ISKCON Kanyakumari.
            </p>

            <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
              Whether you are visiting for temple darshan, exploring the confluence at Kanyakumari, or transiting
              through Nagercoil Junction, our 14 physical rooms offer modern en-suite bathrooms, split AC,
              daily housekeeping, and personalized front desk support.
            </p>

            {/* Verified Highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              <div
                style={{
                  padding: '1rem',
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid var(--color-warm-border)',
                }}
              >
                <MapPin size={22} color="#C49A45" style={{ marginBottom: '0.4rem' }} />
                <h4 style={{ fontSize: '0.92rem', color: 'var(--color-navy)', marginBottom: '0.2rem' }}>
                  Temple Proximity
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-muted)' }}>
                  Approximately 1 km from Suchindram Thanumalayan Temple.
                </p>
              </div>

              <div
                style={{
                  padding: '1rem',
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid var(--color-warm-border)',
                }}
              >
                <BedDouble size={22} color="#C49A45" style={{ marginBottom: '0.4rem' }} />
                <h4 style={{ fontSize: '0.92rem', color: 'var(--color-navy)', marginBottom: '0.2rem' }}>
                  Clean AC Rooms
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-muted)' }}>
                  Equipped with split AC, teakwood beds, and attached modern washrooms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Quick Stats Ribbon */}
        <div
          style={{
            background: '#101C35',
            borderRadius: '10px',
            padding: '2rem 1.5rem',
            color: '#FFFFFF',
            border: '1px solid rgba(198, 161, 91, 0.25)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            textAlign: 'center',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: 'var(--color-gold)', fontWeight: 600 }}>
              ~1 km
            </div>
            <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.85)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              To Thanumalayan Temple
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: 'var(--color-gold)', fontWeight: 600 }}>
              14 Rooms
            </div>
            <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.85)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Physical Inventory
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: 'var(--color-gold)', fontWeight: 600 }}>
              On-Site
            </div>
            <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.85)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Private Guest Parking
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: 'var(--color-gold)', fontWeight: 600 }}>
              24 / 7
            </div>
            <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.85)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Front Desk Assistance
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
