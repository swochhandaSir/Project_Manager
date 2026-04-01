import React from "react";
import { Outlet, Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Navbar } from "../components/Navbar";

function MainLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export { MainLayout };
