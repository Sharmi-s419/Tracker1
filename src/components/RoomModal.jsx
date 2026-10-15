import React from 'react';
import { X, Check, Phone, BedDouble, Users, Maximize, Wind, Tv, Sparkles } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export default function RoomModal({ room, onClose }) {
  if (!room) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Hotel Lara International, I am interested in booking the "${room.title}". Please share current rates and availability.`
  );

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
          maxWidth: '850px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          border: '1px solid rgba(198, 161, 91, 0.3)',
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
            transition: 'background 0.2s ease',
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Image Header */}
        <div style={{ position: 'relative', height: '340px', background: '#0A1222' }}>
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
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FFFFFF' }}>
              {room.title}
            </h3>
          </div>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '2rem' }}>
          {/* Room Specs Chips */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid rgba(41, 41, 41, 0.1)',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', color: 'var(--color-charcoal)' }}>
              <BedDouble size={16} color="#C6A15B" />
              <span>{room.bed}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', color: 'var(--color-charcoal)' }}>
              <Users size={16} color="#C6A15B" />
              <span>{room.capacity}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', color: 'var(--color-charcoal)' }}>
              <Wind size={16} color="#C6A15B" />
              <span>{room.acType}</span>
            </div>
          </div>

          {/* Description */}
          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.65rem', color: 'var(--color-navy)' }}>
            Room Overview
          </h4>
          <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
            {room.description}
          </p>

          {/* Verified Amenities */}
          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--color-navy)' }}>
            Verified Room Amenities
          </h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.75rem',
              marginBottom: '2rem',
            }}
          >
            {room.amenities.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  color: 'var(--color-charcoal)',
                }}
              >
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: 'rgba(198, 161, 91, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Check size={11} color="#C6A15B" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Additional Photos in Modal if available */}
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
              background: '#F7F4EC',
              borderRadius: '10px',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              border: '1px solid rgba(198, 161, 91, 0.3)',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Confirmed Direct Tariff
              </span>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-navy)', fontWeight: 600 }}>
                Best Price on Direct Booking
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/918300504187?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{
                  padding: '0.75rem 1.4rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                }}
                aria-label={`Book ${room.title} on WhatsApp`}
              >
                <WhatsAppIcon size={20} color="#FFFFFF" />
                <span>Book on WhatsApp</span>
              </a>
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
