import React from "react";
import { Outlet, Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Navbar } from "../components/Navbar";
function MainLayout() {
  const { user } = useAuth();
  if (!user) {
    return /* @__PURE__ */ React.createElement(Navigate, { to: "/login", replace: true });
  }
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-gray-100" }, /* @__PURE__ */ React.createElement(Navbar, null), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(Outlet, null)));
}
export {
  MainLayout
};
