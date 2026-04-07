import express from "express";
import { errorHandler } from "./src/middleware/errorMiddleware.js";
import routes from "./src/routes/index.js";
import cors from "cors";
import connectDb from "./src/config/db.js";
import cookieParser from "cookie-parser";
import { startDueReminderCron } from "./src/services/dueReminders.js";

const port = 3000;
const allowedOrigins = [
	process.env.FRONTEND_URL,
].filter(Boolean);

const startServer = async () => {
	const app = express();
	app.use(
		cors({
			origin: (origin, callback) => {
				if (!origin || allowedOrigins.includes(origin)) {
					return callback(null, true);
				}

				return callback(new Error("Not allowed by CORS"));
			},
			credentials: true,
		}),
	);
	await connectDb();
	startDueReminderCron();
	app.use(express.json());
	app.use(cookieParser());
	app.use("/api", routes);
	app.use(errorHandler);
	app.listen(3000, () => {
		console.log("Server running on port " + port);
	});
};

startServer();
