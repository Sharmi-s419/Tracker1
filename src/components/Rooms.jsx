import React, { useState } from 'react';
import RoomModal from './RoomModal';
import { BedDouble, Users, Wind, ArrowRight, Tv, Sparkles, Check } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

const roomsData = [
  {
    id: 'deluxe-ac-king',
    title: 'Deluxe AC King Suite',
    category: 'Deluxe AC Rooms',
    categoryKey: 'ac',
    image: '/images/hotel-lara-deluxe-blue-room.webp',
    extraImages: [
      '/images/hotel-lara-deluxe-room-tv.webp',
      '/images/hotel-lara-ensuite-bathroom-1.webp'
    ],
    bed: 'Teakwood King Bed',
    capacity: '2 Adults + 1 Child',
    acType: 'High-Efficiency Split AC',
    description: 'Our premier accommodation featuring an elegant sky-blue accent wall, handcrafted solid teakwood King bed, two plush upholstered armchairs with carved accents, glass-topped coffee table, full-height 4-door wardrobe with vanity mirror, and recessed warm LED lighting.',
    amenities: [
      'Split Air Conditioning',
      'Solid Teakwood King Bed',
      'Plush Armchairs & Coffee Table',
      'Full Wardrobe with Dressing Mirror',
      'Designer Ensuite Bathroom',
      'Flat-Screen Smart LED TV',
      'Fresh Crisp Linen & Daily Housekeeping',
      'Hot & Cold Water Facility'
    ],
    pricing: 'Call 8300504187 for Today’s Best Tariff'
  },
  {
    id: 'executive-marble-room',
    title: 'Executive Double AC Room',
    category: 'Executive Rooms',
    categoryKey: 'executive',
    image: '/images/hotel-lara-executive-marble-room.webp',
    extraImages: [
      '/images/hotel-lara-deluxe-room-tv.webp',
      '/images/hotel-lara-ensuite-bathroom-2.webp'
    ],
    bed: 'Comfort Double Bed',
    capacity: '2 Adults',
    acType: 'Split Air Conditioned',
    description: 'Spacious executive room distinguished by polished Italian marble-look tile flooring with black granite border inlays. Equipped with comfortable double bed, wall-mounted Smart LED TV, quiet split air conditioner, en-suite bathroom, and bedside charging ports.',
    amenities: [
      'Split Air Conditioning',
      'Italian Marble Floor Inlays',
      'Wall-Mounted LED TV',
      'Solid Wood Double Bed',
      'Modern Ensuite Bathroom',
      'Dedicated Utility Counter',
      'Ample Natural Light',
      'Quiet Ambient Setting'
    ],
    pricing: 'Guaranteed Best Direct Tariff'
  },
  {
    id: 'standard-comfort-room',
    title: 'Standard Comfort Room',
    category: 'Comfort Rooms',
    categoryKey: 'comfort',
    image: '/images/hotel-lara-standard-comfort-room.webp',
    extraImages: [
      '/images/hotel-lara-room-view-window.webp',
      '/images/hotel-lara-ensuite-bathroom-1.webp'
    ],
    bed: 'Solid Wood Bed',
    capacity: '2 Guests',
    acType: 'Cooling Ceiling Fan / Optional AC',
    description: 'A cozy, impeccably clean guest room with calming soft-mint walls, wooden headboard bed, cheerful floral textiles, window ventilation overlooking garden greens, and private attached washroom. Ideal for pilgrims and transit travelers.',
    amenities: [
      'Solid Wood Bed Frame',
      'High-Speed Ceiling Fan',
      'Garden View Daylight Window',
      'Attached Private Bathroom',
      'Fresh Towels & Linens',
      'Convenient Electrical Sockets',
      '24/7 Front Desk Support'
    ],
    pricing: 'Value Pilgrim Tariff on Direct Call'
  },
  {
    id: 'suite-with-kitchenette',
    title: 'Suite with Kitchenette Counter',
    category: 'Executive Rooms',
    categoryKey: 'executive',
    image: '/images/hotel-lara-kitchenette-pantry.webp',
    extraImages: [
      '/images/hotel-lara-bedroom-suite-wide.webp',
      '/images/hotel-lara-deluxe-blue-room.webp'
    ],
    bed: 'King Bed Accommodation',
    capacity: '2-3 Guests',
    acType: 'Split AC Climate Control',
    description: 'Tailored for extended stays and families seeking extra convenience, this suite features a private in-room utility and pantry counter with polished black granite countertop, stainless steel sink, tiled backsplash, wooden wardrobe, and ensuite bathroom.',
    amenities: [
      'In-Room Granite Counter & Sink',
      'Spacious King Bedroom Suite',
      'Split Air Conditioner',
      'Large Wooden Wardrobe',
      'Ensuite Bathroom with Shower',
      'Flat-Screen Television',
      'Spacious Floor Layout'
    ],
    pricing: 'Direct Booking Exclusive'
  }
];

