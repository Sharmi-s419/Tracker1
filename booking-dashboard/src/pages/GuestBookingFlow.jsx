import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Users,
  BedDouble,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  Clock,
  Printer,
  ShieldCheck,
  MapPin,
  ExternalLink,
  ChevronRight,
  User,
  CreditCard,
  FileText
} from 'lucide-react';
import { roomsApi, bookingsApi } from '../api/client';
import RotatingLogo from '../components/RotatingLogo';

// Real hotel photography mapping for verified room types
const roomPhotoMap = {
  deluxe: '/images/hotel-lara-deluxe-blue-room.webp',
  executive: '/images/hotel-lara-executive-marble-room.webp',
  comfort: '/images/hotel-lara-standard-comfort-room.webp',
  default: '/images/hotel-lara-deluxe-blue-room.webp',
};

const getRoomImage = (roomType = '') => {
  const norm = roomType.toLowerCase();
  if (norm.includes('deluxe') || norm.includes('king')) return roomPhotoMap.deluxe;
  if (norm.includes('executive') || norm.includes('marble')) return roomPhotoMap.executive;
  if (norm.includes('comfort') || norm.includes('standard')) return roomPhotoMap.comfort;
  return roomPhotoMap.default;
};

export const GuestBookingFlow = ({ onStaffPortalClick }) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  // Parse initial query params if present (from website links)
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const initialCheckIn = urlParams?.get('check_in') || todayStr;
  const initialCheckOut = urlParams?.get('check_out') || tomorrowStr;
  const initialGuests = parseInt(urlParams?.get('guests') || '2', 10);
  const rawCat = (urlParams?.get('category') || urlParams?.get('room') || '').toLowerCase();
  let initialCategory = 'all';
  if (rawCat.includes('deluxe')) initialCategory = 'deluxe';
  else if (rawCat.includes('executive')) initialCategory = 'executive';
  else if (rawCat.includes('comfort')) initialCategory = 'comfort';

  // Booking Flow Steps: 1: Dates & Guests, 2: Available Rooms, 3: Rate & Summary, 4: Guest Details, 5: Confirmation
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Dates & Guests
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [adults, setAdults] = useState(initialGuests);
  const [children, setChildren] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);

  // Step 2: Available Rooms Data
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [roomsError, setRoomsError] = useState('');

  // Step 3: Selected Room for Reservation
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Step 4: Guest Details Form
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  // Step 5: Confirmed Booking Data from Backend
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const nights = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));

  // Load available rooms from API
  const fetchAvailableRooms = async (cIn, cOut) => {
    if (!cIn || !cOut) return;
    if (cOut <= cIn) {
      setRoomsError('Check-out date must be strictly after the check-in date.');
      return;
    }

    setLoadingRooms(true);
    setRoomsError('');
    try {
      const res = await roomsApi.getAvailable(cIn, cOut);
      const rooms = res.data.rooms || [];
      setAvailableRooms(rooms);
    } catch (err) {
      console.error(err);
      setRoomsError('Failed to fetch live room availability. Please check server connection.');
    } finally {
      setLoadingRooms(false);
    }
  };

  // Step 1 Submit: Validate and move to Step 2
  const handleProceedToRooms = (e) => {
    if (e) e.preventDefault();
    if (checkOut <= checkIn) {
      setRoomsError('Check-out date must be strictly after check-in date.');
      return;
    }
    fetchAvailableRooms(checkIn, checkOut);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2 Room Select: Move to Step 3
  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3 Proceed: Move to Step 4
  const handleProceedToDetails = () => {
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 4 Final Booking Submit: POST to Django backend
  const handleFinalBookingSubmit = async (e) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setSubmissionError('Please enter the lead guest full name.');
      return;
    }
    const cleanPhone = guestPhone.replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setSubmissionError('Please enter a valid 10-digit mobile phone number.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionError('');

    try {
      const pricePerNight = parseFloat(selectedRoom.base_price_per_night || 0);
      const totalAmount = (pricePerNight * nights).toFixed(2);

      const payload = {
        room_id: selectedRoom.id,
        guest_name: guestName.trim(),
        guest_phone: cleanPhone,
        guest_email: guestEmail.trim(),
        check_in_date: checkIn,
        check_out_date: checkOut,
        adults: adults,
        children: children,
        price_per_night: selectedRoom.base_price_per_night,
        total_amount: totalAmount,
        booking_source: 'website',
        payment_status: 'pending',
        special_requests: specialRequests.trim(),
      };

      const res = await bookingsApi.create(payload);
      setConfirmedBooking(res.data);
      setCurrentStep(5);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      const respData = err.response?.data;
      if (respData?.room_id) {
        setSubmissionError(Array.isArray(respData.room_id) ? respData.room_id[0] : respData.room_id);
      } else if (respData?.check_out_date) {
        setSubmissionError(Array.isArray(respData.check_out_date) ? respData.check_out_date[0] : respData.check_out_date);
      } else if (respData?.detail) {
        setSubmissionError(respData.detail);
      } else {
        setSubmissionError('Unable to complete reservation. ' + (JSON.stringify(respData) || err.message));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered rooms logic
  const filteredRooms = availableRooms.filter((room) => {
    if (categoryFilter !== 'all') {
      const normType = (room.room_type || '').toLowerCase();
      if (!normType.includes(categoryFilter)) return false;
    }
    if (room.capacity < adults) return false;
    return true;
  });

  const publicWebsiteUrl = import.meta.env.VITE_PUBLIC_WEBSITE_URL || 'http://localhost:3000';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FAF7F1' }}>
      {/* 1. Header with Verified Hotel Lara International Branding */}
      <header
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E6DDD3',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 2px 10px rgba(52, 35, 33, 0.05)',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '0.85rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Real Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <RotatingLogo size={46} speed={24} theme="gold" idPrefix="header" />
            <div>
              <span
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: '#101C35',
                  display: 'block',
                  lineHeight: 1.15,
                }}
              >
                HOTEL LARA
              </span>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '0.68rem',
                  letterSpacing: '0.22em',
                  color: '#C49A45',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}
              >
                International • Suchindram
              </span>
            </div>
          </div>

          {/* Right Action Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href={publicWebsiteUrl}
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#17243D',
                textDecoration: 'none',
                padding: '0.5rem 0.9rem',
                borderRadius: '6px',
                border: '1px solid #E6DDD3',
                backgroundColor: '#FAF7F1',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C49A45';
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E6DDD3';
                e.currentTarget.style.backgroundColor = '#FAF7F1';
              }}
            >
              <span>Hotel Website</span>
              <ExternalLink size={13} />
            </a>

            <button
              onClick={onStaffPortalClick}
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#C49A45',
                background: 'transparent',
                border: '1px solid #C49A45',
                padding: '0.5rem 0.9rem',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#C49A45';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#C49A45';
              }}
            >
              Staff Reception
            </button>
          </div>
        </div>
      </header>

      {/* 2. Step Progress Indicator Track */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E6DDD3',
          padding: '1.1rem 1rem',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            {[
              { num: 1, label: 'Dates & Guests' },
              { num: 2, label: 'Choose Room' },
              { num: 3, label: 'Rate & Summary' },
              { num: 4, label: 'Guest Details' },
              { num: 5, label: 'Confirmed' },
            ].map((step, idx) => {
              const isCurrent = currentStep === step.num;
              const isPast = currentStep > step.num;
              const isClickable = isPast && currentStep !== 5;

              return (
                <div
                  key={step.num}
                  onClick={() => {
                    if (isClickable) setCurrentStep(step.num);
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.35rem',
                    cursor: isClickable ? 'pointer' : 'default',
                    zIndex: 2,
                  }}
                  title={isClickable ? `Go back to ${step.label}` : ''}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      backgroundColor: isCurrent ? '#C49A45' : isPast ? '#17243D' : '#F1EBE4',
                      color: isCurrent || isPast ? '#FFFFFF' : '#7A6B64',
                      boxShadow: isCurrent ? '0 0 0 4px rgba(196, 154, 69, 0.25)' : 'none',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {isPast ? <Check size={16} strokeWidth={2.5} /> : step.num}
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: isCurrent ? 700 : 500,
                      color: isCurrent ? '#17243D' : isPast ? '#342321' : '#9E8E87',
                      textAlign: 'center',
                    }}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Main Step View Body */}
      <main style={{ flex: 1, padding: '2.5rem 1.5rem', maxWidth: '1160px', width: '100%', margin: '0 auto' }}>
        {/* =========================================================================
            STEP 1: DATES AND GUESTS SELECTION
            ========================================================================= */}
        {currentStep === 1 && (
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: '#C49A45',
                  textTransform: 'uppercase',
                }}
              >
                Direct Hotel Booking
              </span>
              <h1
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: '2.2rem',
                  color: '#17243D',
                  marginTop: '0.35rem',
                  marginBottom: '0.65rem',
                }}
              >
                Plan Your Stay in Suchindram
              </h1>
              <p style={{ color: '#7A6B64', fontSize: '0.95rem' }}>
                Select your intended arrival and departure dates to check real-time availability across our 14 physical rooms.
              </p>
            </div>

            {roomsError && (
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '8px',
                  color: '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  marginBottom: '1.75rem',
                  fontSize: '0.88rem',
                }}
              >
                <AlertCircle size={18} />
                <span>{roomsError}</span>
              </div>
            )}

            <form
              onSubmit={handleProceedToRooms}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '2rem 2.25rem',
                boxShadow: '0 10px 30px rgba(52, 35, 33, 0.06)',
                border: '1px solid #E6DDD3',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem',
                }}
              >
                {/* Check-In Date */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#17243D',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Check-in Date
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Calendar
                      size={18}
                      color="#C49A45"
                      style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                    />
                    <input
                      type="date"
                      min={todayStr}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem 0.85rem 2.85rem',
                        borderRadius: '8px',
                        border: '1px solid #E6DDD3',
                        fontSize: '0.95rem',
                        color: '#342321',
                        backgroundColor: '#FCFAF7',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Check-Out Date */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#17243D',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Check-out Date
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Calendar
                      size={18}
                      color="#C49A45"
                      style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                    />
                    <input
                      type="date"
                      min={checkIn || todayStr}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem 0.85rem 2.85rem',
                        borderRadius: '8px',
                        border: '1px solid #E6DDD3',
                        fontSize: '0.95rem',
                        color: '#342321',
                        backgroundColor: '#FCFAF7',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Number of Adults */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#17243D',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Adults
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Users
                      size={18}
                      color="#C49A45"
                      style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                    />
                    <select
                      value={adults}
                      onChange={(e) => setAdults(parseInt(e.target.value, 10))}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem 0.85rem 2.85rem',
                        borderRadius: '8px',
                        border: '1px solid #E6DDD3',
                        fontSize: '0.95rem',
                        color: '#342321',
                        backgroundColor: '#FCFAF7',
                        outline: 'none',
                      }}
                    >
                      <option value="1">1 Adult</option>
                      <option value="2">2 Adults</option>
                      <option value="3">3 Adults</option>
                      <option value="4">4 Adults</option>
                    </select>
                  </div>
                </div>

                {/* Number of Children */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#17243D',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Children (Optional)
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value, 10))}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #E6DDD3',
                      fontSize: '0.95rem',
                      color: '#342321',
                      backgroundColor: '#FCFAF7',
                      outline: 'none',
                    }}
                  >
                    <option value="0">0 Children</option>
                    <option value="1">1 Child</option>
                    <option value="2">2 Children</option>
                  </select>
                </div>
              </div>

              {/* Room Category Quick Filter */}
              <div style={{ marginBottom: '2rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#17243D',
                    marginBottom: '0.65rem',
                  }}
                >
                  Preferred Room Category
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {[
                    { key: 'all', label: 'All Verified Rooms' },
                    { key: 'deluxe', label: 'Deluxe AC King' },
                    { key: 'executive', label: 'Executive Double AC' },
                    { key: 'comfort', label: 'Standard Comfort' },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.key}
                      onClick={() => setCategoryFilter(cat.key)}
                      style={{
                        padding: '0.55rem 1rem',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        fontWeight: categoryFilter === cat.key ? 700 : 500,
                        backgroundColor: categoryFilter === cat.key ? '#17243D' : '#FAF7F1',
                        color: categoryFilter === cat.key ? '#FFFFFF' : '#342321',
                        border: categoryFilter === cat.key ? '1px solid #17243D' : '1px solid #E6DDD3',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '1.1rem',
                  borderRadius: '8px',
                  backgroundColor: '#C49A45',
                  color: '#101C35',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 15px rgba(196, 154, 69, 0.35)',
                  transition: 'background-color 0.2s ease, transform 0.1s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#A77B2E';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#C49A45';
                  e.currentTarget.style.color = '#101C35';
                }}
              >
                <span>Find Available Rooms ({nights} {nights === 1 ? 'Night' : 'Nights'})</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        )}

        {/* =========================================================================
            STEP 2: AVAILABLE ROOM SELECTION
            ========================================================================= */}
        {currentStep === 2 && (
          <div>
            {/* Top Navigation & Selected Criteria Pill */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                marginBottom: '2rem',
              }}
            >
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#17243D',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer',
                  padding: '0.5rem 0',
                }}
              >
                <ArrowLeft size={16} /> Edit Dates & Guests
              </button>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '0.5rem 1rem',
                  borderRadius: '30px',
                  border: '1px solid #E6DDD3',
                  fontSize: '0.85rem',
                  color: '#342321',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>
                  <strong>{checkIn}</strong> to <strong>{checkOut}</strong> ({nights} {nights === 1 ? 'night' : 'nights'})
                </span>
                <span>•</span>
                <span>{adults} {adults === 1 ? 'Adult' : 'Adults'}</span>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: '1.85rem',
                  color: '#17243D',
                  marginBottom: '0.4rem',
                }}
              >
                Available Rooms for Your Dates
              </h2>
              <p style={{ color: '#7A6B64', fontSize: '0.9rem' }}>
                Live availability verified against actual hotel reservations. Prices include transparent direct-booking tariffs.
              </p>
            </div>

            {loadingRooms ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#7A6B64' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    border: '3px solid #E6DDD3',
                    borderTopColor: '#C49A45',
                    borderRadius: '50%',
                    animation: 'rotateContinuously 1s linear infinite',
                    margin: '0 auto 1.25rem',
                  }}
                />
                <p style={{ fontWeight: 600, color: '#17243D' }}>Checking live room availability...</p>
              </div>
            ) : roomsError ? (
              <div
                style={{
                  padding: '2rem',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '12px',
                  textAlign: 'center',
                  color: '#DC2626',
                }}
              >
                <AlertCircle size={24} style={{ margin: '0 auto 0.75rem' }} />
                <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{roomsError}</p>
                <button
                  onClick={() => fetchAvailableRooms(checkIn, checkOut)}
                  style={{
                    padding: '0.6rem 1.2rem',
                    backgroundColor: '#DC2626',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  Retry Availability Check
                </button>
              </div>
            ) : filteredRooms.length === 0 ? (
              <div
                style={{
                  padding: '3rem 2rem',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E6DDD3',
                  borderRadius: '16px',
                  textAlign: 'center',
                }}
              >
                <BedDouble size={36} color="#7A6B64" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.25rem', color: '#17243D', marginBottom: '0.5rem' }}>
                  No Rooms Available for These Specific Dates
                </h3>
                <p style={{ color: '#7A6B64', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                  All rooms matching your guest count are booked from {checkIn} to {checkOut}. Please try modifying your arrival or departure dates.
                </p>
                <button
                  onClick={() => setCurrentStep(1)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#C49A45',
                    color: '#101C35',
                    fontWeight: 700,
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Change Dates
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '1.75rem',
                }}
              >
                {filteredRooms.map((room) => {
                  const price = parseFloat(room.base_price_per_night || 0);
                  const totalPrice = (price * nights).toLocaleString();
                  const roomImg = getRoomImage(room.room_type);

                  return (
                    <div
                      key={room.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 16px rgba(52, 35, 33, 0.06)',
                        border: '1px solid #E6DDD3',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 12px 28px rgba(52, 35, 33, 0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(52, 35, 33, 0.06)';
                      }}
                    >
                      {/* Room Photo with Fixed Aspect Ratio */}
                      <div style={{ position: 'relative', height: '220px', backgroundColor: '#101C35' }}>
                        <img
                          src={roomImg}
                          alt={room.room_type}
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: '12px',
                            left: '12px',
                            backgroundColor: '#101C35',
                            color: '#FFFFFF',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '0.35rem 0.75rem',
                            borderRadius: '4px',
                            letterSpacing: '0.05em',
                            border: '1px solid #C49A45',
                          }}
                        >
                          Room {room.room_number} • {room.floor || '1st Floor'}
                        </div>
                      </div>

                      {/* Content Card Body */}
                      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3
                          style={{
                            fontFamily: "'Cinzel', Georgia, serif",
                            fontSize: '1.25rem',
                            color: '#17243D',
                            marginBottom: '0.4rem',
                          }}
                        >
                          {room.room_type}
                        </h3>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.82rem',
                            color: '#7A6B64',
                            marginBottom: '1rem',
                          }}
                        >
                          <span>{room.bed_type || 'Double Bed'}</span>
                          <span>•</span>
                          <span>Up to {room.capacity} Guests</span>
                        </div>

                        {/* Verified Amenities Chips */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                          {(room.amenities || 'Split Air Conditioning, En-suite Bathroom, Smart TV, Free WiFi')
                            .split(',')
                            .slice(0, 4)
                            .map((amen, idx) => (
                              <span
                                key={idx}
                                style={{
                                  fontSize: '0.72rem',
                                  backgroundColor: '#FAF7F1',
                                  color: '#342321',
                                  border: '1px solid #E6DDD3',
                                  padding: '0.2rem 0.55rem',
                                  borderRadius: '4px',
                                }}
                              >
                                {amen.trim()}
                              </span>
                            ))}
                        </div>

                        {/* Price & Select Action */}
                        <div
                          style={{
                            marginTop: 'auto',
                            paddingTop: '1rem',
                            borderTop: '1px solid #F0EAE1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#17243D' }}>
                              ₹{price > 0 ? price.toLocaleString() : '1,950'}{' '}
                              <span style={{ fontSize: '0.78rem', fontWeight: 500, color: '#7A6B64' }}>
                                / night
                              </span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#7A6B64' }}>
                              ₹{price > 0 ? totalPrice : (1950 * nights).toLocaleString()} total ({nights}n)
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleSelectRoom(room)}
                            style={{
                              padding: '0.7rem 1.25rem',
                              borderRadius: '8px',
                              backgroundColor: '#C49A45',
                              color: '#101C35',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              border: 'none',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              boxShadow: '0 2px 8px rgba(196, 154, 69, 0.25)',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#A77B2E';
                              e.currentTarget.style.color = '#FFFFFF';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#C49A45';
                              e.currentTarget.style.color = '#101C35';
                            }}
                          >
                            <span>Select Room</span>
                            <ArrowRight size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            STEP 3: RATE & BOOKING SUMMARY
            ========================================================================= */}
        {currentStep === 3 && selectedRoom && (
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              style={{
                background: 'none',
                border: 'none',
                color: '#17243D',
                fontWeight: 600,
                fontSize: '0.88rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                marginBottom: '1.5rem',
              }}
            >
              <ArrowLeft size={16} /> Choose Another Room
            </button>

            <div style={{ marginBottom: '2rem' }}>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: '#C49A45',
                  textTransform: 'uppercase',
                }}
              >
                Reservation Breakdown
              </span>
              <h2
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: '2rem',
                  color: '#17243D',
                  marginTop: '0.35rem',
                }}
              >
                Review Stay & Direct Tariff
              </h2>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '2.25rem',
                border: '1px solid #E6DDD3',
                boxShadow: '0 10px 30px rgba(52, 35, 33, 0.06)',
                marginBottom: '2rem',
              }}
            >
              {/* Selected Room Details */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  alignItems: 'center',
                  paddingBottom: '1.75rem',
                  borderBottom: '1px solid #F0EAE1',
                  marginBottom: '1.75rem',
                }}
              >
                <img
                  src={getRoomImage(selectedRoom.room_type)}
                  alt={selectedRoom.room_type}
                  style={{
                    width: '120px',
                    height: '90px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }}
                />
                <div>
                  <div
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#101C35',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '4px',
                      marginBottom: '0.35rem',
                    }}
                  >
                    Room {selectedRoom.room_number} • {selectedRoom.floor || '1st Floor'}
                  </div>
                  <h3 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: '1.35rem', color: '#17243D' }}>
                    {selectedRoom.room_type}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#7A6B64', marginTop: '0.2rem' }}>
                    {selectedRoom.bed_type || 'Double Bed'} • Max {selectedRoom.capacity} Guests
                  </p>
                </div>
              </div>

              {/* Date & Stay Details */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem',
                  paddingBottom: '1.75rem',
                  borderBottom: '1px solid #F0EAE1',
                  marginBottom: '1.75rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#7A6B64', textTransform: 'uppercase', fontWeight: 600 }}>
                    Check-in
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#17243D', marginTop: '0.2rem' }}>
                    {checkIn}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#7A6B64' }}>From 12:00 PM</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: '#7A6B64', textTransform: 'uppercase', fontWeight: 600 }}>
                    Check-out
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#17243D', marginTop: '0.2rem' }}>
                    {checkOut}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#7A6B64' }}>Until 11:00 AM</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: '#7A6B64', textTransform: 'uppercase', fontWeight: 600 }}>
                    Total Duration
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#17243D', marginTop: '0.2rem' }}>
                    {nights} {nights === 1 ? 'Night' : 'Nights'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#7A6B64' }}>
                    {adults} Adults {children > 0 ? `, ${children} Children` : ''}
                  </div>
                </div>
              </div>

              {/* Financial Calculation */}
              <div style={{ marginBottom: '1.75rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#17243D', marginBottom: '0.85rem' }}>
                  Price Summary
                </h4>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.9rem',
                    color: '#342321',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span>
                    ₹{parseFloat(selectedRoom.base_price_per_night || 0).toLocaleString()} × {nights} {nights === 1 ? 'night' : 'nights'}
                  </span>
                  <span>₹{(parseFloat(selectedRoom.base_price_per_night || 0) * nights).toLocaleString()}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.9rem',
                    color: '#7A6B64',
                    marginBottom: '0.85rem',
                  }}
                >
                  <span>Applicable Hotel Taxes & Service Fees</span>
                  <span style={{ color: '#10B981', fontWeight: 600 }}>Included</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: '#17243D',
                    paddingTop: '0.85rem',
                    borderTop: '2px dashed #E6DDD3',
                  }}
                >
                  <span>Total Payable at Hotel</span>
                  <span>₹{(parseFloat(selectedRoom.base_price_per_night || 0) * nights).toLocaleString()}</span>
                </div>
              </div>

              {/* Policies & Transparency Note */}
              <div
                style={{
                  backgroundColor: '#FAF7F1',
                  borderRadius: '8px',
                  padding: '1.15rem',
                  border: '1px solid #E6DDD3',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <ShieldCheck size={20} color="#C49A45" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.82rem', color: '#342321', lineHeight: 1.5 }}>
                    <strong>Transparent Payment Policy:</strong> No online advance required today. Pay directly upon check-in via Cash, UPI, or Card. Free cancellation up to 24 hours prior to check-in.
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 CTA Button */}
            <button
              type="button"
              onClick={handleProceedToDetails}
              style={{
                width: '100%',
                padding: '1.1rem',
                borderRadius: '8px',
                backgroundColor: '#C49A45',
                color: '#101C35',
                fontWeight: 700,
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 15px rgba(196, 154, 69, 0.35)',
              }}
            >
              <span>Continue to Guest Details</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* =========================================================================
            STEP 4: GUEST DETAILS FORM
            ========================================================================= */}
        {currentStep === 4 && selectedRoom && (
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              style={{
                background: 'none',
                border: 'none',
                color: '#17243D',
                fontWeight: 600,
                fontSize: '0.88rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                marginBottom: '1.5rem',
              }}
            >
              <ArrowLeft size={16} /> Back to Rate Summary
            </button>

            <div style={{ marginBottom: '2rem' }}>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: '#C49A45',
                  textTransform: 'uppercase',
                }}
              >
                Lead Guest Information
              </span>
              <h2
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: '2rem',
                  color: '#17243D',
                  marginTop: '0.35rem',
                }}
              >
                Enter Guest Details
              </h2>
              <p style={{ color: '#7A6B64', fontSize: '0.9rem' }}>
                We will record your reservation under these contact details for front desk check-in verification.
              </p>
            </div>

            {submissionError && (
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '8px',
                  color: '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  marginBottom: '1.75rem',
                  fontSize: '0.88rem',
                }}
              >
                <AlertCircle size={18} />
                <span>{submissionError}</span>
              </div>
            )}

            <form
              onSubmit={handleFinalBookingSubmit}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '2.25rem',
                border: '1px solid #E6DDD3',
                boxShadow: '0 10px 30px rgba(52, 35, 33, 0.06)',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '1.75rem',
                }}
              >
                {/* Full Name */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#17243D',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Guest Full Name *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User
                      size={18}
                      color="#9E8E87"
                      style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                    />
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                      placeholder="e.g. Ramesh Kumar"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem 0.85rem 2.85rem',
                        borderRadius: '8px',
                        border: '1px solid #E6DDD3',
                        fontSize: '0.95rem',
                        color: '#342321',
                        backgroundColor: '#FCFAF7',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Mobile Phone Number */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#17243D',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Mobile Phone Number *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone
                      size={18}
                      color="#9E8E87"
                      style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                    />
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      required
                      placeholder="+91 98765 43210"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem 0.85rem 2.85rem',
                        borderRadius: '8px',
                        border: '1px solid #E6DDD3',
                        fontSize: '0.95rem',
                        color: '#342321',
                        backgroundColor: '#FCFAF7',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#17243D',
                    marginBottom: '0.5rem',
                  }}
                >
                  Email Address (Optional — for booking confirmation)
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    size={18}
                    color="#9E8E87"
                    style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="guest@example.com"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem 0.85rem 2.85rem',
                      borderRadius: '8px',
                      border: '1px solid #E6DDD3',
                      fontSize: '0.95rem',
                      color: '#342321',
                      backgroundColor: '#FCFAF7',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div style={{ marginBottom: '2rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#17243D',
                    marginBottom: '0.5rem',
                  }}
                >
                  Special Requests / Estimated Arrival Time (Optional)
                </label>
                <textarea
                  rows="3"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Arriving around 3:00 PM, temple pilgrim visit, need ground floor room if available..."
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #E6DDD3',
                    fontSize: '0.92rem',
                    color: '#342321',
                    backgroundColor: '#FCFAF7',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              {/* Submit Final Reservation */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '1.1rem',
                  borderRadius: '8px',
                  backgroundColor: '#C49A45',
                  color: '#101C35',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  opacity: isSubmitting ? 0.75 : 1,
                  boxShadow: '0 4px 15px rgba(196, 154, 69, 0.35)',
                }}
              >
                {isSubmitting ? (
                  <span>Saving Reservation to Hotel System...</span>
                ) : (
                  <>
                    <span>Confirm Hotel Reservation (Pay at Reception)</span>
                    <CheckCircle2 size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* =========================================================================
            STEP 5: BOOKING CONFIRMATION SCREEN
            ========================================================================= */}
        {currentStep === 5 && confirmedBooking && (
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #E6DDD3',
                overflow: 'hidden',
                boxShadow: '0 15px 40px rgba(52, 35, 33, 0.08)',
              }}
            >
              {/* Top Success Banner */}
              <div
                style={{
                  backgroundColor: '#101C35',
                  color: '#FFFFFF',
                  padding: '2.5rem 2rem',
                  textAlign: 'center',
                  borderBottom: '3px solid #C49A45',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(196, 154, 69, 0.2)',
                    border: '2px solid #C49A45',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                  }}
                >
                  <CheckCircle2 size={36} color="#C49A45" />
                </div>

                <span
                  style={{
                    fontSize: '0.8rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#D9B568',
                    fontWeight: 600,
                  }}
                >
                  Reservation Confirmed
                </span>
                <h1
                  style={{
                    fontFamily: "'Cinzel', Georgia, serif",
                    fontSize: '2.2rem',
                    color: '#FFFFFF',
                    margin: '0.4rem 0 0.85rem',
                  }}
                >
                  We Look Forward to Welcoming You
                </h1>
                <p style={{ color: '#E2E8F0', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto' }}>
                  Your room at Hotel Lara International, Suchindram has been successfully reserved in our central database.
                </p>

                {/* Reference Code Badge */}
                <div
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1.5px dashed #C49A45',
                    borderRadius: '8px',
                    padding: '0.75rem 1.75rem',
                    marginTop: '1.5rem',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: '#D9B568', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Booking Reference
                  </div>
                  <div style={{ fontSize: '1.65rem', fontWeight: 800, letterSpacing: '0.08em', color: '#FFFFFF' }}>
                    {confirmedBooking.booking_reference}
                  </div>
                </div>
              </div>

              {/* Confirmation Details Summary */}
              <div style={{ padding: '2.25rem' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1.5rem',
                    paddingBottom: '1.75rem',
                    borderBottom: '1px solid #F0EAE1',
                    marginBottom: '1.75rem',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#7A6B64', textTransform: 'uppercase', fontWeight: 600 }}>
                      Primary Guest
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#17243D', marginTop: '0.2rem' }}>
                      {confirmedBooking.guest_name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#7A6B64' }}>{confirmedBooking.guest_phone}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#7A6B64', textTransform: 'uppercase', fontWeight: 600 }}>
                      Reserved Accommodation
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#17243D', marginTop: '0.2rem' }}>
                      Room {confirmedBooking.room_number || selectedRoom.room_number}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#7A6B64' }}>
                      {confirmedBooking.room_type || selectedRoom.room_type}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#7A6B64', textTransform: 'uppercase', fontWeight: 600 }}>
                      Dates of Stay
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#17243D', marginTop: '0.2rem' }}>
                      {confirmedBooking.check_in_date} to {confirmedBooking.check_out_date}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#7A6B64' }}>
                      {confirmedBooking.number_of_nights || nights} Nights
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#7A6B64', textTransform: 'uppercase', fontWeight: 600 }}>
                      Total Tariff Payable
                    </div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#17243D', marginTop: '0.2rem' }}>
                      ₹{parseFloat(confirmedBooking.total_amount || 0).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>Pay at Check-in</div>
                  </div>
                </div>

                {/* Hotel Location & Front Desk Assistance */}
                <div
                  style={{
                    backgroundColor: '#FAF7F1',
                    borderRadius: '10px',
                    padding: '1.25rem',
                    border: '1px solid #E6DDD3',
                    marginBottom: '2rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <MapPin size={20} color="#C49A45" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '0.85rem', color: '#342321', lineHeight: 1.5 }}>
                      <strong>Hotel Lara International</strong>
                      <br />
                      Nalloor Rd, Suchindrum, Eraviputhoor, Tamil Nadu — 629704
                    </div>
                  </div>

                  <a
                    href="tel:+918300504187"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#101C35',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.5rem 0.9rem',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '6px',
                      border: '1px solid #E6DDD3',
                    }}
                  >
                    <Phone size={15} color="#C49A45" />
                    <span>+91 8300504187</span>
                  </a>
                </div>

                {/* Print & Return Actions */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    style={{
                      flex: 1,
                      minWidth: '180px',
                      padding: '0.9rem',
                      borderRadius: '8px',
                      backgroundColor: '#FFFFFF',
                      color: '#17243D',
                      border: '1px solid #E6DDD3',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <Printer size={16} />
                    <span>Print Confirmation</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setConfirmedBooking(null);
                      setSelectedRoom(null);
                      setCurrentStep(1);
                    }}
                    style={{
                      flex: 1,
                      minWidth: '180px',
                      padding: '0.9rem',
                      borderRadius: '8px',
                      backgroundColor: '#C49A45',
                      color: '#101C35',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                    }}
                  >
                    Book Another Stay
                  </button>

                  <a
                    href={publicWebsiteUrl}
                    style={{
                      flex: 1,
                      minWidth: '180px',
                      padding: '0.9rem',
                      borderRadius: '8px',
                      backgroundColor: '#17243D',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    Return to Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. Luxury Brand Footer */}
      <footer
        style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E6DDD3',
          padding: '1.5rem',
          textAlign: 'center',
          fontSize: '0.82rem',
          color: '#7A6B64',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div>
            © {new Date().getFullYear()} Hotel Lara International • Suchindram, Kanyakumari. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ color: '#17243D', fontWeight: 600 }}>24/7 Front Desk: +91 8300504187</span>
            <span>•</span>
            <button
              onClick={onStaffPortalClick}
              style={{
                background: 'none',
                border: 'none',
                color: '#C49A45',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 600,
                padding: 0,
              }}
            >
              Staff Portal (/admin/login)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GuestBookingFlow;
