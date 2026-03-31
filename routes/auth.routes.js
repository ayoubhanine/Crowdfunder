import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../validators/auth.validator.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/register", registerValidation, validateRequest, registerUser);
router.post("/login", loginValidation, validateRequest, loginUser);

export default router;