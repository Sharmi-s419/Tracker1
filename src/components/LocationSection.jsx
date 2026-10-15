import React from 'react';
import { MapPin, Navigation, Compass, ExternalLink, Car, Train, Plane, Clock } from 'lucide-react';

const nearbyLandmarks = [
  {
    name: 'Arulmigu Thanumalayan Temple',
    distance: '500 meters',
    time: '2 - 3 min walk',
    description: 'Renowned 17th-century temple dedicated to the holy Trinity (Shiva, Vishnu, Brahma) with majestic musical pillars and 22-ft Hanuman deity.',
  },
  {
    name: 'Kanyakumari Beach & Triveni Sangam',
    distance: '11.5 km',
    time: '18 min drive',
    description: 'The southern tip of mainland India where the Arabian Sea, Bay of Bengal, and Indian Ocean converge. Spectacular sunrise and sunset.',
  },
  {
    name: 'Vivekananda Rock Memorial & Statue',
    distance: '12 km',
    time: '20 min drive',
    description: 'Offshore monument on the sacred stone where Swami Vivekananda meditated, accessible via passenger ferry boats.',
  },
  {
    name: 'Nagercoil Junction Railway Station',
    distance: '6.5 km',
    time: '12 min drive',
    description: 'The primary rail hub connecting Suchindram and Kanyakumari to Chennai, Bengaluru, Trivandrum, Mumbai, and Delhi.',
  },
  {
    name: 'Padmanabhapuram Palace',
    distance: '22 km',
    time: '35 min drive',
    description: 'Magnificent 16th-century wooden palace displaying exquisite Kerala and Travancore architectural craftsmanship.',
  },
  {
    name: 'Trivandrum International Airport (TRV)',
    distance: '75 km',
    time: '1.5 - 2 hrs',
    description: 'Closest international airport offering regular domestic and overseas flights.',
  },
];

export default function LocationSection() {
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Suchindram+Thanumalayan+Temple+Kanyakumari+Tamil+Nadu';

  return (
    <section
      id="location"
      style={{
        padding: 'var(--section-padding)',
        backgroundColor: '#FFFFFF',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <div className="eyebrow" style={{ marginBottom: '0.85rem' }}>
            <span>Destination & Proximity</span>
          </div>
          <h2 className="heading-section" style={{ color: 'var(--color-navy)', marginBottom: '1rem' }}>
            Perfect Placement in Historic Suchindram
          </h2>
          <div className="gold-line-center" />
          <p className="lead-text">
            Situated on the principal access route of Suchindram, Hotel Lara International places you
            within strolling distance of sacred heritage and moments from the Kanyakumari shoreline.
          </p>
        </div>

        {/* 2-Column Map & Address Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'stretch',
            marginBottom: '4rem',
          }}
        >
          {/* Left Column: Address Card & Direction Actions */}
          <div
            style={{
              background: '#101C35',
              borderRadius: '14px',
              padding: '2.5rem 2rem',
              color: '#FFFFFF',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid rgba(198, 161, 91, 0.3)',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--color-gold)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                <MapPin size={15} />
                Property Address
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.6rem',
                  color: '#FFFFFF',
                  marginBottom: '1rem',
                  lineHeight: 1.3,
                }}
              >
                Hotel Lara International
              </h3>

              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.82)',
                  fontSize: '0.98rem',
                  lineHeight: 1.8,
                  marginBottom: '1.5rem',
                }}
              >
                Main Road (Near Thanumalayan Temple), <br />
                Suchindram, Kanyakumari District, <br />
                Tamil Nadu — 629704, India.
              </p>

              <div
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(198, 161, 91, 0.2)',
                  marginBottom: '1.75rem',
                }}
              >
                <div style={{ fontSize: '0.8rem', color: 'var(--color-gold-bright)', fontWeight: 600, marginBottom: '4px' }}>
                  Front Desk Contact:
                </div>
                <div style={{ fontSize: '0.95rem', color: '#FFFFFF' }}>
                  +91 8300504187 &nbsp;|&nbsp; +91 8056727757
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
                style={{ flex: 1, minWidth: '180px' }}
              >
                <Navigation size={16} />
                <span>Open in Google Maps</span>
              </a>

              <a
                href="tel:+918300504187"
                className="btn btn-outline-gold"
                style={{ flex: 1, minWidth: '160px' }}
              >
                <span>Call for Route Help</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Embed Frame */}
          <div
            style={{
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid rgba(16, 28, 53, 0.1)',
              minHeight: '380px',
              position: 'relative',
              background: '#EAE6DD',
            }}
          >
            <iframe
              title="Hotel Lara International Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15797.106456076295!2d77.4475475!3d8.1568434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f141db351a6d%3A0x88fecba68cfaebdc!2sSuchindram%2C%20Tamil%20Nadu%20629704!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px', display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Nearby Attractions Cards */}
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.45rem',
              color: 'var(--color-navy)',
              marginBottom: '1.75rem',
              textAlign: 'center',
            }}
          >
            Confirmed Nearby Attractions & Transit Hubs
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {nearbyLandmarks.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--color-ivory)',
                  padding: '1.5rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(198, 161, 91, 0.25)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--color-gold-dark)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <Clock size={13} /> {item.time}
                    </span>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: 'var(--color-navy)',
                        background: '#FFFFFF',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        border: '1px solid rgba(16, 28, 53, 0.1)',
                      }}
                    >
                      {item.distance}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
                    {item.name}
                  </h4>

                  <p style={{ fontSize: '0.84rem', color: 'var(--color-charcoal-muted)', lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
