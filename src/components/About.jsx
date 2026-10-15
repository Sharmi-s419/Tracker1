import React from 'react';
import RotatingLogo from './RotatingLogo';
import { Compass, ShieldCheck, HeartHandshake, Sparkles, Building, MapPin } from 'lucide-react';

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: 'var(--section-padding)',
        backgroundColor: 'var(--color-ivory)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4rem' }}>
          <div className="eyebrow" style={{ marginBottom: '0.85rem' }}>
            <span>About The Property</span>
          </div>
          <h2 className="heading-section" style={{ color: 'var(--color-navy)', marginBottom: '1rem' }}>
            Refined Comfort in the Heart of Suchindram
          </h2>
          <div className="gold-line-center" />
          <p className="lead-text">
            Hotel Lara International provides a peaceful, well-appointed retreat for travelers, pilgrims,
            and families visiting Suchindram and the historic Kanyakumari coast.
          </p>
        </div>

        {/* 2-Column Editorial Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
            marginBottom: '4.5rem',
          }}
        >
          {/* Left Column: Visual Composition with Hotel Real Photographs */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid rgba(198, 161, 91, 0.3)',
                background: '#0B1324',
              }}
            >
              <img
                src="/images/hotel-lara-facade-exterior.webp"
                alt="Hotel Lara International exterior facade and entrance"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '420px',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />
            </div>

            {/* Overlapping Secondary Card with Verified Details */}
            <div
              style={{
                position: 'absolute',
                bottom: '-25px',
                right: '-20px',
                background: '#101C35',
                color: '#FFFFFF',
                padding: '1.4rem 1.6rem',
                borderRadius: '8px',
                border: '1px solid var(--color-gold)',
                boxShadow: 'var(--shadow-gold)',
                maxWidth: '260px',
              }}
              className="about-overlap-card"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <RotatingLogo size={36} speed={15} theme="gold" />
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: 'var(--color-gold-bright)', letterSpacing: '0.08em' }}>
                  SUCHINDRAM
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.5 }}>
                Directly accessible on the main road, just minutes from Thanumalayan Temple.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Hospitality Copy */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.9rem',
                color: 'var(--color-navy)',
                marginBottom: '1.25rem',
                lineHeight: 1.3,
              }}
            >
              A Welcoming Sanctuary Designed for Rest and Convenience
            </h3>

            <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              Located along the scenic corridor connecting Suchindram and Kanyakumari,
              <strong> Hotel Lara International</strong> offers contemporary lodging tailored for spiritual seekers,
              traveling families, and business visitors. With pristine air-conditioned guest rooms,
              custom teakwood furnishings, and attentive personalized service, your restful stay is our genuine commitment.
            </p>

            <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              Each accommodation is maintained to high hygiene standards, featuring en-suite bathrooms with
              modern sanitaryware, split AC units, smart entertainment, and private parking. We invite you to experience
              genuine South Indian hospitality right where comfort meets convenience.
            </p>

            {/* 3 Core Pillars */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div
                style={{
                  padding: '1.25rem',
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid rgba(16, 28, 53, 0.08)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <ShieldCheck size={26} color="#C6A15B" style={{ marginBottom: '0.65rem' }} />
                <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem', color: 'var(--color-navy)' }}>
                  Verified Comfort
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-charcoal-muted)', lineHeight: 1.5 }}>
                  Clean, well-ventilated rooms with split air conditioning and fresh linen daily.
                </p>
              </div>

              <div
                style={{
                  padding: '1.25rem',
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid rgba(16, 28, 53, 0.08)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <Compass size={26} color="#C6A15B" style={{ marginBottom: '0.65rem' }} />
                <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem', color: 'var(--color-navy)' }}>
                  Prime Location
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-charcoal-muted)', lineHeight: 1.5 }}>
                  Under 3 minutes to Thanumalayan Temple and easy drive to Kanyakumari beaches.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural / Facility Highlights Ribbon */}
        <div
          style={{
            background: '#101C35',
            borderRadius: '12px',
            padding: '2.5rem',
            color: '#FFFFFF',
            border: '1px solid rgba(198, 161, 91, 0.25)',
            boxShadow: 'var(--shadow-md)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-gold)', fontWeight: 600 }}>
              500 m
            </div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              To Thanumalayan Temple
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-gold)', fontWeight: 600 }}>
              100%
            </div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              En-suite Modern Baths
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-gold)', fontWeight: 600 }}>
              On-Site
            </div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Lara Point Tea & Refreshments
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-gold)', fontWeight: 600 }}>
              24 / 7
            </div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Guest Assistance
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-overlap-card {
            position: static !important;
            margin-top: 1rem;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
