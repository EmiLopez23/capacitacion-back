import { Router } from "express";
import { getStats } from "../services/statsService";

const adminController = Router();

adminController.get('/stats', async (req, res) => {
    try {
        const stats = await getStats()
        res.status(200).json(stats)
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Something went wrong" })
    }
})

export default adminController;