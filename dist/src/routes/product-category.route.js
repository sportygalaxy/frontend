"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_category_controller_js_1 = require("../controllers/product-category.controller.js");
const router = express_1.default.Router();
router.get("/:id", product_category_controller_js_1.getProductCategory);
router.get("/", product_category_controller_js_1.getProductCategories);
router.post("/", product_category_controller_js_1.createProductCategory);
router.put("/:id", product_category_controller_js_1.updateProductCategory);
router.delete("/:id", product_category_controller_js_1.deleteProductCategory);
exports.default = router;
