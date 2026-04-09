import React from "react";
import { useDrag } from "react-dnd";
import { useNavigate } from "react-router";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Calendar, Users } from "lucide-react";

function ProjectCard({ project }) {
  const navigate = useNavigate();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PROJECT",
    item: { id: project._id, status: project.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const owner = project.owner;
  const members = Array.isArray(project.members) ? project.members : [];

  const stickyColors = [
    { bg: "#FEFF9C", text: "#000" },
    { bg: "#FF7EB9", text: "#000" },
    { bg: "#7AFCFF", text: "#000" },
    { bg: "#A0FF7A", text: "#000" },
  ];

  const projectId = project._id ?? "";
  const hash = projectId
    ? Array.from(projectId).reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
    : 0;
  const colorIndex = stickyColors.length ? hash % stickyColors.length : 0;
  const rotations = [2, -3, 3, -2];
  const rotation = rotations.length ? rotations[hash % rotations.length] : 0;

  const startText = project.startDate
    ? new Date(project.startDate).toLocaleDateString()
    : "N/A";
  const endText = project.endDate
    ? new Date(project.endDate).toLocaleDateString()
    : "N/A";
  const createdText = project.createdAt
    ? new Date(project.createdAt).toLocaleString()
    : "N/A";

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: `rotate(${rotation}deg)`,
      }}
      className="cursor-pointer transition-all hover:scale-[1.02]"
      onClick={() => project?._id && navigate(`/projects/${project._id}`)}
    >
      <div
        className="relative min-h-[200px] rounded-sm p-4 sm:p-5"
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <h3 className="text-lg font-bold leading-tight sm:text-xl">
              {project.title}
            </h3>

            <Badge
              variant={
                project.status === "active" ? "default" : "secondary"
              }
              className="w-fit text-xs"
              style={{ fontFamily: "sans-serif" }}
            >
              {project.status}
            </Badge>
          </div>

          <p className="line-clamp-3 text-base leading-snug sm:text-lg">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2 text-sm sm:text-base">
            <Calendar className="w-4 h-4" />
            <span>
              {startText}
            </span>
            <span>-</span>
            <span>
              {endText}
            </span>
          </div>
          <p className="text-xs opacity-80">Created: {createdText}</p>

          <div className="flex flex-col gap-3 border-t border-black/20 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />

              <div className="flex -space-x-2">
                {members.slice(0, 3).map((member) => (
                  <Avatar
                    key={member._id}
                    className="w-6 h-6 border-2 border-white"
                  >
                    <AvatarImage
                      src={member.avatar}
                      alt={member.name ?? "Member"}
                    />
                    <AvatarFallback className="text-xs">
                      {(member.name ?? "?").charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ))}

                {members.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-black/10 border-2 border-white flex items-center justify-center text-xs">
                    +{members.length - 3}
                  </div>
                )}
              </div>
            </div>

            <span className="text-sm break-words">by {owner?.name ?? "Unknown"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProjectCard };
