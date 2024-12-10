import { AuthUser } from '../../types/auth'

export function isCreatorOrAdmin(user: AuthUser | null): boolean {
  return user?.role === 'CREATOR' || user?.role === 'ADMIN'
}

export function getAuthToken(): string | null {
  return localStorage.getItem('auth-storage')
}

export function clearAuthToken(): void {
  localStorage.removeItem('auth-storage')
}