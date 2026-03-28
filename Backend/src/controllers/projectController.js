import projectSchema from "../models/projectModel.js"
import { asyncHandler } from "../utils/asyncHandler.js";

export const createProject = asyncHandler(async (req, res) => {

  const project = await projectSchema.create(req.body);

  res.status(201).json(project);
});


export const getProjects = asyncHandler(async (req, res) => {

  const projects = await projectSchema.find()
    .populate("owner", "name email")
    .populate("members", "name email");

  res.json(projects);
});


export const getProjectById = asyncHandler(async (req, res) => {

  const project = await projectSchema.findById(req.params.id)
    .populate("owner", "name email")
    .populate("members", "name email");

  res.json(project);
});


export const updateProject = asyncHandler(async (req, res) => {

  const project = await projectSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(project);
});


export const deleteProject = asyncHandler(async (req, res) => {

  await projectSchema.findByIdAndDelete(req.params.id);

  res.json({ message: "Project deleted" });
});