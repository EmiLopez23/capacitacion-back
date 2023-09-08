import { Router } from "express";
import { sendEmail } from "../services/emailService";

const userController = Router()

userController.post("/send", async (req, res) => {
    const { user: { email, id }, to, subject, content } = req.body
    try {
        await sendEmail(id, email, to, subject, content)
        res.status(200).json({ message: "Email sent" })
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Error sending email" })
    }
})

export default userController;