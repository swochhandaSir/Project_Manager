import express from "express";
import { loginUser, registerUser, fetchCurrentUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser); // /api/auth/register
router.post("/login", loginUser); // /api/auth/login
router.get("/me", fetchCurrentUser); // /api/auth/me

export default router;
