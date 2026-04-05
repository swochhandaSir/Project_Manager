import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
	LayoutDashboard,
	FolderKanban,
	ListChecks,
	LogOut,
} from "lucide-react";
function Navbar() {
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();
	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<nav
			className="px-6 py-4 border-b-4 border-black/80"
			style={{
				background: "linear-gradient(135deg, #E8F4F8 0%, #D4E7ED 100%)",
			}}
		>
			<div className="flex items-center justify-between">
				{/* Left Section */}
				<div className="flex items-center gap-8">
					<Link
						to="/dashboard"
						className="flex items-center gap-3"
					>
						<div className="bg-blue-500 p-2 rounded-lg shadow-md transform rotate-3">
							<FolderKanban className="w-6 h-6 text-white" />
						</div>

						<span
							className="text-3xl font-bold"
							style={{
								fontFamily: "Indie Flower, cursive",
								color: "#333",
							}}
						>
							ProjectHub
						</span>
					</Link>

					<div className="flex items-center gap-2">
						<Link to="/dashboard">
							<Button
								variant="ghost"
								className="gap-2 hover:bg-white/50"
								style={{
									fontFamily: "Indie Flower, cursive",
									fontSize: "18px",
								}}
							>
								<LayoutDashboard className="w-5 h-5" />
								Dashboard
							</Button>
						</Link>

						<Link to="/projects">
							<Button
								variant="ghost"
								className="gap-2 hover:bg-white/50"
								style={{
									fontFamily: "Indie Flower, cursive",
									fontSize: "18px",
								}}
							>
								<FolderKanban className="w-5 h-5" />
								Projects
							</Button>
						</Link>

						<Link to="/tasks">
							<Button
								variant="ghost"
								className="gap-2 hover:bg-white/50"
								style={{
									fontFamily: "Indie Flower, cursive",
									fontSize: "18px",
								}}
							>
								<ListChecks className="w-5 h-5" />
								My Tasks
							</Button>
						</Link>
					</div>
				</div>

				{/* Right Section */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="gap-2 hover:bg-white/50"
							style={{
								fontFamily: "Indie Flower, cursive",
								fontSize: "16px",
							}}
						>
							<Avatar className="w-8 h-8">
								<AvatarImage
									src={currentUser?.avatar}
									alt={currentUser?.name}
								/>
								<AvatarFallback>
									{currentUser?.name?.charAt(0) ?? "?"}
								</AvatarFallback>
							</Avatar>
							<span>{currentUser?.name ?? "Account"}</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">{currentUser?.name}</p>
								<p className="text-xs leading-none text-gray-500">{currentUser?.email}</p>
								<p className="text-xs leading-none text-blue-600 mt-1">{currentUser?.role}</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />

						<DropdownMenuItem onClick={handleLogout}>
							<LogOut className="mr-2 h-4 w-4" />
							<span>Log out</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	);
}

export { Navbar };
