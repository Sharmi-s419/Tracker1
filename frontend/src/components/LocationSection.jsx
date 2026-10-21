import React from 'react';
import { MapPin, Navigation, Compass, ExternalLink, Car, Train, Plane, Clock, Sparkles } from 'lucide-react';

const nearbyLandmarks = [
  {
    id: 'thanumalayan-temple',
    name: 'Thanumalayan Temple, Suchindram',
    category: 'Sacred Heritage',
    distance: 'Approx. 1 km',
    time: '3 - 4 min drive',
    image: '/images/attractions/thanumalayan-temple-suchindram.webp',
    alt: 'Suchindram Thanumalayan Temple magnificent 7-tier white gopuram and sacred tank',
    link: 'https://www.google.com/maps/search/?api=1&query=Thanumalayan+Temple+Suchindram',
    description: 'Renowned 17th-century architectural marvel dedicated to the holy Trinity (Shiva, Vishnu, Brahma). World-famous for musical stone pillars, a 22-foot monolithic Hanuman deity, and sacred car festivals.',
    attribution: 'Photo: Wikimedia Commons (CC BY-SA 4.0)',
  },
  {
    id: 'iskcon-temple',
    name: 'ISKCON Temple, Kanyakumari',
    category: 'Spiritual Center',
    badgeText: 'Closest to ISKCON, Kanyakumari',
    image: '/images/attractions/iskcon-temple-kanyakumari.webp',
    alt: 'ISKCON Kanyakumari Sri Sri Radha Madhav Temple sanctuary on Nalloor Road, Akkarai',
    link: 'https://www.google.com/maps/search/?api=1&query=ISKCON+Kanyakumari',
    description: 'Sanctuary of peace and devotion dedicated to Sri Sri Radha Madhav and Lord Krishna on Nalloor Road, Akkarai. Features soulful daily kirtans, Bhagavad Gita discourses, and devotional gatherings. Hotel Lara International provides the closest premier lodging for visiting devotees.',
    attribution: 'Photo: ISKCON Kanyakumari Sanctuary',
  },
  {
    id: 'kanyakumari-beach',
    name: 'Kanyakumari Beach & Triveni Sangam',
    category: 'Coastal Landmark',
    distance: '11.5 km',
    time: '18 min drive',
    image: '/images/attractions/kanyakumari-beach-triveni-sangam.webp',
    alt: 'Sunrise over Kanyakumari Beach and the Triveni Sangam ocean confluence',
    link: 'https://www.google.com/maps/search/?api=1&query=Kanyakumari+Beach+Triveni+Sangam',
    description: 'The southern tip of mainland India where the Arabian Sea, Bay of Bengal, and Indian Ocean merge. World-famous for panoramic sunrise and sunset vistas, rocky shoreline promenades, and spiritual bathing ghats.',
    attribution: 'Photo: Wikimedia Commons (CC BY-SA 3.0)',
  },
  {
    id: 'vivekananda-rock',
    name: 'Vivekananda Rock Memorial',
    category: 'Historic Monument',
    distance: '12 km',
    time: '20 min drive',
    image: '/images/attractions/vivekananda-rock-memorial.webp',
    alt: 'Vivekananda Rock Memorial and Thiruvalluvar Statue offshore monument',
    link: 'https://www.google.com/maps/search/?api=1&query=Vivekananda+Rock+Memorial+Kanyakumari',
    description: 'Majestic offshore stone memorial situated 500 meters off the mainland on the sacred rock where Swami Vivekananda meditated in 1892, accessible by regular passenger ferry boats.',
    attribution: 'Photo: Wikimedia Commons (CC BY-SA 4.0)',
  },
  {
    id: 'nagercoil-junction',
    name: 'Nagercoil Junction Railway Station',
    category: 'Transit Hub',
    distance: '6.5 km',
    time: '12 min drive',
    image: '/images/attractions/nagercoil-junction-railway-station.webp',
    alt: 'Nagercoil Junction Railway Station NCJ platform and entrance building',
    link: 'https://www.google.com/maps/search/?api=1&query=Nagercoil+Junction+Railway+Station',
    description: 'The primary rail hub for the Kanyakumari district (station code NCJ), connecting Suchindram directly with express, superfast, and Vande Bharat routes to Chennai, Bengaluru, Trivandrum, Mumbai, and Delhi.',
    attribution: 'Photo: Wikimedia Commons (CC BY-SA 4.0)',
  },
  {
    id: 'padmanabhapuram-palace',
    name: 'Padmanabhapuram Palace',
    category: 'Travancore Heritage',
    distance: '22 km',
    time: '35 min drive',
    image: '/images/attractions/padmanabhapuram-palace.webp',
    alt: 'Padmanabhapuram Palace 16th-century wooden architectural clock tower and courtyard',
    link: 'https://www.google.com/maps/search/?api=1&query=Padmanabhapuram+Palace+Thuckalay',
    description: 'Magnificent 16th-century wooden palace complex nestled at the foot of Veli Hills. Celebrated for intricate rosewood and teak woodwork, Belgian mirrors, secret escape routes, and historic Travancore architecture.',
    attribution: 'Photo: Wikimedia Commons (CC BY-SA 4.0)',
  },
  {
    id: 'trivandrum-airport',
    name: 'Thiruvananthapuram International Airport (TRV)',
    category: 'Aviation Gateway',
    distance: '75 km',
    time: '1.5 - 2 hrs',
    image: '/images/attractions/thiruvananthapuram-international-airport.webp',
    alt: 'Thiruvananthapuram International Airport TRV terminal building',
    link: 'https://www.google.com/maps/search/?api=1&query=Trivandrum+International+Airport',
    description: 'The closest international airport to Suchindram and Kanyakumari. Features direct flight connections to major domestic metropolitan hubs across India as well as extensive non-stop Middle East services.',
    attribution: 'Photo: Wikimedia Commons (CC BY-SA 3.0)',
  },
];

