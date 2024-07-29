import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getProductColor,
  getProductColors,
  createProductColor,
  updateProductColor,
  deleteProductColor,
} from "../controllers/product-color.controller.js";

const router = express.Router();

router.get("/:id", getProductColor);
router.get("/", getProductColors);
router.post("/", createProductColor);
router.put("/:id", updateProductColor);
router.delete("/:id", deleteProductColor);

export default router;
