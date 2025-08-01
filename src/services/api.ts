import axios, { AxiosError } from 'axios'
import { getAuthState, useAuthStore } from '../store/authSlice'

// Create axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://my-shop-backend-g2k6.onrender.com/api',
  withCredentials: false, // Changed to false since we're using JWT in headers, not cookies
  timeout: 10000,
})

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const { token } = getAuthState()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // If we get a 401, logout the user
    if (error.response?.status === 401) {
      const { logout } = useAuthStore.getState()
      logout()
      // Optionally redirect to login page
      window.location.href = '/login'
    }
    
    return Promise.reject(error)
  }
)

// Auth API endpoints
export const authApi = {
  login: async (identifier: string, password: string) => {
    const response = await api.post('/auth/local', {
      identifier,
      password,
    })
    return response.data
  },
  
  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/local/register', {
      username,
      email,
      password,
    })
    return response.data
  },
}

export default api