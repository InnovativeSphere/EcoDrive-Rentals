import express from "express";
import {
  createRental,
  updateRental,
  cancelRental,
  getUserRentals,
} from "../controllers/rentalController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Rental routes
router.post("/", protect, createRental);
router.get("/", protect, getUserRentals);
router.put("/:id", protect, updateRental);
router.put("/:id/cancel", protect, cancelRental);

export default router;
