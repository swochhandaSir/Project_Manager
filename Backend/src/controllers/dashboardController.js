import projectSchema from "../models/projectModel.js";
import taskSchema from "../models/taskModel.js";
import userSchema from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cacheGetJson, cacheSetJson, trackUserCacheKey } from "../utils/cache.js";

const DASHBOARD_TTL_SECONDS = 60;

export const getDashboard = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const cacheKey = `dashboard:${req.user.id}`;
  const cached = await cacheGetJson(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const [projects, myTasks, usersCount] = await Promise.all([
    projectSchema
      .find({
        $or: [{ owner: req.user.id }, { members: req.user.id }],
      })
      .populate("owner", "name email")
      .populate("members", "name email avatar"),
    taskSchema
      .find({ assignedTo: req.user.id })
      .populate("assignedTo", "name email avatar")
      .populate("projectId", "title"),
    userSchema.countDocuments(),
  ]);

  const payload = {
    projects,
    myTasks,
    usersCount,
  };

  await cacheSetJson(cacheKey, payload, DASHBOARD_TTL_SECONDS);
  await trackUserCacheKey(req.user.id, cacheKey);

  res.json(payload);
});
