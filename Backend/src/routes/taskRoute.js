import express from "express";
import {
  createTask,
  getTasks,
  getMyTasks,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/my", getMyTasks);
router.get("/:projectId", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;