import express from "express";
import { errorHandler } from "./src/middleware/errorMiddleware.js";
import routes from "./src/routes/index.js";
import cors from "cors";
import connectDb from "./src/config/db.js";
import cookieParser from "cookie-parser";

const port = 3000;

const startServer = async () => {
	const app = express();
	app.use(
		cors({
			origin: "http://localhost:5173",
			credentials: true,
		}),
	);
	await connectDb();
	app.use(express.json());
	app.use(cookieParser());
	app.use("/api", routes);
	app.use(errorHandler);
	app.listen(3000, () => {
		console.log("Server running on port " + port);
	});
};

startServer();
