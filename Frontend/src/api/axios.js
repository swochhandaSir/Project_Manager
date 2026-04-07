import axios from "axios";

export const AUTH_EXPIRED_EVENT = "auth:expired";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

const notifyAuthExpired = () => {
  localStorage.removeItem("accessToken");
  window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
};

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

    if (original?.url?.includes("/auth/refresh")) {
      if (status === 401) {
        notifyAuthExpired();
      }

      return Promise.reject(error);
    }

    if (!original) {
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
        notifyAuthExpired();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  },
);

export default API;
