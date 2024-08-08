import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import {
  processPayment,
} from "../controllers/payment.controller.js";

const router = express.Router();


router.post("/process", processPayment);

export default router;
