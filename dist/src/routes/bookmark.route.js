"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookmark_controller_js_1 = require("../controllers/bookmark.controller.js");
const router = express_1.default.Router();
router.post("/", bookmark_controller_js_1.createBookmark);
router.get("/", bookmark_controller_js_1.getBookmarks);
router.delete("/", bookmark_controller_js_1.deleteBookmark);
exports.default = router;
