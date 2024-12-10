import React from 'react'
import { CourseCard } from './course-card'
import type { Course } from '../../types/course'

interface CourseGridProps {
  title: string
  courses: Course[]
}

export function CourseGrid({ title, courses }: CourseGridProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}