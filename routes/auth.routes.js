import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
// import { registerValidation, loginValidation } from "../validators/auth.validator.js";
import { registerValidation,loginValidation } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/register",  registerValidation, registerUser);
router.post("/login",  loginValidation, loginUser);

export default router;