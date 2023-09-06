import { Request, Response } from "express";
import { addEmailToDatabase, getUserByEmail } from "../utils/prismaQueries";
import { EmailClient } from "../email/emailClient";
import { MailGunService } from "../email/implementations/mailGunInterfaceImpl";
import { NodeMailerService } from "../email/implementations/nodeMailerInterfaceImpl";



export async function sendEmail(req:Request,res:Response){
    try{
        const {user:{email, id}, to, subject, content} = req.body
        const receiver = await getUserByEmail(to)
        
        if(receiver === null) throw new Error("Receiver is not registered")
        
        const emailClient = new EmailClient(new NodeMailerService(),new MailGunService())

        await addEmailToDatabase(id, content, receiver.id)

        await emailClient.sendEmail( email, to, subject, content)
        
        res.status(200).json({message:"Email sent"})
    }
    catch(error:Error|any){
        console.log(error)
        res.status(500).json({message:error.message})
    }
}