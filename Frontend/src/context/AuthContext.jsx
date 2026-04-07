import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCurrentUser, loginRequest, logoutRequest, registerRequest } from "../api/authApi";
import { AUTH_EXPIRED_EVENT } from "../api/axios";
import { getUsers } from "../api/userApi";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  const clearSession = useCallback(() => {
    localStorage.removeItem("accessToken");
    setCurrentUser(null);
    setUser(null);
  }, []);

  // LOGIN
  const login = async (email, password) => {
    try {
      const { accessToken } = await loginRequest(email, password);

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
      await registerRequest(name, email, password);

      return true;

    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const fetchUsers = async () => {
    try {

      const users = await getUsers();
      setUser(users);

    } catch (error) {
      console.error(error);
    }
  };

  const fetchCurrentUser= async () => {
    try {

      const me = await getCurrentUser();
      setCurrentUser(me);

    } catch (error) {
      console.error(error);
      const status = error?.response?.status;
      if (status === 401 || status === 404) {
        clearSession();
      }
    }
  };

  // LOGOUT
  const logout = () => {

    clearSession();
    logoutRequest().catch(() => {});
  };

  // load session on refresh
  useEffect(() => {

    const init = async () => {
      await fetchCurrentUser();

      setAuthReady(true);

    };

    init();

  }, []);

  useEffect(() => {
    const handleAuthExpired = () => {
      clearSession();
    };

    window.addEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);

    return () => {
      window.removeEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
    };
  }, [clearSession]);

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
