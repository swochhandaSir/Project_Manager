import API from "./axios";

export const createProject = async (data) => {
  const res = await API.post("/projects", data);
  return res.data;
};

export const getProjects = async () => {
  const res = await API.get("/projects");
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await API.delete(`/projects/${id}`);
  return res.data;
};

export const getProjectById = async (id) => {
  const res = await API.get(`/projects/${id}`);
  return res.data;
};

export const updateProject = async (id, payload) => {
  const res = await API.put(`/projects/${id}`, payload);
  return res.data;
};