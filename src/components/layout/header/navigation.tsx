import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, User } from 'lucide-react'
import { Button } from '../../ui/button'
import { useAuthStore } from '../../../stores/auth'

export function Navigation() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  return (
    <nav className="flex items-center space-x-2">
      {user ? (
        <>
          {(user.role === 'CREATOR' || user.role === 'ADMIN') && (
            <Button
              variant="ghost"
              onClick={() => navigate('/creator')}
            >
              Creator Dashboard
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={() => navigate('/courses')}
          >
            My Courses
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </>
      ) : (
        <Button onClick={() => navigate('/auth')}>
          <User className="mr-2 h-4 w-4" />
          Sign In
        </Button>
      )}
    </nav>
  )
}