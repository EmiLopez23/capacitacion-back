import { Router } from "express";
import { login, register } from "../services/authService";

const authController = Router()

authController.post("/register", register)

authController.post("/login", login)

export default authController;