import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { BedDouble, Edit3, CheckCircle, AlertTriangle, RefreshCw, Sparkles, SlidersHorizontal, Upload, Image as ImageIcon } from 'lucide-react';
import { roomsApi } from '../api/client';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { getRoomDisplayName, formatRoomNumber, getNormalizedFloor, FLOORS_CONFIG, resolveRoomPhotoUrl } from '../constants/roomNames';
=======
import { BedDouble, Edit3, CheckCircle, AlertTriangle, RefreshCw, Sparkles, SlidersHorizontal } from 'lucide-react';
import { roomsApi } from '../api/client';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1

export const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingRoom, setEditingRoom] = useState(null);
  const [editFormData, setEditFormData] = useState({});
<<<<<<< HEAD
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoError, setPhotoError] = useState('');
=======
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
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
<<<<<<< HEAD
    setPhotoFile(null);
    setPhotoPreview(resolveRoomPhotoUrl(room));
    setPhotoError('');
    setEditFormData({
      room_number: formatRoomNumber(room.room_number),
      name: room.name || getRoomDisplayName(room),
=======
    setEditFormData({
      room_number: room.room_number,
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
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

<<<<<<< HEAD
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setPhotoError('Please select a valid image file (JPEG, PNG, WEBP).');
      return;
    }
    setPhotoError('');
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

=======
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
<<<<<<< HEAD
      const formData = new FormData();
      Object.keys(editFormData).forEach((key) => {
        if (editFormData[key] !== null && editFormData[key] !== undefined) {
          formData.append(key, editFormData[key]);
        }
      });
      if (photoFile) {
        formData.append('image', photoFile);
      }
      await roomsApi.update(editingRoom.id, formData);
      setEditingRoom(null);
      setPhotoFile(null);
      setPhotoPreview(null);
=======
      await roomsApi.update(editingRoom.id, editFormData);
      setEditingRoom(null);
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
      loadRooms();
    } catch (err) {
      alert('Failed to save room details: ' + (JSON.stringify(err.response?.data) || err.message));
    } finally {
      setSaving(false);
    }
  };

<<<<<<< HEAD

=======
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
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

<<<<<<< HEAD
      {/* 14 Rooms Inventory Grouped by Floor */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {FLOORS_CONFIG.map((floor) => {
          const floorRooms = rooms.filter((r) => getNormalizedFloor(r) === floor.key);
          if (floorRooms.length === 0) return null;

          return (
            <div key={floor.key}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '2px solid #E2E8F0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span
                    style={{
                      backgroundColor: '#101C35',
                      color: '#C49A45',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {floor.badge}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#101C35', margin: 0 }}>
                    {floor.title}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    {floor.subtitle}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#64748B',
                    backgroundColor: '#F1F5F9',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px',
                  }}
                >
                  {floorRooms.length} {floorRooms.length === 1 ? 'Room' : 'Rooms'}
                </span>
              </div>

              <div className="room-grid">
                {floorRooms.map((room) => {
                  const photoUrl = resolveRoomPhotoUrl(room);
                  const formattedNum = formatRoomNumber(room.room_number);
                  const displayName = getRoomDisplayName(room);

                  return (
                    <div key={room.id} className="room-card">
                      {/* Room Photo Header */}
                      <div className="room-card-photo-header">
                        {photoUrl ? (
                          <img
                            src={photoUrl}
                            alt={`Room ${formattedNum} - ${displayName}`}
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          style={{
                            display: photoUrl ? 'none' : 'flex',
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            gap: '0.4rem',
                            color: '#94A3B8',
                            fontSize: '0.78rem',
                            backgroundColor: '#1E293B',
                            padding: '1rem',
                            textAlign: 'center',
                          }}
                        >
                          <BedDouble size={26} color="#C49A45" />
                          <span style={{ fontWeight: 600 }}>No Photo Uploaded</span>
                          <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
                            Click Edit to assign Room {formattedNum} photo
                          </span>
                        </div>
                        <div className="room-card-photo-badge">
                          Room {formattedNum}
                        </div>
                      </div>

                      <div className="room-card-content">
                        <div className="room-card-top">
                          <div>
                            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 600 }}>
                              {floor.title}
                            </span>
                            <div className="room-card-number">Room {formattedNum}</div>
                            <div className="room-card-name" style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: '1.15rem', fontWeight: 700, color: '#17243D', margin: '0.15rem 0' }}>
                              {displayName}
                            </div>
                            <div className="room-card-type" style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 500 }}>
                              {room.room_type}
                            </div>
                          </div>
                          <StatusBadge status={room.status} />
                        </div>

                        <div className="room-card-meta">
                          <span>{room.bed_type || (formattedNum === '101' || formattedNum === '201' ? 'Twin Beds' : 'Double Bed')}</span>
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
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
=======
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
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
      </div>

      {/* Edit Room Modal */}
      {editingRoom && (
        <Modal
          isOpen={true}
          onClose={() => setEditingRoom(null)}
<<<<<<< HEAD
          title={`Configure Room ${formatRoomNumber(editingRoom.room_number)}`}
=======
          title={`Configure Room ${editingRoom.room_number}`}
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
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
<<<<<<< HEAD
            {/* Room Photo Upload Section */}
            <div style={{ marginBottom: '1.25rem', backgroundColor: '#FAF7F1', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <label className="form-label" style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
                <ImageIcon size={16} color="#C49A45" />
                Verified Room Photograph (Room {formatRoomNumber(editingRoom.room_number)})
              </label>
              
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ width: '150px', height: '110px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#0F172A', border: '2px solid #C49A45', flexShrink: 0, position: 'relative' }}>
                  {photoPreview ? (
                    <img src={photoPreview} alt="Room Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.25rem', color: '#94A3B8', fontSize: '0.72rem', textAlign: 'center', padding: '0.5rem' }}>
                      <BedDouble size={20} color="#C49A45" />
                      <span>No Photo</span>
                    </div>
                  )}
                </div>

                <div style={{ flex: 1, minWidth: '220px' }}>
                  <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <Upload size={14} color="#C49A45" />
                    {photoPreview ? 'Upload New Photo' : 'Choose Room Photo'}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handlePhotoChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {photoFile && (
                    <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600, marginTop: '0.2rem' }}>
                      ✓ Selected: {photoFile.name} ({(photoFile.size / 1024).toFixed(1)} KB)
                    </div>
                  )}
                  {photoError && (
                    <div style={{ fontSize: '0.78rem', color: '#DC2626', marginTop: '0.2rem' }}>
                      {photoError}
                    </div>
                  )}
                  <p style={{ fontSize: '0.73rem', color: '#64748B', margin: '0.25rem 0 0', lineHeight: 1.4 }}>
                    Uploaded photo will be exclusively assigned to Room {formatRoomNumber(editingRoom.room_number)} ({getRoomDisplayName(editingRoom)}).
                  </p>
                </div>
              </div>
            </div>

            <div className="form-grid-3">
=======
            <div className="form-grid-2">
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
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
<<<<<<< HEAD
                <label className="form-label">Display Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editFormData.name || ''}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                  placeholder="e.g. Lara Pearl"
                  required
                />
              </div>

              <div className="form-group">
=======
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
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
