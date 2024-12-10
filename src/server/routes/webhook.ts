import express from 'express'
import { PrismaClient } from '@prisma/client'
import type { WebhookPayload } from '../../types/webhook'

const router = express.Router()
const prisma = new PrismaClient()

router.post('/payment', async (req, res) => {
  try {
    const payload = req.body as WebhookPayload
    
    // Verificar assinatura do webhook (implementar lógica específica do gateway)
    
    // Criar matrícula para o usuário
    await prisma.enrollment.create({
      data: {
        userId: payload.userId,
        courseId: payload.courseId,
      },
    })

    res.status(200).json({ message: 'Webhook processed successfully' })
  } catch (error) {
    console.error('Webhook processing error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export { router as webhookRouter }