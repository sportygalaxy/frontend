"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_color_controller_js_1 = require("../controllers/product-color.controller.js");
const router = express_1.default.Router();
router.get("/:id", product_color_controller_js_1.getProductColor);
router.get("/", product_color_controller_js_1.getProductColors);
router.post("/", product_color_controller_js_1.createProductColor);
router.put("/:id", product_color_controller_js_1.updateProductColor);
router.delete("/:id", product_color_controller_js_1.deleteProductColor);
exports.default = router;
