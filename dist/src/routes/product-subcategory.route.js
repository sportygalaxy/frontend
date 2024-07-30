"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_subcategory_controller_js_1 = require("../controllers/product-subcategory.controller.js");
const router = express_1.default.Router();
router.get("/:id", product_subcategory_controller_js_1.getProductSubcategory);
router.get("/", product_subcategory_controller_js_1.getProductSubcategories);
router.post("/", product_subcategory_controller_js_1.createProductSubcategory);
router.put("/:id", product_subcategory_controller_js_1.updateProductSubcategory);
router.delete("/:id", product_subcategory_controller_js_1.deleteProductSubcategory);
exports.default = router;
