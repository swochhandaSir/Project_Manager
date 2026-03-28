import userSchema from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import {access, refresh} from "../utils/tokenMakers.js"

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
	res.cookie("RefreshToken", refreshToken);
	res
		.status(200)
		.json({ message: "Login successful", accessToken, refreshToken });
});
