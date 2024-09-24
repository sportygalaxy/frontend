"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_controller_js_1 = require("../controllers/upload.controller.js");
const router = express_1.default.Router();
router.get("/:id", upload_controller_js_1.upload);
router.get("/", upload_controller_js_1.upload);
router.post("/", upload_controller_js_1.upload);
router.put("/:id", upload_controller_js_1.upload);
router.delete("/:id", upload_controller_js_1.upload);
exports.default = router;
