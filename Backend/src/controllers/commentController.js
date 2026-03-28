import commentSchema from "../models/commentModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createComment = asyncHandler(async (req, res) => {

  const comment = await commentSchema.create(req.body);

  res.status(201).json(comment);
});


export const getComments = asyncHandler(async (req, res) => {

  const comments = await commentSchema.find({
    taskId: req.params.taskId
  }).populate("userId", "name avatar");

  res.json(comments);
});


export const deleteComment = asyncHandler(async (req, res) => {

  await commentSchema.findByIdAndDelete(req.params.id);

  res.json({ message: "Comment deleted" });
});