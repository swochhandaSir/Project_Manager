import commentSchema from "../models/commentModel.js";
import projectSchema from "../models/projectModel.js";
import taskSchema from "../models/taskModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createComment = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const { projectId, taskId, message } = req.body;
  if (!projectId || !message?.trim()) {
    return res.status(400).json({ message: "projectId and message are required" });
  }

  const project = await projectSchema.findOne({
    _id: projectId,
    $or: [{ owner: req.user.id }, { members: req.user.id }],
  });
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (taskId) {
    const task = await taskSchema.findOne({ _id: taskId, projectId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
  }

  const comment = await commentSchema.create({
    projectId,
    taskId: taskId ?? null,
    userId: req.user.id,
    message: message.trim(),
  });

  const populated = await commentSchema.findById(comment._id).populate("userId", "name avatar");
  res.status(201).json(populated);
});


export const getTaskComments = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const task = await taskSchema.findById(req.params.taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const project = await projectSchema.findOne({
    _id: task.projectId,
    $or: [{ owner: req.user.id }, { members: req.user.id }],
  });
  if (!project) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const comments = await commentSchema.find({
    taskId: req.params.taskId
  }).populate("userId", "name avatar").sort({ createdAt: -1 });

  res.json(comments);
});

export const getProjectComments = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const project = await projectSchema.findOne({
    _id: req.params.projectId,
    $or: [{ owner: req.user.id }, { members: req.user.id }],
  });
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const comments = await commentSchema.find({
    projectId: req.params.projectId,
    taskId: null,
  }).populate("userId", "name avatar").sort({ createdAt: -1 });

  res.json(comments);
});

export const deleteComment = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const comment = await commentSchema.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (String(comment.userId) !== String(req.user.id)) {
    return res.status(403).json({ message: "You can only delete your own comment" });
  }

  await comment.deleteOne();

  res.json({ message: "Comment deleted" });
});