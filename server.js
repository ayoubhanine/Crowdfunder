import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import projectRoutes from "./routes/project.routes.js";


dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/api/projects", projectRoutes);
// Test route


// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});