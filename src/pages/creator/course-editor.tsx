import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getCourse, updateCourse } from '../../lib/api/courses'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { useToast } from '../../hooks/use-toast'

const courseSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  thumbnail: z.string().url('URL inválida').optional(),
})

type CourseFormData = z.infer<typeof courseSchema>

export default function CourseEditor() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const { data: course, isLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => getCourse(courseId!),
    enabled: !!courseId,
  })

  const { register, handleSubmit, formState: { errors } } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: course?.title,
      description: course?.description,
      thumbnail: course?.thumbnail,
    },
  })

  const mutation = useMutation({
    mutationFn: (data: CourseFormData) => updateCourse(courseId!, data),
    onSuccess: () => {
      toast({
        title: 'Curso atualizado',
        description: 'As alterações foram salvas com sucesso.',
      })
      navigate('/creator')
    },
    onError: () => {
      toast({
        title: 'Erro ao atualizar',
        description: 'Não foi possível salvar as alterações.',
        variant: 'destructive',
      })
    },
  })

  if (isLoading) {
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
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Editar Curso</h1>
      
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <Input {...register('title')} />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <textarea
            {...register('description')}
            className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">URL da Thumbnail</label>
          <Input {...register('thumbnail')} />
          {errors.thumbnail && (
            <p className="text-sm text-red-500 mt-1">{errors.thumbnail.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/creator')}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </form>
    </div>
  )
}