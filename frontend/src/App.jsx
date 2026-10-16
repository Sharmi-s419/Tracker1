import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Rooms from './components/Rooms';
import Gallery from './components/Gallery';
import LocationSection from './components/LocationSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import OpeningScreen from './components/OpeningScreen';
import { Phone } from 'lucide-react';
import { getBookingAppUrl } from './utils/bookingUrl';

export default function App() {
  const [showOpening, setShowOpening] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        if (params.get('intro') === 'true' || params.get('intro') === '1' || params.get('replay') === 'true' || params.get('hold') === 'true') {
          return true;
        }
        const seen = sessionStorage.getItem('hotel_lara_opening_seen');
        return !seen;
      } catch (e) {
        return true;
      }
    }
    return true;
  });

  const handleOpeningComplete = () => {
    setShowOpening(false);
  };

  const handleReplayOpening = () => {
    try {
      sessionStorage.removeItem('hotel_lara_opening_seen');
    } catch (e) {}
    setShowOpening(true);
  };

  // Connects Book a Room and Reserve Stay directly to the separate booking dashboard
  const handleBookClick = (roomOrParams) => {
    let params = {};
    if (roomOrParams && roomOrParams.category) {
      params.category = roomOrParams.category;
    } else if (typeof roomOrParams === 'object' && roomOrParams !== null) {
      params = roomOrParams;
    }
    window.location.href = getBookingAppUrl(params);
  };

  const handleExploreRooms = () => {
    const el = document.querySelector('#rooms');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hotel-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Premium Opening Screen Animation */}
      {showOpening && <OpeningScreen onComplete={handleOpeningComplete} />}

      {/* 1. Sticky Navigation Header */}
      <Header onBookClick={handleBookClick} onReplayOpening={handleReplayOpening} />

      <main style={{ flex: 1 }}>
        {/* 2. Hero Section with Clear H1, verified details, and Reserve Stay CTA */}
        <Hero
          onBookClick={handleBookClick}
          onExploreRooms={handleExploreRooms}
        />

        {/* 3. Simplified, SEO-Optimized About Property Section */}
        <About />

        {/* 4. Verified Accommodations (Deluxe AC, Executive, Comfort Rooms only) */}
        <Rooms onSelectRoomForBooking={handleBookClick} />

        {/* 5. 3-Category Visual Tour Gallery (Exterior, Bedroom Ensuite, Bathroom Amenities) */}
        <Gallery />

        {/* 6. Location & Confirmed Transit / Temple Guide */}
        <LocationSection />


        {/* 8. Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* 9. Luxury Footer */}
      <Footer onReplayOpening={handleReplayOpening} />

      {/* Floating Reception Phone Button (Bottom-Right, Zero WhatsApp) */}
      <div
        className="floating-contact-dock"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 900,
        }}
      >
        <a
          href="tel:+918300504187"
          aria-label="Call Hotel Lara International Front Desk"
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: '#101C35',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(16, 28, 53, 0.45)',
            border: '2px solid var(--color-gold)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          title="Call Front Desk (+91 8300504187)"
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <Phone size={22} color="#C6A15B" />
        </a>
      </div>
    </div>
  );
}
