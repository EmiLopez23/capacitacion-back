import { Request, Response } from "express"
import { getEmailStats } from "../utils/prismaQueries"
import { getTodayRange } from "../utils/dates"

export async function getStats(req:Request,res:Response){
    const {startDate, endDate} = getTodayRange()


    const usersThatSentEmails = await getEmailStats(startDate, endDate)
    res.status(200).json(usersThatSentEmails)
}