export default function LocationSection() {
  const googleMapsUrl = 'https://maps.app.goo.gl/oAHJzUma2axes68P6';

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
            within moments of Thanumalayan Temple, closest to ISKCON, Kanyakumari, and minutes from the southern coast.
          </p>
        </div>

        {/* 2-Column Map & Address Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'stretch',
            marginBottom: '4.5rem',
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
                Nalloor Rd, Suchindrum, <br />
                Eraviputhoor, Tamil Nadu — 629704, India.
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
                aria-label="View Hotel Lara International on Google Maps"
              >
                <Navigation size={16} />
                <span>View on Google Maps</span>
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
            {/* Direct Directions Floating Bar */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                right: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'rgba(16, 28, 53, 0.94)',
                backdropFilter: 'blur(8px)',
                padding: '0.65rem 0.95rem',
                borderRadius: '8px',
                border: '1px solid rgba(198, 161, 91, 0.35)',
                zIndex: 10,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#FFFFFF', fontSize: '0.82rem', fontWeight: 600 }}>
                <MapPin size={15} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Hotel Lara International</span>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
                style={{
                  padding: '0.4rem 0.85rem',
                  fontSize: '0.75rem',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                }}
                aria-label="Get Directions to Hotel Lara International on Google Maps"
              >
                <Navigation size={13} />
                <span>Get Directions</span>
              </a>
            </div>

            <iframe
              title="Hotel Lara International Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.33611382404!2d77.4706665!3d8.1601671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f3203f4bde1d%3A0x80e1120d042fe253!2sHotel%20Lara%20International!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px', display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Nearby Attractions Cards Section */}
        <div>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.65rem',
                color: 'var(--color-navy)',
                marginBottom: '0.65rem',
              }}
            >
              Confirmed Nearby Attractions & Transit Hubs
            </h3>
            <div className="gold-line-center" style={{ margin: '0.75rem auto 1rem' }} />
            <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Explore world-renowned temples, oceanic panoramas, and royal Travancore landmarks situated moments from our property.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {nearbyLandmarks.map((item) => (
              <div key={item.id} className="attraction-card">
                {/* Image Top Header with Zoom effect */}
                <div className="attraction-image-container">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="attraction-img"
                    width="800"
                    height="500"
                  />
                  <div className="attraction-img-overlay" />

                  {/* Overlaid Badges */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      right: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      zIndex: 2,
                    }}
                  >
                    {item.badgeText ? (
                      <span
                        style={{
                          fontSize: '0.73rem',
                          fontWeight: 700,
                          color: '#101C35',
                          background: 'linear-gradient(135deg, #F5E0B2 0%, #DFBF7D 100%)',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '4px',
                          border: '1px solid #C6A15B',
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
                          letterSpacing: '0.03em',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                        }}
                      >
                        <Sparkles size={12} color="#101C35" />
                        {item.badgeText}
                      </span>
                    ) : item.time ? (
                      <span
                        style={{
                          fontSize: '0.73rem',
                          fontWeight: 600,
                          color: 'var(--color-gold-bright)',
                          background: 'rgba(16, 28, 53, 0.88)',
                          backdropFilter: 'blur(6px)',
                          padding: '0.32rem 0.7rem',
                          borderRadius: '4px',
                          border: '1px solid rgba(198, 161, 91, 0.35)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          letterSpacing: '0.04em',
                        }}
                      >
                        <Clock size={12} color="var(--color-gold)" />
                        {item.time}
                      </span>
                    ) : <span />}

                    {item.distance && (
                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: 'var(--color-navy)',
                          background: 'rgba(255, 255, 255, 0.96)',
                          backdropFilter: 'blur(4px)',
                          padding: '0.3rem 0.7rem',
                          borderRadius: '4px',
                          border: '1px solid rgba(16, 28, 53, 0.1)',
                          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.distance}
                      </span>
                    )}
                  </div>

                  {/* Category Pill Over Image Bottom */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '14px',
                      zIndex: 2,
                      color: 'var(--color-gold-bright)',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    ✦ {item.category}
                  </div>
                </div>

                {/* Card Body */}
                <div
                  style={{
                    padding: '1.6rem 1.6rem 1.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <div>
                    {/* Attraction Name */}
                    <h4
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.22rem',
                        color: 'var(--color-navy)',
                        marginBottom: '0.75rem',
                        lineHeight: 1.35,
                      }}
                    >
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: 'var(--color-navy)',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            transition: 'color 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--color-gold-dark)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--color-navy)';
                          }}
                          title={`Open ${item.name} destination on Google Maps`}
                        >
                          <span>{item.name}</span>
                          <ExternalLink size={14} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                        </a>
                      ) : (
                        item.name
                      )}
                    </h4>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: '0.86rem',
                        color: 'var(--color-charcoal-muted)',
                        lineHeight: 1.65,
                        marginBottom: '1.4rem',
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Directions / Location Link */}
                  <div
                    style={{
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(198, 161, 91, 0.22)',
                      marginTop: 'auto',
                    }}
                  >
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-gold"
                      style={{
                        width: '100%',
                        padding: '0.7rem 1rem',
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.55rem',
                      }}
                      aria-label={`View ${item.name} on Google Maps`}
                    >
                      <Navigation size={14} />
                      <span>View on Google Maps</span>
                      <ExternalLink size={13} style={{ opacity: 0.8 }} />
                    </a>

                    {/* Attribution Line */}
                    <div
                      style={{
                        fontSize: '0.67rem',
                        color: 'rgba(90, 90, 90, 0.75)',
                        marginTop: '0.55rem',
                        textAlign: 'center',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {item.attribution}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