export default function Rooms({ onSelectRoomForBooking }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedRoomModal, setSelectedRoomModal] = useState(null);

  const filteredRooms = activeFilter === 'all'
    ? roomsData
    : roomsData.filter(r => r.categoryKey === activeFilter);

  const filterTabs = [
    { label: 'All Accommodations', key: 'all' },
    { label: 'Deluxe AC Rooms', key: 'ac' },
    { label: 'Executive Suites', key: 'executive' },
    { label: 'Comfort Rooms', key: 'comfort' },
  ];

  return (
    <section
      id="rooms"
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
            <span>Verified Accommodations</span>
          </div>
          <h2 className="heading-section" style={{ color: 'var(--color-navy)', marginBottom: '1rem' }}>
            Rooms Crafted for Restful Slumber
          </h2>
          <div className="gold-line-center" />
          <p className="lead-text">
            Every room at Hotel Lara International is meticulously prepared with genuine teakwood furniture,
            crisp linens, modern air conditioning, and private en-suite bathrooms.
          </p>

          {/* Interactive Filter Pills */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center',
              marginTop: '2rem',
              background: '#F7F4EC',
              padding: '6px',
              borderRadius: '9999px',
              border: '1px solid rgba(198, 161, 91, 0.25)',
            }}
          >
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                style={{
                  padding: '0.55rem 1.35rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  transition: 'all 0.3s ease',
                  backgroundColor: activeFilter === tab.key ? '#101C35' : 'transparent',
                  color: activeFilter === tab.key ? '#FFFFFF' : 'var(--color-charcoal)',
                  boxShadow: activeFilter === tab.key ? '0 4px 14px rgba(16, 28, 53, 0.25)' : 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Room Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {filteredRooms.map((room) => {
            const whatsappText = encodeURIComponent(
              `Hello Hotel Lara International, I would like to book the ${room.title}. Please let me know rates and availability.`
            );

            return (
              <div
                key={room.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: '1px solid rgba(16, 28, 53, 0.09)',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 18px 45px rgba(16, 28, 53, 0.14)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
              >
                {/* Image Container with Badge */}
                <div style={{ position: 'relative', height: '260px', overflow: 'hidden', backgroundColor: '#091020' }}>
                  <img
                    src={room.image}
                    alt={room.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      backgroundColor: 'rgba(16, 28, 53, 0.88)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--color-gold-bright)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '4px',
                      border: '1px solid rgba(198, 161, 91, 0.4)',
                    }}
                  >
                    {room.category}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.35rem',
                      color: 'var(--color-navy)',
                      marginBottom: '0.65rem',
                    }}
                  >
                    {room.title}
                  </h3>

                  {/* Highlights Specs */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.9rem',
                      fontSize: '0.8rem',
                      color: 'var(--color-charcoal-muted)',
                      marginBottom: '1rem',
                      paddingBottom: '0.9rem',
                      borderBottom: '1px solid rgba(41, 41, 41, 0.08)',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <BedDouble size={14} color="#C6A15B" /> {room.bed}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Users size={14} color="#C6A15B" /> {room.capacity}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Wind size={14} color="#C6A15B" /> {room.acType}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--color-charcoal-muted)',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                      flex: 1,
                    }}
                  >
                    {room.description.slice(0, 140)}...
                  </p>

                  {/* Verified Amenities Snippet */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                    {room.amenities.slice(0, 3).map((am, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.74rem',
                          background: '#F7F4EC',
                          color: 'var(--color-navy)',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '4px',
                          border: '1px solid rgba(198, 161, 91, 0.2)',
                        }}
                      >
                        ✓ {am}
                      </span>
                    ))}
                  </div>

                  {/* Card Actions */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.65rem',
                      marginTop: 'auto',
                    }}
                  >
                    <button
                      onClick={() => setSelectedRoomModal(room)}
                      className="btn btn-navy"
                      style={{
                        padding: '0.75rem 0.8rem',
                        fontSize: '0.76rem',
                      }}
                    >
                      <span>Room Details</span>
                    </button>

                    <a
                      href={`https://wa.me/918300504187?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                      style={{
                        padding: '0.75rem 0.85rem',
                        fontSize: '0.78rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                      }}
                      aria-label={`Enquire about ${room.title} on WhatsApp`}
                    >
                      <WhatsAppIcon size={18} color="#FFFFFF" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Booking Guarantee Notice */}
        <div
          style={{
            marginTop: '3.5rem',
            textAlign: 'center',
            padding: '1.5rem',
            background: 'var(--color-ivory)',
            borderRadius: '8px',
            border: '1px dashed rgba(198, 161, 91, 0.5)',
          }}
        >
          <p style={{ fontSize: '0.9rem', color: 'var(--color-charcoal)' }}>
            ✦ <strong>Guaranteed Best Rates on Direct Booking:</strong> Contact hotel management directly at{' '}
            <a href="tel:+918300504187" style={{ color: 'var(--color-navy)', fontWeight: 600, textDecoration: 'underline' }}>
              8300504187
            </a>{' '}
            or{' '}
            <a href="tel:+918056727757" style={{ color: 'var(--color-navy)', fontWeight: 600, textDecoration: 'underline' }}>
              8056727757
            </a>{' '}
            to secure seasonal availability and instant confirmations.
          </p>
        </div>
      </div>

      {/* Room Modal */}
      {selectedRoomModal && (
        <RoomModal
          room={selectedRoomModal}
          onClose={() => setSelectedRoomModal(null)}
        />
      )}
    </section>
  );
}
