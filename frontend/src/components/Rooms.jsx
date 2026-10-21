import React, { useState } from 'react';
import RoomModal from './RoomModal';
import { BedDouble, Users, Wind, ArrowRight, Tv, Check, Sparkles } from 'lucide-react';
import { getBookingAppUrl } from '../utils/bookingUrl';

export const resolveFrontendRoomPhoto = (room) => {
  if (!room) return null;
  const num = String(room.room_number || room.number || '').trim();

  // 1. If backend returned a photo_url or image
  const rawUrl = room.photo_url || (typeof room.image === 'string' ? room.image : null) || room.image_url;
  if (rawUrl && typeof rawUrl === 'string' && rawUrl.trim()) {
    const trimmed = rawUrl.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
    const backendOrigin = apiBase.replace(/\/api\/?$/, '');
    if (cleanPath.startsWith('/media/')) {
      return `${backendOrigin}${cleanPath}`;
    }
    if (cleanPath.startsWith('/images/')) {
      return cleanPath;
    }
    return `${backendOrigin}/media/${trimmed.replace(/^room_photos\//, 'room_photos/')}`;
  }

  // 2. Fallback to bundled room photo matching exact room number
  const bundled = {
    '001': '/images/rooms/001.jpg',
    '002': '/images/rooms/002.jpg',
    '101': '/images/rooms/101.png',
    '102': '/images/rooms/102.jpg',
    '103': '/images/rooms/103.jpg',
    '104': '/images/rooms/104.jpg',
  };
  if (num && bundled[num]) return bundled[num];
  return null;
};
const roomsData = [
  {
    id: 'deluxe-ac-king',
    title: 'Deluxe AC King Room',
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
    description: 'Our premier accommodation featuring an elegant sky-blue accent wall, handcrafted solid teakwood King bed, two plush upholstered armchairs with coffee table, full-height wardrobe with vanity mirror, and recessed warm lighting.',
    amenities: [
      'Split Air Conditioning',
      'Solid Teakwood King Bed',
      'Plush Armchairs & Coffee Table',
      'Full Wardrobe with Dressing Mirror',
      'Designer Attached Ensuite Bathroom',
      'Flat-Screen Smart LED TV',
      'Daily Housekeeping & Crisp Linen',
      'Hot & Cold Water Facility'
    ],
    pricing: 'Direct Best Tariff Available'
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
      'Wall-Mounted Smart LED TV',
      'Solid Wood Double Bed',
      'Modern Ensuite Bathroom',
      'Dedicated Utility Counter',
      'Ample Natural Light',
      'Quiet Ambient Setting'
    ],
    pricing: 'Direct Best Tariff Available'
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
    pricing: 'Value Pilgrim Tariff'
  }
];

export const FLOOR_GROUPS = [
  {
    key: 'ground',
    badge: 'Ground Floor',
    title: 'Ground Floor',
    subtitle: 'Convenient ground level access — 2 Rooms',
    rooms: [
      { number: '001', name: 'Standard Double Room', floor: 'Ground Floor', bed: 'Double Bed' },
      { number: '002', name: 'Standard Double Room', floor: 'Ground Floor', bed: 'Double Bed' },
    ],
  },
  {
    key: 'first',
    badge: 'First Floor',
    title: 'First Floor',
    subtitle: 'Quiet level 1 accommodations — 6 Rooms',
    rooms: [
      { number: '101', name: 'Twin Room', floor: 'First Floor', bed: 'Twin Beds' },
      { number: '102', name: 'Standard Double Room', floor: 'First Floor', bed: 'Double Bed' },
      { number: '103', name: 'Standard Double Room', floor: 'First Floor', bed: 'Double Bed' },
      { number: '104', name: 'Standard Double Room', floor: 'First Floor', bed: 'Double Bed' },
      { number: '105', name: 'Standard Double Room', floor: 'First Floor', bed: 'Double Bed' },
      { number: '106', name: 'Standard Double Room', floor: 'First Floor', bed: 'Double Bed' },
    ],
  },
  {
    key: 'second',
    badge: 'Second Floor',
    title: 'Second Floor',
    subtitle: 'Panoramic upper level rooms — 6 Rooms',
    rooms: [
      { number: '201', name: 'Twin Room', floor: 'Second Floor', bed: 'Twin Beds' },
      { number: '202', name: 'Standard Double Room', floor: 'Second Floor', bed: 'Double Bed' },
      { number: '203', name: 'Standard Double Room', floor: 'Second Floor', bed: 'Double Bed' },
      { number: '204', name: 'Standard Double Room', floor: 'Second Floor', bed: 'Double Bed' },
      { number: '205', name: 'Standard Double Room', floor: 'Second Floor', bed: 'Double Bed' },
      { number: '206', name: 'Standard Double Room', floor: 'Second Floor', bed: 'Double Bed' },
    ],
  },
];

