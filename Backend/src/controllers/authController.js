import userSchema from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { access, refresh } from "../utils/tokenMakers.js";
import jwt from "jsonwebtoken";

const isProd = process.env.NODE_ENV === "production";
const refreshCookieOptions = {
	httpOnly: true,
	sameSite: isProd ? "None" : "Lax",
	secure: isProd,
	path: "/",
};

const clearRefreshCookies = (res) => {
	// Clear current cookie path
	res.clearCookie("RefreshToken", refreshCookieOptions);
};

export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await userSchema.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await userSchema.create({
		name,
		email,
		password: hashedPassword,
	});

	res.status(201).json(user);
});

export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await userSchema.findOne({ email });

	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		res.status(400);
		throw new Error("Invalid credentials");
	}

	const accessToken = access(user);
	const refreshToken = refresh(user);

	user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
	await user.save();

	clearRefreshCookies(res);
	res.cookie("RefreshToken", refreshToken, refreshCookieOptions);
	res
		.status(200)
		.json({ message: "Login successful", accessToken });
});

export const fetchCurrentUser = asyncHandler(async (req, res) => {

  const user = await userSchema.findById(req.user.id).select("-password");

  if (!user) {
	res.status(404);
	throw new Error("User not found");
  }

  res.status(200).json(user);
});

export const refreshSession = asyncHandler(async (req, res) => {

	const token = req.cookies?.RefreshToken;
	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	let decoded;
	try {
		decoded = jwt.verify(token, process.env.REFRESH_TOKEN);
	} catch (err) {
		return res.status(401).json({ message: "Invalid or expired token" });
	}

	const user = await userSchema.findById(decoded.id);
	if (!user || !user.refreshTokenHash) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const matches = await bcrypt.compare(token, user.refreshTokenHash);
	if (!matches) {
		// Refresh token reuse detected (or user logged out elsewhere)
		user.refreshTokenHash = null;
		await user.save();
		clearRefreshCookies(res);
		return res.status(401).json({ message: "Invalid or expired token" });
	}

	// Rotate refresh token
	const newAccess = access(user);
	const newRefresh = refresh(user);
	user.refreshTokenHash = await bcrypt.hash(newRefresh, 10);
	await user.save();

	clearRefreshCookies(res);
	res.cookie("RefreshToken", newRefresh, refreshCookieOptions);
	return res.status(200).json({ accessToken: newAccess });
});

export const logoutUser = asyncHandler(async (req, res) => {

	const token = req.cookies?.RefreshToken;
	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);
			const user = await userSchema.findById(decoded.id);
			if (user) {
				user.refreshTokenHash = null;
				await user.save();
			}
		} catch (_) {
			// ignore
		}
	}

	clearRefreshCookies(res);
	return res.status(200).json({ message: "Logged out" });
});