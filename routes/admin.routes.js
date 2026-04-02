import express from "express";
import {
  getAllUsers,
  getInvestors,
  getOwners,
  getUserPortfolioByAdmin,
  getGlobalStats,
} from "../controllers/admin.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// Admin seulement
router.use(protect, authorizeRoles("admin"));

router.get("/users", getAllUsers);
router.get("/investors", getInvestors);
router.get("/owners", getOwners);
router.get("/portfolio/:id", getUserPortfolioByAdmin);
router.get("/stats", getGlobalStats);

export default router;