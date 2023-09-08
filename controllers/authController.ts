import { Router } from "express";
import { login, register } from "../services/authService";

const authController = Router()

authController.post("/register", async (req, res) => {
    const { username, password, email } = req.body
    try {

        const token = await register(username, password, email)
        res.status(201).json({ message: "User created", token })
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Something went wrong" })
    }
})

authController.post("/login", async(req, res) => {
    const { email, password } = req.body
    try {
        const token = await login(email, password)
        res.status(200).json({ message: "User logged in", token })
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Something went wrong" })
    }
})

export default authController;