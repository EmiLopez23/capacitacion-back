import { Router } from "express";
import { sendEmail } from "../services/emailService";

const userController = Router()

userController.post("/send", sendEmail)

export default userController;