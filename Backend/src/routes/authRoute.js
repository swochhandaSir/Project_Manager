import express from "express";
import { loginUser, registerUser, fetchCurrentUser, refreshSession, logoutUser } from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", registerUser); // /api/auth/register
router.post("/login", loginUser); // /api/auth/login
router.get("/me", verifyToken, fetchCurrentUser); // /api/auth/me
router.post("/refresh", refreshSession); // /api/auth/refresh
router.post("/logout", logoutUser); // /api/auth/logout

export default router;
