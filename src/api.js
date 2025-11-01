// frontend/src/api.js
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export function setAuthToken(token) {
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete axios.defaults.headers.common['Authorization'];
}

export const api = {
  signup: (data) => axios.post(`${API_BASE}/auth/signup`, data),
  login: (data) => axios.post(`${API_BASE}/auth/login`, data),
  getMovies: () => axios.get(`${API_BASE}/movies`),
  getSeats: (showId) => axios.get(`${API_BASE}/movies/shows/${showId}/seats`),
  createOrder: (data) => axios.post(`${API_BASE}/payments/create-order`, data),
  createBooking: (data) => axios.post(`${API_BASE}/bookings`, data),
  getBookings: () => axios.get(`${API_BASE}/bookings`)
};
