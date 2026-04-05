import express from "express";
import {
  createComment,
  getTaskComments,
  getProjectComments,
  deleteComment
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", createComment);
router.get("/task/:taskId", getTaskComments);
router.get("/project/:projectId", getProjectComments);
router.delete("/:id", deleteComment);

export default router;