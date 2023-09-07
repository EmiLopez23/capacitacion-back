import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../utils/prismaQueries";
import jwt, { Secret } from "jsonwebtoken";
import { validateLoginData, validateRegisterData } from "../utils/typeCheckers";

export async function login(req: Request, res: Response) {
    const { email, password } = req.body

    try {
        validateLoginData(req.body)

        const user = await getUserByEmail(email)

        if (!user) {
            throw new Error("User not found")
        }

        if (user.password !== password) {
            throw new Error("Invalid credentials")
        }

        const token = jwt.sign({ id: user.id, role: user.role, email, username: user.username }, process.env.TOKEN_KEY as Secret, { expiresIn: "1h" })

        res.status(200).json({ message: "User logged in", token })

    } catch (error) {

        res.status(400).json({ message: error instanceof Error ? error.message : "Something went wrong" })

    }


}



export async function register(req: Request, res: Response) {
    const { username, password, email } = req.body
    try {
        validateRegisterData({ username, password, email })
    
        const oldUser = await getUserByEmail(email)

        if (oldUser) {
            throw new Error("User already exists")
        }

        const newUser = await createUser(username, password, email)
        const token = jwt.sign({ id: newUser.id, role: newUser.role, email, username }, process.env.TOKEN_KEY as Secret, { expiresIn: "1h" })

        res.status(201).json({ message: "User created", token })
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Something went wrong" })
    }
}