import { Request, Response } from "express"
import { getEmailStats } from "../utils/prismaQueries"
import { getTodayRange } from "../utils/dates"
import { UsersWithEmails } from "../types"



export async function getStats(): Promise<UsersWithEmails[]> {
    const { startDate, endDate } = getTodayRange()
    const usersThatSentEmails = await getEmailStats(startDate, endDate)
    return usersThatSentEmails

}