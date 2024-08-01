import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.get("/:id", getReview);
router.get("/", getReviews);
router.post("/", createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
