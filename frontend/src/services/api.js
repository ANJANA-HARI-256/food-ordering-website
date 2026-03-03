// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const getProfile = () => api.get('/auth/profile');

// Food APIs
export const getFoods = (params) => api.get('/foods', { params });
export const getFoodById = (id) => api.get(`/foods/${id}`);
export const createFood = (foodData) => api.post('/foods', foodData);
export const updateFood = (id, foodData) => api.put(`/foods/${id}`, foodData);
export const deleteFood = (id) => api.delete(`/foods/${id}`);

// Order APIs
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const getMyOrders = () => api.get('/orders/myorders');
export const getAllOrders = () => api.get('/admin/orders/all');
export const updateOrderStatus = (id, status) => api.put(`/admin/orders/${id}/status`, { status });
export const cancelOrder = (id) => api.put(`/admin/orders/${id}/cancel`);
// services/api.js - Add this function

// Update order status (admin only)

// ✅ Add this alias for backward compatibility
export const getOrders = getMyOrders;

export default api;