import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { LayoutDashboard, FolderKanban, ListChecks, LogOut } from "lucide-react";
function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return /* @__PURE__ */ React.createElement(
    "nav",
    {
      className: "px-6 py-4 border-b-4 border-black/80",
      style: {
        background: "linear-gradient(135deg, #E8F4F8 0%, #D4E7ED 100%)"
      }
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-8" }, /* @__PURE__ */ React.createElement(Link, { to: "/dashboard", className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "bg-blue-500 p-2 rounded-lg shadow-md transform rotate-3" }, /* @__PURE__ */ React.createElement(FolderKanban, { className: "w-6 h-6 text-white" })), /* @__PURE__ */ React.createElement(
      "span",
      {
        className: "text-3xl font-bold",
        style: {
          fontFamily: "Indie Flower, cursive",
          color: "#333"
        }
      },
      "ProjectHub"
    )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Link, { to: "/dashboard" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        variant: "ghost",
        className: "gap-2 hover:bg-white/50",
        style: { fontFamily: "Indie Flower, cursive", fontSize: "18px" }
      },
      /* @__PURE__ */ React.createElement(LayoutDashboard, { className: "w-5 h-5" }),
      "Dashboard"
    )), /* @__PURE__ */ React.createElement(Link, { to: "/projects" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        variant: "ghost",
        className: "gap-2 hover:bg-white/50",
        style: { fontFamily: "Indie Flower, cursive", fontSize: "18px" }
      },
      /* @__PURE__ */ React.createElement(FolderKanban, { className: "w-5 h-5" }),
      "Projects"
    )), /* @__PURE__ */ React.createElement(Link, { to: "/tasks" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        variant: "ghost",
        className: "gap-2 hover:bg-white/50",
        style: { fontFamily: "Indie Flower, cursive", fontSize: "18px" }
      },
      /* @__PURE__ */ React.createElement(ListChecks, { className: "w-5 h-5" }),
      "Tasks"
    )))), /* @__PURE__ */ React.createElement(DropdownMenu, null, /* @__PURE__ */ React.createElement(DropdownMenuTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(
      Button,
      {
        variant: "ghost",
        className: "gap-2 hover:bg-white/50",
        style: { fontFamily: "Indie Flower, cursive", fontSize: "16px" }
      },
      /* @__PURE__ */ React.createElement(Avatar, { className: "w-8 h-8" }, /* @__PURE__ */ React.createElement(AvatarImage, { src: user?.avatar, alt: user?.name }), /* @__PURE__ */ React.createElement(AvatarFallback, null, user?.name.charAt(0))),
      /* @__PURE__ */ React.createElement("span", null, user?.name)
    )), /* @__PURE__ */ React.createElement(DropdownMenuContent, { align: "end" }, /* @__PURE__ */ React.createElement(DropdownMenuLabel, null, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-1" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium leading-none" }, user?.name), /* @__PURE__ */ React.createElement("p", { className: "text-xs leading-none text-gray-500" }, user?.email), /* @__PURE__ */ React.createElement("p", { className: "text-xs leading-none text-blue-600 mt-1" }, user?.role))), /* @__PURE__ */ React.createElement(DropdownMenuSeparator, null), /* @__PURE__ */ React.createElement(DropdownMenuItem, { onClick: handleLogout }, /* @__PURE__ */ React.createElement(LogOut, { className: "mr-2 h-4 w-4" }), /* @__PURE__ */ React.createElement("span", null, "Log out")))))
  );
}
export {
  Navbar
};
