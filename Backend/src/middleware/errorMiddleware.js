export const errorHandler = (err, req, res, next) => {
	console.log(err);
	const statusCode = err.statusCode || 500;
	const status = err.status || "fail";
	const details = err.details;
	const message = err.message || "Something went wrong";

	res.status(statusCode).json({
		message,
		details,
		status,
		statusCode,
	});
};

class AppError extends Error {
	constructor(message, statusCode = 500, errors = null) {
		super(message);
		this.statusCode = statusCode;
		this.errors = errors;
		this.isOperational = true;
		Error.captureStackTrace(this, this.constructor);
	}
}

export default AppError;
