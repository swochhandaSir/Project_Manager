import React from "react";
import { useDrop } from "react-dnd";
import { TaskCard } from "./TaskCard";
function TaskColumn({ title, status, tasks, color, onDrop }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => {
      if (item.status !== status) {
        onDrop(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      ref: drop,
      className: `flex-1 min-w-[350px] p-6 transition-all relative ${isOver ? "bg-blue-100/30" : ""}`,
      style: {
        borderRight: status !== "completed" ? "3px solid #333" : "none"
      }
    },
    /* @__PURE__ */ React.createElement("div", { className: "mb-8" }, /* @__PURE__ */ React.createElement(
      "h3",
      {
        className: "text-3xl font-bold mb-2",
        style: {
          fontFamily: "Indie Flower, cursive",
          color: "#333"
        }
      },
      title
    ), /* @__PURE__ */ React.createElement("div", { className: "h-1 bg-black/80 rounded-full", style: { width: "80%" } })),
    /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, tasks.map((task) => /* @__PURE__ */ React.createElement(TaskCard, { key: task._id, task })))
  );
}
export {
  TaskColumn
};
