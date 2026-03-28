import express from "express";
import {
  getUsers,
  getUserProfile,
  updateUser
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserProfile);
router.put("/:id", updateUser);

export default router;