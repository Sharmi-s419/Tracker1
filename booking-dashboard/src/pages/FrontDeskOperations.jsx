import React, { useState, useEffect } from 'react';
import { Clock, CalendarCheck, CheckCircle2, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { dashboardApi, bookingsApi, roomsApi } from '../api/client';
import StatusBadge from '../components/StatusBadge';

export const FrontDeskOperations = ({ targetBookingId, onSelectBooking }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await dashboardApi.getStats();
      setStats(res.data);
    } catch (err) {
      setError('Failed to fetch front desk data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCheckIn = async (bookingId, roomNumber) => {
    setActionLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      await bookingsApi.checkIn(bookingId);
      setSuccessMsg(`Guest successfully checked into Room ${roomNumber}. Room status set to Occupied.`);
      loadData();
    } catch (err) {
      setError(err.response?.data?.error || 'Check-in failed.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCheckOut = async (bookingId, roomNumber) => {
    setActionLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      await bookingsApi.checkOut(bookingId);
      setSuccessMsg(`Guest checked out from Room ${roomNumber}. Room placed in Cleaning / Turnover state.`);
      loadData();
    } catch (err) {
      setError(err.response?.data?.error || 'Check-out failed.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
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
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#101C35' }}>
            Front Desk Operations & Room Turn
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Daily check-in desk, guest key issuance, room departure handover, and cleaning turnover.
          </p>
        </div>

        <button className="btn btn-outline" onClick={loadData} title="Refresh">
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {successMsg && (
        <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" style={{ marginBottom: '1.5rem' }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Grid: Arrivals on Left, Departures on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.75rem' }}>
        {/* Arrivals Panel */}
        <div className="card">
          <div className="card-header" style={{ backgroundColor: '#F0F9FF', borderBottomColor: '#BAE6FD' }}>
            <div className="card-title" style={{ color: '#0369A1' }}>
              <Clock size={20} />
              Today's Scheduled Arrivals ({stats?.today_checkins?.length || 0})
            </div>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {(!stats?.today_checkins || stats.today_checkins.length === 0) ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
                All arrivals for today are checked in or no more scheduled.
              </div>
            ) : (
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Room</th>
                      <th>Guest Details</th>
                      <th>Dates</th>
                      <th>Payment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.today_checkins.map((b) => (
                      <tr key={b.id} style={targetBookingId === b.id ? { backgroundColor: '#F0F9FF' } : {}}>
                        <td style={{ fontWeight: 700, color: '#101C35' }}>Room {b.room_number}</td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{b.guest_name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{b.guest_phone}</div>
                        </td>
                        <td>
                          {b.check_in_date} → {b.check_out_date}
                        </td>
                        <td>
                          <StatusBadge status={b.payment_status} />
                        </td>
                        <td>
                          {b.status === 'checked_in' ? (
                            <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>
                              ✓ Checked In
                            </span>
                          ) : (
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleCheckIn(b.id, b.room_number)}
                              disabled={actionLoading}
                            >
                              Check-In
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Departures Panel */}
        <div className="card">
          <div className="card-header" style={{ backgroundColor: '#FFFBEB', borderBottomColor: '#FDE68A' }}>
            <div className="card-title" style={{ color: '#B45309' }}>
              <CalendarCheck size={20} />
              Today's Scheduled Departures ({stats?.today_checkouts?.length || 0})
            </div>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {(!stats?.today_checkouts || stats.today_checkouts.length === 0) ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
                No departures scheduled for today.
              </div>
            ) : (
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Room</th>
                      <th>Guest Details</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.today_checkouts.map((b) => (
                      <tr key={b.id}>
                        <td style={{ fontWeight: 700, color: '#101C35' }}>Room {b.room_number}</td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{b.guest_name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                            Ref: {b.booking_reference}
                          </div>
                        </td>
                        <td>
                          <StatusBadge status={b.status} />
                        </td>
                        <td>
                          {b.status === 'checked_out' ? (
                            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                              ✓ Checked Out
                            </span>
                          ) : (
                            <button
                              className="btn btn-gold btn-sm"
                              onClick={() => handleCheckOut(b.id, b.room_number)}
                              disabled={actionLoading}
                            >
                              Check-Out
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontDeskOperations;
