import { Request, Response } from "express";
import { createUser } from "../utils/prismaQueries";
import jwt, { Secret } from "jsonwebtoken";
import { validateLoginData, validateRegisterData } from "../validator/validator";

export async function login(req: Request, res: Response) {
    const { email, password } = req.body

    try {

        const validatedUser = await validateLoginData({ email, password })

        const token = jwt.sign({ id: validatedUser.id, role: validatedUser.role, email, username: validatedUser.username }, process.env.TOKEN_KEY as Secret, { expiresIn: "1h" })

        res.status(200).json({ message: "User logged in", token })

    } catch (error) {

        res.status(400).json({ message: error instanceof Error ? error.message : "Something went wrong" })

    }


}



export async function register(req: Request, res: Response) {
    const { username, password, email } = req.body
    try {
        await validateRegisterData({ username, password, email })

        const newUser = await createUser(username, password, email)
        const token = jwt.sign({ id: newUser.id, role: newUser.role, email, username }, process.env.TOKEN_KEY as Secret, { expiresIn: "1h" })

        res.status(201).json({ message: "User created", token })
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Something went wrong" })
    }
}