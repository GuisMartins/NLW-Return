import { MailAdapter, SendMailData } from "../mail-adapter"
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "164dbc45e7e501",
    pass: "94ed401706ed1e"
  }
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <email@equipe.com>',
      to: 'Nome Recebe <email@quemrecebe.com',
      subject,
      html: body      
    })
  }
}
