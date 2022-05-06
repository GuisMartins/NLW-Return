import { MailAdapter } from "../adapters/mail-adapter"
import { FeedbacksRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackServicesRequest{
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackServices{
  constructor(
    private feedbackRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ){}

  async execute(request: SubmitFeedbackServicesRequest){
    const { type, comment, screenshot } = request

    if (!type) {
      throw new Error('Type is required.')
    }
    
    if (!comment) {
      throw new Error('Comment is required.')
    }

    if ( screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid screenshot format.')
    }

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentario: ${comment}</p>`,
        `</div>`
      ].join('\n')
    })

  }
}