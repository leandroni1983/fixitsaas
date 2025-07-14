import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambia por la URL de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token JWT a las peticiones
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

export const registerUser = (data: {
  email: string;
  password: string;
  name: string;
  role: 'ADMIN' | 'TECHNICIAN';
  companyId: number;
}) => api.post('/auth/register', data);

export const loginUser = (data: { email: string; password: string }) =>
  api.post('/auth/login', data);

export const getOrders = () => api.get('/orders');

export default api;