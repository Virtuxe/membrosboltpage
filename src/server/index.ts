import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { webhookRouter } from './routes/webhook'
import { authRouter } from './routes/auth'
import { coursesRouter } from './routes/courses'
import { uploadRouter } from './routes/upload'

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3001

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/courses', coursesRouter)
app.use('/api/webhook', webhookRouter)
app.use('/api/upload', uploadRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app