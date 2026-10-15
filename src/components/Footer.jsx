import React from 'react';
import RotatingLogo from './RotatingLogo';
import { Phone, MapPin, Navigation, ArrowUp, Mail } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export default function Footer({ onReplayOpening }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About The Hotel', href: '#about' },
    { name: 'Rooms & Accommodations', href: '#rooms' },
    { name: 'Property Gallery', href: '#gallery' },
    { name: 'Facilities & Amenities', href: '#facilities' },
    { name: 'Location & Nearby', href: '#location' },
    { name: 'Contact & Booking', href: '#contact' },
  ];

  return (
    <footer
      style={{
        backgroundColor: '#070C18',
        color: '#FFFFFF',
        paddingTop: '5rem',
        paddingBottom: '2.5rem',
        borderTop: '1px solid rgba(198, 161, 91, 0.25)',
        position: 'relative',
      }}
    >
      <div className="container-wide">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Column 1: Brand & Rotating Emblem */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div
                onClick={onReplayOpening}
                style={{ cursor: onReplayOpening ? 'pointer' : 'default' }}
                title="Click to replay opening animation"
              >
                <RotatingLogo size={62} speed={20} theme="gold" idPrefix="footer" />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.2rem',
                    color: '#FFFFFF',
                    letterSpacing: '0.06em',
                    lineHeight: 1.2,
                  }}
                >
                  HOTEL LARA
                </h3>
                <span
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.28em',
                    color: 'var(--color-gold)',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginTop: '2px',
                  }}
                >
                  INTERNATIONAL
                </span>
              </div>
            </div>

            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Your comfortable haven in Suchindram, Kanyakumari. Genuine hospitality, air-conditioned rooms,
              and serene surroundings just moments from the holy Thanumalayan Temple.
            </p>

            <div style={{ display: 'inline-block', padding: '0.4rem 0.8rem', background: 'rgba(198, 161, 91, 0.12)', borderRadius: '4px', border: '1px solid rgba(198, 161, 91, 0.3)', fontSize: '0.78rem', color: 'var(--color-gold-bright)' }}>
              ✦ “Your Comfort, Our Priority.”
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.05rem',
                color: 'var(--color-gold)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '0.88rem',
                      transition: 'color 0.25s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-gold)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'; }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Verified Contact Info */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.05rem',
                color: 'var(--color-gold)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Direct Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={18} color="#C6A15B" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>
                  Main Road (Near Thanumalayan Temple & ISKCON), <br />
                  Suchindram, Kanyakumari District, <br />
                  Tamil Nadu — 629704.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={16} color="#C6A15B" style={{ flexShrink: 0 }} />
                <div>
                  <a href="tel:+918300504187" style={{ color: '#FFFFFF', fontWeight: 600 }}>8300504187</a>
                  <span style={{ margin: '0 6px', color: 'rgba(255,255,255,0.4)' }}>/</span>
                  <a href="tel:+918056727757" style={{ color: '#FFFFFF', fontWeight: 600 }}>8056727757</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <WhatsAppIcon size={18} color="#25D366" style={{ flexShrink: 0 }} />
                <a
                  href="https://wa.me/918300504187"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#25D366', fontWeight: 500 }}
                  aria-label="Direct WhatsApp message to Hotel Lara International (+91 8300504187)"
                >
                  WhatsApp: +91 8300504187
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Quick Booking & Location */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.05rem',
                color: 'var(--color-gold)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Directions & Booking
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Directly accessible from the Suchindram-Kanyakumari corridor with covered portico parking for guest vehicles.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="https://maps.app.goo.gl/Tk3uEur3cttu12NZA?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-gold"
                style={{ padding: '0.65rem 1rem', fontSize: '0.78rem' }}
                aria-label="View Hotel Lara International on Google Maps"
              >
                <Navigation size={14} />
                <span>View on Google Maps</span>
              </a>

              <a
                href="tel:+918300504187"
                className="btn btn-gold"
                style={{ padding: '0.65rem 1rem', fontSize: '0.78rem' }}
              >
                <Phone size={14} />
                <span>Call Front Desk Now</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.55)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Hotel Lara International. All rights reserved. Suchindram, Kanyakumari.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>Verified Property</span>
            <span>•</span>
            <span>Best Direct Tariff</span>
            <button
              onClick={scrollToTop}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: 'var(--color-gold)',
                cursor: 'pointer',
              }}
              title="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
