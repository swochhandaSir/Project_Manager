import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TaskColumn } from "../components/TaskColumn";
import { Skeleton } from "../components/ui/skeleton";
import { toast } from "sonner";
import { deleteTask, getMyTasks, updateTask } from "../api/taskApi";
import { SkeletonCard } from "../components/SkeletonCard";
function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDrop = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? { ...task, status: newStatus } : task)),
      );
      toast.success("Task status updated");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update task status");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      toast.success("Task deleted");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete task");
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const tasks = await getMyTasks();
        setTasks(tasks);
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);
  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const completedTasks = tasks.filter((t) => t.status === "completed");
 
  if (loading) {
    return (
      <div
        className="min-h-screen p-8"
        style={{
          background: "linear-gradient(135deg, #E8F4F8 0%, #D4E7ED 100%)",
        }}
      >
        <div className="w-full">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Skeleton className="h-12 w-72 mb-3 bg-white/60" />
              <Skeleton className="h-5 w-44 bg-white/40" />
            </div>
          </div>

          <div className="flex gap-0 overflow-x-auto">
            {["To Do", "Doing", "Done"].map((title, columnIndex) => (
              <div
                key={title}
                className="flex-1 min-w-[350px] p-6"
                style={{
                  borderRight: title !== "Done" ? "3px solid #333" : "none",
                }}
              >
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

                  <div className="h-1 bg-black/80 rounded-full" style={{ width: "80%" }} />
                </div>

                <div className="space-y-6">
                  {["#FEFF9C", "#FF7EB9"].map((color, cardIndex) => (
                    <SkeletonCard
                      key={`${title}-${cardIndex}`}
                      variant="task-card"
                      color={color}
                      rotation={[2, -3, 3, -2][(columnIndex + cardIndex) % 4]}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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

      </div>

      <DndProvider backend={HTML5Backend}>
        <div className="flex gap-0 overflow-x-auto">
          <TaskColumn
            title="To Do"
            status="todo"
            tasks={todoTasks}
            color="bg-gray-400"
            onDrop={handleDrop}
            onDeleteTask={handleDeleteTask}
          />

          <TaskColumn
            title="Doing"
            status="in-progress"
            tasks={inProgressTasks}
            color="bg-blue-500"
            onDrop={handleDrop}
            onDeleteTask={handleDeleteTask}
          />

          <TaskColumn
            title="Done"
            status="completed"
            tasks={completedTasks}
            color="bg-green-500"
            onDrop={handleDrop}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </DndProvider>
    </div>
  );
}

export { Tasks };
