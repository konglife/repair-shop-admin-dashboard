// Utility functions for authentication debugging
export const clearAuthData = () => {
  // Clear localStorage
  localStorage.removeItem('auth-storage')
  
  // Clear sessionStorage  
  sessionStorage.clear()
  
  console.log('Auth data cleared from storage')
}

export const getStoredAuthData = () => {
  const data = localStorage.getItem('auth-storage')
  if (data) {
    try {
      const parsed = JSON.parse(data)
      console.log('Stored auth data:', parsed)
      return parsed
    } catch (e) {
      console.error('Error parsing stored auth data:', e)
      return null
    }
  }
  console.log('No stored auth data found')
  return null
}

export const debugAuth = () => {
  console.log('=== Auth Debug Info ===')
  console.log('localStorage auth-storage:', localStorage.getItem('auth-storage'))
  console.log('sessionStorage keys:', Object.keys(sessionStorage))
  
  // Check if we can access Zustand store
  try {
    const { useAuthStore } = require('../store/authSlice')
    const state = useAuthStore.getState()
    console.log('Zustand auth state:', {
      isAuthenticated: state.isAuthenticated,
      hasToken: !!state.token,
      hasUser: !!state.user
    })
  } catch (e) {
    console.error('Error accessing Zustand store:', e)
  }
}