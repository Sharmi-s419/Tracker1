import React, { useState, useEffect } from 'react';
import { Users, Search, RefreshCw, Phone, Mail, MapPin, FileText } from 'lucide-react';
import { guestsApi } from '../api/client';

export const GuestDirectory = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const loadGuests = async () => {
    setLoading(true);
    setError('');
    try {
      const params = search.trim() ? { search: search.trim() } : {};
      const res = await guestsApi.getAll(params);
      setGuests(res.data.results || res.data || []);
    } catch (err) {
      setError('Could not fetch guest records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGuests();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadGuests();
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
            Guest Profiles & Stay Directory
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Permanent guest records, phone directory, ID proof numbers, and previous stay frequencies.
          </p>
        </div>

        <button className="btn btn-outline" onClick={loadGuests} title="Refresh">
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Search Bar */}
      <div className="card" style={{ marginBottom: '1.75rem' }}>
        <div className="card-body" style={{ padding: '1.25rem' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem' }}>
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
                placeholder="Search guests by Name, Phone, Email, or City..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Guest Cards / Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Users size={18} color="#C6A15B" />
            Registered Guests ({guests.length})
          </div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          {guests.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
              No guest records found matching the query.
            </div>
          ) : (
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Guest Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>City / Location</th>
                    <th>ID Document</th>
                    <th>Recorded Stays</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.map((g) => (
                    <tr key={g.id}>
                      <td style={{ fontWeight: 600, color: '#101C35' }}>{g.name}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Phone size={14} color="#64748B" />
                          <span>{g.phone}</span>
                        </div>
                      </td>
                      <td>
                        {g.email ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Mail size={14} color="#64748B" />
                            <span>{g.email}</span>
                          </div>
                        ) : (
                          <span style={{ color: '#94A3B8' }}>—</span>
                        )}
                      </td>
                      <td>{g.city || '—'}</td>
                      <td>
                        {g.id_proof_type ? (
                          <span style={{ fontSize: '0.8rem', color: '#475569' }}>
                            {g.id_proof_type} ({g.id_proof_number || 'On File'})
                          </span>
                        ) : (
                          <span style={{ color: '#94A3B8' }}>Not provided</span>
                        )}
                      </td>
                      <td>
                        <span className="badge badge-confirmed">
                          {g.bookings_count ?? 1} Reservation(s)
                        </span>
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
  );
};

export default GuestDirectory;
