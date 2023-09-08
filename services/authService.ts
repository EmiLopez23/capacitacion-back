import { createUser } from "../utils/prismaQueries";
import jwt, { Secret } from "jsonwebtoken";
import { validateLoginData, validateRegisterData } from "../validator/validator";

export async function login(email: string, password: string): Promise<string> {
    try {
        const validatedUser = await validateLoginData({ email, password })
        const token = jwt.sign({ id: validatedUser.id, role: validatedUser.role, email, username: validatedUser.username }, process.env.TOKEN_KEY as Secret, { expiresIn: "1h" })
        return token
    } catch (err) {
        throw err
    }
}



export async function register(username: string, password: string, email: string): Promise<string> {
    try {
        await validateRegisterData({ username, password, email })
        const newUser = await createUser(username, password, email)
        const token = jwt.sign({ id: newUser.id, role: newUser.role, email, username }, process.env.TOKEN_KEY as Secret, { expiresIn: "1h" })
        return token
    } catch (err) {
        throw err
    }
}