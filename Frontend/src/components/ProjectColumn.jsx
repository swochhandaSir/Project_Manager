import React from "react";
import { useDrop } from "react-dnd";
import { ProjectCard } from "./ProjectCard";

function ProjectColumn({ title, status, projects, onDrop }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PROJECT",
    drop: (item) => {
      if (item.status !== status) {
        onDrop(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`min-w-0 flex-1 p-4 transition-all relative sm:p-6 md:min-w-[320px] ${
        status !== "completed" ? "border-b-[3px] border-black/80 md:border-b-0 md:border-r-[3px]" : ""
      } ${
        isOver ? "bg-blue-100/30" : ""
      }`}
    >
      <div className="mb-8">
        <h3
          className="mb-2 text-2xl font-bold sm:text-3xl"
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

      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}

export { ProjectColumn };
