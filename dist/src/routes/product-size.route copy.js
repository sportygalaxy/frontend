"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_size_controller_js_1 = require("../controllers/product-size.controller.js");
const router = express_1.default.Router();
router.get("/:id", product_size_controller_js_1.getProductSize);
router.get("/", product_size_controller_js_1.getProductSizes);
router.post("/", product_size_controller_js_1.createProductSize);
router.put("/:id", product_size_controller_js_1.updateProductSize);
router.delete("/:id", product_size_controller_js_1.deleteProductSize);
exports.default = router;
