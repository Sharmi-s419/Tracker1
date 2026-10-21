/**
 * Utility to generate navigation URLs for the guest booking dashboard.
 * Reads VITE_BOOKING_APP_URL from environment with safe development fallback
 * and explicit configuration error logging in production.
 */
export const getBookingAppUrl = (params = {}) => {
  const envUrl = import.meta.env.VITE_BOOKING_APP_URL;
  let baseUrl = envUrl;

  if (!baseUrl || !baseUrl.trim()) {
    if (import.meta.env.DEV) {
      baseUrl = 'http://localhost:3001';
      console.warn(
        '[Config Warning] VITE_BOOKING_APP_URL is not configured. Falling back to local development URL: http://localhost:3001'
      );
    } else {
      console.error(
        '[Configuration Error] VITE_BOOKING_APP_URL is not defined in production environment variables! ' +
        'Please add VITE_BOOKING_APP_URL with your deployed Vercel booking dashboard URL in Vercel Project Settings.'
      );
      // Fallback safely to root origin to prevent navigation to "undefined"
      baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    }
  }

  // Remove any trailing slashes for clean query string appending
  baseUrl = baseUrl.trim().replace(/\/+$/, '');

  const query = new URLSearchParams();
  if (params.category) query.set('category', params.category);
  if (params.room) query.set('room', params.room);
  if (params.checkIn || params.check_in) query.set('check_in', params.checkIn || params.check_in);
  if (params.checkOut || params.check_out) query.set('check_out', params.checkOut || params.check_out);
  if (params.guests) query.set('guests', params.guests);

  const queryString = query.toString();
  return queryString ? `${baseUrl}/?${queryString}` : `${baseUrl}/`;
};
