import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Book, LogOut, User } from 'lucide-react'
import { useAuthStore } from '../../stores/auth'
import { ThemeToggle } from './theme-toggle'
import { Button } from '../ui/button'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-4">
            <Book className="h-6 w-6" />
            <button
              onClick={() => navigate('/')}
              className="text-lg font-semibold"
            >
              Creator Academy
            </button>
          </div>
          <nav className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="flex items-center space-x-2">
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
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>
      <main className="container py-6">{children}</main>
    </div>
  )
}