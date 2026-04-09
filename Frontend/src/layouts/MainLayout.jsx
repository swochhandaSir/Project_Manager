import React from "react";
import { Outlet, Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Navbar } from "../components/Navbar";

function MainLayout() {
  const { currentUser, authReady } = useAuth();

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500">
        Loading…
      </div>
    );
  }

  const token = localStorage.getItem("accessToken");
  if (!token || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-100">
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export { MainLayout };
