import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  username: string
  email: string
}

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  login: (token: string, user: User) => void
  logout: () => void
  updateUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      
      login: (token: string, user: User) => {
        set({
          token,
          user,
          isAuthenticated: true,
        })
      },
      
      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        })
      },
      
      updateUser: (user: User) => {
        set({ user })
      },
    }),
    {
      name: 'auth-storage',
      // Only persist token and user, not the methods
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// Helper function to get auth state outside of React components
export const getAuthState = () => useAuthStore.getState()