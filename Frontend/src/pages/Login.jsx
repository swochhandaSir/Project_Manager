import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import API from "../api/axios";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await API.post("/auth/login", { email, password });
			localStorage.setItem("accessToken", res.data.accessToken);
			toast.success("Login successful!");
			navigate("/dashboard");
			console.log("User logged in:", { email });
		} catch (error) {
			toast.error(error.response?.data?.message || "Login failed");
		}
	};

	return /* @__PURE__ */ React.createElement(
		"div",
		{
			className: "min-h-screen flex items-center justify-center p-4",
			style: {
				background: "linear-gradient(135deg, #E8F4F8 0%, #D4E7ED 100%)",
			},
		},
		/* @__PURE__ */ React.createElement(
			"div",
			{
				className: "w-full max-w-md p-8 rounded-sm",
				style: {
					backgroundColor: "#FF7EB9",
					transform: "rotate(-1deg)",
					boxShadow: `
            0 2px 4px rgba(0,0,0,0.12),
            0 6px 12px rgba(0,0,0,0.15),
            0 12px 24px rgba(0,0,0,0.1)
          `,
				},
			},
			/* @__PURE__ */ React.createElement(
				"div",
				{ className: "text-center mb-6" },
				/* @__PURE__ */ React.createElement(
					"div",
					{ className: "flex items-center justify-center mb-4" },
					/* @__PURE__ */ React.createElement(
						"div",
						{ className: "bg-blue-500 p-4 rounded-lg shadow-md transform rotate-3" },
						/* @__PURE__ */ React.createElement(LogIn, {
							className: "w-8 h-8 text-white",
						}),
					),
				),
				/* @__PURE__ */ React.createElement(
					"h1",
					{
						className: "text-4xl font-bold mb-2",
						style: {
							fontFamily: "Indie Flower, cursive",
							color: "#333",
						},
					},
					"Welcome Back",
				),
				/* @__PURE__ */ React.createElement(
					"p",
					{
						className: "text-lg",
						style: {
							fontFamily: "Indie Flower, cursive",
							color: "#666",
						},
					},
					"Enter your credentials to access your account",
				),
			),
			/* @__PURE__ */ React.createElement(
				"form",
				{ onSubmit: handleSubmit, className: "space-y-4" },
				/* @__PURE__ */ React.createElement(
					"div",
					{ className: "space-y-2" },
					/* @__PURE__ */ React.createElement(
						Label,
						{
							htmlFor: "email",
							className: "text-base",
							style: { fontFamily: "Indie Flower, cursive" },
						},
						"Email",
					),
					/* @__PURE__ */ React.createElement(Input, {
						id: "email",
						type: "email",
						placeholder: "john@example.com",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						required: true,
						className: "text-base",
					}),
				),
				/* @__PURE__ */ React.createElement(
					"div",
					{ className: "space-y-2" },
					/* @__PURE__ */ React.createElement(
						Label,
						{
							htmlFor: "password",
							className: "text-base",
							style: { fontFamily: "Indie Flower, cursive" },
						},
						"Password",
					),
					/* @__PURE__ */ React.createElement(Input, {
						id: "password",
						type: "password",
						placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
						value: password,
						onChange: (e) => setPassword(e.target.value),
						required: true,
						className: "text-base",
					}),
				),
				/* @__PURE__ */ React.createElement(
					Button,
					{ type: "submit", className: "w-full bg-blue-500 hover:bg-blue-600" },
					"Sign In",
				),
			),
			/* @__PURE__ */ React.createElement(
				"div",
				{ className: "mt-4 text-center" },
				/* @__PURE__ */ React.createElement(
					"span",
					{
						className: "text-base",
						style: { fontFamily: "Indie Flower, cursive", color: "#666" },
					},
					"Don't have an account?",
					" ",
				),
				/* @__PURE__ */ React.createElement(
					Link,
					{
						to: "/register",
						className: "text-blue-600 hover:underline text-base font-bold",
						style: { fontFamily: "Indie Flower, cursive" },
					},
					"Sign up",
				),
			),
		),
	);
}
export { Login };
