import { EmailService } from "../interface/interface";
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { IMailgunClient } from "mailgun.js/Interfaces";

export class MailGunService implements EmailService{
    private mailgun: Mailgun;
    private mailgunClient: IMailgunClient;

    constructor(){
        this.mailgun = new Mailgun(formData)
        this.mailgunClient = this.mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY as string})
    }


    async sendEmail(from: string, to: string, subject: string, content: string): Promise<any> {
        try{
            await this.mailgunClient.messages.create(process.env.MAILGUN_DOMAIN as string, {from, to, subject, text: content});
        }catch(error){
            throw error
        }
    }
}