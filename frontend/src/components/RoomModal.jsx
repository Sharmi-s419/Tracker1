import React from 'react';
import { X, Check, Phone, BedDouble, Users, ArrowRight } from 'lucide-react';
import { getBookingAppUrl } from '../utils/bookingUrl';

export default function RoomModal({ room, onClose, onBookNow }) {
  if (!room) return null;

  const handleBooking = () => {
    if (onBookNow) {
      onBookNow(room);
    } else {
<<<<<<< HEAD
      window.location.href = getBookingAppUrl({ category: room.category });
=======
<<<<<<< HEAD
      const param = room.roomNumber ? { room: room.roomNumber } : { category: room.category };
      window.location.href = getBookingAppUrl(param);
=======
      window.location.href = getBookingAppUrl({ category: room.category });
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(9, 16, 32, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          maxWidth: '820px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          border: '1px solid var(--color-warm-border)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            zIndex: 10,
            background: 'rgba(16, 28, 53, 0.75)',
            color: '#FFFFFF',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(198, 161, 91, 0.5)',
            cursor: 'pointer',
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Image Header */}
        <div style={{ position: 'relative', height: '320px', background: '#0A1222' }}>
          <img
            src={room.image}
            alt={room.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 40%, rgba(16, 28, 53, 0.85) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '24px',
              right: '24px',
              color: '#FFFFFF',
            }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-gold-bright)',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              {room.category}
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                fontWeight: 600,
                color: '#FFFFFF',
              }}
            >
              {room.title}
            </h3>
          </div>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '2rem' }}>
          {/* Key Specs Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid var(--color-warm-border)',
              marginBottom: '1.5rem',
              color: 'var(--color-dark-brown)',
              fontSize: '0.9rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BedDouble size={18} color="#C49A45" />
              <span>{room.bed}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={18} color="#C49A45" />
              <span>{room.capacity}</span>
            </div>
            <div>
              <span style={{ color: 'var(--color-muted-brown)' }}>Climate: </span>
              <span>{room.acType}</span>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--color-navy)', marginBottom: '0.65rem' }}>
              Room Overview
            </h4>
            <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
              {room.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--color-navy)', marginBottom: '0.85rem' }}>
              Room Amenities & Features
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {room.amenities.map((amenity, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontSize: '0.88rem',
                    color: 'var(--color-dark-brown)',
                  }}
                >
                  <Check size={16} color="#C49A45" style={{ flexShrink: 0 }} />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Photos if available */}
          {room.extraImages && room.extraImages.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--color-navy)' }}>
                Additional Room Views
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                {room.extraImages.map((img, i) => (
                  <div key={i} style={{ borderRadius: '8px', overflow: 'hidden', height: '120px' }}>
                    <img src={img} alt={`View ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing & Booking Footer */}
          <div
            style={{
              background: '#FAF7F1',
              borderRadius: '10px',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              border: '1px solid var(--color-warm-border)',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-brown)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Direct Booking
              </span>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-navy)', fontWeight: 600 }}>
                Best Price on Direct Reservation
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleBooking}
                className="btn btn-gold"
                style={{
                  padding: '0.75rem 1.5rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                }}
              >
                <span>Select & Book Room</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="tel:+918300504187"
                className="btn btn-navy"
                style={{ padding: '0.75rem 1.25rem' }}
              >
                <Phone size={15} />
                <span>Call Front Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
