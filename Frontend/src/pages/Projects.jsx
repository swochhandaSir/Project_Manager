import React from "react";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { mockProjects } from "../data/mockData";
import { ProjectColumn } from "../components/ProjectColumn";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
function Projects() {
  const [projects, setProjects] = useState(mockProjects);
  const handleDrop = (projectId, newStatus) => {
    setProjects(
      (prev) => prev.map(
        (project) => project._id === projectId ? { ...project, status: newStatus } : project
      )
    );
    toast.success("Project status updated");
  };
  const activeProjects = projects.filter((p) => p.status === "active");
  const completedProjects = projects.filter((p) => p.status === "completed");

  return (
    <div
      className="min-h-screen p-8"
      style={{
        background: "linear-gradient(135deg, #E8F4F8 0%, #D4E7ED 100%)",
      }}
    >
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1
            className="text-5xl font-bold mb-2"
            style={{
              fontFamily: "Indie Flower, cursive",
              color: "#333",
            }}
          >
            Project Management
          </h1>
        </div>

        <Button className="gap-2 bg-blue-500 hover:bg-blue-600 text-white shadow-lg">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className="flex gap-0 overflow-x-auto">
          <ProjectColumn
            title="To Do"
            status="active"
            projects={activeProjects}
            onDrop={handleDrop}
          />

          <ProjectColumn
            title="Done"
            status="completed"
            projects={completedProjects}
            onDrop={handleDrop}
          />
        </div>
      </DndProvider>
    </div>
  );
}

export { Projects };