import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { CourseGrid } from '../components/courses/course-grid'
import { getCourses } from '../lib/api/courses'

export default function CourseCatalog() {
  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  })

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground">Carregando cursos...</p>
        </div>
      </div>
    )
  }

  const enrolledCourses = courses?.filter((course) => course.enrolled) || []
  const availableCourses = courses?.filter((course) => !course.enrolled) || []

  return (
    <div className="space-y-12 py-8">
      {enrolledCourses.length > 0 && (
        <CourseGrid title="Continue Aprendendo" courses={enrolledCourses} />
      )}
      <CourseGrid title="Cursos Disponíveis" courses={availableCourses} />
    </div>
  )
}