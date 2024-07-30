import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getProductCategory,
  getProductCategories,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
} from "../controllers/product-category.controller.js";

const router = express.Router();

router.get("/:id", getProductCategory);
router.get("/", getProductCategories);
router.post("/", createProductCategory);
router.put("/:id", updateProductCategory);
router.delete("/:id", deleteProductCategory);

export default router;
