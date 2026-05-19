import express from "express"
import { getDashboardData } from "../controllers/dashboard.controller.js"
// import { authorizeRoles } from "../middlewares/role.middleware.js"
import { protect } from "../middlewares/auth.middleware.js"

const router=express.Router()

router.get("/",protect,getDashboardData)

export default router;