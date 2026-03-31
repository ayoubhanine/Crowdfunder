import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

// Charger variables d'environnement
dotenv.config();

const app = express();

// Middlewares 
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Route test 
app.get("/", (req, res) => {
  res.send(" API Crowdfunding is running...");
});

//  Connexion MongoDB 
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(` MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(` Error: ${error.message}`);
    process.exit(1);
  }
};

// Lancer serveur
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(` Server running on port ${PORT}`);
});