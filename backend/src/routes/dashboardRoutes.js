import express from "express";
import getDashboardData from "../controllers/dashboardController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/dashboard-data", authMiddleware, getDashboardData);

export default router;
