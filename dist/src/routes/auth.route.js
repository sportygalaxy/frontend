"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const verifyToken_js_1 = require("../middleware/verifyToken.js");
const router = express_1.default.Router();
router.post("/register", auth_controller_1.register);
router.post("/activate", verifyToken_js_1.verifyToken, auth_controller_1.activate);
router.post("/send-verification", verifyToken_js_1.verifyToken, auth_controller_1.sendVerification);
router.post("/login", auth_controller_1.login);
router.post("/logout", auth_controller_1.logout);
exports.default = router;
