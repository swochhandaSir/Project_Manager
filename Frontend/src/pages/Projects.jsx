import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ProjectColumn } from "../components/ProjectColumn";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { getProjects, updateProject } from "../api/projectApi";
import { SkeletonCard } from "../components/SkeletonCard";

function Projects() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleDrop = async (projectId, newStatus) => {
		// Persist drag-and-drop status changes to the backend
		try {
			await updateProject(projectId, { status: newStatus });
			setProjects((prev) =>
				prev.map((project) =>
					project._id === projectId ? { ...project, status: newStatus } : project,
				),
			);
			toast.success("Project status updated");
		} catch (err) {
			console.error(err);
			toast.error(err.response?.data?.message || "Failed to update project status");
		}
	};

	useEffect(() => {
		const loadProjects = async () => {
			try {
				setLoading(true);
				const projects = await getProjects();
				setProjects(projects);
			} catch (err) {
				console.error(err);
				toast.error(err.response?.data?.message || "Failed to load projects");
			} finally {
				setLoading(false);
			}
		};

		loadProjects();
	}, []);

	const activeProjects = projects.filter((p) => p.status === "active");
	const completedProjects = projects.filter((p) => p.status === "completed");
	const navigate = useNavigate();
	const openCreateProject = () => {
		navigate("/projects/new");
	};

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
							<Skeleton className="h-5 w-48 bg-white/40" />
						</div>

						<Skeleton className="h-10 w-36 bg-white/55" />
					</div>

					<div className="flex gap-0 overflow-x-hidden overflow-y-hidden">
						{[
							{ title: "To Do", border: true, colors: ["#FEFF9C", "#FF7EB9"] },
							{ title: "Done", border: false, colors: ["#7AFCFF", "#A0FF7A"] },
						].map((column) => (
							<div
								key={column.title}
								className="flex-1 min-w-[350px] p-6"
								style={{ borderRight: column.border ? "3px solid #333" : "none" }}
							>
								<div className="mb-8">
									<h3
										className="text-3xl font-bold mb-2"
										style={{
											fontFamily: "Indie Flower, cursive",
											color: "#333",
										}}
									>
										{column.title}
									</h3>
									<div className="h-1 bg-black/80 rounded-full" style={{ width: "80%" }} />
								</div>

								<div className="space-y-6">
									{column.colors.map((color, index) => (
										<SkeletonCard
											key={`${column.title}-${index}`}
											variant="project-card"
											color={color}
											rotation={[2, -3, 3, -2][index]}
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
						Project Management
					</h1>
				</div>

				<Button onClick={openCreateProject} className="gap-2 bg-blue-500 hover:bg-blue-600 text-white shadow-lg">
					<Plus className="w-4 h-4" />
					New Project
				</Button>
			</div>

			<DndProvider backend={HTML5Backend}>
				<div className="flex gap-0 overflow-x-hidden overflow-y-hidden">
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
