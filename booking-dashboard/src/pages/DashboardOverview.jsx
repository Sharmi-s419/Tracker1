import React, { useState, useEffect } from 'react';
import {
  BedDouble,
  CheckCircle,
  Clock,
  CalendarCheck,
  CalendarX,
  PlusCircle,
  ArrowRight,
  RefreshCw,
  Search,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { dashboardApi, bookingsApi } from '../api/client';
import StatusBadge from '../components/StatusBadge';
<<<<<<< HEAD
import { getRoomDisplayName, formatRoomNumber } from '../constants/roomNames';
=======
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1

export const DashboardOverview = ({ onNavigate }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quickSearch, setQuickSearch] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const loadStats = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await dashboardApi.getStats();
      setStats(res.data);
    } catch (err) {
      setError('Failed to fetch dashboard statistics from backend API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleQuickSearch = async (e) => {
    e.preventDefault();
    if (!quickSearch.trim()) {
      setSearchResults(null);
      return;
    }
    setIsSearching(true);
    try {
      const res = await bookingsApi.getAll({ search: quickSearch.trim() });
      setSearchResults(res.data.results || res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  if (loading && !stats) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
        <RefreshCw className="spin" size={28} style={{ margin: '0 auto 1rem' }} />
        <p>Loading real-time hotel metrics from backend...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Top Banner & Quick Actions */}
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
            Reception Overview & Live Occupancy
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Hotel Lara International — Suchindram, Kanyakumari | Today: {stats?.today || new Date().toLocaleDateString()}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-outline" onClick={loadStats} title="Refresh data">
            <RefreshCw size={16} />
            Refresh
          </button>
          <button className="btn btn-gold" onClick={() => onNavigate('new-booking')}>
            <PlusCircle size={16} />
            New Booking
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* KPI Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Total Rooms</span>
            <div className="stat-icon" style={{ backgroundColor: '#F1F5F9', color: '#101C35' }}>
              <BedDouble size={20} />
            </div>
          </div>
          <div className="stat-value">{stats?.total_rooms ?? 14}</div>
          <div className="stat-subtext">Active physical inventory</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Available Today</span>
            <div className="stat-icon" style={{ backgroundColor: '#ECFDF5', color: '#10B981' }}>
              <CheckCircle size={20} />
            </div>
          </div>
          <div className="stat-value" style={{ color: '#10B981' }}>
            {stats?.available_rooms ?? 0}
          </div>
          <div className="stat-subtext">Ready for walk-in or offline check-in</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Occupied Rooms</span>
            <div className="stat-icon" style={{ backgroundColor: '#FEF2F2', color: '#EF4444' }}>
              <BedDouble size={20} />
            </div>
          </div>
          <div className="stat-value" style={{ color: '#EF4444' }}>
            {stats?.occupied_rooms ?? 0}
          </div>
          <div className="stat-subtext">Guests currently in residence</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Today's Check-Ins</span>
            <div className="stat-icon" style={{ backgroundColor: '#F0F9FF', color: '#0284C7' }}>
              <Clock size={20} />
            </div>
          </div>
          <div className="stat-value" style={{ color: '#0284C7' }}>
            {stats?.today_checkins_count ?? 0}
          </div>
          <div className="stat-subtext">Arrivals scheduled for today</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Today's Check-Outs</span>
            <div className="stat-icon" style={{ backgroundColor: '#FFFBEB', color: '#D97706' }}>
              <CalendarCheck size={20} />
            </div>
          </div>
          <div className="stat-value" style={{ color: '#D97706' }}>
            {stats?.today_checkouts_count ?? 0}
          </div>
          <div className="stat-subtext">Departures scheduled for today</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Upcoming (7 Days)</span>
            <div className="stat-icon" style={{ backgroundColor: '#EEF2FF', color: '#6366F1' }}>
              <CalendarCheck size={20} />
            </div>
          </div>
          <div className="stat-value" style={{ color: '#6366F1' }}>
            {stats?.upcoming_reservations_count ?? 0}
          </div>
          <div className="stat-subtext">Advance confirmed bookings</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Cancelled</span>
            <div className="stat-icon" style={{ backgroundColor: '#F8FAFC', color: '#94A3B8' }}>
              <CalendarX size={20} />
            </div>
          </div>
          <div className="stat-value" style={{ color: '#64748B' }}>
            {stats?.cancelled_count ?? 0}
          </div>
          <div className="stat-subtext">Freed back to inventory</div>
        </div>
      </div>

      {/* Quick Search */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-body" style={{ padding: '1.25rem 1.5rem' }}>
          <form onSubmit={handleQuickSearch} style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94A3B8',
                }}
              />
              <input
                type="text"
                className="form-control"
                style={{ paddingLeft: '2.4rem' }}
                placeholder="Quick lookup by Booking Reference (e.g. HLI-...), Guest Name, or Phone Number..."
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSearching}>
              {isSearching ? 'Searching...' : 'Search'}
            </button>
            {searchResults !== null && (
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setQuickSearch('');
                  setSearchResults(null);
                }}
              >
                Clear
              </button>
            )}
          </form>

          {/* Quick Search Results Preview */}
          {searchResults && (
            <div style={{ marginTop: '1.25rem', borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: '#101C35' }}>
                Search Results ({searchResults.length})
              </h4>
              {searchResults.length === 0 ? (
                <p style={{ fontSize: '0.85rem', color: '#64748B' }}>No bookings matching that query.</p>
              ) : (
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Ref</th>
                        <th>Room</th>
                        <th>Guest</th>
                        <th>Phone</th>
                        <th>Stay Dates</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map((b) => (
                        <tr key={b.id}>
                          <td style={{ fontWeight: 600, color: '#101C35' }}>{b.booking_reference}</td>
<<<<<<< HEAD
                          <td>
                            <div style={{ fontWeight: 700, color: '#101C35' }}>Room {formatRoomNumber(b.room_number)}</div>
                            <div style={{ fontSize: '0.78rem', color: '#8C6D23', fontWeight: 600 }}>{getRoomDisplayName(b)}</div>
                          </td>
=======
                          <td>Room {b.room_number}</td>
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
                          <td style={{ fontWeight: 500 }}>{b.guest_name}</td>
                          <td>{b.guest_phone}</td>
                          <td>
                            {b.check_in_date} → {b.check_out_date} ({b.number_of_nights}N)
                          </td>
                          <td>
                            <StatusBadge status={b.status} />
                          </td>
                          <td>
                            <button
                              className="btn btn-outline btn-sm"
                              onClick={() => onNavigate('bookings', { bookingId: b.id })}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Two Column Layout: Today's Check-ins & Check-outs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {/* Today's Check-ins */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Clock size={18} color="#0284C7" />
              Today's Arrivals ({stats?.today_checkins?.length || 0})
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => onNavigate('front-desk')}>
              Front Desk View
            </button>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {(!stats?.today_checkins || stats.today_checkins.length === 0) ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B', fontSize: '0.88rem' }}>
                No scheduled check-ins remaining for today.
              </div>
            ) : (
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Room</th>
                      <th>Guest</th>
                      <th>Source</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.today_checkins.map((b) => (
                      <tr key={b.id}>
<<<<<<< HEAD
                        <td>
                          <div style={{ fontWeight: 700, color: '#101C35' }}>Room {formatRoomNumber(b.room_number)}</div>
                          <div style={{ fontSize: '0.78rem', color: '#8C6D23', fontWeight: 600 }}>{getRoomDisplayName(b)}</div>
                        </td>
=======
                        <td style={{ fontWeight: 700, color: '#101C35' }}>Room {b.room_number}</td>
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
                        <td>
                          <div style={{ fontWeight: 600 }}>{b.guest_name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{b.guest_phone}</div>
                        </td>
                        <td>{b.booking_source_display}</td>
                        <td>
                          <StatusBadge status={b.status} />
                        </td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => onNavigate('front-desk', { targetBookingId: b.id })}
                          >
                            Check-In
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

        {/* Today's Check-outs */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <CalendarCheck size={18} color="#D97706" />
              Today's Departures ({stats?.today_checkouts?.length || 0})
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => onNavigate('front-desk')}>
              Manage Turn
            </button>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {(!stats?.today_checkouts || stats.today_checkouts.length === 0) ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B', fontSize: '0.88rem' }}>
                No departures scheduled for today.
              </div>
            ) : (
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Room</th>
                      <th>Guest</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.today_checkouts.map((b) => (
                      <tr key={b.id}>
<<<<<<< HEAD
                        <td>
                          <div style={{ fontWeight: 700, color: '#101C35' }}>Room {formatRoomNumber(b.room_number)}</div>
                          <div style={{ fontSize: '0.78rem', color: '#8C6D23', fontWeight: 600 }}>{getRoomDisplayName(b)}</div>
                        </td>
=======
                        <td style={{ fontWeight: 700, color: '#101C35' }}>Room {b.room_number}</td>
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
                        <td>
                          <div style={{ fontWeight: 600 }}>{b.guest_name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{b.guest_phone}</div>
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
                            onClick={() => onNavigate('front-desk', { targetBookingId: b.id })}
                          >
                            Manage
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
      </div>
    </div>
  );
};

export default DashboardOverview;
