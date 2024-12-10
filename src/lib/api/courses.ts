import api from '../api'
import type { Course } from '../../types/course'

export async function getCourses(): Promise<Course[]> {
  const response = await api.get('/courses')
  return response.data
}

export async function getCourse(id: string): Promise<Course> {
  const response = await api.get(`/courses/${id}`)
  return response.data
}

export async function createCourse(data: Partial<Course>): Promise<Course> {
  const response = await api.post('/courses', data)
  return response.data
}

export async function updateCourse(id: string, data: Partial<Course>): Promise<Course> {
  const response = await api.put(`/courses/${id}`, data)
  return response.data
}

export async function deleteCourse(id: string): Promise<void> {
  await api.delete(`/courses/${id}`)
}