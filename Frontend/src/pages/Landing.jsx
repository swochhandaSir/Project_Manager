import React from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { ArrowRight, FolderKanban, Users, Zap, CheckCircle, Calendar, TrendingUp } from "lucide-react";

function Landing() {
	const features = [
		{
			title: "Kanban Boards",
			description: "Organize projects and tasks with intuitive drag-and-drop sticky notes",
			icon: FolderKanban,
			color: "#FEFF9C",
			rotation: -2,
		},
		{
			title: "Team Collaboration",
			description: "Work together seamlessly with your team members",
			icon: Users,
			color: "#FF7EB9",
			rotation: 3,
		},
		{
			title: "Lightning Fast",
			description: "Quick and responsive interface for maximum productivity",
			icon: Zap,
			color: "#7AFCFF",
			rotation: -3,
		},
		{
			title: "Track Progress",
			description: "Monitor task completion and project milestones",
			icon: CheckCircle,
			color: "#A0FF7A",
			rotation: 2,
		},
		{
			title: "Due Dates",
			description: "Never miss a deadline with built-in date tracking",
			icon: Calendar,
			color: "#FFB366",
			rotation: -1,
		},
		{
			title: "Analytics",
			description: "Get insights into team performance and productivity",
			icon: TrendingUp,
			color: "#FEFF9C",
			rotation: 3,
		},
	];

	return (
		<div
			className="min-h-screen"
			style={{
				background: "linear-gradient(135deg, #E8F4F8 0%, #D4E7ED 100%)",
			}}
		>
			<nav className="border-b-4 border-black/80 bg-white/30 px-4 py-4 backdrop-blur-sm sm:px-6">
				<div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center gap-3">
						<div className="rounded-lg bg-blue-500 p-2 shadow-md rotate-3">
							<FolderKanban className="h-6 w-6 text-white" />
						</div>
						<span
							className="text-2xl font-bold sm:text-3xl"
							style={{
								fontFamily: "Indie Flower, cursive",
								color: "#333",
							}}
						>
							ProjectHub
						</span>
					</div>

					<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
						<Link to="/login">
							<Button
								variant="ghost"
								className="w-full text-lg sm:w-auto"
								style={{ fontFamily: "Indie Flower, cursive" }}
							>
								Login
							</Button>
						</Link>

						<Link to="/register">
							<Button
								className="w-full gap-2 bg-blue-500 text-lg text-white shadow-lg hover:bg-blue-600 sm:w-auto"
								style={{ fontFamily: "Indie Flower, cursive" }}
							>
								Get Started
								<ArrowRight className="h-4 w-4" />
							</Button>
						</Link>
					</div>
				</div>
			</nav>

			<section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
				<div className="mb-16 text-center">
					<h1
						className="mb-6 text-4xl font-bold sm:text-5xl lg:text-7xl"
						style={{
							fontFamily: "Indie Flower, cursive",
							color: "#333",
							lineHeight: "1.2",
						}}
					>
						Project Management <br /> Made Simple
					</h1>

					<p
						className="mx-auto mb-8 max-w-2xl text-lg sm:text-xl lg:text-2xl"
						style={{
							fontFamily: "Indie Flower, cursive",
							color: "#666",
						}}
					>
						Organize your projects with virtual sticky notes on a digital whiteboard. Simple,
						visual, and fun!
					</p>

					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
						<Link to="/register">
							<Button
								size="lg"
								className="w-full gap-2 bg-blue-500 px-8 py-6 text-lg text-white shadow-xl hover:bg-blue-600 sm:w-auto sm:text-xl"
								style={{ fontFamily: "Indie Flower, cursive" }}
							>
								Start Free
								<ArrowRight className="h-5 w-5" />
							</Button>
						</Link>

						<Link to="/login">
							<Button
								size="lg"
								variant="outline"
								className="w-full border-2 border-black/20 px-8 py-6 text-lg sm:w-auto sm:text-xl"
								style={{ fontFamily: "Indie Flower, cursive" }}
							>
								Try Demo
							</Button>
						</Link>
					</div>
				</div>

				<div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
					{[
						{ title: "Easy to use", body: "No learning curve!", color: "#FEFF9C", rotate: "-8deg" },
						{ title: "Drag & Drop", body: "Move tasks easily", color: "#FF7EB9", rotate: "5deg" },
						{ title: "Team Ready", body: "Collaborate now", color: "#7AFCFF", rotate: "3deg" },
						{ title: "Free Forever", body: "Start today!", color: "#A0FF7A", rotate: "-5deg" },
					].map((item) => (
						<div
							key={item.title}
							className="rounded-sm p-6 shadow-xl"
							style={{
								backgroundColor: item.color,
								transform: `rotate(${item.rotate})`,
								boxShadow: `
                  0 2px 4px rgba(0,0,0,0.12),
                  0 6px 12px rgba(0,0,0,0.15),
                  0 12px 24px rgba(0,0,0,0.1)
                `,
							}}
						>
							<p className="text-xl font-bold" style={{ fontFamily: "Indie Flower, cursive" }}>
								{item.title}
							</p>
							<p className="mt-2 text-lg" style={{ fontFamily: "Indie Flower, cursive" }}>
								{item.body}
							</p>
						</div>
					))}
				</div>
			</section>

			<section className="border-y-4 border-black/80 bg-white/30 px-4 py-14 backdrop-blur-sm sm:px-6 sm:py-20">
				<div className="mx-auto max-w-7xl">
					<h2
						className="mb-4 text-center text-3xl font-bold sm:text-4xl lg:text-5xl"
						style={{ fontFamily: "Indie Flower, cursive", color: "#333" }}
					>
						Everything You Need
					</h2>

					<p
						className="mb-12 text-center text-lg sm:text-xl"
						style={{ fontFamily: "Indie Flower, cursive", color: "#666" }}
					>
						Powerful features in a simple package
					</p>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{features.map((feature) => {
							const Icon = feature.icon;
							return (
								<div
									key={feature.title}
									className="min-h-[180px] cursor-pointer rounded-sm p-5 transition-transform hover:scale-[1.02] sm:p-6"
									style={{
										backgroundColor: feature.color,
										transform: `rotate(${feature.rotation}deg)`,
										boxShadow: `
                      0 2px 4px rgba(0,0,0,0.12),
                      0 6px 12px rgba(0,0,0,0.15),
                      0 12px 24px rgba(0,0,0,0.1)
                    `,
									}}
								>
									<div className="mb-4 flex items-center gap-3">
										<div className="rounded-lg bg-white/50 p-2">
											<Icon className="h-6 w-6" />
										</div>

										<h3
											className="text-xl font-bold sm:text-2xl"
											style={{ fontFamily: "Indie Flower, cursive" }}
										>
											{feature.title}
										</h3>
									</div>

									<p className="text-base sm:text-lg" style={{ fontFamily: "Indie Flower, cursive" }}>
										{feature.description}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20">
				<div
					className="rounded-sm p-6 sm:p-10 lg:p-12"
					style={{
						backgroundColor: "#FEFF9C",
						transform: "rotate(-1deg)",
						boxShadow: `
              0 4px 8px rgba(0,0,0,0.12),
              0 12px 24px rgba(0,0,0,0.15),
              0 24px 48px rgba(0,0,0,0.1)
            `,
					}}
				>
					<h2
						className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl"
						style={{ fontFamily: "Indie Flower, cursive", color: "#333" }}
					>
						Ready to Get Started?
					</h2>

					<p
						className="mb-8 text-lg sm:text-xl lg:text-2xl"
						style={{ fontFamily: "Indie Flower, cursive", color: "#666" }}
					>
						Join thousands of teams using ProjectHub to stay organized
					</p>

					<Link to="/register">
						<Button
							size="lg"
							className="w-full gap-2 bg-blue-500 px-8 py-6 text-lg text-white shadow-xl hover:bg-blue-600 sm:w-auto sm:px-12 sm:py-8 sm:text-2xl"
							style={{ fontFamily: "Indie Flower, cursive" }}
						>
							Start Free Now
							<ArrowRight className="h-6 w-6" />
						</Button>
					</Link>
				</div>
			</section>

			<footer className="border-t-4 border-black/80 bg-white/30 px-4 py-8 backdrop-blur-sm sm:px-6">
				<div className="mx-auto max-w-7xl text-center">
					<p
						className="text-base sm:text-lg"
						style={{ fontFamily: "Indie Flower, cursive", color: "#666" }}
					>
						© 2026 ProjectHub. Made for better project management.
					</p>
				</div>
			</footer>
		</div>
	);
}

export { Landing };
