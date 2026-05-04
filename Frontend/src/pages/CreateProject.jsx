import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { createProject } from "../api/projectApi";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../components/ui/popover";
import { toast } from "sonner";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function CreateProject() {
	const navigate = useNavigate();
	const { currentUser } = useAuth();

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		status: "active",
		startDate: null,
		endDate: null,
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const formatDate = (date) => {
		if (!date) return "Pick a date";
		return new Date(date).toLocaleDateString();
	};

	const payload = useMemo(
		() => ({
			title: formData.title,
			description: formData.description,
			status: formData.status,
			startDate: formData.startDate
				? new Date(formData.startDate).toISOString()
				: undefined,
			endDate: formData.endDate
				? new Date(formData.endDate).toISOString()
				: undefined,
			owner: currentUser?._id,
			members: currentUser?._id ? [currentUser._id] : [],
		}),
		[formData, currentUser],
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.title.trim()) {
			toast.error("Project name is required");
			return;
		}

		if (
			formData.startDate &&
			formData.endDate &&
			new Date(formData.endDate) < new Date(formData.startDate)
		) {
			toast.error("End date cannot be before start date");
			return;
		}

		try {
			await createProject(payload);
			toast.success("Project created successfully");
			navigate("/projects");
		} catch (err) {
			console.error(err);
			toast.error(err.response?.data?.message || "Failed to create project");
		}
	};

	return (
		<div
			className="min-h-screen px-4 py-6 sm:px-6 sm:py-8"
			style={{
				background: "linear-gradient(135deg, #E8F4F8 0%, #D4E7ED 100%)",
			}}
		>
			<div className="mx-auto max-w-2xl">
				<form
					onSubmit={handleSubmit}
					className="w-full space-y-4 rounded-sm bg-white p-5 shadow-lg sm:p-8"
				>
					<h2
						className="mb-6 text-2xl sm:text-3xl"
						style={{ fontFamily: "Indie Flower, cursive" }}
					>
						Create Project
					</h2>

					<div className="space-y-2">
						<Label htmlFor="title">Project Name *</Label>
						<Input
							id="title"
							name="title"
							value={formData.title}
							placeholder="Project Title"
							onChange={handleChange}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							name="description"
							value={formData.description}
							placeholder="Description"
							onChange={handleChange}
							className="min-h-28"
						/>
					</div>

					<div className="space-y-2">
						<Label>Status</Label>
						<Select
							value={formData.status}
							onValueChange={(value) =>
								setFormData((prev) => ({ ...prev, status: value }))
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="active">Active</SelectItem>
								<SelectItem value="completed">Completed</SelectItem>
								<SelectItem value="archived">Archived</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						{/* Start Date */}
						<div className="space-y-2">
							<Label>Start Date</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										type="button"
										variant="outline"
										className="w-full justify-start font-normal"
									>
										{formData.startDate
											? format(formData.startDate, "PPP")
											: "Pick a date"}
									</Button>
								</PopoverTrigger>

								<PopoverContent className="w-auto p-0">
									<DayPicker
										mode="single"
										selected={formData.startDate ?? undefined}
										onSelect={(date) =>
											setFormData((prev) => ({
												...prev,
												startDate: date ?? null,
											}))
										}
										className="p-4"
										classNames={{
											caption: "flex justify-end items-center",
											caption_label: "text-right font-medium",
											nav: "flex items-center gap-1",
											day_selected: "bg-blue-600 text-white rounded-full",
											day: "hover:bg-gray-200 rounded-full"
										}}
									/>
								</PopoverContent>
							</Popover>
						</div>

						{/* End Date */}
						<div className="space-y-2">
							<Label>End Date</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										type="button"
										variant="outline"
										className="w-full justify-start font-normal"
									>
										{formData.endDate ? format(formData.endDate, "PPP") : "Pick a date"}
									</Button>
								</PopoverTrigger>

								<PopoverContent className="w-auto p-0">
									<DayPicker
										mode="single"
										selected={formData.endDate ?? undefined}
										onSelect={(date) =>
											setFormData((prev) => ({
												...prev,
												endDate: date ?? null,
											}))
										}
										className="p-4"
										classNames={{
											caption: "flex justify-end items-center",
											caption_label: "text-right font-medium",
											nav: "flex items-center gap-1",
											day_selected: "bg-blue-600 text-white rounded-full",
											day: "hover:bg-gray-200 rounded-full"
										}}
									/>
								</PopoverContent>
							</Popover>
						</div>
					</div>

					<Button className="w-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
						Create
					</Button>
				</form>
			</div>
		</div>
	);
}

export default CreateProject;
