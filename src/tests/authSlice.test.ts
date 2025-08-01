import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore, getAuthState } from '../store/authSlice'

describe('Auth Store', () => {
  beforeEach(() => {
    // Reset store before each test
    useAuthStore.getState().logout()
  })

  it('should initialize with no authentication', () => {
    const state = getAuthState()
    expect(state.isAuthenticated).toBe(false)
    expect(state.token).toBe(null)
    expect(state.user).toBe(null)
  })

  it('should login successfully', () => {
    const mockUser = {
      id: '1',
      username: 'testuser',
      email: 'test@example.com'
    }
    const mockToken = 'jwt-token-123'

    useAuthStore.getState().login(mockToken, mockUser)
    
    const state = getAuthState()
    expect(state.isAuthenticated).toBe(true)
    expect(state.token).toBe(mockToken)
    expect(state.user).toEqual(mockUser)
  })

  it('should logout successfully', () => {
    const mockUser = {
      id: '1',
      username: 'testuser',
      email: 'test@example.com'
    }
    const mockToken = 'jwt-token-123'

    // First login
    useAuthStore.getState().login(mockToken, mockUser)
    expect(getAuthState().isAuthenticated).toBe(true)

    // Then logout
    useAuthStore.getState().logout()
    
    const state = getAuthState()
    expect(state.isAuthenticated).toBe(false)
    expect(state.token).toBe(null)
    expect(state.user).toBe(null)
  })

  it('should update user information', () => {
    const mockUser = {
      id: '1',
      username: 'testuser',
      email: 'test@example.com'
    }
    const updatedUser = {
      id: '1',
      username: 'updateduser',
      email: 'updated@example.com'
    }

    // Login first
    useAuthStore.getState().login('token', mockUser)
    
    // Update user
    useAuthStore.getState().updateUser(updatedUser)
    
    const state = getAuthState()
    expect(state.user).toEqual(updatedUser)
    expect(state.isAuthenticated).toBe(true) // Should remain authenticated
  })
})