import React, { useState, useEffect, useRef } from 'react';
import RotatingLogo from './RotatingLogo';
import './OpeningScreen.css';

/**
 * OpeningScreen Component for Hotel Lara International
 * Inspired by the high-end architectural opening experience of ERA Residence.
 * 
 * Features:
 * - Full-screen immersive luxury backdrop in Deep Navy (#091020).
 * - Perfectly centered Hotel Lara International emblem with stable central floral core
 *   and smoothly orbiting circular typography.
 * - Delicate gold hairline accents and ambient warm halo.
 * - Architectural curtain reveal transition uncovering the pristine homepage.
 * - Respects prefers-reduced-motion, session storage, and safety timeouts.
 */
export default function OpeningScreen({ onComplete }) {
  const [isRevealing, setIsRevealing] = useState(false);
  const [logoSize, setLogoSize] = useState(235);
  const timersRef = useRef([]);

  // Responsive logo sizing
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 480) {
        setLogoSize(165);
      } else if (window.innerWidth < 768) {
        setLogoSize(195);
      } else {
        setLogoSize(235);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Main animation orchestration and cleanup
  useEffect(() => {
    // 1. Prevent background scrolling during opening
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 2. Check prefers-reduced-motion and force parameter
    const params = new URLSearchParams(window.location.search);
    const forceIntro = params.get('intro') === 'true' || params.get('intro') === '1' || params.get('replay') === 'true';

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && !forceIntro) {
      // Provide a quick, accessible transition (0.6s) for reduced motion
      const quickReveal = setTimeout(() => setIsRevealing(true), 350);
      const quickComplete = setTimeout(() => finish(), 750);
      return () => {
        document.body.style.overflow = originalOverflow;
        clearTimeout(quickReveal);
        clearTimeout(quickComplete);
      };
    }

    const finish = () => {
      document.body.style.overflow = originalOverflow;
      try {
        sessionStorage.setItem('hotel_lara_opening_seen', 'true');
      } catch (e) {
        // Ignore storage exceptions if restricted
      }
      if (onComplete) onComplete();
    };

    const shouldHold = params.get('hold') === 'true';
    if (shouldHold) {
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }

    // 3. Stage 1 -> Stage 2: Trigger Curtain Reveal at 2.15 seconds
    const revealTimer = setTimeout(() => {
      setIsRevealing(true);
    }, 2150);
    timersRef.current.push(revealTimer);

    // 4. Stage 2 -> Complete: Finish and unmount after curtain animation finishes (~2.95s)
    const completeTimer = setTimeout(() => {
      finish();
    }, 2950);
    timersRef.current.push(completeTimer);

    // 5. Fail-safe timer (never block the user under any circumstance)
    const safetyTimer = setTimeout(() => {
      finish();
    }, 3600);
    timersRef.current.push(safetyTimer);

    // 6. Keyboard Escape key to skip
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsRevealing(true);
        setTimeout(finish, 400);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      timersRef.current.forEach((t) => clearTimeout(t));
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsRevealing(true);
    setTimeout(() => {
      document.body.style.overflow = '';
      try {
        sessionStorage.setItem('hotel_lara_opening_seen', 'true');
      } catch (e) {}
      if (onComplete) onComplete();
    }, 450);
  };

  return (
    <div
      className={`opening-screen-overlay ${isRevealing ? 'is-revealing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Hotel Lara International Welcome Experience"
    >
      {/* 1. Atmospheric Ambient Gold Aura */}
      <div className="opening-aura-glow" aria-hidden="true" />

      {/* 2. Central Stage */}
      <div className="opening-stage">
        {/* Delicate Concentric Gold Accent Rings */}
        <div className="opening-accent-ring-outer" aria-hidden="true" />
        <div className="opening-accent-ring-inner" aria-hidden="true" />

        {/* Centerpiece Logo */}
        <div className="opening-logo-wrapper">
          <RotatingLogo
            size={logoSize}
            theme="gold"
            speed={20}
            idPrefix="opening"
            isOpening={true}
          />
        </div>

        {/* Delicate Gold Accent Finishing Touch */}
        <div className="opening-finishing-accent">
          <div className="opening-accent-line" />
          <span className="opening-accent-star">✦</span>
          <span className="opening-accent-text">Suchindram</span>
          <span className="opening-accent-star">✦</span>
          <div className="opening-accent-line" />
        </div>
      </div>

      {/* 3. Discreet Skip Button */}
      <button
        type="button"
        className="opening-skip-btn"
        onClick={handleSkip}
        title="Skip Opening (Esc)"
      >
        Skip
      </button>
    </div>
  );
}
