import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getInvestorDashboard } from "../controllers/DashboardInvestor.controller.js";

const router = express.Router();

router.get("/dashboard", protect, getInvestorDashboard);

export default router;