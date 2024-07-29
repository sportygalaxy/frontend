import express from "express";
import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductSize,
  getProductSizes,
  createProductSize,
  updateProductSize,
  deleteProductSize,
} from "../controllers/product.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// size
router.get("/size/:id", getProductSize);
router.get("/size/", getProductSizes);
router.post("/size/", createProductSize);
router.put("/size/:id", updateProductSize);
router.delete("/size/:id", deleteProductSize);

// product
router.get("/:id", getProduct);
router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
