import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Grip, Plus, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { LessonEditor } from './lesson-editor'

export function ModuleEditor() {
  const { control, register } = useFormContext()
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'modules',
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Módulos</h3>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              title: '',
              lessons: [],
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Módulo
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-2">
              <button
                type="button"
                className="cursor-move text-muted-foreground hover:text-foreground"
                onMouseDown={(e) => {
                  e.preventDefault()
                  const target = e.target as HTMLElement
                  const container = target.closest('.module-container')
                  if (container) {
                    container.style.cursor = 'grabbing'
                  }
                }}
                onMouseUp={(e) => {
                  const target = e.target as HTMLElement
                  const container = target.closest('.module-container')
                  if (container) {
                    container.style.cursor = 'grab'
                  }
                }}
              >
                <Grip className="h-5 w-5" />
              </button>
              <Input
                {...register(`modules.${index}.title`)}
                placeholder="Título do Módulo"
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
            <LessonEditor moduleIndex={index} />
          </div>
        ))}
      </div>
    </div>
  )
}