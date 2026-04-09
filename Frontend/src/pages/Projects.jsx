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
	const navigate = useNavigate();

	const handleDrop = async (projectId, newStatus) => {
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
				const projectsData = await getProjects();
				setProjects(projectsData);
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

	if (loading) {
		return (
			<div
				className="min-h-screen px-4 py-6 sm:px-6 sm:py-8"
				style={{
					background: "linear-gradient(135deg, #E8F4F8 0%, #D4E7ED 100%)",
				}}
			>
				<div className="mx-auto w-full max-w-7xl">
					<div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<Skeleton className="mb-3 h-12 w-72 bg-white/60" />
							<Skeleton className="h-5 w-48 bg-white/40" />
						</div>
						<Skeleton className="h-10 w-full max-w-[9rem] bg-white/55" />
					</div>

					<div className="grid grid-cols-1 overflow-hidden rounded-sm border-3 border-black/80 bg-white/10 md:grid-cols-2">
						{[
							{ title: "To Do", border: true, colors: ["#FEFF9C", "#FF7EB9"] },
							{ title: "Done", border: false, colors: ["#7AFCFF", "#A0FF7A"] },
						].map((column) => (
							<div
								key={column.title}
								className="p-4 sm:p-6"
								style={{
									borderRight: column.border ? "3px solid #333" : "none",
									borderBottom: column.border ? "3px solid #333" : "none",
								}}
							>
								<div className="mb-8">
									<h3
										className="mb-2 text-2xl font-bold sm:text-3xl"
										style={{
											fontFamily: "Indie Flower, cursive",
											color: "#333",
										}}
									>
										{column.title}
									</h3>
									<div className="h-1 rounded-full bg-black/80" style={{ width: "80%" }} />
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
			className="min-h-screen px-4 py-6 sm:px-6 sm:py-8"
			style={{
				background: "linear-gradient(135deg, #E8F4F8 0%, #D4E7ED 100%)",
			}}
		>
			<div className="mx-auto max-w-7xl">
				<div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1
							className="mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl"
							style={{
								fontFamily: "Indie Flower, cursive",
								color: "#333",
							}}
						>
							Project Management
						</h1>
					</div>

					<Button
						onClick={() => navigate("/projects/new")}
						className="w-full gap-2 bg-blue-500 text-white shadow-lg hover:bg-blue-600 sm:w-auto"
					>
						<Plus className="w-4 h-4" />
						New Project
					</Button>
				</div>

				<DndProvider backend={HTML5Backend}>
					<div className="grid grid-cols-1 overflow-hidden rounded-sm border-3 border-black/80 bg-white/10 md:grid-cols-2">
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
		</div>
	);
}

export { Projects };
