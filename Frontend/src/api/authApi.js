import API from "./axios";

export const loginRequest = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  return res.data;
};

export const registerRequest = async (name, email, password) => {
  const res = await API.post("/auth/register", { name, email, password });
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await API.get("/auth/me");
  return res.data;
};

export const logoutRequest = async () => {
  const res = await API.post("/auth/logout");
  return res.data;
};

