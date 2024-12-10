import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../lib/supabase'
import type { AuthUser } from '../types/auth'

interface AuthState {
  user: AuthUser | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
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
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })
          
          if (error) throw error

          if (data.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single()

            set({ 
              user: {
                id: data.user.id,
                email: data.user.email!,
                name: profile?.name || null,
                role: profile?.role || 'STUDENT'
              },
              token: data.session?.access_token || null,
              isLoading: false,
              error: null
            })
          }
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
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          })
          
          if (error) throw error

          if (data.user) {
            // Create profile
            const { error: profileError } = await supabase
              .from('profiles')
              .insert([
                {
                  id: data.user.id,
                  name,
                  role: 'STUDENT'
                }
              ])

            if (profileError) throw profileError

            set({ 
              user: {
                id: data.user.id,
                email: data.user.email!,
                name,
                role: 'STUDENT'
              },
              token: data.session?.access_token || null,
              isLoading: false,
              error: null
            })
          }
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Registration failed'
          })
          throw error
        }
      },
      logout: async () => {
        try {
          const { error } = await supabase.auth.signOut()
          if (error) throw error
          set({ user: null, token: null, error: null })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Logout failed'
          })
          throw error
        }
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