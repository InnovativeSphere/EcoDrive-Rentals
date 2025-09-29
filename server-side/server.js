import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import rentalRoutes from "./routes/rentalRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";


dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));


app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Car Rental API");
});

//Routes
app.use("/api/users", userRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/contacts", contactRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});