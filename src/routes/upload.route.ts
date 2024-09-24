import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { upload } from "../controllers/upload.controller.js";

const router = express.Router();

router.get("/:id", upload);
router.get("/", upload);
router.post("/", upload);
router.put("/:id", upload);
router.delete("/:id", upload);

export default router;
