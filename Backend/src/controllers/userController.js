import userSchema from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getUsers = asyncHandler(async (req, res) => {

  const users = await userSchema.find().select("-password");

  res.json(users);
});


export const getUserProfile = asyncHandler(async (req, res) => {

  const user = await userSchema.findById(req.params.id).select("-password");

  res.json(user);
});


export const updateUser = asyncHandler(async (req, res) => {

  const user = await userSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(user);
});