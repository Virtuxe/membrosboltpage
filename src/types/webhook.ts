export interface WebhookPayload {
  userId: string
  courseId: string
  paymentId: string
  status: 'completed' | 'failed'
  amount: number
  currency: string
  metadata?: Record<string, any>
}