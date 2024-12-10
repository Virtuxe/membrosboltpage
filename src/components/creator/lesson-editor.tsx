import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Grip, Plus, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

interface LessonEditorProps {
  moduleIndex: number
}

export function LessonEditor({ moduleIndex }: LessonEditorProps) {
  const { control, register } = useFormContext()
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.lessons`,
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Aulas</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              title: '',
              description: '',
              content: '',
              videoUrl: '',
            })
          }
        >
          <Plus className="mr-2 h-3 w-3" />
          Adicionar Aula
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded border bg-background p-4"
          >
            <div className="mb-4 flex items-center gap-2">
              <button
                type="button"
                className="cursor-move text-muted-foreground hover:text-foreground"
              >
                <Grip className="h-4 w-4" />
              </button>
              <Input
                {...register(
                  `modules.${moduleIndex}.lessons.${index}.title`
                )}
                placeholder="Título da Aula"
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Input
                  {...register(
                    `modules.${moduleIndex}.lessons.${index}.videoUrl`
                  )}
                  placeholder="URL do Vídeo (YouTube)"
                  className="mb-2"
                />
              </div>

              <div>
                <Textarea
                  {...register(
                    `modules.${moduleIndex}.lessons.${index}.description`
                  )}
                  placeholder="Descrição da Aula"
                  className="mb-2"
                />
              </div>

              <div>
                <Textarea
                  {...register(
                    `modules.${moduleIndex}.lessons.${index}.content`
                  )}
                  placeholder="Conteúdo da Aula (Markdown)"
                  className="min-h-[200px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}