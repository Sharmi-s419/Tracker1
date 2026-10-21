import React, { useState, useEffect } from 'react';
import RotatingLogo from './RotatingLogo';
import { Phone, Menu, X, ArrowUpRight } from 'lucide-react';
import { getBookingAppUrl } from '../utils/bookingUrl';

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
    { name: 'Visual Tour', href: '#gallery' },
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

  const handleBookNavigation = () => {
    if (onBookClick) {
      onBookClick();
    } else {
      window.location.href = getBookingAppUrl();
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
          backgroundColor: scrolled ? 'rgba(16, 28, 53, 0.96)' : 'rgba(10, 18, 34, 0.45)',
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
                  lineHeight: 1.2,
                }}
              >
                HOTEL LARA
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: '0.65rem',
                  letterSpacing: '0.24em',
                  color: 'var(--color-gold-bright)',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                }}
              >
                INTERNATIONAL • SUCHINDRAM
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.2rem',
            }}
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
                  letterSpacing: '0.08em',
                  color: 'rgba(255, 255, 255, 0.88)',
                  textTransform: 'uppercase',
                  position: 'relative',
                  padding: '0.4rem 0',
                  transition: 'color 0.25s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.88)'; }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* Quick Phone Call Pill */}
            <a
              href="tel:+918300504187"
              className="header-phone-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1.1rem',
                borderRadius: '9999px',
                border: '1px solid rgba(198, 161, 91, 0.35)',
                backgroundColor: 'rgba(16, 28, 53, 0.6)',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                transition: 'all 0.25s ease',
              }}
              title="Call Reception Directly"
            >
              <Phone size={14} color="#C6A15B" />
              <span>8300504187</span>
            </a>

            {/* Book A Room Button (Direct to Booking Dashboard) */}
            <button
              onClick={handleBookNavigation}
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
                background: 'transparent',
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
            background: 'none',
            border: 'none',
            cursor: 'pointer',
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
              handleBookNavigation();
            }}
            className="btn btn-gold"
            style={{ width: '100%', padding: '0.85rem' }}
          >
            Book a Room
          </button>

          <a
            href="tel:+918300504187"
            className="btn btn-outline-gold"
            style={{
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              padding: '0.85rem',
            }}
          >
            <Phone size={18} />
            <span>Call Front Desk</span>
          </a>

          <div
            style={{
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.8rem',
              marginTop: '0.5rem',
            }}
          >
            Direct Reception: +91 8300504187 / 8056727757
          </div>
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
