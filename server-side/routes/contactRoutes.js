import express from "express";
import {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} from "../controllers/contactController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

// All contact routes are protected
router.post("/", protect, createContact);
router.get("/", protect, getContacts);
router.put("/:id", protect, updateContact);
router.delete("/:id", protect, deleteContact);

export default router;
