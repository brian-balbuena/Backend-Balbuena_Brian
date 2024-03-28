import mailer from 'nodemailer'
import { mailingConfig } from '../app.js'


export default class MailingService{
    constructor(){
        console.log('mailing', mailingConfig)
        this.client = mailer.createTransport({
            service: mailingConfig.service,
            port: 587,
            auth: {
                user: mailingConfig.user,
                pass: mailingConfig.password
            }
        })
    }

 
    sendMail = async ({from, to, subject,html, attachments = []}) => {
        const result = await this.client.sendMail({from, to, subject, html, attachments});
        return result;
    } 









};