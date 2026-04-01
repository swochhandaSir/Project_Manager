import jwt from "jsonwebtoken";

export const access = (user) => {
	return jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN, {
		expiresIn: "5m",
	});
};

export const refresh = (user) => {
	return jwt.sign({ id: user._id, email: user.email }, process.env.REFRESH_TOKEN, {
		expiresIn: "10m",
	});
};
