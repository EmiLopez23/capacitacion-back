import { addEmailToDatabase } from "../utils/prismaQueries";
import { EmailClient } from "../email/emailClient";
import { MailGunService } from "../email/implementations/mailGunInterfaceImpl";
import { NodeMailerService } from "../email/implementations/nodeMailerInterfaceImpl";
import { validateEmailData } from "../validator/validator";

const MAIL_LIMIT = 4


export async function sendEmail(senderId: number, senderEmail: string, receiverEmail: string, subject: string, content: string) {
    const validatedReceiver = await validateEmailData({ email: senderEmail, id: senderId }, { to: receiverEmail, subject, content }, MAIL_LIMIT)

    const emailClient = new EmailClient(new NodeMailerService(), new MailGunService())

    await emailClient.sendEmail(senderEmail, receiverEmail, subject, content)

    await addEmailToDatabase(senderId, content, validatedReceiver.id)

}