import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Users,
  Search,
  BedDouble,
  Check,
  ArrowRight,
  Filter,
  Sparkles,
  Phone,
  CheckCircle2,
  AlertCircle,
  X,
  CreditCard,
  SlidersHorizontal
} from 'lucide-react';
import { roomsApi, bookingsApi } from '../api/client';
import StatusBadge from '../components/StatusBadge';

// Real hotel photography mapping for verified room types
const roomPhotoMap = {
  'deluxe': '/images/hotel-lara-deluxe-blue-room.webp',
  'executive': '/images/hotel-lara-executive-marble-room.webp',
  'comfort': '/images/hotel-lara-standard-comfort-room.webp',
  'default': '/images/hotel-lara-deluxe-blue-room.webp',
};

const getRoomImage = (roomType = '') => {
  const norm = roomType.toLowerCase();
  if (norm.includes('deluxe') || norm.includes('king')) return roomPhotoMap['deluxe'];
  if (norm.includes('executive') || norm.includes('marble')) return roomPhotoMap['executive'];
  if (norm.includes('comfort') || norm.includes('standard')) return roomPhotoMap['comfort'];
  return roomPhotoMap['default'];
};

export const GuestRoomSelection = ({ onStaffPortalClick }) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  // Parse initial query params if present (from website links)
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const initialCheckIn = urlParams?.get('check_in') || todayStr;
  const initialCheckOut = urlParams?.get('check_out') || tomorrowStr;
  const initialGuests = parseInt(urlParams?.get('guests') || '2', 10);

  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guestCount, setGuestCount] = useState(initialGuests);

  const [allRooms, setAllRooms] = useState([]);
  const [availableRoomIds, setAvailableRoomIds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState('');

  // Filters
  const [selectedType, setSelectedType] = useState('all');
  const [maxBudget, setMaxBudget] = useState(5000);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Selected Room for Online Reservation
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingFormData, setBookingFormData] = useState({
    guest_name: '',
    guest_phone: '',
    guest_email: '',
    special_requests: '',
  });
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [bookingError, setBookingError] = useState('');

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const nights = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));

  // Load all rooms on mount
  useEffect(() => {
    loadRooms();
    checkAvailability(checkIn, checkOut);
  }, []);

  const loadRooms = async () => {
    try {
      const res = await roomsApi.getAll();
      setAllRooms(res.data.results || res.data || []);
    } catch (err) {
      console.error(err);
      setError('Could not connect to hotel database. Please refresh or verify server.');
    } finally {
      setLoading(false);
    }
  };

  const checkAvailability = async (cIn, cOut) => {
    if (!cIn || !cOut) return;
    setChecking(true);
    setError('');
    try {
      const res = await roomsApi.getAvailable(cIn, cOut);
      const freeRooms = res.data.rooms || [];
      const freeIds = new Set(freeRooms.map(r => r.id));
      setAvailableRoomIds(freeIds);
    } catch (err) {
      console.error(err);
      setError('Failed to check room availability. Please verify dates.');
    } finally {
      setChecking(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (checkOut <= checkIn) {
      setError('Check-out date must be after check-in date.');
      return;
    }
    checkAvailability(checkIn, checkOut);
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  // Filtered rooms logic
  const filteredRooms = allRooms.filter(room => {
    if (selectedType !== 'all') {
      const normType = room.room_type.toLowerCase();
      if (!normType.includes(selectedType.toLowerCase())) return false;
    }
    if (room.capacity < guestCount) return false;
    const price = parseFloat(room.base_price_per_night) || 0;
    if (price > 0 && price > maxBudget) return false;
    return true;
  });

  const handleOpenBooking = (room) => {
    setSelectedRoom(room);
    setBookingSuccess(null);
    setBookingError('');
  };

  const handleConfirmReservation = async (e) => {
    e.preventDefault();
    if (!bookingFormData.guest_name.trim() || !bookingFormData.guest_phone.trim()) {
      setBookingError('Please enter guest name and valid contact phone number.');
      return;
    }

    setBookingSubmitting(true);
    setBookingError('');

    try {
      const payload = {
        room_id: selectedRoom.id,
        guest_name: bookingFormData.guest_name.trim(),
        guest_phone: bookingFormData.guest_phone.trim(),
        guest_email: bookingFormData.guest_email.trim(),
        check_in_date: checkIn,
        check_out_date: checkOut,
        adults: guestCount,
        children: 0,
        price_per_night: selectedRoom.base_price_per_night,
        total_amount: (parseFloat(selectedRoom.base_price_per_night || 0) * nights).toFixed(2),
        booking_source: 'website',
        payment_status: 'pending',
        special_requests: bookingFormData.special_requests,
      };

      const res = await bookingsApi.create(payload);
      setBookingSuccess(res.data);
      // Recheck availability
      checkAvailability(checkIn, checkOut);
    } catch (err) {
      const respData = err.response?.data;
      if (respData?.room_id) {
        setBookingError(Array.isArray(respData.room_id) ? respData.room_id[0] : respData.room_id);
      } else if (respData?.check_out_date) {
        setBookingError(Array.isArray(respData.check_out_date) ? respData.check_out_date[0] : respData.check_out_date);
      } else {
        setBookingError('Failed to complete reservation. ' + (JSON.stringify(respData) || err.message));
      }
    } finally {
      setBookingSubmitting(false);
    }
  };

  return (
    <div>
      {/* Top Brand Navigation Header */}
      <nav className="booking-navbar">
        <div className="booking-navbar-inner">
          <div className="brand-wrapper">
            <div className="brand-emblem">
              <BedDouble size={22} />
            </div>
            <div className="brand-text">
              <h1>HOTEL LARA INTERNATIONAL</h1>
              <p>Suchindram • Room Selection Portal</p>
            </div>
          </div>

          <div className="nav-links-right">
            <a
              href="http://localhost:3000"
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.82rem' }}
            >
              Public Website
            </a>

            <button
              onClick={onStaffPortalClick}
              className="btn btn-outline btn-sm"
              style={{
                fontSize: '0.82rem',
                backgroundColor: 'var(--bg-cream)',
                borderColor: 'var(--border-warm)',
              }}
              title="Access staff reception console"
            >
              Staff Portal
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="guest-container">
        {/* Page Title & SEO Header (Reference Image 3) */}
        <div className="room-selection-header">
          <h2>Rooms & Suites</h2>
          <p>
            Discover comfortable air-conditioned accommodation in Suchindram, Kanyakumari.
            Select your dates below to verify real-time room availability and reserve directly.
          </p>
        </div>

        {/* Floating Availability Search Bar (Reference Image 3) */}
        <div className="search-bar-card">
          <form onSubmit={handleSearchSubmit}>
            <div className="search-bar-grid">
              <div className="search-field">
                <label className="search-field-label">
                  <Calendar size={14} color="#C49A45" />
                  Check-In
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={checkIn}
                  min={todayStr}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
              </div>

              <div className="search-field">
                <label className="search-field-label">
                  <Calendar size={14} color="#C49A45" />
                  Check-Out
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={checkOut}
                  min={checkIn || todayStr}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </div>

              <div className="search-field">
                <label className="search-field-label">
                  <Users size={14} color="#C49A45" />
                  Guests
                </label>
                <select
                  className="form-control"
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value, 10))}
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn btn-burgundy"
                  disabled={checking}
                  style={{ width: '100%', padding: '0.72rem 1.75rem' }}
                >
                  {checking ? 'Checking...' : 'Check Availability'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </form>

          {/* Search Result Summary Badge */}
          <div
            style={{
              marginTop: '1rem',
              paddingTop: '0.85rem',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.82rem',
              color: 'var(--text-muted-brown)',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <div>
              Stay Duration: <strong>{nights} Night(s)</strong> ({checkIn} → {checkOut})
            </div>
            <div>
              {availableRoomIds !== null && (
                <span style={{ color: '#065F46', fontWeight: 600 }}>
                  ✓ {availableRoomIds.size} of {allRooms.length} rooms available for these dates
                </span>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" style={{ marginBottom: '1.75rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* 2-Column Room Selection Layout (Filters Left, Editorial Cards Right) */}
        <div className="selection-layout">
          {/* Left Column: Filter Sidebar */}
          <aside className="filter-sidebar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Filter size={18} color="#C49A45" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-dark-brown)' }}>
                Filter Rooms
              </h3>
            </div>

            {/* Room Type Filter */}
            <div className="filter-group">
              <h4 className="filter-title">Room Category</h4>
              {['all', 'Deluxe', 'Executive', 'Comfort'].map((t) => (
                <label key={t} className="filter-option">
                  <input
                    type="radio"
                    name="roomTypeFilter"
                    checked={selectedType === t}
                    onChange={() => setSelectedType(t)}
                  />
                  <span>{t === 'all' ? 'All Room Types' : `${t} Rooms`}</span>
                </label>
              ))}
            </div>

            {/* Budget Filter */}
            <div className="filter-group">
              <h4 className="filter-title">Max Tariff (₹ / Night)</h4>
              <input
                type="range"
                min="1000"
                max="6000"
                step="250"
                value={maxBudget}
                onChange={(e) => setMaxBudget(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: 'var(--btn-burgundy)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted-brown)', marginTop: '0.35rem' }}>
                <span>₹1,000</span>
                <span style={{ fontWeight: 700, color: 'var(--text-dark-brown)' }}>Up to ₹{maxBudget.toLocaleString()}</span>
                <span>₹6,000+</span>
              </div>
            </div>

            {/* Amenities Filter */}
            <div className="filter-group">
              <h4 className="filter-title">Amenities & Features</h4>
              {[
                'Split Air Conditioning',
                'Teakwood King Bed',
                'Attached Ensuite Bathroom',
                'Smart LED TV',
                'Private Parking',
              ].map((amenity) => (
                <label key={amenity} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>

            <button
              className="btn btn-outline btn-sm"
              onClick={() => {
                setSelectedType('all');
                setMaxBudget(6000);
                setSelectedAmenities([]);
              }}
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              Reset Filters
            </button>
          </aside>

          {/* Right Column: Room Listing Cards (Reference Image 3 Style) */}
          <main className="rooms-listing">
            {filteredRooms.length === 0 ? (
              <div style={{ padding: '3.5rem', textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid var(--border-warm)' }}>
                <p style={{ color: 'var(--text-muted-brown)', fontSize: '1rem', marginBottom: '1rem' }}>
                  No rooms match your filter criteria for the chosen dates.
                </p>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setSelectedType('all');
                    setMaxBudget(6000);
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredRooms.map((room) => {
                const isAvailable = availableRoomIds === null || availableRoomIds.has(room.id);
                const price = parseFloat(room.base_price_per_night) || 0;
                const roomImage = getRoomImage(room.room_type);

                return (
                  <article key={room.id} className="editorial-room-card">
                    {/* Left: Professional Photograph */}
                    <div className="room-card-photo">
                      <img src={roomImage} alt={room.room_type} loading="lazy" />
                      <div className="room-badge-top">
                        Room {room.room_number} • {room.floor}
                      </div>
                    </div>

                    {/* Right: Room Details & Actions */}
                    <div className="room-card-details">
                      <div className="room-title-area">
                        <div>
                          <h3 className="room-name">{room.room_type}</h3>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted-brown)' }}>
                            Hotel Lara International • Room #{room.room_number}
                          </span>
                        </div>

                        <div>
                          {isAvailable ? (
                            <span className="badge badge-available">✓ Available</span>
                          ) : (
                            <span className="badge badge-occupied">Booked for Dates</span>
                          )}
                        </div>
                      </div>

                      {/* Specs Row */}
                      <div className="room-specs-row">
                        <span>Max Capacity: {room.capacity} Guests</span>
                        <span>•</span>
                        <span>Attached Ensuite Bath</span>
                        <span>•</span>
                        <span>Split Air-Conditioned</span>
                      </div>

                      {/* Description */}
                      <p className="room-description">
                        {room.description ||
                          'Comfortable, impeccably maintained guest room equipped with quality bedding, split AC climate control, and attached washroom. Ideal for temple pilgrims and travelers.'}
                      </p>

                      {/* Amenities Pills */}
                      <div className="room-amenities-pills">
                        <span className="amenity-pill">Split AC</span>
                        <span className="amenity-pill">En-suite Bath</span>
                        <span className="amenity-pill">Clean Linen</span>
                        <span className="amenity-pill">Daily Housekeeping</span>
                        <span className="amenity-pill">Hot Water</span>
                      </div>

                      {/* Price & Action Row */}
                      <div className="room-pricing-action">
                        <div className="price-tag">
                          {price > 0 ? (
                            <>
                              <div className="price-amount">₹{price.toLocaleString()}</div>
                              <span className="price-sub">per night (taxes included)</span>
                            </>
                          ) : (
                            <>
                              <div className="price-amount" style={{ fontSize: '1.15rem' }}>Direct Best Tariff</div>
                              <span className="price-sub">Guaranteed Direct Rate</span>
                            </>
                          )}
                        </div>

                        <div>
                          <button
                            onClick={() => handleOpenBooking(room)}
                            disabled={!isAvailable}
                            className={isAvailable ? 'btn btn-burgundy' : 'btn btn-outline'}
                            style={{ padding: '0.65rem 1.4rem' }}
                          >
                            <span>{isAvailable ? 'Select Room' : 'Unavailable'}</span>
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </main>
        </div>
      </div>

      {/* Online Reservation Drawer / Modal */}
      {selectedRoom && (
        <div className="modal-overlay" onClick={() => setSelectedRoom(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
            <div className="modal-header">
              <div>
                <h3>Reserve Room {selectedRoom.room_number}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted-brown)' }}>
                  {selectedRoom.room_type} • {nights} Night(s) ({checkIn} → {checkOut})
                </span>
              </div>
              <button
                onClick={() => setSelectedRoom(null)}
                className="btn-outline btn-sm"
                style={{ border: 'none', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              {bookingSuccess ? (
                <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                  <CheckCircle2 size={50} color="#10B981" style={{ margin: '0 auto 1rem' }} />
                  <h4 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-dark-brown)', marginBottom: '0.5rem' }}>
                    Reservation Confirmed!
                  </h4>
                  <div
                    style={{
                      background: 'var(--bg-cream)',
                      border: '1px solid var(--border-warm)',
                      borderRadius: '10px',
                      padding: '1.25rem',
                      marginBottom: '1.5rem',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong>Booking Reference:</strong>{' '}
                      <span style={{ color: 'var(--btn-burgundy)', fontWeight: 700 }}>
                        {bookingSuccess.booking_reference}
                      </span>
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong>Room:</strong> Room {selectedRoom.room_number} ({selectedRoom.room_type})
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong>Dates:</strong> {checkIn} to {checkOut} ({nights} nights)
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong>Guest:</strong> {bookingSuccess.guest_name} ({bookingSuccess.guest_phone})
                    </div>
                    <div>
                      <strong>Total Tariff:</strong> ₹{Number(bookingSuccess.total_amount || 0).toLocaleString()}
                    </div>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted-brown)', marginBottom: '1.5rem' }}>
                    Our front desk has registered your reservation in the hotel system. You may pay at check-in.
                    For any questions, call us directly on +91 8300504187.
                  </p>

                  <button className="btn btn-burgundy" onClick={() => setSelectedRoom(null)}>
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConfirmReservation}>
                  {bookingError && (
                    <div className="alert alert-danger" style={{ marginBottom: '1.25rem' }}>
                      <AlertCircle size={18} />
                      <span>{bookingError}</span>
                    </div>
                  )}

                  {/* Summary Bar */}
                  <div
                    style={{
                      backgroundColor: 'var(--bg-cream)',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-warm)',
                      marginBottom: '1.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted-brown)', textTransform: 'uppercase' }}>
                        Tariff Breakdown
                      </span>
                      <div style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-dark-brown)' }}>
                        ₹{(parseFloat(selectedRoom.base_price_per_night || 0) * nights).toLocaleString()}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted-brown)' }}>
                      ₹{Number(selectedRoom.base_price_per_night || 0).toLocaleString()} × {nights} Nights
                    </div>
                  </div>

                  {/* Guest Fields */}
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Ramesh Kannan"
                      value={bookingFormData.guest_name}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, guest_name: e.target.value })}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="form-grid-2" style={{ marginBottom: '1rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Mobile Phone Number *</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="10-digit mobile"
                        value={bookingFormData.guest_phone}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, guest_phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Email Address (Optional)</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="name@example.com"
                        value={bookingFormData.guest_email}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, guest_email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label">Pilgrimage / Arrival Notes (Optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Arriving 8 PM after temple darshan"
                      value={bookingFormData.special_requests}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, special_requests: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setSelectedRoom(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-burgundy"
                      disabled={bookingSubmitting}
                      style={{ padding: '0.65rem 1.75rem' }}
                    >
                      {bookingSubmitting ? 'Registering...' : 'Confirm My Reservation'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestRoomSelection;
