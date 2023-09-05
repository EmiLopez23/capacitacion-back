import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../utils/prismaQueries";
import jwt, { Secret } from "jsonwebtoken";

export async function login(req: Request, res: Response) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Missing fields" })
    }
    
    const user = await getUserByEmail(email)

    if (!user) {
        return res.status(400).json({ message: "User does not exist" })
    }

    if (user.password !== password) {
        return res.status(400).json({ message: "Wrong password" })
    }
    
    const token = jwt.sign({ id: user.id, role: user.role, email, username: user.username }, process.env.TOKEN_KEY as Secret, { expiresIn: "1h" })
    
    res.status(200).json({ message: "User logged in", token })
}


export async function register(req:Request, res:Response){
    const { username, password, email } = req.body

    if (!username || !password || !email) {
        return res.status(400).json({ message: "Missing fields" })
    }

    const oldUser = await getUserByEmail(email)
    
    if (oldUser) {
        return res.status(400).json({ message: "User already exists" })
    }

    const newUser = await createUser(username, password, email)
    const token = jwt.sign({ id: newUser.id, role: newUser.role, email, username }, process.env.TOKEN_KEY as Secret, { expiresIn: "1h" })

    res.status(201).json({ message: "User created", token })
}