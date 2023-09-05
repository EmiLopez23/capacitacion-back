import { Router } from "express";
import authMiddleware from "./middlewares/authMiddleware";
import { login, register } from "./services/authService";
import tokenMiddleware from "./middlewares/tokenMiddleware";
import { sendEmail } from "./services/emailService";
import { getStats } from "./services/statsService";

const router = Router()

router.post("/register", register)

router.post("/login", login)

router.use(tokenMiddleware)

router.post("/send", sendEmail)

router.use(authMiddleware)

router.get("/stats", getStats)


export default router