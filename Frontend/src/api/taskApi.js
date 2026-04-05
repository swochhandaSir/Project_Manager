import API from "./axios";

export const getProjectTasks = async (projectId) => {
  const res = await API.get(`/task/${projectId}`);
  return res.data;
};

export const getMyTasks = async () => {
  const res = await API.get("/task/my");
  return res.data;
};

export const createTask = async (payload) => {
  const res = await API.post("/task", payload);
  return res.data;
};

export const updateTask = async (taskId, payload) => {
  const res = await API.put(`/task/${taskId}`, payload);
  return res.data;
};

export const deleteTask = async (taskId) => {
  const res = await API.delete(`/task/${taskId}`);
  return res.data;
};

