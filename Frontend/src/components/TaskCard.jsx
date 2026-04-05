import React from "react";
import { useDrag } from "react-dnd";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Calendar, Flag, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

function TaskCard({ task, onDelete }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const assignedUser = task.assignedTo && typeof task.assignedTo === "object"
    ? task.assignedTo
    : null;
  const project = task.projectId && typeof task.projectId === "object"
    ? task.projectId
    : null;

  const priorityColors = {
    low: "text-green-600 bg-green-100",
    medium: "text-yellow-600 bg-yellow-100",
    high: "text-red-600 bg-red-100",
  };

  // Match the Projects/Dashboard sticky-note palette (stable per id)
  const stickyColors = [
    { bg: "#FEFF9C", text: "#000" },
    { bg: "#FF7EB9", text: "#000" },
    { bg: "#7AFCFF", text: "#000" },
    { bg: "#A0FF7A", text: "#000" },
  ];

  const taskId = task._id ?? "";
  const hash = taskId
    ? Array.from(taskId).reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
    : 0;
  const colorIndex = stickyColors.length ? hash % stickyColors.length : 0;
  const rotations = [2, -3, 3, -2];
  const rotation = rotations.length ? rotations[hash % rotations.length] : 0;

  const dueText = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A";
  const createdText = task.createdAt ? new Date(task.createdAt).toLocaleString() : "N/A";

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: `rotate(${rotation}deg)`,
      }}
      className="cursor-move hover:scale-105 transition-all"
    >
      <div
        className="relative p-4 rounded-sm min-h-[150px]"
        style={{
          backgroundColor: stickyColors[colorIndex].bg,
          color: stickyColors[colorIndex].text,
          boxShadow: `
            0 1px 3px rgba(0,0,0,0.12),
            0 4px 8px rgba(0,0,0,0.15),
            0 8px 16px rgba(0,0,0,0.1)
          `,
        }}
      >
        <div
          className="space-y-3"
          style={{ fontFamily: "Indie Flower, cursive" }}
        >
          {/* Title + Priority */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold leading-tight">
              {task.title}
            </h3>

            <Badge
              variant="secondary"
              className={`${priorityColors[task.priority]} text-xs border-none`}
              style={{ fontFamily: "sans-serif" }}
            >
              <Flag className="w-3 h-3 mr-1" />
              {task.priority}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-base line-clamp-2 leading-snug">
            {task.description}
          </p>

          {/* Project */}
          <div className="flex items-center gap-2 text-xs">
            <Badge
              variant="outline"
              className="text-xs border-black/30 bg-white/70"
              style={{ fontFamily: "sans-serif" }}
            >
              {project?.title ?? "Project"}
            </Badge>
          </div>

          {/* Due Date */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            <span>
              {dueText}
            </span>
          </div>
          <p className="text-xs opacity-80">Created: {createdText}</p>

          {/* Assigned User */}
          <div className="flex items-center gap-2 pt-2 border-t border-black/20">
            <Avatar className="w-6 h-6 border-2 border-white">
              <AvatarImage
                src={assignedUser?.avatar}
                alt={assignedUser?.name}
              />
              <AvatarFallback className="text-xs">
                {(assignedUser?.name ?? "?").charAt(0)}
              </AvatarFallback>
            </Avatar>

            <span className="text-sm">{assignedUser?.name ?? "Unassigned"}</span>

          {onDelete && (
            <div className="pt-1 ml-auto">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task._id);
                }}
              >
                <Trash2 className="w-4 h-4 mr-1" />
              </Button>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { TaskCard };