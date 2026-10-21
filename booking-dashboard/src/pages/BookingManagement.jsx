import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Calendar,
  CheckCircle,
  XCircle,
  RefreshCw,
  Eye,
  PlusCircle,
  Download,
  AlertTriangle
} from 'lucide-react';
import { bookingsApi, roomsApi } from '../api/client';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { getRoomDisplayName } from '../constants/roomNames';
=======
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f

export const BookingManagement = ({ onNewBooking, initialSelectedBookingId }) => {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [roomFilter, setRoomFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Modal / Detail state
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');
  const [showCancelPrompt, setShowCancelPrompt] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const loadRooms = async () => {
    try {
      const res = await roomsApi.getAll();
      setRooms(res.data.results || res.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const loadBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (statusFilter) params.status = statusFilter;
      if (paymentFilter) params.payment_status = paymentFilter;
      if (roomFilter) params.room_id = roomFilter;
      if (dateFrom) params.date_from = dateFrom;
      if (dateTo) params.date_to = dateTo;

      const res = await bookingsApi.getAll(params);
      setBookings(res.data.results || res.data || []);
    } catch (err) {
      setError('Failed to fetch bookings list from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    loadBookings();
  }, [statusFilter, paymentFilter, roomFilter, dateFrom, dateTo]);

  useEffect(() => {
    if (initialSelectedBookingId) {
      openDetailModal(initialSelectedBookingId);
    }
  }, [initialSelectedBookingId]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadBookings();
  };

  const openDetailModal = async (bookingId) => {
    setDetailLoading(true);
    setShowCancelPrompt(false);
    try {
      const res = await bookingsApi.getById(bookingId);
      setSelectedBooking(res.data);
    } catch (err) {
      alert('Could not load booking details.');
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCheckIn = async (bookingId) => {
    setActionLoading(true);
    try {
      await bookingsApi.checkIn(bookingId);
      openDetailModal(bookingId);
      loadBookings();
    } catch (err) {
      alert('Check-in failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setActionLoading(false);
    }
  };

  const handleCheckOut = async (bookingId) => {
    setActionLoading(true);
    try {
      await bookingsApi.checkOut(bookingId);
      openDetailModal(bookingId);
      loadBookings();
    } catch (err) {
      alert('Check-out failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    setActionLoading(true);
    try {
      await bookingsApi.cancel(bookingId, cancellationReason);
      setShowCancelPrompt(false);
      setCancellationReason('');
      openDetailModal(bookingId);
      loadBookings();
    } catch (err) {
      alert('Cancellation failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setActionLoading(false);
    }
  };

  const handlePaymentUpdate = async (newPaymentStatus) => {
    if (!selectedBooking) return;
    setActionLoading(true);
    try {
      await bookingsApi.update(selectedBooking.id, { payment_status: newPaymentStatus });
      openDetailModal(selectedBooking.id);
      loadBookings();
    } catch (err) {
      alert('Payment update failed.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.75rem',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#101C35' }}>
            Bookings & Reservations
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Search, filter, view and manage all guest reservations across the 14 rooms.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-outline" onClick={loadBookings} title="Refresh">
            <RefreshCw size={16} />
            Refresh
          </button>
          <button className="btn btn-gold" onClick={onNewBooking}>
            <PlusCircle size={16} />
            New Reservation
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Filter Toolbar */}
      <div className="card" style={{ marginBottom: '1.75rem' }}>
        <div className="card-body" style={{ padding: '1.25rem' }}>
          <form onSubmit={handleSearchSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', alignItems: 'end' }}>
              <div>
                <label className="form-label">Search</label>
                <div style={{ position: 'relative' }}>
                  <Search
                    size={16}
                    style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}
                  />
                  <input
                    type="text"
                    className="form-control"
                    style={{ paddingLeft: '2.1rem' }}
                    placeholder="Ref, Guest, Phone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Booking Status</label>
                <select className="form-control" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="checked_in">Checked-In</option>
                  <option value="checked_out">Checked-Out</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="form-label">Room</label>
                <select className="form-control" value={roomFilter} onChange={(e) => setRoomFilter(e.target.value)}>
                  <option value="">All 14 Rooms</option>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
<<<<<<< HEAD
                      Room {r.room_number} ({r.room_type})
=======
<<<<<<< HEAD
                      Room {r.room_number} — {getRoomDisplayName(r)} ({r.room_type})
=======
                      Room {r.room_number} ({r.room_type})
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Payment</label>
                <select className="form-control" value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}>
                  <option value="">All Payments</option>
                  <option value="pending">Pending</option>
                  <option value="partial">Advance Paid</option>
                  <option value="paid">Fully Paid</option>
                </select>
              </div>

              <div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Apply Filters
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            Reservations ({bookings.length})
          </div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          {bookings.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
              No reservations found matching the current search filters.
            </div>
          ) : (
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Booking Ref</th>
                    <th>Room</th>
                    <th>Guest Details</th>
                    <th>Check-In</th>
                    <th>Check-Out</th>
                    <th>Nights</th>
                    <th>Total Tariff</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: 700, color: '#101C35' }}>
                        {b.booking_reference}
                      </td>
<<<<<<< HEAD
                      <td style={{ fontWeight: 600 }}>Room {b.room_number}</td>
=======
<<<<<<< HEAD
                      <td>
                        <div style={{ fontWeight: 700, color: '#101C35' }}>Room {b.room_number}</div>
                        <div style={{ fontSize: '0.78rem', color: '#8C6D23', fontWeight: 600 }}>{getRoomDisplayName(b)}</div>
                      </td>
=======
                      <td style={{ fontWeight: 600 }}>Room {b.room_number}</td>
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f
                      <td>
                        <div style={{ fontWeight: 600 }}>{b.guest_name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{b.guest_phone}</div>
                      </td>
                      <td>{b.check_in_date}</td>
                      <td>{b.check_out_date}</td>
                      <td>{b.number_of_nights}N</td>
                      <td style={{ fontWeight: 600, color: '#101C35' }}>
                        ₹{Number(b.total_amount || 0).toLocaleString()}
                      </td>
                      <td>
                        <StatusBadge status={b.payment_status} />
                      </td>
                      <td>
                        <StatusBadge status={b.status} />
                      </td>
                      <td>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => openDetailModal(b.id)}
                        >
                          <Eye size={14} /> Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Booking Details & Actions Modal */}
      {selectedBooking && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedBooking(null)}
          title={`Booking ${selectedBooking.booking_reference}`}
          footer={
            <div style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div>
                {selectedBooking.status !== 'cancelled' && selectedBooking.status !== 'checked_out' && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setShowCancelPrompt(true)}
                    disabled={actionLoading}
                  >
                    <XCircle size={15} /> Cancel Booking
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {selectedBooking.status === 'confirmed' && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleCheckIn(selectedBooking.id)}
                    disabled={actionLoading}
                  >
                    <CheckCircle size={15} /> Mark Checked-In
                  </button>
                )}
                {selectedBooking.status === 'checked_in' && (
                  <button
                    className="btn btn-gold btn-sm"
                    onClick={() => handleCheckOut(selectedBooking.id)}
                    disabled={actionLoading}
                  >
                    <CheckCircle size={15} /> Mark Checked-Out
                  </button>
                )}
                <button className="btn btn-outline btn-sm" onClick={() => setSelectedBooking(null)}>
                  Close
                </button>
              </div>
            </div>
          }
        >
          {showCancelPrompt ? (
            <div style={{ padding: '1rem', backgroundColor: '#FEF2F2', borderRadius: '8px' }}>
              <h4 style={{ color: '#991B1B', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} /> Confirm Reservation Cancellation
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#7F1D1D', marginBottom: '1rem' }}>
<<<<<<< HEAD
                Cancelling this reservation will immediately restore Room {selectedBooking.room_number || selectedBooking.room?.room_number} back to active inventory for other guests.
=======
<<<<<<< HEAD
                Cancelling this reservation will immediately restore Room {selectedBooking.room_number || selectedBooking.room?.room_number} ({getRoomDisplayName(selectedBooking)}) back to active inventory for other guests.
=======
                Cancelling this reservation will immediately restore Room {selectedBooking.room_number || selectedBooking.room?.room_number} back to active inventory for other guests.
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f
              </p>
              <div className="form-group">
                <label className="form-label">Cancellation Reason</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Guest called to cancel pilgrimage trip"
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button className="btn btn-outline btn-sm" onClick={() => setShowCancelPrompt(false)}>
                  Keep Reservation
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleCancelBooking(selectedBooking.id)}
                  disabled={actionLoading}
                >
                  Confirm Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Summary Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ padding: '0.85rem', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase' }}>Room</div>
                  <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#101C35' }}>
                    Room {selectedBooking.room_details?.room_number || selectedBooking.room_number}
                  </div>
<<<<<<< HEAD
                  <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                    {selectedBooking.room_details?.room_type || 'Standard'}
=======
<<<<<<< HEAD
                  <div style={{ fontSize: '0.9rem', color: '#8C6D23', fontWeight: 700 }}>
                    {getRoomDisplayName(selectedBooking.room_details || selectedBooking)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                    {selectedBooking.room_details?.room_type || selectedBooking.room_type || 'Standard Room'}
=======
                  <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                    {selectedBooking.room_details?.room_type || 'Standard'}
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f
                  </div>
                </div>

                <div style={{ padding: '0.85rem', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase' }}>Status</div>
                  <div style={{ marginTop: '0.35rem' }}>
                    <StatusBadge status={selectedBooking.status} />
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.2rem' }}>
                    Channel: {selectedBooking.booking_source_display || selectedBooking.booking_source}
                  </div>
                </div>
              </div>

              {/* Guest & Dates */}
              <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#64748B', marginBottom: '0.5rem' }}>
                  Guest Information
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.88rem' }}>
                  <div><strong>Name:</strong> {selectedBooking.guest_name}</div>
                  <div><strong>Phone:</strong> {selectedBooking.guest_phone}</div>
                  <div><strong>Email:</strong> {selectedBooking.guest_email || 'Not provided'}</div>
                  <div><strong>Guests:</strong> {selectedBooking.adults} Adults, {selectedBooking.children} Children</div>
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#64748B', marginBottom: '0.5rem' }}>
                  Stay & Billing
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.88rem' }}>
                  <div><strong>Check-In:</strong> {selectedBooking.check_in_date}</div>
                  <div><strong>Check-Out:</strong> {selectedBooking.check_out_date}</div>
                  <div><strong>Nights:</strong> {selectedBooking.number_of_nights}</div>
                  <div><strong>Rate/Night:</strong> ₹{Number(selectedBooking.price_per_night || 0).toLocaleString()}</div>
                  <div style={{ gridColumn: 'span 2', fontSize: '1rem', fontWeight: 700, color: '#101C35' }}>
                    Total Tariff: ₹{Number(selectedBooking.total_amount || 0).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#64748B' }}>
                    Payment Status
                  </h4>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => handlePaymentUpdate('paid')}
                      disabled={actionLoading}
                    >
                      Mark Paid
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => handlePaymentUpdate('partial')}
                      disabled={actionLoading}
                    >
                      Mark Advance
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <StatusBadge status={selectedBooking.payment_status} />
                  {selectedBooking.payment_notes && (
                    <span style={{ fontSize: '0.82rem', color: '#475569' }}>
                      ({selectedBooking.payment_notes})
                    </span>
                  )}
                </div>
              </div>

              {selectedBooking.special_requests && (
                <div style={{ padding: '0.75rem', backgroundColor: '#FFFBEB', borderRadius: '8px', fontSize: '0.82rem', color: '#92400E' }}>
                  <strong>Special Requests / Notes:</strong> {selectedBooking.special_requests}
                </div>
              )}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default BookingManagement;
