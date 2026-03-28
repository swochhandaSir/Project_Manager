import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser); // /api/auth/register
router.post("/login", loginUser); // /api/auth/login

export default router;
