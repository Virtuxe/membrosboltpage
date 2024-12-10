import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Play } from 'lucide-react'
import { Button } from '../ui/button'
import type { Course } from '../../types/course'

interface CourseCardProps {
  course: Course
  onClick?: () => void
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(`/courses/${course.id}`)
    }
  }

  return (
    <div 
      className="group relative cursor-pointer"
      onClick={handleClick}
    >
      <div className="aspect-video w-full overflow-hidden rounded-md">
        <img
          src={course.thumbnail || 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&auto=format&fit=crop'}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold text-white">{course.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-gray-200">
            {course.description}
          </p>
          <Button
            className="mt-4 bg-primary hover:bg-primary/90"
            onClick={(e) => {
              e.stopPropagation()
              handleClick()
            }}
          >
            <Play className="mr-2 h-4 w-4" />
            Começar Agora
          </Button>
        </div>
      </div>
    </div>
  )
}