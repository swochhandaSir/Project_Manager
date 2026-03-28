import express from "express";
import {
  createComment,
  getComments,
  deleteComment
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", createComment);
router.get("/:taskId", getComments);
router.delete("/:id", deleteComment);

export default router;