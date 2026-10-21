import React, { useState, useEffect } from 'react';
import {
  Calendar,
  BedDouble,
  User,
  Phone,
  Mail,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { roomsApi, bookingsApi } from '../api/client';
<<<<<<< HEAD
import { getRoomDisplayName, formatRoomNumber, resolveRoomPhotoUrl } from '../constants/roomNames';
=======
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1

export const NewBookingForm = ({ onBookingCreated, onCancel }) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    check_in_date: todayStr,
    check_out_date: tomorrowStr,
    room_id: '',
    guest_name: '',
    guest_phone: '',
    guest_email: '',
    adults: 2,
    children: 0,
    price_per_night: '',
    booking_source: 'phone',
    payment_status: 'pending',
    payment_notes: '',
    special_requests: '',
  });

  const [availableRooms, setAvailableRooms] = useState([]);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [nights, setNights] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Recalculate nights and fetch available rooms whenever dates change
  useEffect(() => {
    if (formData.check_in_date && formData.check_out_date) {
      const d1 = new Date(formData.check_in_date);
      const d2 = new Date(formData.check_out_date);
      const diffDays = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        setNights(diffDays);
        fetchAvailableRooms(formData.check_in_date, formData.check_out_date);
      } else {
        setNights(0);
        setAvailableRooms([]);
      }
    }
  }, [formData.check_in_date, formData.check_out_date]);

  // Recalculate total amount when nights or price changes
  useEffect(() => {
    const price = parseFloat(formData.price_per_night) || 0;
    setTotalAmount(price * nights);
  }, [formData.price_per_night, nights]);

  const fetchAvailableRooms = async (checkIn, checkOut) => {
    setCheckingAvailability(true);
    setError('');
    try {
      const res = await roomsApi.getAvailable(checkIn, checkOut);
      const rooms = res.data.rooms || [];
      setAvailableRooms(rooms);

      // If previously selected room is no longer available, clear it
      if (formData.room_id && !rooms.some((r) => r.id === parseInt(formData.room_id, 10))) {
        setFormData((prev) => ({ ...prev, room_id: '', price_per_night: '' }));
      }
    } catch (err) {
      console.error(err);
      setError('Could not verify room availability for chosen dates.');
    } finally {
      setCheckingAvailability(false);
    }
  };

  const handleRoomSelect = (roomId) => {
    const selected = availableRooms.find((r) => r.id === parseInt(roomId, 10));
    setFormData((prev) => ({
      ...prev,
      room_id: roomId,
      price_per_night: selected ? selected.base_price_per_night : prev.price_per_night,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(null);

    if (nights <= 0) {
      setError('Check-out date must be strictly after the check-in date.');
      return;
    }

    if (!formData.room_id) {
      setError('Please select an available room from the list.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        room_id: parseInt(formData.room_id, 10),
        adults: parseInt(formData.adults, 10),
        children: parseInt(formData.children, 10),
        price_per_night: formData.price_per_night || '0.00',
        total_amount: totalAmount.toFixed(2),
      };

      const res = await bookingsApi.create(payload);
      setSuccess(res.data);
      if (onBookingCreated) {
        setTimeout(() => onBookingCreated(res.data), 1200);
      }
    } catch (err) {
      const respData = err.response?.data;
      if (respData) {
        if (respData.room_id) {
          setError(Array.isArray(respData.room_id) ? respData.room_id[0] : respData.room_id);
        } else if (respData.check_out_date) {
          setError(Array.isArray(respData.check_out_date) ? respData.check_out_date[0] : respData.check_out_date);
        } else if (respData.non_field_errors) {
          setError(respData.non_field_errors[0]);
        } else {
          setError('Failed to create reservation: ' + JSON.stringify(respData));
        }
      } else {
        setError('Error creating booking. Please verify network and backend connection.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#101C35' }}>
          Create New Offline Reservation
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
          Record reservations taken via Phone Call, WhatsApp Desk, or Walk-in at Reception.
        </p>
      </div>

      {success && (
        <div className="alert alert-success" style={{ padding: '1.25rem' }}>
          <CheckCircle2 size={24} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>
              Reservation Confirmed: {success.booking_reference}
            </div>
            <div style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
<<<<<<< HEAD
              Guest {success.guest_name} assigned to Room {success.room_number || formData.room_id} — {getRoomDisplayName(success.room_name || success.room_number || formData.room_id)} for{' '}
=======
              Guest {success.guest_name} assigned to Room {success.room_number || formData.room_id} for{' '}
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
              {success.number_of_nights || nights} nights.
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" style={{ padding: '1rem' }}>
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Step 1: Stay Dates & Real-time Room Selection */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Calendar size={18} color="#C6A15B" />
              1. Reservation Dates & Room Availability
            </div>
          </div>
          <div className="card-body">
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Check-In Date (Inclusive)</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.check_in_date}
                  onChange={(e) => setFormData({ ...formData, check_in_date: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Check-Out Date (Exclusive)</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.check_out_date}
                  onChange={(e) => setFormData({ ...formData, check_out_date: e.target.value })}
                  required
                />
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#F8FAFC',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.85rem',
                color: '#475569',
              }}
            >
              <div>
                <strong>Duration:</strong> {nights > 0 ? `${nights} Night(s)` : 'Invalid date sequence'}
              </div>
              <div>
                {checkingAvailability ? (
                  <span style={{ color: '#0284C7' }}>Checking backend room inventory...</span>
                ) : (
                  <span style={{ color: availableRooms.length > 0 ? '#10B981' : '#EF4444', fontWeight: 600 }}>
                    {availableRooms.length} of 14 rooms available
                  </span>
                )}
              </div>
            </div>

            {/* Room Picker */}
            <div className="form-group">
              <label className="form-label">Select Available Room *</label>
              {availableRooms.length === 0 ? (
                <div style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: '#FEF2F2', borderRadius: '8px', color: '#991B1B' }}>
                  No rooms are available for the selected dates. Please adjust check-in/out dates or check cancelled reservations.
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '0.75rem',
                  }}
                >
                  {availableRooms.map((r) => {
                    const isSelected = formData.room_id === String(r.id);
<<<<<<< HEAD
                    const photo = resolveRoomPhotoUrl(r);
                    const formattedNum = formatRoomNumber(r.room_number);
=======
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
                    return (
                      <div
                        key={r.id}
                        onClick={() => handleRoomSelect(r.id)}
                        style={{
                          border: isSelected ? '2px solid #C6A15B' : '1px solid #E2E8F0',
                          backgroundColor: isSelected ? 'rgba(198, 161, 91, 0.08)' : '#FFFFFF',
                          borderRadius: '10px',
<<<<<<< HEAD
                          overflow: 'hidden',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        {photo && (
                          <div style={{ height: '80px', width: '100%', overflow: 'hidden', backgroundColor: '#0F172A' }}>
                            <img src={photo} alt={`Room ${formattedNum}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        )}
                        <div style={{ padding: '0.75rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#101C35' }}>
                              Room {formattedNum}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 600 }}>Free</span>
                          </div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#C49A45', marginTop: '0.2rem' }}>
                            {getRoomDisplayName(r)}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.1rem' }}>
                            {r.room_type}
                          </div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#101C35', marginTop: '0.35rem' }}>
                            ₹{Number(r.base_price_per_night || 0).toLocaleString()} <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 400 }}>/ nt</span>
                          </div>
=======
                          padding: '0.85rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#101C35' }}>
                            Room {r.room_number}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 600 }}>Free</span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '0.2rem' }}>
                          {r.room_type}
                        </div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#101C35', marginTop: '0.4rem' }}>
                          ₹{Number(r.base_price_per_night || 0).toLocaleString()} <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 400 }}>/ nt</span>
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 2: Guest Details */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <User size={18} color="#C6A15B" />
              2. Guest Contact & Occupancy
            </div>
          </div>
          <div className="card-body">
            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label">Guest Full Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Rajesh Kannan"
                  value={formData.guest_name}
                  onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="e.g. +91 98401 23456"
                  value={formData.guest_phone}
                  onChange={(e) => setFormData({ ...formData, guest_phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address (Optional)</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="guest@example.com"
                  value={formData.guest_email}
                  onChange={(e) => setFormData({ ...formData, guest_email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label">Adults</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="10"
                  value={formData.adults}
                  onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Children</label>
                <input
                  type="number"
                  className="form-control"
                  min="0"
                  max="5"
                  value={formData.children}
                  onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Booking Channel</label>
                <select
                  className="form-control"
                  value={formData.booking_source}
                  onChange={(e) => setFormData({ ...formData, booking_source: e.target.value })}
                >
                  <option value="phone">Phone Call Reservation</option>
                  <option value="whatsapp">WhatsApp Desk (+91 8300504187)</option>
                  <option value="walkin">Walk-in Reception</option>
                  <option value="direct">Direct Contact</option>
                  <option value="website">Public Website Enquiry</option>
                  <option value="other">Other Offline</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Tariff, Payment & Notes */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <CreditCard size={18} color="#C6A15B" />
              3. Tariff, Payment & Front Desk Notes
            </div>
          </div>
          <div className="card-body">
            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label">Agreed Rate (₹ / Night)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={formData.price_per_night}
                  onChange={(e) => setFormData({ ...formData, price_per_night: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Total Booking Amount (₹)</label>
                <input
                  type="text"
                  className="form-control"
                  value={`₹${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                  readOnly
                  style={{ backgroundColor: '#F8FAFC', fontWeight: 700, color: '#101C35' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Payment Status</label>
                <select
                  className="form-control"
                  value={formData.payment_status}
                  onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })}
                >
                  <option value="pending">Pending Payment</option>
                  <option value="partial">Advance / Partial Paid</option>
                  <option value="paid">Fully Settled / Paid</option>
                </select>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Payment Notes (UPI / Cash / Card reference)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. ₹1000 Advance paid via GPay, rest upon check-out"
                  value={formData.payment_notes}
                  onChange={(e) => setFormData({ ...formData, payment_notes: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Special Requests / Pilgrim notes</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Late check-in at 9 PM, ground floor requested"
                  value={formData.special_requests}
                  onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: '3rem' }}>
          {onCancel && (
            <button type="button" className="btn btn-outline" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="btn btn-gold"
            disabled={submitting || availableRooms.length === 0}
            style={{ padding: '0.75rem 2rem', fontSize: '0.95rem' }}
          >
            {submitting ? 'Verifying & Reserving...' : 'Confirm Reservation'}
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBookingForm;
