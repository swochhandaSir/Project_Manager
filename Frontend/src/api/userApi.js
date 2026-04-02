import API from "./axios";

export const getUsers = async () => {
  const res = await API.get("/user");
  return res.data;
};

