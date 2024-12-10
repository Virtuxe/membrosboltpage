import express from 'express'
import multer from 'multer'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const router = express.Router()

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

// Gerar URL assinada para upload direto para S3
router.post('/presigned-url', async (req, res) => {
  try {
    const { fileName, fileType } = req.body
    const key = `uploads/${Date.now()}-${fileName}`

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    })

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 })

    res.json({
      url: signedUrl,
      key,
    })
  } catch (error) {
    console.error('Error generating presigned URL:', error)
    res.status(500).json({ error: 'Failed to generate upload URL' })
  }
})

export { router as uploadRouter }