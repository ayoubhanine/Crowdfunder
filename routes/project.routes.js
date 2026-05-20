import express from "express";
import {
  createProject,
  getMyProjects,
  updateProject,
  deleteProject,
  closeProject,
  getProjectById,
  getAllProjects
} from "../controllers/project.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js"

const router = express.Router();

// Owner seulement
router.post("/", protect, authorizeRoles("owner"), createProject);
router.get("/my", protect, authorizeRoles("owner","investor"), getMyProjects);
router.get("/",getAllProjects)
router.get("/:id",protect,authorizeRoles("owner"),getProjectById)
router.put("/:id", protect, authorizeRoles("owner"), updateProject);
router.delete("/:id", protect, authorizeRoles("owner"), deleteProject);
router.patch("/:id/close", protect, authorizeRoles("owner"), closeProject);

export default router;