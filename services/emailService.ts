import { Request, Response } from "express";
import { addEmailToDatabase } from "../utils/prismaQueries";
import { EmailClient } from "../email/emailClient";
import { MailGunService } from "../email/implementations/mailGunInterfaceImpl";
import { NodeMailerService } from "../email/implementations/nodeMailerInterfaceImpl";
import { validateEmailData } from "../validator/validator";

const MAIL_LIMIT = 4


export async function sendEmail(req: Request, res: Response) {
    try {
        const { user: { email, id }, to, subject, content } = req.body

        const validatedReceiver = await validateEmailData({ email, id }, { to, subject, content }, MAIL_LIMIT)

        const emailClient = new EmailClient(new NodeMailerService(), new MailGunService())

        await emailClient.sendEmail(email, to, subject, content)

        await addEmailToDatabase(id, content, validatedReceiver.id)

        res.status(200).json({ message: "Email sent" })
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Error sending email" })
    }
}