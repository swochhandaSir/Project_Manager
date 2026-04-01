import projectSchema from "../models/projectModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createProject = asyncHandler(async (req, res) => {
	if (!req.user) {
		return res.status(401).json({ message: "Not authorized" });
	}

	if (!req.body.title?.trim()) {
		return res.status(400).json({ message: "Project name is required" });
	}

	const project = await projectSchema.create({
		title: req.body.title.trim(),
		description: req.body.description,
		owner: req.user.id,
		status: req.body.status,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		members: Array.isArray(req.body.members) ? req.body.members : [req.user.id],
	});

	res.status(201).json(project);
});

export const getProjects = asyncHandler(async (req, res) => {
	if (!req.user) {
		return res.status(401).json({ message: "Not authorized" });
	}

	const projects = await projectSchema
		.find({
			$or: [{ owner: req.user.id }, { members: req.user.id }],
		})
		.populate("owner", "name email")
		.populate("members", "name email avatar");

	res.json(projects);
});

export const getProjectById = asyncHandler(async (req, res) => {
	if (!req.user) {
		return res.status(401).json({ message: "Not authorized" });
	}

	const project = await projectSchema
		.findOne({
			_id: req.params.id,
			$or: [{ owner: req.user.id }, { members: req.user.id }],
		})
		.populate("owner", "name email")
		.populate("members", "name email avatar");

	if (!project) {
		return res.status(404).json({ message: "Project not found" });
	}

	res.json(project);
});

export const updateProject = asyncHandler(async (req, res) => {
	if (!req.user) {
		return res.status(401).json({ message: "Not authorized" });
	}

	const existing = await projectSchema.findById(req.params.id);
	if (!existing) {
		return res.status(404).json({ message: "Project not found" });
	}

	// Only the owner can change members/details for now
	if (String(existing.owner) !== String(req.user.id)) {
		return res.status(403).json({ message: "Only the project owner can update this project" });
	}

	const updates = { ...req.body };

	// Normalize members: ensure owner included, remove duplicates
	if (updates.members !== undefined) {
		const incoming = Array.isArray(updates.members) ? updates.members : [];
		const normalized = [...new Set([String(existing.owner), ...incoming.map(String)])];
		updates.members = normalized;
	}

	const project = await projectSchema.findByIdAndUpdate(req.params.id, updates, {
		new: true,
	})
		.populate("owner", "name email")
		.populate("members", "name email avatar");

	res.json(project);
});

export const deleteProject = asyncHandler(async (req, res) => {
	await projectSchema.findByIdAndDelete(req.params.id);

	res.json({ message: "Project deleted" });
});
