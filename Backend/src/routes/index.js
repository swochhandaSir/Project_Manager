import express from "express";
import projectRoute from "./projectRoute.js";
import userRoute from "./userRoute.js";
import authRoute from "./authRoute.js";
import taskRoute from "./taskRoute.js";
import commentRoute from "./commentRoute.js";
import { verifyToken } from "../middleware/verifyToken.js";

const routes = express.Router();
routes.use("/projects",verifyToken, projectRoute);
routes.use("/user", userRoute);
routes.use("/auth", authRoute);
routes.use("/task", verifyToken, taskRoute);
routes.use("/comment", verifyToken, commentRoute);
export default routes;
