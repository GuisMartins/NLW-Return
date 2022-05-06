import express from 'express'
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedback-repository';
import { SubmitFeedbackServices } from './services/submit-feedback-service';

export const routes = express.Router()



routes.post('/feedbacks', async (req, res) => {
  const {type, comment, screenshot} = req.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()

  const submitFeedbackServices = new SubmitFeedbackServices(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  )

  await submitFeedbackServices.execute({
    type,
    comment,
    screenshot,
  })
      
  return res.status(201).send()
})