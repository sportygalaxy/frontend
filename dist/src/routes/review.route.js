"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_controller_js_1 = require("../controllers/review.controller.js");
const router = express_1.default.Router();
router.get("/:id", review_controller_js_1.getReview);
router.get("/", review_controller_js_1.getReviews);
router.post("/", review_controller_js_1.createReview);
router.put("/:id", review_controller_js_1.updateReview);
router.delete("/:id", review_controller_js_1.deleteReview);
exports.default = router;
