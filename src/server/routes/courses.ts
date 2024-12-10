import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()

// Get all courses
router.get('/', authMiddleware, async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        modules: {
          include: {
            lessons: true,
          },
        },
        enrollments: {
          where: {
            userId: req.user.userId,
          },
        },
      },
    })

    const coursesWithEnrollmentStatus = courses.map(course => ({
      ...course,
      enrolled: course.enrollments.length > 0,
      enrollments: undefined,
    }))

    res.json(coursesWithEnrollmentStatus)
  } catch (error) {
    console.error('Error fetching courses:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get single course
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        modules: {
          include: {
            lessons: true,
          },
        },
      },
    })

    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }

    res.json(course)
  } catch (error) {
    console.error('Error fetching course:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Create course
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'CREATOR' && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    const course = await prisma.course.create({
      data: {
        ...req.body,
        creatorId: req.user.userId,
      },
    })

    res.json(course)
  } catch (error) {
    console.error('Error creating course:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update course
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
    })

    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }

    if (course.creatorId !== req.user.userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    const updatedCourse = await prisma.course.update({
      where: { id: req.params.id },
      data: req.body,
    })

    res.json(updatedCourse)
  } catch (error) {
    console.error('Error updating course:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export { router as coursesRouter }