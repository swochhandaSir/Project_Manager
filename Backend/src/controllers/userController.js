import userSchema from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getUsers = asyncHandler(async (req, res) => {

  const users = await userSchema.find().select("-password");

  res.json(users);
});


export const getUserProfile = asyncHandler(async (req, res) => {

  const user = await userSchema.findById(req.params.id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});


export const updateUser = asyncHandler(async (req, res) => {

  const user = await userSchema.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true }
  );

  res.json(user);
});