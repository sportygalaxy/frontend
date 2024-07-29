"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_js_1 = require("../controllers/product.controller.js");
const router = express_1.default.Router();
// size
router.get("/size/:id", product_controller_js_1.getProductSize);
router.get("/size/", product_controller_js_1.getProductSizes);
router.post("/size/", product_controller_js_1.createProductSize);
router.put("/size/:id", product_controller_js_1.updateProductSize);
router.delete("/size/:id", product_controller_js_1.deleteProductSize);
// product
router.get("/:id", product_controller_js_1.getProduct);
router.get("/", product_controller_js_1.getProducts);
router.post("/", product_controller_js_1.createProduct);
router.put("/:id", product_controller_js_1.updateProduct);
router.delete("/:id", product_controller_js_1.deleteProduct);
exports.default = router;
