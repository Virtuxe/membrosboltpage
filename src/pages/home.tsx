import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, BookOpen, Users } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useAuthStore } from '../stores/auth'

export default function HomePage() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <section className="flex flex-1 items-center justify-center py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Learn from the Best Digital Creators
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Access high-quality courses from top creators. Learn at your own pace and take your skills to the next level.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  onClick={() => navigate(user ? '/courses' : '/auth')}
                >
                  Get Started
                </Button>
                {!user && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate('/auth')}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
            <div className="mx-auto grid max-w-sm gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-1">
              <div className="flex items-start gap-4 rounded-lg border p-4 dark:border-gray-800">
                <GraduationCap className="mt-1 h-6 w-6" />
                <div className="space-y-1">
                  <h3 className="font-semibold">Expert-Led Courses</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Learn from industry experts and experienced creators.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border p-4 dark:border-gray-800">
                <BookOpen className="mt-1 h-6 w-6" />
                <div className="space-y-1">
                  <h3 className="font-semibold">Comprehensive Content</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Access detailed video lessons and written materials.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border p-4 dark:border-gray-800">
                <Users className="mt-1 h-6 w-6" />
                <div className="space-y-1">
                  <h3 className="font-semibold">Community Learning</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Connect with other learners and share experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}