import React from "react";
import { createContext, useContext, useState } from "react";
import { mockUsers } from "../data/mockData";
const AuthContext = createContext(void 0);
function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const login = (email, password) => {
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };
  const register = (name, email, password) => {
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      return false;
    }
    const newUser = {
      _id: Date.now().toString(),
      name,
      email,
      password,
      role: "member",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return true;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };
  return /* @__PURE__ */ React.createElement(AuthContext.Provider, { value: { user, login, register, logout } }, children);
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export {
  AuthProvider,
  useAuth
};
