import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { StatCard } from "../components/StatCard";
import { SkeletonCard } from "../components/SkeletonCard";
import { FolderKanban, ListChecks, Users } from "lucide-react";
import { Link } from "react-router";
import { getProjects } from "../api/projectApi";
import { getMyTasks } from "../api/taskApi";
import { getUsers } from "../api/userApi";
function Dashboard() {
  const { currentUser, authReady } = useAuth();
  const [myProjects, setMyProjects] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [allUsersCount, setAllUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authReady || !currentUser) {
      setMyProjects([]);
      setMyTasks([]);
      setAllUsersCount(0);
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        const [projects, tasks, users] = await Promise.all([
          getProjects(),
          getMyTasks(),
          getUsers(),
        ]);

        setMyProjects(projects);
        setMyTasks(tasks);
        setAllUsersCount(Array.isArray(users) ? users.length : 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [authReady, currentUser]);

  const todoTasks = useMemo(
    () => myTasks.filter((t) => t.status === "todo").length,
    [myTasks],
  );
  const inProgressTasks = useMemo(
    () => myTasks.filter((t) => t.status === "in-progress").length,
    [myTasks],
  );
  const completedTasks = useMemo(
    () => myTasks.filter((t) => t.status === "completed").length,
    [myTasks],
  );

  const activeProjects = useMemo(
    () => myProjects.filter((p) => p.status === "active").length,
    [myProjects],
  );

  const teamMembersCount = useMemo(() => {
    const ids = new Set();
    for (const p of myProjects) {
      if (p?.owner?._id) ids.add(String(p.owner._id));
      if (p?.owner) ids.add(String(p.owner));
      if (Array.isArray(p.members)) {
        for (const m of p.members) {
          if (m?._id) ids.add(String(m._id));
          else if (m) ids.add(String(m));
        }
      }
    }
    return ids.size || allUsersCount;
  }, [myProjects, allUsersCount]);
  const stickyColors = [
    { bg: "#FEFF9C", text: "#000" },
    { bg: "#FF7EB9", text: "#000" },
    { bg: "#7AFCFF", text: "#000" },
    { bg: "#A0FF7A", text: "#000" }
  ];

  return (
    <div
      className="p-8 min-h-screen"
      style={{
        background: "linear-gradient(135deg, #E8F4F8 0%, #D4E7ED 100%)",
      }}
    >
      {loading ? (
        <>
          <div className="mb-8">
            <h1
              className="text-5xl font-bold mb-2"
              style={{
                fontFamily: "Indie Flower, cursive",
                color: "#333",
              }}
            >
              Welcome back...
            </h1>

            <p
              className="text-xl"
              style={{
                fontFamily: "Indie Flower, cursive",
                color: "#666",
              }}
            >
              Loading your dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[stickyColors[0], stickyColors[1], stickyColors[2]].map((color, index) => (
              <SkeletonCard
                key={index}
                variant="stat"
                color={color.bg}
                rotation={[2, -3, 3][index]}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <SkeletonCard variant="list" color="#FEFF9C" rotation={-1} />
            <SkeletonCard variant="projects" color="#FF7EB9" rotation={2} />
          </div>

          <SkeletonCard variant="tasks" color="#7AFCFF" rotation={1} items={5} />
        </>
      ) : (
        <>
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-5xl font-bold mb-2"
          style={{
            fontFamily: "Indie Flower, cursive",
            color: "#333",
          }}
        >
          Welcome back, {currentUser?.name}!
        </h1>

        <p
          className="text-xl"
          style={{
            fontFamily: "Indie Flower, cursive",
            color: "#666",
          }}
        >
          Here's what's happening with your projects today.
        </p>
      </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "Total Projects",
                value: myProjects.length,
                subtitle: `${activeProjects} active`,
                icon: FolderKanban,
                color: stickyColors[0],
              },
              {
                title: "My Tasks",
                value: myTasks.length,
                subtitle: `${inProgressTasks} in progress`,
                icon: ListChecks,
                color: stickyColors[1],
              },
              {
                title: "Team Members",
                value: teamMembersCount,
                subtitle: "Active users",
                icon: Users,
                color: stickyColors[2],
              },
            ].map((stat, index) => {
              const rotation = [2, -3, 3, -2][index];
              return (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  subtitle={stat.subtitle}
                  icon={stat.icon}
                  color={stat.color}
                  rotation={rotation}
                />
              );
            })}
          </div>

      {/* Overview + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Tasks Overview */}
        <div
          className="p-6 rounded-sm"
          style={{
            backgroundColor: "#FEFF9C",
            transform: "rotate(-1deg)",
            boxShadow: `
              0 1px 3px rgba(0,0,0,0.12),
              0 4px 8px rgba(0,0,0,0.15),
              0 8px 16px rgba(0,0,0,0.1)
            `,
          }}
        >
          <h3
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "Indie Flower, cursive", color: "#333" }}
          >
            My Tasks Overview
          </h3>

          <div className="space-y-4">
            {/* To Do */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-400 rounded-full" />
                <span className="text-lg" style={{ fontFamily: "Indie Flower, cursive" }}>
                  To Do
                </span>
              </div>
              <span className="text-2xl font-bold" style={{ fontFamily: "Indie Flower, cursive" }}>
                {todoTasks}
              </span>
            </div>

            {/* In Progress */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full" />
                <span className="text-lg" style={{ fontFamily: "Indie Flower, cursive" }}>
                  In Progress
                </span>
              </div>
              <span className="text-2xl font-bold" style={{ fontFamily: "Indie Flower, cursive" }}>
                {inProgressTasks}
              </span>
            </div>

            {/* Completed */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded-full" />
                <span className="text-lg" style={{ fontFamily: "Indie Flower, cursive" }}>
                  Completed
                </span>
              </div>
              <span className="text-2xl font-bold" style={{ fontFamily: "Indie Flower, cursive" }}>
                {completedTasks}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        <div
          className="p-6 rounded-sm"
          style={{
            backgroundColor: "#FF7EB9",
            transform: "rotate(2deg)",
            boxShadow: `
              0 1px 3px rgba(0,0,0,0.12),
              0 4px 8px rgba(0,0,0,0.15),
              0 8px 16px rgba(0,0,0,0.1)
            `,
          }}
        >
          <h3
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "Indie Flower, cursive", color: "#333" }}
          >
            Recent Projects
          </h3>

        <div className="space-y-4">
          {myProjects.slice(0, 3).map((project) => (
              <Link key={project._id} to={`/projects/${project._id}`}>
                <div className="p-3 bg-white/10 rounded-md hover:bg-white/60 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <h4
                      className="text-lg font-bold"
                      style={{ fontFamily: "Indie Flower, cursive" }}
                    >
                      {project.title}
                    </h4>

                    <Badge
                      variant={project.status === "active" ? "default" : "secondary"}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {project.status}
                    </Badge>
                  </div>

                  <p
                    className="text-base line-clamp-1"
                    style={{ fontFamily: "Indie Flower, cursive" }}
                  >
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Active Tasks */}
      <div
        className="p-6 rounded-sm"
        style={{
          backgroundColor: "#7AFCFF",
          transform: "rotate(1deg)",
          boxShadow: `
            0 1px 3px rgba(0,0,0,0.12),
            0 4px 8px rgba(0,0,0,0.15),
            0 8px 16px rgba(0,0,0,0.1)
          `,
        }}
      >
        <h3
          className="text-2xl font-bold mb-6"
          style={{ fontFamily: "Indie Flower, cursive", color: "#333" }}
        >
          My Active Tasks
        </h3>

        <div className="space-y-4">
          {myTasks
            .filter((t) => t.status !== "completed")
            .slice(0, 5)
            .map((task) => {
              const assignedUser = task.assignedTo;
              const project = task.projectId;

              return (
                <div
                  key={task._id}
                  className="flex items-center gap-4 p-4 bg-white/10 rounded-md"
                >
                  <Avatar className="w-10 h-10 border-2 border-white">
                    <AvatarImage
                      src={assignedUser?.avatar}
                      alt={assignedUser?.name}
                    />
                    <AvatarFallback>
                      {assignedUser?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h4
                      className="text-lg font-bold"
                      style={{ fontFamily: "Indie Flower, cursive" }}
                    >
                      {task.title}
                    </h4>

                    <p
                      className="text-base"
                      style={{ fontFamily: "Indie Flower, cursive" }}
                    >
                      {project?.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        task.priority === "high"
                          ? "destructive"
                          : task.priority === "medium"
                          ? "default"
                          : "secondary"
                      }
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {task.priority}
                    </Badge>

                    <Badge
                      variant="outline"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {task.status}
                    </Badge>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
        </>
      )}
    </div>
  );
}

export { Dashboard };
