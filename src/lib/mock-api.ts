import { mockCourses, mockUsers } from './mock-data'
import type { Course } from '../types/course'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mockApi = {
  auth: {
    login: async (email: string, password: string) => {
      await delay(500)
      
      const users = {
        creator: {
          email: 'creator@test.com',
          password: 'creator123',
          data: mockUsers.creator
        },
        student: {
          email: 'student@test.com',
          password: 'student123',
          data: mockUsers.student
        }
      }

      const user = Object.values(users).find(u => u.email === email && u.password === password)
      
      if (user) {
        return {
          user: user.data,
          token: `mock-token-${user.data.role.toLowerCase()}`
        }
      }
      
      throw new Error('Invalid credentials')
    },
    
    register: async (name: string, email: string, password: string) => {
      await delay(500)
      return {
        user: {
          id: 'new-user',
          email,
          name,
          role: 'STUDENT'
        },
        token: 'mock-token-new-user'
      }
    }
  },
  
  courses: {
    getAll: async () => {
      await delay(500)
      return mockCourses
    },
    
    getById: async (id: string) => {
      await delay(500)
      const course = mockCourses.find(c => c.id === id)
      if (!course) throw new Error('Course not found')
      return course
    },
    
    create: async (data: Partial<Course>) => {
      await delay(500)
      const newCourse = {
        id: `course-${Date.now()}`,
        creatorId: 'creator-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        modules: [],
        ...data
      }
      return newCourse
    },
    
    update: async (id: string, data: Partial<Course>) => {
      await delay(500)
      const course = mockCourses.find(c => c.id === id)
      if (!course) throw new Error('Course not found')
      return { ...course, ...data }
    }
  }
}