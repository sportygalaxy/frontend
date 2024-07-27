"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_js_1 = require("../controllers/product.controller.js");
const router = express_1.default.Router();
router.get("/:id", product_controller_js_1.getProduct);
router.get("/", product_controller_js_1.getProducts);
router.post("/", product_controller_js_1.createProduct);
router.put("/:id", product_controller_js_1.updateProduct);
router.delete("/:id", product_controller_js_1.deleteProduct);
exports.default = router;
