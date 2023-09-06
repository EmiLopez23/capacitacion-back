import { EmailService } from "./interface/interface";

export class EmailClient{
    private primaryEmailService: EmailService;
    private backupEmailService: EmailService;

    constructor(primaryEmailService:EmailService, backupEmailService:EmailService){
        this.primaryEmailService = primaryEmailService;
        this.backupEmailService = backupEmailService; 
    }

    async sendEmail(from:string, to:string, subject:string, content:string): Promise<any>{
        try {
            await this.primaryEmailService.sendEmail(from,to,subject,`from main mail service : ${content}`)
        } catch (error) {
            console.log(error)
            const backupMessage = await this.backupEmailService.sendEmail(from,to,subject,`from backup mail service : ${content}`)
            console.log(backupMessage)
            //if(!backupMessage) throw new Error("Both services are down")
        }
    }
}