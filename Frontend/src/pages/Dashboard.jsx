import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { StatCard } from "../components/StatCard";
import { SkeletonCard } from "../components/SkeletonCard";
import { FolderKanban, ListChecks, Users, Plus } from "lucide-react";
import { Link } from "react-router";
import { getProjects } from "../api/projectApi";
import { getMyTasks } from "../api/taskApi";
import { getUsers } from "../api/userApi";
import { Button } from "../components/ui/button";

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
		{ bg: "#A0FF7A", text: "#000" },
	];

	return (
		<div
			className="min-h-screen px-4 py-6 sm:px-6 sm:py-8"
			style={{
				background: "linear-gradient(135deg, #E8F4F8 0%, #D4E7ED 100%)",
			}}
		>
			<div className="mx-auto max-w-7xl">
				{loading ? (
					<>
						<div className="mb-8">
							<h1
								className="mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl"
								style={{
									fontFamily: "Indie Flower, cursive",
									color: "#333",
								}}
							>
								Welcome back...
							</h1>

							<p
								className="text-lg sm:text-xl"
								style={{
									fontFamily: "Indie Flower, cursive",
									color: "#666",
								}}
							>
								Loading your dashboard.
							</p>
						</div>

						<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							{[stickyColors[0], stickyColors[1], stickyColors[2]].map((color, index) => (
								<SkeletonCard
									key={index}
									variant="stat"
									color={color.bg}
									rotation={[2, -3, 3][index]}
								/>
							))}
						</div>

						<div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
							<SkeletonCard variant="list" color="#FEFF9C" rotation={-1} />
							<SkeletonCard variant="projects" color="#FF7EB9" rotation={2} />
						</div>

						<SkeletonCard variant="tasks" color="#7AFCFF" rotation={1} items={5} />
					</>
				) : (
					<>
						<div className="mb-8">
							<h1
								className="mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl"
								style={{
									fontFamily: "Indie Flower, cursive",
									color: "#333",
								}}
							>
								Welcome back, {currentUser?.name}!
							</h1>

							<p
								className="text-lg sm:text-xl"
								style={{
									fontFamily: "Indie Flower, cursive",
									color: "#666",
								}}
							>
								Here's what's happening with your projects today.
							</p>
						</div>

						<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							{[
								{
									title: "Total Projects",
									value: myProjects.length,
									subtitle: `${activeProjects} active`,
									icon: FolderKanban,
									color: stickyColors[0],
									link: "/projects",
								},
								{
									title: "My Tasks",
									value: myTasks.length,
									subtitle: `${inProgressTasks} in progress`,
									icon: ListChecks,
									color: stickyColors[1],
									link: "/tasks",
								},
								{
									title: "Team Members",
									value: teamMembersCount,
									subtitle: "Active users",
									icon: Users,
									color: stickyColors[2],
								},
							].map((stat, index) => (
								stat.link ? (
									<Link key={stat.title} to={stat.link} className="block">
										<StatCard
											title={stat.title}
											value={stat.value}
											subtitle={stat.subtitle}
											icon={stat.icon}
											color={stat.color}
											rotation={[2, -3, 3, -2][index]}
											className="hover:scale-105 transition-transform duration-200 cursor-pointer"
										/>
									</Link>
								) : (
									<StatCard
										key={stat.title}
										title={stat.title}
										value={stat.value}
										subtitle={stat.subtitle}
										icon={stat.icon}
										color={stat.color}
										rotation={[2, -3, 3, -2][index]}
									/>
								)
							))}
						</div>

						<div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
							<div
								className="rounded-sm p-5 sm:p-6"
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
									className="mb-6 text-xl font-bold sm:text-2xl"
									style={{ fontFamily: "Indie Flower, cursive", color: "#333" }}
								>
									My Tasks Overview
								</h3>

								<div className="space-y-4">
									{[
										{ label: "To Do", count: todoTasks, dot: "bg-gray-400" },
										{ label: "In Progress", count: inProgressTasks, dot: "bg-blue-500" },
										{ label: "Completed", count: completedTasks, dot: "bg-green-500" },
									].map((item) => (
										<div key={item.label} className="flex items-center justify-between gap-3">
											<div className="flex items-center gap-3">
												<div className={`h-4 w-4 rounded-full ${item.dot}`} />
												<span className="text-base sm:text-lg" style={{ fontFamily: "Indie Flower, cursive" }}>
													{item.label}
												</span>
											</div>
											<span className="text-xl font-bold sm:text-2xl" style={{ fontFamily: "Indie Flower, cursive" }}>
												{item.count}
											</span>
										</div>
									))}
								</div>
							</div>

							<div
								className="rounded-sm p-5 sm:p-6"
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
								<div className="mb-6 flex items-center justify-between">
									<h3
										className="text-xl font-bold sm:text-2xl"
										style={{ fontFamily: "Indie Flower, cursive", color: "#333" }}
									>
										Recent Projects
									</h3>
									<Link to="/projects/new">
										<Button
											size="sm"
											className="bg-white/20 hover:bg-white/30 text-black border border-white/30 hover:border-white/50 transition-colors"
										>
											<Plus className="w-4 h-4 mr-2" />
											Create Project
										</Button>
									</Link>
								</div>

								<div className="space-y-4">
									{myProjects.slice(0, 3).map((project) => (
										<Link key={project._id} to={`/projects/${project._id}`}>
											<div className="rounded-md bg-white/10 p-3 transition-colors hover:bg-white/60">
												<div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
													<h4
														className="text-base font-bold sm:text-lg"
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
													className="line-clamp-2 text-sm sm:text-base"
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

						<div
							className="rounded-sm p-5 sm:p-6"
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
								className="mb-6 text-xl font-bold sm:text-2xl"
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
												className="flex flex-col gap-3 rounded-md bg-white/10 p-4 sm:flex-row sm:items-center"
											>
												<Avatar className="h-10 w-10 border-2 border-white">
													<AvatarImage
														src={assignedUser?.avatar}
														alt={assignedUser?.name}
													/>
													<AvatarFallback>
														{assignedUser?.name?.charAt(0)}
													</AvatarFallback>
												</Avatar>

												<div className="min-w-0 flex-1">
													<h4
														className="text-base font-bold sm:text-lg"
														style={{ fontFamily: "Indie Flower, cursive" }}
													>
														{task.title}
													</h4>

													<p
														className="truncate text-sm sm:text-base"
														style={{ fontFamily: "Indie Flower, cursive" }}
													>
														{project?.title}
													</p>
												</div>

												<div className="flex flex-wrap items-center gap-2">
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

													<Badge variant="outline" style={{ fontFamily: "sans-serif" }}>
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
		</div>
	);
}

export { Dashboard };
