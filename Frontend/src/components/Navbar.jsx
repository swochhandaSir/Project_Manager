import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
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
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";
import {
	LayoutDashboard,
	FolderKanban,
	ListChecks,
	LogOut,
	Menu,
} from "lucide-react";

function Navbar() {
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const isActiveRoute = (path) => {
		if (path === "/projects") {
			return location.pathname.startsWith("/projects");
		}

		return location.pathname === path;
	};

	const navButtonClass = (path) =>
		`gap-2 transition-all ${
			isActiveRoute(path)
				? "text-blue-700 font-semibold shadow-md scale-[1.02]"
				: "hover:bg-white/50"
		}`;

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const navLinks = [
		{
			to: "/dashboard",
			label: "Dashboard",
			icon: LayoutDashboard,
		},
		{
			to: "/projects",
			label: "Projects",
			icon: FolderKanban,
		},
		{
			to: "/tasks",
			label: "My Tasks",
			icon: ListChecks,
		},
	];

	return (
		<nav
			className="border-b-4 border-black/80 px-4 py-4 sm:px-6"
			style={{
				background: "linear-gradient(135deg, #E8F4F8 0%, #D4E7ED 100%)",
			}}
		>
			<div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
				<div className="flex items-center justify-between gap-4 lg:flex-1">
					<Link
						to="/dashboard"
						className="flex items-center gap-3"
					>
						<div className="bg-blue-500 p-2 rounded-lg shadow-md transform rotate-3">
							<FolderKanban className="w-6 h-6 text-white" />
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
					</Link>

					<div className="hidden lg:flex lg:flex-wrap lg:items-center lg:gap-2">
						{navLinks.map(({ to, label, icon: Icon }) => (
							<Link key={to} to={to} className="w-full lg:w-auto">
								<Button
									variant="ghost"
									className={`${navButtonClass(to)} w-full justify-start lg:w-auto lg:justify-center`}
									style={{
										fontFamily: "Indie Flower, cursive",
										fontSize: "18px",
									}}
								>
									<Icon className="w-5 h-5" />
									{label}
								</Button>
							</Link>
						))}
					</div>

					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="lg:hidden"
								aria-label="Open navigation menu"
							>
								<Menu className="h-6 w-6" />
							</Button>
						</SheetTrigger>
						<SheetContent
							side="right"
							className="border-l-4 border-black/80 px-0"
							style={{
								background: "linear-gradient(180deg, #E8F4F8 0%, #D4E7ED 100%)",
							}}
						>
							<SheetHeader className="border-b-2 border-black/10 pb-4">
								<SheetTitle
									style={{ fontFamily: "Indie Flower, cursive" }}
									className="text-2xl text-left"
								>
									Menu
								</SheetTitle>
								<SheetDescription className="text-left text-gray-600">
									Open a page or manage your account.
								</SheetDescription>
							</SheetHeader>

							<div className="flex flex-1 flex-col gap-3 px-4 py-4">
								{navLinks.map(({ to, label, icon: Icon }) => (
									<SheetClose asChild key={to}>
										<Link to={to}>
											<Button
												variant="ghost"
												className={`${navButtonClass(to)} w-full justify-start`}
												style={{
													fontFamily: "Indie Flower, cursive",
													fontSize: "18px",
												}}
											>
												<Icon className="w-5 h-5" />
												{label}
											</Button>
										</Link>
									</SheetClose>
								))}

								<div className="mt-4 rounded-xl border-2 border-black/10 bg-white/60 p-4 shadow-sm">
									<div className="flex items-center gap-3">
										<Avatar className="w-10 h-10">
											<AvatarImage
												src={currentUser?.avatar}
												alt={currentUser?.name}
											/>
											<AvatarFallback>
												{currentUser?.name?.charAt(0) ?? "?"}
											</AvatarFallback>
										</Avatar>
										<div className="min-w-0">
											<p className="truncate text-sm font-semibold text-gray-900">
												{currentUser?.name ?? "Account"}
											</p>
											<p className="truncate text-xs text-gray-500">
												{currentUser?.email ?? "No email available"}
											</p>
											<p className="truncate text-xs text-blue-600">
												{currentUser?.role ?? "Member"}
											</p>
										</div>
									</div>

									<SheetClose asChild>
										<Button
											variant="ghost"
											className="mt-4 w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
											onClick={handleLogout}
											style={{
												fontFamily: "Indie Flower, cursive",
												fontSize: "18px",
											}}
										>
											<LogOut className="h-5 w-5" />
											Log out
										</Button>
									</SheetClose>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="hidden h-auto w-full justify-between gap-3 px-3 py-2 hover:bg-white/50 lg:flex lg:w-auto"
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
							<span className="truncate text-left">{currentUser?.name ?? "Account"}</span>
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
