import React from "react";
import { useDrag } from "react-dnd";
import { mockUsers } from "../data/mockData";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Calendar, Users } from "lucide-react";
function ProjectCard({ project }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PROJECT",
    item: { id: project._id, status: project.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));
  const owner = mockUsers.find((u) => u._id === project.owner);
  const members = mockUsers.filter((u) => project.members.includes(u._id));
  const stickyColors = [
    { bg: "#FEFF9C", text: "#000" },
    { bg: "#FF7EB9", text: "#000" },
    { bg: "#7AFCFF", text: "#000" },
    { bg: "#A0FF7A", text: "#000" },
    { bg: "#FFB366", text: "#000" }
  ];
  const colorIndex = project._id.length % stickyColors.length;
  const rotation = project._id.charCodeAt(0) % 8 - 4;
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
        className: "relative p-5 rounded-sm min-h-[200px]",
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
      /* @__PURE__ */ React.createElement("div", { className: "space-y-3", style: { fontFamily: "Indie Flower, cursive" } }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-2" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold leading-tight" }, project.title), /* @__PURE__ */ React.createElement(
        Badge,
        {
          variant: project.status === "active" ? "default" : "secondary",
          className: "text-xs",
          style: { fontFamily: "sans-serif" }
        },
        project.status
      )), /* @__PURE__ */ React.createElement("p", { className: "text-lg line-clamp-2 leading-snug" }, project.description), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-base pt-2" }, /* @__PURE__ */ React.createElement(Calendar, { className: "w-4 h-4" }), /* @__PURE__ */ React.createElement("span", null, new Date(project.startDate).toLocaleDateString()), /* @__PURE__ */ React.createElement("span", null, "-"), /* @__PURE__ */ React.createElement("span", null, new Date(project.endDate).toLocaleDateString())), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pt-2 border-t border-black/20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Users, { className: "w-4 h-4" }), /* @__PURE__ */ React.createElement("div", { className: "flex -space-x-2" }, members.slice(0, 3).map((member) => /* @__PURE__ */ React.createElement(Avatar, { key: member._id, className: "w-6 h-6 border-2 border-white" }, /* @__PURE__ */ React.createElement(AvatarImage, { src: member.avatar, alt: member.name }), /* @__PURE__ */ React.createElement(AvatarFallback, { className: "text-xs" }, member.name.charAt(0)))), members.length > 3 && /* @__PURE__ */ React.createElement("div", { className: "w-6 h-6 rounded-full bg-black/10 border-2 border-white flex items-center justify-center text-xs" }, "+", members.length - 3))), /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "by ", owner?.name)))
    )
  );
}
export {
  ProjectCard
};
