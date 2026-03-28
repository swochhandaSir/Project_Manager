import taskSchema from "../models/taskModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createTask = asyncHandler(async (req, res) => {

  const task = await taskSchema.create(req.body);

  res.status(201).json(task);
});


export const getTasks = asyncHandler(async (req, res) => {

  const tasks = await taskSchema.find({
    projectId: req.params.projectId
  }).populate("assignedTo", "name email");

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

  await taskSchema.findByIdAndDelete(req.params.id);

  res.json({ message: "Task deleted" });
});