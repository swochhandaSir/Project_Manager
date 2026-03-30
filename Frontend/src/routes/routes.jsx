import React from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { MainLayout } from "../layouts/MainLayout";
import { Landing } from "../pages/Landing";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";
import { Projects } from "../pages/Projects";
import { Tasks } from "../pages/Tasks";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
