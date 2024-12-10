import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Markdown from 'markdown-to-jsx'
import { getCourse } from '../lib/api/courses'
import { Button } from '../components/ui/button'
import { ChevronRight, ChevronDown, Play, CheckCircle } from 'lucide-react'

export default function CourseView() {
  const { courseId } = useParams()
  const [selectedModuleId, setSelectedModuleId] = React.useState<string | null>(null)
  const [selectedLesson, setSelectedLesson] = React.useState<any>(null)

  const { data: course, isLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => getCourse(courseId!),
    enabled: !!courseId,
  })

  if (isLoading || !course) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground">Carregando curso...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
      {/* Sidebar com módulos e lições */}
      <aside className="bg-card rounded-lg p-4 h-[calc(100vh-8rem)] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Conteúdo do Curso</h2>
        <div className="space-y-2">
          {course.modules.map((module) => (
            <div key={module.id} className="space-y-2">
              <button
                className="flex items-center justify-between w-full p-2 text-left hover:bg-accent rounded-md transition-colors"
                onClick={() => setSelectedModuleId(
                  selectedModuleId === module.id ? null : module.id
                )}
              >
                <span className="font-medium">{module.title}</span>
                {selectedModuleId === module.id ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {selectedModuleId === module.id && (
                <div className="ml-4 space-y-1">
                  {module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      className={`flex items-center w-full p-2 text-left text-sm hover:bg-accent rounded-md transition-colors ${
                        selectedLesson?.id === lesson.id ? 'bg-accent' : ''
                      }`}
                      onClick={() => setSelectedLesson(lesson)}
                    >
                      {lesson.videoUrl ? (
                        <Play className="h-4 w-4 mr-2 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                      )}
                      <span className="truncate">{lesson.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Área principal com vídeo e conteúdo */}
      <main className="space-y-6">
        {selectedLesson ? (
          <>
            {selectedLesson.videoUrl && (
              <div className="aspect-video rounded-lg overflow-hidden bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedLesson.videoUrl}`}
                  title={selectedLesson.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h1 className="text-3xl font-bold">{selectedLesson.title}</h1>
              <Markdown>{selectedLesson.content}</Markdown>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
            <p className="text-muted-foreground mb-8">{course.description}</p>
            <Button
              onClick={() => {
                const firstModule = course.modules[0]
                if (firstModule) {
                  setSelectedModuleId(firstModule.id)
                  setSelectedLesson(firstModule.lessons[0])
                }
              }}
            >
              Começar o Curso
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}