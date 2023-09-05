import { Request, Response } from "express";
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { addEmailToDatabase, getUserByEmail } from "../utils/prismaQueries";

const mailgun = new Mailgun(formData);
const client = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY as string});

export async function sendEmail(req:Request,res:Response){
    try{
        const {user:{email, username, id}, to, subject, content} = req.body
        const receiver = await getUserByEmail(to)
        
        if(receiver === null) throw new Error("Receiver is not registered")
        
        await addEmailToDatabase(id, content, receiver.id)

        await createEmail(username, email, to, subject, content)
        
        res.status(200).json({message:"Email sent"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Error sending email"})
    }
}


async function createEmail(username:string, senderEmail:string, receiverEmail:string, subject:string, content:string) {
    await client.messages.create(process.env.MAILGUN_DOMAIN as string, {from:`${username} <${senderEmail}>`, to:receiverEmail, subject, text: content});
}