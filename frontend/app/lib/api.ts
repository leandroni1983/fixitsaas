import axios from 'axios';
import { LoginUserData, RegisterAdminData, RegisterUserData } from '../types';


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para manejar errores (por ejemplo, 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);
// Funciones para interactuar con la API
export const registerUser = (data: RegisterUserData) => api.post('/users', data);
export const registerAdmin = (data: RegisterAdminData) => api.post('/users/register-admin', data);
export const loginUser = (data:LoginUserData) => api.post('/auth/login', data);
export const getOrders = () => api.get('/orders');

export default api;