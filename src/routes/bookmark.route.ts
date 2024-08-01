import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import {
  createBookmark,
  getBookmarks,
  deleteBookmark,
} from "../controllers/bookmark.controller.js";

const router = express.Router();

router.post("/", createBookmark);
router.get("/", getBookmarks);
router.delete("/", deleteBookmark);

export default router;
