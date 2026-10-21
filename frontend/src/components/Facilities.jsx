import React from 'react';
import { Wind, Tv, Coffee, Car, Sparkles, ShowerHead, Clock, Droplets } from 'lucide-react';

const verifiedFacilities = [
  {
    icon: Wind,
    title: 'Split Air Conditioning',
    description: 'High-performance split AC units installed across AC rooms ensuring cool comfort in tropical Tamil Nadu weather.',
  },
  {
    icon: ShowerHead,
    title: 'Designer Attached Bathrooms',
    description: 'En-suite modern washrooms fitted with polished marble-look tiles, overhead showers, and health faucets.',
  },
  {
    icon: Tv,
    title: 'Wall-Mounted Flat TVs',
    description: 'Smart flat-screen television entertainment positioned conveniently in front of comfortable seating.',
  },
  {
    icon: Coffee,
    title: 'Lara Point Tea & Coffee Kiosk',
    description: 'On-premise refreshment counter providing fresh piping hot tea, coffee, cool bottled beverages, and snacks.',
  },
  {
    icon: Droplets,
    title: 'In-Room Kitchenette Sinks',
    description: 'Select suites feature private black granite wash counters and stainless steel sinks for extra daily convenience.',
  },
  {
    icon: Car,
    title: 'Portico & Driveway Parking',
    description: 'Covered ground floor entrance driveway with convenient on-site parking for two-wheelers and guest cars.',
  },
  {
    icon: Sparkles,
    title: 'Daily Housekeeping & Hygiene',
    description: 'Strict cleanliness standards with thoroughly sanitized rooms, fresh white bedsheets, and clean towels.',
  },
  {
    icon: Clock,
    title: '24/7 Front Desk Assistance',
    description: 'Dedicated caretakers available around the clock to welcome guests, handle late check-ins, and share local guidance.',
  },
];

export default function Facilities() {
  return (
    <section
      id="facilities"
      style={{
        padding: 'var(--section-padding)',
        backgroundColor: 'var(--color-ivory)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <div className="eyebrow" style={{ marginBottom: '0.85rem' }}>
            <span>Verified Amenities</span>
          </div>
          <h2 className="heading-section" style={{ color: 'var(--color-navy)', marginBottom: '1rem' }}>
            Thoughtful Comforts for Every Guest
          </h2>
          <div className="gold-line-center" />
          <p className="lead-text">
            Every facility listed at Hotel Lara International is physically present and verified on property
            to ensure an honest, hassle-free hospitality experience.
          </p>
        </div>

        {/* 4x2 Grid of Verified Amenities */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {verifiedFacilities.map((facility, idx) => {
            const Icon = facility.icon;
            return (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '2rem 1.75rem',
                  border: '1px solid rgba(16, 28, 53, 0.08)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(16, 28, 53, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(198, 161, 91, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  e.currentTarget.style.borderColor = 'rgba(16, 28, 53, 0.08)';
                }}
              >
                {/* Gold Accent Top Bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
                    opacity: 0.6,
                  }}
                />

                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '10px',
                    background: 'rgba(198, 161, 91, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                    border: '1px solid rgba(198, 161, 91, 0.25)',
                  }}
                >
                  <Icon size={26} color="#C6A15B" />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.2rem',
                    color: 'var(--color-navy)',
                    marginBottom: '0.65rem',
                  }}
                >
                  {facility.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--color-charcoal-muted)',
                    lineHeight: 1.65,
                  }}
                >
                  {facility.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
