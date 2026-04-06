import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

// attach accessToken automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error?.config;
    const status = error?.response?.status;

    if (!original || original.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refreshRes = await API.post("/auth/refresh");
        const newAccess = refreshRes.data?.accessToken;
        if (newAccess) {
          localStorage.setItem("accessToken", newAccess);
        }
        return API(original);
      } catch (refreshErr) {
        localStorage.removeItem("accessToken");
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  },
);

export default API;