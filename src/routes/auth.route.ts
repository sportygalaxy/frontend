import express from "express";
import {
  login,
  logout,
  register,
  activate,
  sendVerification,
  sendResetPasswordCode,
  validateResetPasswordCode,
  changePassword,
  changePasswordViaReset,
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/activate", verifyToken, activate);
router.post("/send-verification", verifyToken, sendVerification);
router.post("/send-reset-password-code", sendResetPasswordCode);
router.post("/validate-reset-password-code", validateResetPasswordCode);
router.post("/change-password", changePassword);
router.post("/change-password-reset", changePasswordViaReset);
router.post("/login", login);
router.post("/logout", logout);

export default router;
