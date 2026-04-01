import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  const API = axios.create({
    baseURL: "http://localhost:3000/api",
  });

  API.interceptors.request.use((config) => {

    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // LOGIN
  const login = async (email, password) => {
    try {

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      const { accessToken } = res.data;

      localStorage.setItem("accessToken", accessToken);

      await Promise.all([fetchCurrentUser(), fetchUsers()]);

      return true;

    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // REGISTER
  const register = async (name, email, password) => {
    try {

      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      return true;

    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const fetchUsers = async () => {
    try {

      const res = await API.get("/user");

      setUser(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  const fetchCurrentUser= async () => {
    try {

      const res = await API.get("/auth/me");

      setCurrentUser(res.data);

    } catch (error) {
      console.error(error);
      // If the JWT is stale/invalid, clear it so the app doesn't keep failing on every refresh.
      const status = error?.response?.status;
      if (status === 401 || status === 404) {
        localStorage.removeItem("accessToken");
        setCurrentUser(null);
        setUser(null);
      }
    }
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("accessToken");

    setUser(null);
    setCurrentUser(null);
  };

  // load session on refresh
  useEffect(() => {

    const init = async () => {

      const token = localStorage.getItem("accessToken");

      if (token) {
        await Promise.all([fetchCurrentUser()]);
      }

      setAuthReady(true);

    };

    init();

  }, []);

  return (
    <AuthContext.Provider
      value={{
        authReady,
        currentUser,
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {

  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}