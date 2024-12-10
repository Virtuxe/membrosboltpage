import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthUser } from '../types/auth'
import api from '../lib/api'

interface AuthState {
  user: AuthUser | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.auth.login(email, password)
          set({ 
            user: response.user, 
            token: response.token, 
            isLoading: false,
            error: null
          })
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Login failed'
          })
          throw error
        }
      },
      register: async (name, email, password) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.auth.register(name, email, password)
          set({ 
            user: response.user, 
            token: response.token, 
            isLoading: false,
            error: null
          })
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Registration failed'
          })
          throw error
        }
      },
      logout: () => {
        set({ user: null, token: null, error: null })
      },
      clearError: () => {
        set({ error: null })
      }
    }),
    {
      name: 'auth-storage',
    }
  )
)