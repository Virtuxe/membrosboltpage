import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create creator user
  const creator = await prisma.user.upsert({
    where: { email: 'creator@test.com' },
    update: {},
    create: {
      email: 'creator@test.com',
      name: 'Creator Test',
      password: await bcrypt.hash('creator123', 10),
      role: 'CREATOR',
    },
  })

  // Create student user
  const student = await prisma.user.upsert({
    where: { email: 'student@test.com' },
    update: {},
    create: {
      email: 'student@test.com',
      name: 'Student Test',
      password: await bcrypt.hash('student123', 10),
      role: 'STUDENT',
    },
  })

  // Create sample course
  const course = await prisma.course.create({
    data: {
      title: 'Marketing Digital Avançado',
      description: 'Aprenda estratégias avançadas de marketing digital para crescer seu negócio online',
      thumbnail: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&auto=format&fit=crop',
      creatorId: creator.id,
      modules: {
        create: [
          {
            title: 'Fundamentos do Marketing Digital',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Introdução ao Marketing Digital',
                  description: 'Conceitos básicos e visão geral',
                  content: `# Introdução ao Marketing Digital

## O que você vai aprender

- Fundamentos do marketing digital
- Principais canais e estratégias
- Como criar uma presença online efetiva

## Conceitos Básicos

O marketing digital é essencial para qualquer negócio moderno...`,
                  order: 1,
                  videoUrl: 'dQw4w9WgXcQ'
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log({ creator, student, course })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })