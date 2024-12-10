import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { Toaster } from './components/ui/toaster'
import Layout from './components/layout/layout'
import ProtectedRoute from './components/auth/protected-route'
import AuthPage from './pages/auth'
import HomePage from './pages/home'
import CourseCatalog from './pages/course-catalog'
import CourseView from './pages/course-view'
import CreatorDashboard from './pages/creator/dashboard'
import CourseEditor from './pages/creator/course-editor'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" enableSystem>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/courses"
                element={
                  <ProtectedRoute>
                    <CourseCatalog />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/courses/:courseId"
                element={
                  <ProtectedRoute>
                    <CourseView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/creator"
                element={
                  <ProtectedRoute allowedRoles={['CREATOR', 'ADMIN']}>
                    <CreatorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/creator/courses/:courseId"
                element={
                  <ProtectedRoute allowedRoles={['CREATOR', 'ADMIN']}>
                    <CourseEditor />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App