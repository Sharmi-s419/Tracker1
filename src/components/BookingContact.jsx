import React, { useState } from 'react';
import { Phone, MessageCircle, Send, CheckCircle2, AlertCircle, Calendar, Users, BedDouble, User, Mail, Clock } from 'lucide-react';

export default function BookingContact({ initialBookingState }) {
  const today = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    roomType: initialBookingState?.roomType || 'Deluxe AC King Suite',
    checkIn: initialBookingState?.checkIn || today,
    checkOut: initialBookingState?.checkOut || tomorrow,
    guests: initialBookingState?.guests || '2 Guests',
    roomsCount: '1 Room',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name (at least 2 letters).';
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.checkIn) {
      errs.checkIn = 'Please select a check-in date.';
    }
    if (!formData.checkOut) {
      errs.checkOut = 'Please select a check-out date.';
    } else if (formData.checkOut <= formData.checkIn) {
      errs.checkOut = 'Check-out date must be after check-in date.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData({ ...formData });
    }
  };

  const handleSendToWhatsApp = () => {
    if (!submittedData) return;
    const msg = `*NEW BOOKING ENQUIRY — HOTEL LARA INTERNATIONAL*
Guest Name: ${submittedData.fullName}
Phone: ${submittedData.phone}
${submittedData.email ? `Email: ${submittedData.email}\n` : ''}Room Type: ${submittedData.roomType}
Rooms: ${submittedData.roomsCount}
Guests: ${submittedData.guests}
Check-in: ${submittedData.checkIn}
Check-out: ${submittedData.checkOut}
${submittedData.message ? `Special Request: ${submittedData.message}\n` : ''}
Please confirm availability and current tariff. Thank you!`;

    window.open(`https://wa.me/918300504187?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section
      id="contact"
      style={{
        padding: 'var(--section-padding)',
        backgroundColor: '#091020',
        color: '#FFFFFF',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <div className="eyebrow" style={{ marginBottom: '0.85rem' }}>
            <span>Direct Reservations</span>
          </div>
          <h2 className="heading-section" style={{ color: '#FFFFFF', marginBottom: '1rem' }}>
            Reserve Your Room or Inquire Directly
          </h2>
          <div className="gold-line-center" />
          <p className="lead-text" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
            We confirm all reservations directly to avoid intermediary commissions and guarantee you the
            best available seasonal tariffs.
          </p>
        </div>

        {/* 2-Column Contact Info + Reservation Form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Direct Phone & Help Information */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                color: '#FFFFFF',
                marginBottom: '1rem',
              }}
            >
              Direct Hotel Front Desk
            </h3>

            <p style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              Whether you are planning a temple pilgrimage with family, an overnight transit, or a coastal holiday,
              reach out directly to our resident caretakers for instant room status and personalized check-in assistance.
            </p>

            {/* Verified Phone Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div
                style={{
                  background: 'rgba(16, 28, 53, 0.9)',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(198, 161, 91, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(198, 161, 91, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Phone size={20} color="#C6A15B" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-gold-bright)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                      Primary Reservation Line
                    </span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 600, color: '#FFFFFF' }}>
                      +91 8300504187
                    </div>
                  </div>
                </div>

                <a
                  href="tel:+918300504187"
                  className="btn btn-gold"
                  style={{ padding: '0.55rem 1.25rem', fontSize: '0.78rem' }}
                >
                  Click to Call
                </a>
              </div>

              <div
                style={{
                  background: 'rgba(16, 28, 53, 0.9)',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(198, 161, 91, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(198, 161, 91, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Phone size={20} color="#C6A15B" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-gold-bright)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                      Secondary Helpline
                    </span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 600, color: '#FFFFFF' }}>
                      +91 8056727757
                    </div>
                  </div>
                </div>

                <a
                  href="tel:+918056727757"
                  className="btn btn-outline-gold"
                  style={{ padding: '0.55rem 1.25rem', fontSize: '0.78rem' }}
                >
                  Click to Call
                </a>
              </div>
            </div>

            {/* Instant WhatsApp Quick Link */}
            <div
              style={{
                background: 'rgba(37, 211, 102, 0.08)',
                border: '1px solid rgba(37, 211, 102, 0.3)',
                padding: '1.5rem',
                borderRadius: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <MessageCircle size={24} color="#25D366" />
                <h4 style={{ fontSize: '1.1rem', color: '#FFFFFF' }}>
                  Instant WhatsApp Desk
                </h4>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                Prefer chatting over messaging? Send an enquiry directly on WhatsApp for instant room photographs,
                tariff quotation, and location pin.
              </p>
              <a
                href="https://wa.me/918300504187?text=Hello%20Hotel%20Lara%20International%2C%20I%20would%20like%20to%20enquire%20about%20room%20availability%20and%20rates."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%' }}
              >
                <MessageCircle size={16} />
                <span>Chat on WhatsApp (+91 8300504187)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Booking Enquiry Form */}
          <div
            id="booking"
            style={{
              background: '#101C35',
              padding: '2.5rem',
              borderRadius: '14px',
              border: '1px solid rgba(198, 161, 91, 0.35)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
            }}
          >
            {submittedData ? (
              /* Success / WhatsApp Dispatch Card */
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(37, 211, 102, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    border: '1px solid #25D366',
                  }}
                >
                  <CheckCircle2 size={36} color="#25D366" />
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                  Enquiry Prepared Successfully
                </h3>

                <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Thank you, <strong>{submittedData.fullName}</strong>. To guarantee you the exact room type and instant response
                  without delay, click below to transmit your booking details directly to our reception WhatsApp.
                </p>

                {/* Summary Box */}
                <div
                  style={{
                    background: 'rgba(0, 0, 0, 0.25)',
                    padding: '1.25rem',
                    borderRadius: '8px',
                    textAlign: 'left',
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginBottom: '1.75rem',
                    border: '1px solid rgba(198, 161, 91, 0.2)',
                  }}
                >
                  <div style={{ marginBottom: '4px' }}><strong>Room:</strong> {submittedData.roomType}</div>
                  <div style={{ marginBottom: '4px' }}><strong>Stay Dates:</strong> {submittedData.checkIn} to {submittedData.checkOut}</div>
                  <div style={{ marginBottom: '4px' }}><strong>Party:</strong> {submittedData.guests} ({submittedData.roomsCount})</div>
                  <div><strong>Phone:</strong> {submittedData.phone}</div>
                </div>

                <button
                  onClick={handleSendToWhatsApp}
                  className="btn btn-whatsapp"
                  style={{ width: '100%', padding: '1rem', marginBottom: '1rem', fontSize: '0.9rem' }}
                >
                  <MessageCircle size={18} />
                  <span>Send via WhatsApp to Hotel Desk</span>
                </button>

                <button
                  onClick={() => setSubmittedData(null)}
                  style={{
                    background: 'transparent',
                    color: 'var(--color-gold)',
                    fontSize: '0.82rem',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  ← Edit Enquiry or Submit Another Request
                </button>
              </div>
            ) : (
              /* The Form */
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.75rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#FFFFFF', marginBottom: '0.4rem' }}>
                    Send Reservation Enquiry
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-gold-bright)' }}>
                    ✦ Direct booking with instant confirmation & verified lowest rates
                  </p>
                </div>

                {/* Name */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>
                    Full Name *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. Anand Kumar"
                      value={formData.fullName}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.4rem',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: errors.fullName ? '1px solid #FF5555' : '1px solid rgba(198, 161, 91, 0.3)',
                        borderRadius: '6px',
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                      }}
                    />
                    <User size={15} color="#C6A15B" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                  {errors.fullName && <div style={{ color: '#FF7777', fontSize: '0.75rem', marginTop: '4px' }}>{errors.fullName}</div>}
                </div>

                {/* Phone & Email Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>
                      Phone / Mobile *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '0.75rem 0.75rem 0.75rem 2.2rem',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: errors.phone ? '1px solid #FF5555' : '1px solid rgba(198, 161, 91, 0.3)',
                          borderRadius: '6px',
                          color: '#FFFFFF',
                          fontSize: '0.9rem',
                        }}
                      />
                      <Phone size={14} color="#C6A15B" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                    </div>
                    {errors.phone && <div style={{ color: '#FF7777', fontSize: '0.72rem', marginTop: '4px' }}>{errors.phone}</div>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>
                      Email (Optional)
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '0.75rem 0.75rem 0.75rem 2.2rem',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: errors.email ? '1px solid #FF5555' : '1px solid rgba(198, 161, 91, 0.3)',
                          borderRadius: '6px',
                          color: '#FFFFFF',
                          fontSize: '0.9rem',
                        }}
                      />
                      <Mail size={14} color="#C6A15B" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                    </div>
                    {errors.email && <div style={{ color: '#FF7777', fontSize: '0.72rem', marginTop: '4px' }}>{errors.email}</div>}
                  </div>
                </div>

                {/* Room Category */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>
                    Select Room Type
                  </label>
                  <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: '#1A2A48',
                      border: '1px solid rgba(198, 161, 91, 0.3)',
                      borderRadius: '6px',
                      color: '#FFFFFF',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option value="Deluxe AC King Suite">Deluxe AC King Suite (Teakwood & Armchairs)</option>
                    <option value="Executive Double AC Room">Executive Double AC Room (Italian Marble Floor)</option>
                    <option value="Standard Comfort Room">Standard Comfort Room (Budget / Non-AC)</option>
                    <option value="Suite with Kitchenette Counter">Suite with Private Granite Kitchenette Counter</option>
                  </select>
                </div>

                {/* Check-in & Check-out */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>
                      Check-In Date *
                    </label>
                    <input
                      type="date"
                      name="checkIn"
                      min={today}
                      value={formData.checkIn}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: errors.checkIn ? '1px solid #FF5555' : '1px solid rgba(198, 161, 91, 0.3)',
                        borderRadius: '6px',
                        color: '#FFFFFF',
                        fontSize: '0.85rem',
                      }}
                    />
                    {errors.checkIn && <div style={{ color: '#FF7777', fontSize: '0.72rem', marginTop: '4px' }}>{errors.checkIn}</div>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>
                      Check-Out Date *
                    </label>
                    <input
                      type="date"
                      name="checkOut"
                      min={formData.checkIn || today}
                      value={formData.checkOut}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: errors.checkOut ? '1px solid #FF5555' : '1px solid rgba(198, 161, 91, 0.3)',
                        borderRadius: '6px',
                        color: '#FFFFFF',
                        fontSize: '0.85rem',
                      }}
                    />
                    {errors.checkOut && <div style={{ color: '#FF7777', fontSize: '0.72rem', marginTop: '4px' }}>{errors.checkOut}</div>}
                  </div>
                </div>

                {/* Guests & Rooms */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>
                      Number of Guests
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: '#1A2A48',
                        border: '1px solid rgba(198, 161, 91, 0.3)',
                        borderRadius: '6px',
                        color: '#FFFFFF',
                        fontSize: '0.85rem',
                      }}
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="3 Guests">3 Guests</option>
                      <option value="4+ Family">4+ Family Members</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>
                      Number of Rooms
                    </label>
                    <select
                      name="roomsCount"
                      value={formData.roomsCount}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: '#1A2A48',
                        border: '1px solid rgba(198, 161, 91, 0.3)',
                        borderRadius: '6px',
                        color: '#FFFFFF',
                        fontSize: '0.85rem',
                      }}
                    >
                      <option value="1 Room">1 Room</option>
                      <option value="2 Rooms">2 Rooms</option>
                      <option value="3+ Rooms">3+ Group Booking</option>
                    </select>
                  </div>
                </div>

                {/* Message / Special Requests */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>
                    Special Requests / Expected Arrival Time
                  </label>
                  <textarea
                    name="message"
                    rows="2"
                    placeholder="e.g. Early check-in requested / temple visit timing..."
                    value={formData.message}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(198, 161, 91, 0.3)',
                      borderRadius: '6px',
                      color: '#FFFFFF',
                      fontSize: '0.88rem',
                      resize: 'none',
                    }}
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="btn btn-gold"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '0.9rem',
                  }}
                >
                  <Send size={16} />
                  <span>Review & Check Availability</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
