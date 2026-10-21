import axios from 'axios';

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;
  if (!envUrl || !envUrl.trim()) {
    if (import.meta.env.DEV) {
      return 'http://localhost:8000/api';
    }
    console.error(
      '[Configuration Error] VITE_API_BASE_URL environment variable is missing in production! ' +
      'Please configure your Render backend URL (e.g. https://your-service.onrender.com/api) in Vercel Project Settings.'
    );
    return '/api';
  }

  let normalized = envUrl.trim().replace(/\/+$/, '');
  if (!normalized.endsWith('/api')) {
    normalized = `${normalized}/api`;
  }
  return normalized;
};

const API_BASE_URL = getApiBaseUrl();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests and inject JWT Bearer token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hli_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses for auth expiry
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token if expired or invalid
      if (window.location.pathname !== '/login') {
        localStorage.removeItem('hli_token');
        localStorage.removeItem('hli_user');
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (credentials) => apiClient.post('/auth/login/', credentials),
  getProfile: () => apiClient.get('/auth/me/'),
};

export const roomsApi = {
  getAll: (params) => apiClient.get('/rooms/', { params }),
  getAvailable: (checkIn, checkOut) =>
    apiClient.get('/rooms/available/', { params: { check_in: checkIn, check_out: checkOut } }),
<<<<<<< HEAD
  update: (id, data) => apiClient.patch(`/rooms/${id}/`, data),
=======
<<<<<<< HEAD
  update: (id, data) => {
    if (typeof FormData !== 'undefined' && data instanceof FormData) {
      return apiClient.patch(`/rooms/${id}/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    return apiClient.patch(`/rooms/${id}/`, data);
  },
=======
  update: (id, data) => apiClient.patch(`/rooms/${id}/`, data),
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f
  updateStatus: (id, status) => apiClient.patch(`/rooms/${id}/status/`, { status }),
};

export const bookingsApi = {
  getAll: (params) => apiClient.get('/bookings/', { params }),
  getById: (id) => apiClient.get(`/bookings/${id}/`),
  create: (data) => apiClient.post('/bookings/', data),
  update: (id, data) => apiClient.patch(`/bookings/${id}/`, data),
  checkIn: (id) => apiClient.post(`/bookings/${id}/check-in/`),
  checkOut: (id) => apiClient.post(`/bookings/${id}/check-out/`),
  cancel: (id, reason) => apiClient.post(`/bookings/${id}/cancel/`, { reason }),
};

export const guestsApi = {
  getAll: (params) => apiClient.get('/guests/', { params }),
  getById: (id) => apiClient.get(`/guests/${id}/`),
  update: (id, data) => apiClient.patch(`/guests/${id}/`, data),
};

export const dashboardApi = {
  getStats: () => apiClient.get('/dashboard/stats/'),
  getReports: () => apiClient.get('/dashboard/reports/'),
};

export default apiClient;
