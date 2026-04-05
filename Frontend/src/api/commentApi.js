import API from "./axios";

export const getProjectComments = async (projectId) => {
  const res = await API.get(`/comment/project/${projectId}`);
  return res.data;
};

export const getTaskComments = async (taskId) => {
  const res = await API.get(`/comment/task/${taskId}`);
  return res.data;
};

export const createComment = async (payload) => {
  const res = await API.post("/comment", payload);
  return res.data;
};

export const deleteComment = async (commentId) => {
  const res = await API.delete(`/comment/${commentId}`);
  return res.data;
};

