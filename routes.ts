import { Router } from "express";
import authMiddleware from "./middlewares/authMiddleware";
import tokenMiddleware from "./middlewares/tokenMiddleware";
import adminController from "./controllers/adminController";
import userController from "./controllers/userController";
import authController from "./controllers/authController";

const router = Router()

router.use(authController)

router.use(tokenMiddleware)

router.use(userController)

router.use(authMiddleware)

router.use(adminController)


export default router