import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Rooms from './components/Rooms';
import Gallery from './components/Gallery';
import Facilities from './components/Facilities';
import LocationSection from './components/LocationSection';
import BookingContact from './components/BookingContact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import OpeningScreen from './components/OpeningScreen';
import { Phone } from 'lucide-react';
import WhatsAppIcon from './components/WhatsAppIcon';

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

  const handleBookClick = () => {
    const el = document.querySelector('#contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreRooms = () => {
    const el = document.querySelector('#rooms');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hotel-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Premium Opening Animation Overlay */}
      {showOpening && <OpeningScreen onComplete={handleOpeningComplete} />}

      {/* 1. Sticky Navigation Header */}
      <Header onBookClick={handleBookClick} onReplayOpening={handleReplayOpening} />

      <main style={{ flex: 1 }}>
        {/* 2. Hero Section with Real Exterior Image & Rotating Badge */}
        <Hero
          onBookClick={handleBookClick}
          onExploreRooms={handleExploreRooms}
        />

        {/* 3. About Property Section */}
        <About />

        {/* 4. Accommodations / Rooms Section with Real Photos */}
        <Rooms onSelectRoomForBooking={handleBookClick} />

        {/* 5. Editorial Photo Gallery with Lightbox */}
        <Gallery />

        {/* 6. Confirmed Facilities */}
        <Facilities />

        {/* 7. Location & Nearby Distance Guide */}
        <LocationSection />

        {/* 8. Direct Booking & Contact Form */}
        <BookingContact />

        {/* 9. Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* 11. Luxury Footer */}
      <Footer onReplayOpening={handleReplayOpening} />

      {/* Floating Quick Action Widget (Bottom-Right) */}
      <div
        className="floating-contact-dock"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 900,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <a
          href="https://wa.me/918300504187?text=Hello%20Hotel%20Lara%20International%2C%20I%20would%20like%20to%20enquire%20about%20room%20availability."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat directly with Hotel Lara International on WhatsApp"
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: '#25D366',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
            border: '2px solid #FFFFFF',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          title="Chat with Hotel Lara on WhatsApp (+91 8300504187)"
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <WhatsAppIcon size={30} color="#FFFFFF" ariaLabel="WhatsApp" />
        </a>

        <a
          href="tel:+918300504187"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            backgroundColor: '#101C35',
            color: '#C6A15B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(16, 28, 53, 0.45)',
            border: '2px solid #C6A15B',
            transition: 'transform 0.3s ease',
          }}
          title="Call Hotel Lara Reception Directly"
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <Phone size={22} />
        </a>
      </div>
    </div>
  );
}
