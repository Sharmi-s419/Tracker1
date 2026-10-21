import React, { useState, useEffect } from 'react';
import { BedDouble, Edit3, CheckCircle, AlertTriangle, RefreshCw, Sparkles, SlidersHorizontal } from 'lucide-react';
import { roomsApi } from '../api/client';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

export const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingRoom, setEditingRoom] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [saving, setSaving] = useState(false);

  const loadRooms = async () => {
    setLoading(true);
    setError('');
    try {
      const params = statusFilter !== 'all' ? { status: statusFilter } : {};
      const res = await roomsApi.getAll(params);
      setRooms(res.data.results || res.data || []);
    } catch (err) {
      setError('Failed to fetch rooms from backend API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, [statusFilter]);

  const handleQuickStatusChange = async (roomId, newStatus) => {
    try {
      await roomsApi.updateStatus(roomId, newStatus);
      loadRooms();
    } catch (err) {
      alert('Failed to update room status: ' + (err.response?.data?.error || err.message));
    }
  };

  const openEditModal = (room) => {
    setEditingRoom(room);
    setEditFormData({
      room_number: room.room_number,
      room_type: room.room_type,
      bed_type: room.bed_type || 'Double Bed',
      floor: room.floor,
      capacity: room.capacity,
      base_price_per_night: room.base_price_per_night,
      status: room.status,
      amenities: room.amenities || '',
      description: room.description || '',
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await roomsApi.update(editingRoom.id, editFormData);
      setEditingRoom(null);
      loadRooms();
    } catch (err) {
      alert('Failed to save room details: ' + (JSON.stringify(err.response?.data) || err.message));
    } finally {
      setSaving(false);
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
            Room Inventory Management
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Maintain the hotel's 14 physical rooms, configure tariffs, room categories, and housekeeping states.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <select
            className="form-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: 'auto', minWidth: '150px' }}
          >
            <option value="all">All Rooms ({rooms.length})</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="cleaning">Cleaning / Turnover</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <button className="btn btn-outline" onClick={loadRooms} title="Refresh">
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* 14 Rooms Inventory Grid */}
      <div className="room-grid">
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <div className="room-card-top">
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 600 }}>
                  {room.floor || 'Floor'}
                </span>
                <div className="room-card-number">Room {room.room_number}</div>
                <div className="room-card-type">{room.room_type}</div>
              </div>
              <StatusBadge status={room.status} />
            </div>

            <div className="room-card-meta">
              <span>{room.bed_type || 'Double Bed'}</span>
              <span>•</span>
              <span>Capacity: {room.capacity} Guests</span>
              <span>•</span>
              <span className="room-card-tariff">
                ₹{Number(room.base_price_per_night || 0).toLocaleString()} <span>/ night</span>
              </span>
            </div>

            {room.amenities && (
              <p style={{ fontSize: '0.75rem', color: '#B45309', background: '#FEF3C7', padding: '0.2rem 0.5rem', borderRadius: '4px', margin: '0.4rem 0' }}>
                {room.amenities}
              </p>
            )}

            {room.description && (
              <p style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: 1.4 }}>
                {room.description}
              </p>
            )}

            <div
              style={{
                marginTop: 'auto',
                paddingTop: '0.75rem',
                borderTop: '1px solid #F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {room.status === 'cleaning' && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleQuickStatusChange(room.id, 'available')}
                    title="Mark room cleaned and ready"
                  >
                    <CheckCircle size={14} /> Ready
                  </button>
                )}
                {room.status === 'available' && (
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => handleQuickStatusChange(room.id, 'cleaning')}
                    title="Mark room for turnover"
                  >
                    <Sparkles size={14} /> Turn
                  </button>
                )}
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() =>
                    handleQuickStatusChange(
                      room.id,
                      room.status === 'maintenance' ? 'available' : 'maintenance'
                    )
                  }
                  title="Toggle maintenance"
                >
                  <AlertTriangle size={14} />
                  {room.status === 'maintenance' ? 'Restore' : 'Maint'}
                </button>
              </div>

              <button className="btn btn-outline btn-sm" onClick={() => openEditModal(room)}>
                <Edit3 size={14} /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Room Modal */}
      {editingRoom && (
        <Modal
          isOpen={true}
          onClose={() => setEditingRoom(null)}
          title={`Configure Room ${editingRoom.room_number}`}
          footer={
            <>
              <button className="btn btn-outline" onClick={() => setEditingRoom(null)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleEditSubmit} disabled={saving}>
                {saving ? 'Saving...' : 'Save Room Details'}
              </button>
            </>
          }
        >
          <form onSubmit={handleEditSubmit}>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Room Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={editFormData.room_number}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, room_number: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Room Type / Category</label>
                <input
                  type="text"
                  className="form-control"
                  value={editFormData.room_type}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, room_type: e.target.value })
                  }
                  placeholder="e.g. Deluxe AC King, Executive Double"
                  required
                />
              </div>
            </div>

            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label">Floor</label>
                <input
                  type="text"
                  className="form-control"
                  value={editFormData.floor}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, floor: e.target.value })
                  }
                  placeholder="Ground / 1st Floor"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Max Capacity</label>
                <input
                  type="number"
                  className="form-control"
                  value={editFormData.capacity}
                  min="1"
                  max="10"
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, capacity: parseInt(e.target.value, 10) })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tariff (₹ / Night)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={editFormData.base_price_per_night}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, base_price_per_night: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Bed Configuration</label>
                <input
                  type="text"
                  className="form-control"
                  value={editFormData.bed_type}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, bed_type: e.target.value })
                  }
                  placeholder="e.g. Teakwood King Bed, Double Bed"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Operational Room Status</label>
                <select
                  className="form-control"
                  value={editFormData.status}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, status: e.target.value })
                  }
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="cleaning">Cleaning / Turnover</option>
                  <option value="maintenance">Under Maintenance</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Verified Amenities</label>
              <input
                type="text"
                className="form-control"
                value={editFormData.amenities}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, amenities: e.target.value })
                }
                placeholder="e.g. Split Air Conditioning, Smart TV, En-suite Bathroom, WiFi"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Room Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={editFormData.description}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, description: e.target.value })
                }
                placeholder="Specific room details, view, floor location..."
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default RoomManagement;
