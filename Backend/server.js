import express from "express";

const port = 3000;

const startServer = async () => {
	const app = express();
	app.use(express.json());
	app.listen(3000, () => {
		console.log("Server running on port " + port);
	});
};

startServer();
