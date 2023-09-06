import { Request, Response } from "express"
import { getEmailStats } from "../utils/prismaQueries"

export async function getStats(req:Request,res:Response){
    
    const today = (new Date())
    today.setHours(0,0,0,0)
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate()+1)


    const usersThatSentEmails = await getEmailStats(today, tomorrow)
    res.status(200).json(usersThatSentEmails)
}