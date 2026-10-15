import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, DollarSign, RefreshCw, PieChart } from 'lucide-react';
import { dashboardApi } from '../api/client';

export const ReportsView = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadReports = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await dashboardApi.getReports();
      setReports(res.data);
    } catch (err) {
      setError('Could not load management reports.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const sourceLabels = {
    phone: 'Phone Call Reservations',
    whatsapp: 'WhatsApp Direct Chat',
    walkin: 'Walk-In Reception Desk',
    direct: 'Direct Enquiries',
    website: 'Public Website',
    other: 'Other Offline Sources',
  };

  const statusLabels = {
    confirmed: 'Confirmed (Upcoming)',
    checked_in: 'Currently Checked-In',
    checked_out: 'Completed & Checked-Out',
    cancelled: 'Cancelled Reservations',
  };

  const paymentLabels = {
    pending: 'Pending Payment',
    partial: 'Advance / Partial Payment',
    paid: 'Fully Settled / Paid',
    refunded: 'Refunded',
  };

  if (loading && !reports) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
        <RefreshCw className="spin" size={28} style={{ margin: '0 auto 1rem' }} />
        <p>Generating hotel occupancy and financial reports...</p>
      </div>
    );
  }

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
            Hotel Management & Booking Analytics
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Occupancy figures, revenue summary, and reservation acquisition channels.
          </p>
        </div>

        <button className="btn btn-outline" onClick={loadReports} title="Refresh">
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Highlights */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Total Recorded Bookings</span>
            <div className="stat-icon" style={{ backgroundColor: '#F0F9FF', color: '#0284C7' }}>
              <BarChart3 size={20} />
            </div>
          </div>
          <div className="stat-value">{reports?.total_bookings ?? 0}</div>
          <div className="stat-subtext">All time bookings recorded</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Active / Completed</span>
            <div className="stat-icon" style={{ backgroundColor: '#ECFDF5', color: '#10B981' }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="stat-value" style={{ color: '#10B981' }}>
            {reports?.confirmed_bookings ?? 0}
          </div>
          <div className="stat-subtext">Excludes cancelled reservations</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Gross Room Revenue</span>
            <div className="stat-icon" style={{ backgroundColor: '#FFFBEB', color: '#D97706' }}>
              <DollarSign size={20} />
            </div>
          </div>
          <div className="stat-value" style={{ color: '#101C35' }}>
            ₹{Number(reports?.total_revenue || 0).toLocaleString()}
          </div>
          <div className="stat-subtext">From active & completed stays</div>
        </div>
      </div>

      {/* Detailed Breakdowns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Booking Sources */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <PieChart size={18} color="#C6A15B" />
              Reservation Channels Breakdown
            </div>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Channel</th>
                    <th style={{ textAlign: 'right' }}>Bookings</th>
                  </tr>
                </thead>
                <tbody>
                  {reports?.sources?.map((s) => (
                    <tr key={s.booking_source}>
                      <td style={{ fontWeight: 600 }}>{sourceLabels[s.booking_source] || s.booking_source}</td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: '#101C35' }}>{s.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <BarChart3 size={18} color="#0284C7" />
              Reservations by Status
            </div>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {reports?.statuses?.map((st) => (
                    <tr key={st.status}>
                      <td style={{ fontWeight: 600 }}>{statusLabels[st.status] || st.status}</td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: '#101C35' }}>{st.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Payment Distribution */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <DollarSign size={18} color="#10B981" />
              Payment Realization
            </div>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Payment Status</th>
                    <th style={{ textAlign: 'right' }}>Reservations</th>
                  </tr>
                </thead>
                <tbody>
                  {reports?.payments?.map((p) => (
                    <tr key={p.payment_status}>
                      <td style={{ fontWeight: 600 }}>{paymentLabels[p.payment_status] || p.payment_status}</td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: '#101C35' }}>{p.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