export const ALL_14_ROOMS = FLOOR_GROUPS.flatMap((g) => g.rooms);
export default function Rooms({ onSelectRoomForBooking }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedRoomModal, setSelectedRoomModal] = useState(null);

  const filteredRooms = activeFilter === 'all'
    ? roomsData
    : roomsData.filter(r => r.categoryKey === activeFilter);

  const filterTabs = [
    { label: 'All Accommodations (3)', key: 'all' },
    { label: 'Deluxe AC', key: 'ac' },
    { label: 'Executive Rooms', key: 'executive' },
    { label: 'Comfort Rooms', key: 'comfort' },
  ];

  const handleBookRoom = (room) => {
    if (onSelectRoomForBooking) {
      onSelectRoomForBooking(room);
    } else {
      window.location.href = getBookingAppUrl({ category: room.category });
    }
  };

  return (
    <section
      id="rooms"
      style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: '#FFFFFF',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
          <div className="eyebrow" style={{ marginBottom: '0.65rem' }}>
            <span>Verified Accommodations</span>
          </div>
          <h2 className="heading-section" style={{ color: 'var(--color-navy)', marginBottom: '0.85rem' }}>
            Rooms & Suites
          </h2>
          <div className="gold-line-center" style={{ marginBottom: '1.25rem' }} />
          <p className="lead-text" style={{ fontSize: '1.05rem', color: 'var(--color-charcoal-muted)' }}>
            Choose from 3 carefully maintained room categories at Hotel Lara International,
            each offering fresh linens, split AC climate control, and attached modern washrooms.
          </p>

          {/* Filter Tabs */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              background: '#FAF7F1',
              padding: '6px',
              borderRadius: '9999px',
              border: '1px solid var(--color-warm-border)',
              marginTop: '1.75rem',
            }}
          >
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                style={{
                  padding: '0.55rem 1.35rem',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: activeFilter === tab.key ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  backgroundColor: activeFilter === tab.key ? 'var(--color-navy)' : 'transparent',
                  color: activeFilter === tab.key ? '#FFFFFF' : 'var(--color-charcoal-muted)',
                  boxShadow: activeFilter === tab.key ? '0 4px 12px rgba(16, 28, 53, 0.2)' : 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Room Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch',
          }}
        >
          {filteredRooms.map((room) => (
            <article
              key={room.id}
              style={{
                backgroundColor: '#FAF7F1',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid var(--color-warm-border)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.borderColor = 'var(--color-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.borderColor = 'var(--color-warm-border)';
              }}
            >
              {/* Room Card Image Container */}
              <div
                style={{
                  position: 'relative',
                  height: '240px',
                  overflow: 'hidden',
                  backgroundColor: '#091020',
                }}
              >
                <img
                  src={room.image}
                  alt={room.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                />

                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    backgroundColor: 'rgba(16, 28, 53, 0.88)',
                    backdropFilter: 'blur(6px)',
                    color: 'var(--color-gold-bright)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    border: '1px solid rgba(198, 161, 91, 0.35)',
                    textTransform: 'uppercase',
                  }}
                >
                  {room.category}
                </div>
              </div>

              {/* Room Body */}
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    color: 'var(--color-dark-brown)',
                    fontWeight: 600,
                    marginBottom: '0.75rem',
                  }}
                >
                  {room.title}
                </h3>

                {/* Specs Pill Ribbon */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    fontSize: '0.8rem',
                    color: 'var(--color-muted-brown)',
                    paddingBottom: '1rem',
                    marginBottom: '1rem',
                    borderBottom: '1px solid var(--color-warm-border)',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <BedDouble size={15} color="#C49A45" />
                    {room.bed}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Users size={15} color="#C49A45" />
                    {room.capacity}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--color-muted-brown)',
                    lineHeight: 1.6,
                    marginBottom: '1.25rem',
                    flex: 1,
                  }}
                >
                  {room.description}
                </p>

                {/* Top 4 Amenities Preview */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {room.amenities.slice(0, 4).map((amenity, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        fontSize: '0.78rem',
                        color: 'var(--color-dark-brown)',
                      }}
                    >
                      <Check size={14} color="#C49A45" style={{ flexShrink: 0 }} />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--color-warm-border)',
                    marginTop: 'auto',
                  }}
                >
                  <button
                    onClick={() => setSelectedRoomModal(room)}
                    className="btn btn-outline-gold"
                    style={{
                      padding: '0.65rem 1.1rem',
                      fontSize: '0.82rem',
                    }}
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => handleBookRoom(room)}
                    className="btn btn-gold"
                    style={{
                      padding: '0.65rem 1.25rem',
                      fontSize: '0.82rem',
                    }}
                  >
                    <span>Select Room</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Room Details Modal */}
      {selectedRoomModal && (
        <RoomModal
          room={selectedRoomModal}
          onClose={() => setSelectedRoomModal(null)}
          onBookNow={handleBookRoom}
        />
      )}
    </section>
  );
}
