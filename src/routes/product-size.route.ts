import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getProductSize,
  getProductSizes,
  createProductSize,
  updateProductSize,
  deleteProductSize,
} from "../controllers/product-size.controller.js";

const router = express.Router();

router.get("/:id", getProductSize);
router.get("/", getProductSizes);
router.post("/", createProductSize);
router.put("/:id", updateProductSize);
router.delete("/:id", deleteProductSize);

export default router;
