import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();
	const { register } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		try {
			const success = await register(name, email, password);

			if (!success) {
				toast.error("Registration failed");
				return;
			}
			toast.success("Registration successful! Please log in.");
			navigate("/login");
		} catch (error) {
			toast.error(error.response?.data?.message || "Registration failed");
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
        className="w-full max-w-md p-8 rounded-sm"
        style={{
          backgroundColor: "#FEFF9C",
          transform: "rotate(1deg)",
          boxShadow: `
            0 2px 4px rgba(0,0,0,0.12),
            0 6px 12px rgba(0,0,0,0.15),
            0 12px 24px rgba(0,0,0,0.1)
          `,
        }}
      >
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-500 p-4 rounded-lg shadow-md transform -rotate-3">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1
            className="text-4xl font-bold mb-2"
            style={{
              fontFamily: "Indie Flower, cursive",
              color: "#333",
            }}
          >
            Create Account
          </h1>

          <p
            className="text-lg"
            style={{
              fontFamily: "Indie Flower, cursive",
              color: "#666",
            }}
          >
            Enter your details to create a new account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-base"
              style={{ fontFamily: "Indie Flower, cursive" }}
            >
              Full Name
            </Label>

            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="text-base"
            />
          </div>

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

            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-base"
              style={{ fontFamily: "Indie Flower, cursive" }}
            >
              Confirm Password
            </Label>

            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="text-base"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Sign Up
          </Button>
        </form>

        <div className="mt-4 text-center">
          <span
            className="text-base"
            style={{
              fontFamily: "Indie Flower, cursive",
              color: "#666",
            }}
          >
            Already have an account?{" "}
          </span>

          <Link
            to="/login"
            className="text-blue-600 hover:underline text-base font-bold"
            style={{ fontFamily: "Indie Flower, cursive" }}
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export { Register };