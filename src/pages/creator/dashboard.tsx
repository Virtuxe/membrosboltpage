import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { getCourses } from '../../lib/api/courses'
import { CourseCard } from '../../components/courses/course-card'

export default function CreatorDashboard() {
  const navigate = useNavigate()
  const { data: courses, isLoading } = useQuery({
    queryKey: ['creator-courses'],
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Painel do Criador</h1>
        <Button onClick={() => navigate('/creator/courses/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Curso
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onClick={() => navigate(`/creator/courses/${course.id}`)}
          />
        ))}
      </div>

      {courses?.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Nenhum curso criado</h2>
          <p className="text-muted-foreground mb-6">
            Comece criando seu primeiro curso para compartilhar seu conhecimento.
          </p>
          <Button onClick={() => navigate('/creator/courses/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Criar Primeiro Curso
          </Button>
        </div>
      )}
    </div>
  )
}