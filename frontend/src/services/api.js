import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API calls
export const getUsers = () => api.get('/users');
export const addUser = (name) => api.post('/users', { name });
export const getLeaderboard = () => api.get('/users/leaderboard');

// Claims API calls
export const claimPoints = (userId) => api.post('/claims', { userId });
export const getClaimHistory = () => api.get('/claims/history');
export const getUserClaimHistory = (userId) => api.get(`/claims/history/${userId}`);

export default api;
