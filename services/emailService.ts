import { Request, Response } from "express";
import { addEmailToDatabase, getEmailsQtyFromUser, getUserByEmail } from "../utils/prismaQueries";
import { EmailClient } from "../email/emailClient";
import { MailGunService } from "../email/implementations/mailGunInterfaceImpl";
import { NodeMailerService } from "../email/implementations/nodeMailerInterfaceImpl";
import { getTodayRange } from "../utils/dates";
import { validateSendEmailData } from "../utils/typeCheckers";

const MAIL_LIMIT = 4


export async function sendEmail(req:Request,res:Response){
    try{
        const {user:{email, id}, to, subject, content} = req.body

        validateSendEmailData({to,subject,content})
        
        const {startDate,endDate} = getTodayRange()

        const receiver = await getUserByEmail(to)

        const qtyEmailsSent = await getEmailsQtyFromUser(id, startDate,endDate)
        
        if(receiver === null) throw new Error("Receiver is not registered")

        if(qtyEmailsSent >= MAIL_LIMIT) throw new Error("You have reached the limit of emails sent today")  
        
        const emailClient = new EmailClient(new NodeMailerService(),new MailGunService())

        await emailClient.sendEmail( email, to, subject, content)

        await addEmailToDatabase(id, content, receiver.id)
        
        res.status(200).json({message:"Email sent"})
    }
    catch(error){
        res.status(500).json({message: error instanceof Error ? error.message : "Error sending email"})
    }
}