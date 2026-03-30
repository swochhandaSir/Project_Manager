import React from "react";
import { useDrag } from "react-dnd";
import { mockUsers, mockProjects } from "../data/mockData";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Calendar, Flag } from "lucide-react";
function TaskCard({ task }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));
  const assignedUser = mockUsers.find((u) => u._id === task.assignedTo);
  const project = mockProjects.find((p) => p._id === task.projectId);
  const priorityColors = {
    low: "text-green-600 bg-green-100",
    medium: "text-yellow-600 bg-yellow-100",
    high: "text-red-600 bg-red-100"
  };
  const stickyColors = [
    { bg: "#FEFF9C", text: "#000" },
    { bg: "#FF7EB9", text: "#000" },
    { bg: "#7AFCFF", text: "#000" },
    { bg: "#A0FF7A", text: "#000" },
    { bg: "#FFB366", text: "#000" }
  ];
  const colorIndex = task._id.length % stickyColors.length;
  const rotation = task._id.charCodeAt(0) % 8 - 4;
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      ref: drag,
      style: {
        opacity: isDragging ? 0.5 : 1,
        transform: `rotate(${rotation}deg)`
      },
      className: "cursor-move hover:scale-105 transition-all"
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "relative p-5 rounded-sm min-h-[180px]",
        style: {
          backgroundColor: stickyColors[colorIndex].bg,
          color: stickyColors[colorIndex].text,
          boxShadow: `
            0 1px 3px rgba(0,0,0,0.12),
            0 4px 8px rgba(0,0,0,0.15),
            0 8px 16px rgba(0,0,0,0.1)
          `
        }
      },
      /* @__PURE__ */ React.createElement("div", { className: "space-y-3", style: { fontFamily: "Indie Flower, cursive" } }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-2" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold leading-tight" }, task.title), /* @__PURE__ */ React.createElement(
        Badge,
        {
          variant: "secondary",
          className: `${priorityColors[task.priority]} text-xs border-none`,
          style: { fontFamily: "sans-serif" }
        },
        /* @__PURE__ */ React.createElement(Flag, { className: "w-3 h-3 mr-1" }),
        task.priority
      )), /* @__PURE__ */ React.createElement("p", { className: "text-lg line-clamp-2 leading-snug" }, task.description), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-xs" }, /* @__PURE__ */ React.createElement(Badge, { variant: "outline", className: "text-xs border-black/30 bg-white/70", style: { fontFamily: "sans-serif" } }, project?.title)), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-base" }, /* @__PURE__ */ React.createElement(Calendar, { className: "w-4 h-4" }), /* @__PURE__ */ React.createElement("span", null, new Date(task.dueDate).toLocaleDateString())), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 pt-2 border-t border-black/20" }, /* @__PURE__ */ React.createElement(Avatar, { className: "w-7 h-7 border-2 border-white" }, /* @__PURE__ */ React.createElement(AvatarImage, { src: assignedUser?.avatar, alt: assignedUser?.name }), /* @__PURE__ */ React.createElement(AvatarFallback, { className: "text-xs" }, assignedUser?.name.charAt(0))), /* @__PURE__ */ React.createElement("span", { className: "text-base" }, assignedUser?.name)))
    )
  );
}
export {
  TaskCard
};
