// Unique room display names and floor structure for Hotel Lara International, Suchindram
export const ROOM_NAMES = {
  '001': 'Standard Double Room',
  '002': 'Standard Double Room',
  '101': 'Twin Room',
  '102': 'Standard Double Room',
  '103': 'Standard Double Room',
  '104': 'Standard Double Room',
  '105': 'Standard Double Room',
  '106': 'Standard Double Room',
  '201': 'Twin Room',
  '202': 'Standard Double Room',
  '203': 'Standard Double Room',
  '204': 'Standard Double Room',
  '205': 'Standard Double Room',
  '206': 'Standard Double Room',
};

export const FLOORS_CONFIG = [
  {
    key: 'ground',
    name: 'Ground Floor',
    title: 'Ground Floor — 2 Rooms',
    subtitle: 'Convenient ground-level access, ideal for seniors and immediate mobility',
    badge: 'Ground Floor',
    roomNumbers: ['001', '002'],
  },
  {
    key: 'first',
    name: 'First Floor',
    title: 'First Floor — 6 Rooms',
    subtitle: 'Quiet elevated rooms overlooking temple corridor approaches',
    badge: 'First Floor',
    roomNumbers: ['101', '102', '103', '104', '105', '106'],
  },
  {
    key: 'second',
    name: 'Second Floor',
    title: 'Second Floor — 6 Rooms',
    subtitle: 'Top-tier peaceful rooms with panoramic views of Suchindram',
    badge: 'Second Floor',
    roomNumbers: ['201', '202', '203', '204', '205', '206'],
  },
];

/**
 * Normalizes and preserves leading zeros in room numbers (e.g. '001', '002').
 */
export const formatRoomNumber = (roomOrNumber) => {
  if (roomOrNumber === null || roomOrNumber === undefined) return '';
  const num = typeof roomOrNumber === 'object' ? roomOrNumber.room_number : roomOrNumber;
  const str = String(num).trim();
  if (str === '1' || str === '01' || str === '001') return '001';
  if (str === '2' || str === '02' || str === '002') return '002';
  return str;
};

/**
 * Categorizes a room into 'ground', 'first', or 'second' floor.
 */
export const getNormalizedFloor = (room) => {
  if (!room) return 'first';
  const num = formatRoomNumber(room);
  const fl = String(room.floor || '').toLowerCase();
  if (num === '001' || num === '002' || num.startsWith('0') || fl.includes('ground')) return 'ground';
  if (num.startsWith('2') || fl.includes('second') || fl.includes('2nd')) return 'second';
  return 'first';
};

/**
 * Returns the unique display name for a given room object, room ID, or room number.
 * Ensures consistent naming (e.g. "Standard Double Room", "Twin Room").
 *
 * @param {Object|string|number} room
 * @returns {string} The unique display name
 */
export const getRoomDisplayName = (room) => {
  if (!room) return '';
  const num = formatRoomNumber(room);
  if (typeof room === 'string' || typeof room === 'number') {
    return ROOM_NAMES[num] || `Room ${num}`;
  }
  return (
    room.name ||
    room.display_name ||
    room.room_name ||
    ROOM_NAMES[num] ||
    `Room ${num || ''}`
  );
};

/**
 * Resolves the photo URL for a room.
 * Prioritizes backend room.photo_url or room.image, with fallback to exact room photo.
 */
export const resolveRoomPhotoUrl = (room) => {
  if (!room) return null;

  const rawUrl = room.photo_url || (typeof room.image === 'string' ? room.image : null) || room.image_url;
  if (rawUrl && typeof rawUrl === 'string' && rawUrl.trim()) {
    const trimmed = rawUrl.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
    const backendOrigin = apiBase.replace(/\/api\/?$/, '');
    if (cleanPath.startsWith('/media/')) {
      return `${backendOrigin}${cleanPath}`;
    }
    if (cleanPath.startsWith('/images/')) {
      return cleanPath;
    }
    return `${backendOrigin}/media/${trimmed.replace(/^room_photos\//, 'room_photos/')}`;
  }

  // Fallback to static bundled photos matching exact room number
  const num = formatRoomNumber(room);
  const bundled = {
    '001': '/images/rooms/001.jpg',
    '002': '/images/rooms/002.jpg',
    '101': '/images/rooms/101.png',
    '102': '/images/rooms/102.jpg',
    '103': '/images/rooms/103.jpg',
    '104': '/images/rooms/104.jpg',
  };
  if (num && bundled[num]) {
    return bundled[num];
  }

  return null;
};

