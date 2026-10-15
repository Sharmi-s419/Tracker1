import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'How far is Hotel Lara International from the famous Suchindram Thanumalayan Temple?',
    a: 'Hotel Lara International is situated approximately 500 meters from the sacred Arulmigu Thanumalayan Temple. Guests can easily walk there within 2 to 3 minutes, making it especially convenient for early morning pujas and evening temple car festivals.',
  },
  {
    q: 'What are the standard check-in and check-out timings?',
    a: 'Our standard check-in is from 12:00 PM and check-out is by 11:00 AM. Because many devotees arrive on early morning trains at Nagercoil or Kanyakumari, flexible check-in can be arranged subject to room readiness by calling our front desk in advance at 8300504187.',
  },
  {
    q: 'Are both Air-Conditioned (AC) and Non-AC rooms available?',
    a: 'Yes, we offer both high-efficiency Split AC rooms (including our Deluxe King Suite and Executive Double Rooms) and well-ventilated comfort rooms with high-speed ceiling fans and garden windows.',
  },
  {
    q: 'Is vehicle parking provided on-site?',
    a: 'Yes, the property features a ground-floor covered portico and driveway for parking guest cars, two-wheelers, and tourist vehicles safely off the main street.',
  },
  {
    q: 'How far is Kanyakumari beach and the Vivekananda Rock Memorial?',
    a: 'Kanyakumari is approximately 11.5 km south of our hotel along the direct highway (NH 66 / Kanyakumari Road). It takes about 18 to 20 minutes by car, auto, or regular bus to reach the sunrise viewpoint and ferry terminal.',
  },
  {
    q: 'Are refreshments available on the premises?',
    a: 'Yes! The ground floor entrance features the "Lara Point Tea • Coffee" refreshment kiosk, serving fresh hot tea, south-style filter coffee, bottled mineral water, and packaged snacks throughout the day.',
  },
  {
    q: 'How can I make an instant reservation?',
    a: 'You can book directly by calling +91 8300504187 or +91 8056727757, or by clicking the WhatsApp enquiry button on our website for instantaneous confirmation and seasonal rates.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      style={{
        padding: 'var(--section-padding)',
        backgroundColor: 'var(--color-ivory)',
        position: 'relative',
      }}
    >
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="eyebrow" style={{ marginBottom: '0.85rem' }}>
            <span>Guest Information</span>
          </div>
          <h2 className="heading-section" style={{ color: 'var(--color-navy)', marginBottom: '1rem' }}>
            Frequently Asked Questions
          </h2>
          <div className="gold-line-center" />
          <p className="lead-text">
            Helpful answers to assist you in planning your pilgrimage or holiday stay at Hotel Lara International.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '10px',
                  border: isOpen ? '1px solid var(--color-gold)' : '1px solid rgba(16, 28, 53, 0.09)',
                  boxShadow: isOpen ? '0 8px 25px rgba(198, 161, 91, 0.15)' : 'var(--shadow-sm)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    textAlign: 'left',
                    color: isOpen ? 'var(--color-navy)' : 'var(--color-charcoal)',
                    fontWeight: 600,
                    fontSize: '1rem',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-sans)', lineHeight: 1.4 }}>
                    {faq.q}
                  </span>
                  <div
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDown size={18} color="#C6A15B" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 1.5rem 1.5rem 1.5rem',
                      color: 'var(--color-charcoal-muted)',
                      fontSize: '0.92rem',
                      lineHeight: 1.7,
                      borderTop: '1px solid rgba(198, 161, 91, 0.15)',
                      paddingTop: '1rem',
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
