import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getProductSubcategory,
  getProductSubcategories,
  createProductSubcategory,
  updateProductSubcategory,
  deleteProductSubcategory,
} from "../controllers/product-subcategory.controller.js";

const router = express.Router();

router.get("/:id", getProductSubcategory);
router.get("/", getProductSubcategories);
router.post("/", createProductSubcategory);
router.put("/:id", updateProductSubcategory);
router.delete("/:id", deleteProductSubcategory);

export default router;
