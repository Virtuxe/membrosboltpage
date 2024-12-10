export interface Course {
  id: string
  title: string
  description: string
  thumbnail?: string
  creatorId: string
  createdAt: string
  updatedAt: string
  enrolled?: boolean
  modules: Module[]
}

export interface Module {
  id: string
  title: string
  order: number
  courseId: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  description: string
  content: string
  videoUrl?: string
  order: number
  moduleId: string
}