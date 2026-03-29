import express from "express";
import projectRoute from "./projectRoute.js";
import userRoute from "./userRoute.js";
import authRoute from "./authRoute.js";
import taskRoute from "./taskRoute.js";
import commentRoute from "./commentRoute.js";
import { verifyToken } from "../middleware/verifyToken.js";

const routes = express.Router();
routes.use("/project", verifyToken, projectRoute);
routes.use("/user", verifyToken, userRoute);
routes.use("/auth", verifyToken, authRoute);
routes.use("/task", verifyToken, taskRoute);
routes.use("/comment", verifyToken, commentRoute);
export default routes;
