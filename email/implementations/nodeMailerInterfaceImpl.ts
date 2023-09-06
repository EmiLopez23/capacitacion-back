import { EmailService } from "../interface/interface";
import nodemailer, { Transporter } from 'nodemailer'

export class NodeMailerService implements EmailService{
    private transporter: Transporter;
    
    constructor(){
        this.transporter = nodemailer.createTransport({
            service:"hotmail",
            auth:{
                user:process.env.NODE_MAILER_MAIL,
                pass:process.env.NODE_MAILER_PASSWORD
            },
            tls:{
                rejectUnauthorized:false,
            }
        })
    }

    async sendEmail(from: string, to: string, subject: string, content: string): Promise<any> {
        try{
            await this.transporter.sendMail({from, to,subject,text:content})
        }catch(error){
            throw new Error("NodeMailerService failed")
        }
    }
}