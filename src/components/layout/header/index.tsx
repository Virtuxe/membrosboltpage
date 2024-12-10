import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Book } from 'lucide-react'
import { Navigation } from './navigation'
import { ThemeToggle } from '../theme-toggle'

export function Header() {
  const navigate = useNavigate()

  return (
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
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Navigation />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}