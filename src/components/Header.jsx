import React, { useState, useEffect } from 'react';
import RotatingLogo from './RotatingLogo';
import { Phone, Menu, X, ArrowUpRight } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export default function Header({ onBookClick, onReplayOpening }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Rooms', href: '#rooms' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          backgroundColor: scrolled ? 'rgba(16, 28, 53, 0.95)' : 'rgba(10, 18, 34, 0.35)',
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(6px)',
          borderBottom: scrolled ? '1px solid rgba(198, 161, 91, 0.25)' : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.35)' : 'none',
          padding: scrolled ? '0.75rem 0' : '1.25rem 0',
        }}
      >
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand Logo & Name */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.9rem',
            }}
          >
            <div
              onClick={(e) => {
                if (onReplayOpening) {
                  e.preventDefault();
                  e.stopPropagation();
                  onReplayOpening();
                }
              }}
              style={{ cursor: onReplayOpening ? 'pointer' : 'default' }}
              title="Click to replay opening animation"
            >
              <RotatingLogo size={scrolled ? 46 : 52} speed={24} theme="gold" />
            </div>
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: scrolled ? '1.05rem' : '1.2rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                  transition: 'font-size 0.3s ease',
                }}
              >
                HOTEL LARA
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: '0.65rem',
                  letterSpacing: '0.3em',
                  color: 'var(--color-gold-light)',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  marginTop: '2px',
                }}
              >
                INTERNATIONAL
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.88)',
                  position: 'relative',
                  padding: '4px 0',
                  transition: 'color 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-gold-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.88)';
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            {/* Quick Call */}
            <a
              href="tel:+918300504187"
              className="header-phone-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '0.82rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
                padding: '0.5rem 0.8rem',
                borderRadius: '4px',
                border: '1px solid rgba(198, 161, 91, 0.3)',
                background: 'rgba(16, 28, 53, 0.4)',
              }}
            >
              <Phone size={14} color="#C6A15B" />
              <span>8300504187</span>
            </a>

            {/* Book A Room Button */}
            <button
              onClick={() => {
                if (onBookClick) onBookClick();
                else {
                  const target = document.querySelector('#booking');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn btn-gold header-book-btn"
              style={{
                padding: '0.65rem 1.4rem',
                fontSize: '0.8rem',
              }}
            >
              <span>Book a Room</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-toggle"
              aria-label="Toggle navigation"
              style={{
                display: 'none',
                padding: '8px',
                color: '#FFFFFF',
                borderRadius: '4px',
                border: '1px solid rgba(198, 161, 91, 0.3)',
              }}
            >
              {mobileMenuOpen ? <X size={24} color="#C6A15B" /> : <Menu size={24} color="#FFFFFF" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(9, 16, 32, 0.98)',
          backdropFilter: 'blur(20px)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
        }}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            color: '#FFFFFF',
            padding: '8px',
          }}
          aria-label="Close menu"
        >
          <X size={28} color="#C6A15B" />
        </button>

        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <RotatingLogo size={70} speed={20} theme="gold" />
          <h2 style={{ color: '#FFFFFF', fontSize: '1.4rem', marginTop: '0.75rem' }}>
            HOTEL LARA INTERNATIONAL
          </h2>
          <p style={{ color: 'var(--color-gold)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
            SUCHINDRAM • KANYAKUMARI
          </p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.4rem' }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                color: '#FFFFFF',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '280px' }}>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              const target = document.querySelector('#booking');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn btn-gold"
            style={{ width: '100%' }}
          >
            Book a Room
          </button>

          <a
            href="https://wa.me/918300504187?text=Hello%20Hotel%20Lara%20International%2C%20I%20would%20like%20to%20enquire%20about%20room%20availability."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
            }}
            aria-label="Enquire on WhatsApp with Hotel Lara"
          >
            <WhatsAppIcon size={20} color="#FFFFFF" />
            <span>WhatsApp Enquiry</span>
          </a>

          <a
            href="tel:+918300504187"
            style={{
              textAlign: 'center',
              color: 'var(--color-gold-bright)',
              fontSize: '0.9rem',
              marginTop: '0.5rem',
            }}
          >
            Direct Call: +91 8300504187 / 8056727757
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav {
            display: none !important;
          }
          .header-phone-btn {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
        }
        @media (max-width: 520px) {
          .header-book-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
