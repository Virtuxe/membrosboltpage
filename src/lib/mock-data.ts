import type { Course, Module, Lesson } from '../types/course'

export const mockCourses: Course[] = [
  {
    id: 'marketing-digital',
    title: 'Marketing Digital Avançado',
    description: 'Aprenda estratégias avançadas de marketing digital para crescer seu negócio online',
    thumbnail: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&auto=format&fit=crop',
    creatorId: 'creator-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    modules: [
      {
        id: 'module-1',
        title: 'Fundamentos do Marketing Digital',
        order: 1,
        courseId: 'marketing-digital',
        lessons: [
          {
            id: 'lesson-1',
            title: 'Introdução ao Marketing Digital',
            description: 'Aprenda os conceitos básicos do marketing digital',
            content: `# Introdução ao Marketing Digital

## O que você vai aprender

- Fundamentos do marketing digital
- Principais canais e estratégias
- Como criar uma presença online efetiva

## Conceitos Básicos

O marketing digital é essencial para qualquer negócio moderno. Nesta aula, vamos explorar os fundamentos e como você pode começar.`,
            videoUrl: 'dQw4w9WgXcQ',
            order: 1,
            moduleId: 'module-1'
          }
        ]
      }
    ]
  },
  {
    id: 'programacao-web',
    title: 'Desenvolvimento Web Fullstack',
    description: 'Do zero ao profissional: aprenda a criar aplicações web completas',
    thumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&auto=format&fit=crop',
    creatorId: 'creator-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    modules: [
      {
        id: 'module-2',
        title: 'Fundamentos do HTML e CSS',
        order: 1,
        courseId: 'programacao-web',
        lessons: [
          {
            id: 'lesson-2',
            title: 'Estrutura básica do HTML',
            description: 'Aprenda a criar a estrutura básica de uma página web',
            content: `# HTML Básico

## O que você vai aprender

- Estrutura básica do HTML
- Tags principais
- Semântica HTML

## Começando com HTML

HTML é a linguagem fundamental da web. Vamos aprender como criar páginas bem estruturadas.`,
            videoUrl: 'dQw4w9WgXcQ',
            order: 1,
            moduleId: 'module-2'
          }
        ]
      }
    ]
  }
]

export const mockUsers = {
  creator: {
    id: 'creator-1',
    email: 'creator@test.com',
    name: 'Creator Test',
    role: 'CREATOR'
  },
  student: {
    id: 'student-1',
    email: 'student@test.com',
    name: 'Student Test',
    role: 'STUDENT'
  }
}