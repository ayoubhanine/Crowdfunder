import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { Investproject,getMyInvestements,
    getProjectInvestors,getUserPortfolio } from "../controllers/investment.controller.js";

const router = express.Router();

// Investor seulement
router.post("/:id/invest", protect, authorizeRoles("investor"), Investproject);
// Voir mes investissements
router.get("/my", protect, authorizeRoles("investor"), getMyInvestements);

// Voir investisseurs d’un projet (owner)
router.get(
  "/project/:id/investors",
  protect,
  authorizeRoles("owner"),
  getProjectInvestors
);
//portfolio
router.get("/portfolio",protect,authorizeRoles("investor"),getUserPortfolio)
export default router;
