import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { Investproject } from "../controllers/investment.controller.js";

const router = express.Router();

// Investor seulement
router.post("/:id/invest", protect, authorizeRoles("investor"), Investproject);

export default router;
