export interface EmailService{
    sendEmail(from:string, to:string, subject:string, content:string): Promise<any>;
}