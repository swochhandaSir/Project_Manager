import React from "react";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { mockTasks } from "../data/mockData";
import { TaskColumn } from "../components/TaskColumn";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
function Tasks() {
  const [tasks, setTasks] = useState(mockTasks);
  const handleDrop = (taskId, newStatus) => {
    setTasks(
      (prev) => prev.map(
        (task) => task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
    toast.success("Task status updated");
  };
  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const completedTasks = tasks.filter((t) => t.status === "completed");
 
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
            Task Management
          </h1>
        </div>

        <Button className="gap-2 bg-blue-500 hover:bg-blue-600 text-white shadow-lg">
          <Plus className="w-4 h-4" />
          New Task
        </Button>
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className="flex gap-0 overflow-x-auto">
          <TaskColumn
            title="To Do"
            status="todo"
            tasks={todoTasks}
            color="bg-gray-400"
            onDrop={handleDrop}
          />

          <TaskColumn
            title="Doing"
            status="in-progress"
            tasks={inProgressTasks}
            color="bg-blue-500"
            onDrop={handleDrop}
          />

          <TaskColumn
            title="Done"
            status="completed"
            tasks={completedTasks}
            color="bg-green-500"
            onDrop={handleDrop}
          />
        </div>
      </DndProvider>
    </div>
  );
}

export { Tasks };