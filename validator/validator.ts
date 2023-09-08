import { getTodayRange } from "../utils/dates";
import { getEmailsQtyFromUser, getUserByEmail } from "../utils/prismaQueries";
import { Roles } from "../utils/roles";
import { validateLoginDataTypes, validateRegisterDataTypes, validateSendEmailDataTypes } from "../utils/typeCheckers";

type User = {
    username?: string;
    email: string;
    id?: number;
    role?: Roles
    password?: string;
}

type Email = {
    to: string;
    from?: string;
    subject: string;
    content: string;
}

export async function validateLoginData(user: User) {
    try {
        validateLoginDataTypes(user)

        const userFromDb = await getUserByEmail(user.email)

        if (!userFromDb) {
            throw new Error("User not found")
        }

        if (userFromDb.password !== user.password) {
            throw new Error("Invalid credentials")
        }

        return userFromDb
    } catch (error) {
        throw error
    }
}

export async function validateRegisterData(user: User) {
    try {
        validateRegisterDataTypes(user)

        const oldUser = await getUserByEmail(user.email)

        if (oldUser) {
            throw new Error("User already exists")
        }
    } catch (error) {
        throw error
    }
}

export async function validateEmailData(sender: User, emailObject: Email, mail_limit: number) {
    try {
        validateSendEmailDataTypes(emailObject)

        const { startDate, endDate } = getTodayRange()

        const receiver = await getUserByEmail(emailObject.to)

        if (!sender.id) throw new Error("User id is missing")

        const qtyEmailsSent = await getEmailsQtyFromUser(sender.id, startDate, endDate)

        if (receiver === null) throw new Error("Receiver is not registered")

        if (qtyEmailsSent >= mail_limit) throw new Error("You have reached the limit of emails sent today")

        return receiver
    } catch (error) {
        throw error
    }
}