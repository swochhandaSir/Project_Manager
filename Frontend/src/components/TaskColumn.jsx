import React from "react";
import { useDrop } from "react-dnd";
import { TaskCard } from "./TaskCard";

function TaskColumn({ title, status, tasks, color, onDrop, onDeleteTask }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => {
      if (item.status !== status) {
        onDrop(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const priorityRank = { high: 0, medium: 1, low: 2 };
  const sortedTasks = [...tasks].sort((a, b) => {
    const aRank = priorityRank[a.priority] ?? 99;
    const bRank = priorityRank[b.priority] ?? 99;
    if (aRank !== bRank) return aRank - bRank;
    return String(b._id ?? "").localeCompare(String(a._id ?? ""));
  });

  return (
    <div
      ref={drop}
      className={`flex-1 min-w-[350px] p-6 transition-all relative ${
        isOver ? "bg-blue-100/30" : ""
      }`}
      style={{
        borderRight: status !== "completed" ? "3px solid #333" : "none",
      }}
    >
      {/* Column Header */}
      <div className="mb-8">
        <h3
          className="text-3xl font-bold mb-2"
          style={{
            fontFamily: "Indie Flower, cursive",
            color: "#333",
          }}
        >
          {title}
        </h3>

        <div
          className="h-1 bg-black/80 rounded-full"
          style={{ width: "80%" }}
        />
      </div>

      {/* Tasks List */}
      <div className="space-y-6">
        {sortedTasks.map((task) => (
          <TaskCard key={task._id} task={task} onDelete={onDeleteTask} />
        ))}
      </div>
    </div>
  );
}

export { TaskColumn };