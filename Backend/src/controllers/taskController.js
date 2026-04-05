import taskSchema from "../models/taskModel.js";
import projectSchema from "../models/projectModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createTask = asyncHandler(async (req, res) => {

  if (!req.body.title?.trim()) {
    return res.status(400).json({ message: "Task title is required" });
  }

  if (!req.body.projectId) {
    return res.status(400).json({ message: "projectId is required" });
  }

  const task = await taskSchema.create({
    ...req.body,
    title: req.body.title.trim(),
    assignedTo: req.body.assignedTo ?? req.user?.id,
  });

  res.status(201).json(task);
});


export const getTasks = asyncHandler(async (req, res) => {

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

  const tasks = await taskSchema.find({
    projectId: req.params.projectId
  })
    .populate("assignedTo", "name email avatar")
    .populate("projectId", "title");

  res.json(tasks);
});

export const getMyTasks = asyncHandler(async (req, res) => {

  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const tasks = await taskSchema
    .find({ assignedTo: req.user.id })
    .populate("assignedTo", "name email avatar")
    .populate("projectId", "title");

  res.json(tasks);
});


export const updateTask = asyncHandler(async (req, res) => {

  const task = await taskSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(task);
});


export const deleteTask = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const task = await taskSchema.findById(req.params.id);
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

  await task.deleteOne();

  res.json({ message: "Task deleted" });
});