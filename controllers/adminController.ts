import { Router } from "express";
import { getStats } from "../services/statsService";

const adminController = Router();

adminController.get('/stats', getStats)

export default adminController;