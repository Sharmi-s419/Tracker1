import React from 'react';
import RotatingLogo from './RotatingLogo';
import { Phone, Mail, MapPin, ArrowUp, Navigation, Calendar, Heart } from 'lucide-react';
import { getBookingAppUrl } from '../utils/bookingUrl';

export default function Footer({ onReplayOpening }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About The Property', href: '#about' },
    { name: 'Rooms & Accommodations', href: '#rooms' },
    { name: 'Visual Tour Gallery', href: '#gallery' },
    { name: 'Location & Distance Guide', href: '#location' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="contact"
      style={{
        backgroundColor: '#070D1A',
        color: 'rgba(255, 255, 255, 0.75)',
        borderTop: '1px solid rgba(198, 161, 91, 0.25)',
        position: 'relative',
        paddingTop: '4.5rem',
        paddingBottom: '2rem',
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Column 1: Brand & Philosophy */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <RotatingLogo size={48} speed={20} theme="gold" />
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: '#FFFFFF',
                    display: 'block',
                  }}
                >
                  HOTEL LARA
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.2em',
                    color: 'var(--color-gold-bright)',
                    textTransform: 'uppercase',
                  }}
                >
                  INTERNATIONAL • SUCHINDRAM
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              Comfortable, peaceful accommodation situated on the main corridor in Suchindram, Kanyakumari.
              Offering 14 well-maintained guest rooms with split air-conditioning and 24/7 hospitality.
            </p>

            <a
<<<<<<< HEAD
              href="https://maps.app.goo.gl/oAHJzUma2axes68P6"
=======
              href="https://maps.app.goo.gl/Tk3uEur3cttu12NZA?g_st=aw"
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-gold"
              style={{
                padding: '0.55rem 1.15rem',
                fontSize: '0.78rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
              }}
            >
              <Navigation size={14} />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>

          {/* Column 2: Quick Navigation */}
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
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{
                      fontSize: '0.88rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      transition: 'color 0.2s ease',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'; }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={getBookingAppUrl()}
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--color-gold-bright)',
                    fontWeight: 600,
                  }}
                >
                  Online Room Booking →
                </a>
              </li>
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
<<<<<<< HEAD
                  Nalloor Rd, Suchindrum, <br />
                  Eraviputhoor, Tamil Nadu — 629704.
=======
                  Main Road (Near Thanumalayan Temple & ISKCON), <br />
                  Suchindram, Kanyakumari District, <br />
                  Tamil Nadu — 629704.
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
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
                <Mail size={16} color="#C6A15B" style={{ flexShrink: 0 }} />
                <a href="mailto:hotellarainternational@gmail.com" style={{ color: '#FFFFFF' }}>
                  hotellarainternational@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Quick Booking & Back to Top */}
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
              Room Reservations
            </h4>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.25rem' }}>
              Check availability for your dates and reserve directly through our secure hotel booking console.
            </p>
            <a
              href={getBookingAppUrl()}
              className="btn btn-gold"
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem', textAlign: 'center', display: 'block' }}
            >
              Reserve Stay Online
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'rgba(255, 255, 255, 0.55)',
          }}
        >
          <div>
            © {currentYear} Hotel Lara International. All rights reserved. Suchindram, Kanyakumari District, Tamil Nadu.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button
              onClick={scrollToTop}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-gold)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.82rem',
                padding: 0,
              }}
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
