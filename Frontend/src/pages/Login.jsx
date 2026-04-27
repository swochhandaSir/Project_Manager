import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { LoaderCircle, LogIn, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isSubmitting) return;

		setIsSubmitting(true);
		try {
			const success = await login(email, password);
			if (success) {
				toast.success("Login successful!");
				navigate("/dashboard");
			} else {
				toast.error("Invalid credentials");
			}
		} catch (error) {
			toast.error(error.response?.data?.message || "Login failed");
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<div
			className="min-h-screen flex items-center justify-center p-4"
			style={{
				background: "linear-gradient(135deg, #E8F4F8 0%, #D4E7ED 100%)",
			}}
		>
			<div
				className="w-full max-w-md rounded-sm p-5 sm:p-8"
				style={{
					backgroundColor: "#FF7EB9",
					transform: "rotate(-1deg)",
					boxShadow: `
            0 2px 4px rgba(0,0,0,0.12),
            0 6px 12px rgba(0,0,0,0.15),
            0 12px 24px rgba(0,0,0,0.1)
          `,
				}}
			>
				<div className="text-center mb-6">
					<div className="flex items-center justify-center mb-4">
						<div className="bg-blue-500 p-4 rounded-lg shadow-md transform rotate-3">
							<LogIn className="w-8 h-8 text-white" />
						</div>
					</div>

					<h1
						className="mb-2 text-3xl font-bold sm:text-4xl"
						style={{
							fontFamily: "Indie Flower, cursive",
							color: "#333",
						}}
					>
						Welcome Back
					</h1>

					<p
						className="text-base sm:text-lg"
						style={{
							fontFamily: "Indie Flower, cursive",
							color: "#666",
						}}
					>
						Enter your credentials to access your account
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="space-y-4"
				>
					<div className="space-y-2">
						<Label
							htmlFor="email"
							className="text-base"
							style={{ fontFamily: "Indie Flower, cursive" }}
						>
							Email
						</Label>

						<Input
							id="email"
							type="email"
							placeholder="john@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="text-base"
						/>
					</div>

					<div className="space-y-2">
						<Label
							htmlFor="password"
							className="text-base"
							style={{ fontFamily: "Indie Flower, cursive" }}
						>
							Password
						</Label>

						<div className="relative">
							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="text-base pr-10"
							/>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
								onClick={() => setShowPassword(!showPassword)}
								aria-label={showPassword ? "Hide password" : "Show password"}
							>
								{showPassword ? (
									<EyeOff className="h-4 w-4 text-gray-500" />
								) : (
									<Eye className="h-4 w-4 text-gray-500" />
								)}
							</Button>
						</div>
					</div>

					<Button
						type="submit"
						disabled={isSubmitting}
						className={`w-full bg-blue-500 hover:bg-blue-600 relative overflow-hidden transition-all duration-200 ${
							isSubmitting ? "scale-[0.98] shadow-inner" : "hover:scale-[1.01] hover:shadow-lg"
						}`}
					>
						<span
							className={`absolute inset-0 bg-linear-to-r from-white/0 via-white/30 to-white/0 transition-transform duration-700 ${
								isSubmitting ? "translate-x-full" : "-translate-x-full"
							}`}
						/>
						<span className="relative flex items-center justify-center gap-2">
							{isSubmitting ? (
								<>
									<LoaderCircle className="w-4 h-4 animate-spin" />
									Signing In...
								</>
							) : (
								"Sign In"
							)}
						</span>
					</Button>
				</form>

				<div className="mt-4 text-center">
					<span
						className="text-sm sm:text-base"
						style={{
							fontFamily: "Indie Flower, cursive",
							color: "#666",
						}}
					>
						Don't have an account?{" "}
					</span>

					<Link
						to="/register"
						className="text-blue-600 hover:underline text-base font-bold"
						style={{ fontFamily: "Indie Flower, cursive" }}
					>
						Sign up
					</Link>
				</div>
			</div>
		</div>
	);
}

export { Login };
