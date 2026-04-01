import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

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

      await fetchCurrentUser();

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
    }
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("accessToken");

    setUser(null);
  };

  // load user on refresh
  useEffect(() => {

    const token = localStorage.getItem("accessToken");

    if (token) {
      fetchUsers();
    }

  }, []);

  return (
    <AuthContext.Provider
      value={{
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