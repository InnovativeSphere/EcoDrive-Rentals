import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import rentalRoutes from "./routes/rentalRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected to Atlas!"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ✅ Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ecodrive-rentals.netlify.app"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

// ✅ Base route
app.get("/", (req, res) => {
  res.status(200).send("🚗 Welcome to the Car Rental API");
});

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/contacts", contactRoutes);

// ✅ Start server only if not in serverless environment
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
