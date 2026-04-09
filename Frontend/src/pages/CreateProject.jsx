import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { createProject } from "../api/projectApi";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Calendar as DatePicker } from "../components/ui/calendar";
import { CalendarDays } from "lucide-react";
import { toast } from "sonner";

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
			startDate: formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
			endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
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

		if (formData.startDate && formData.endDate && new Date(formData.endDate) < new Date(formData.startDate)) {
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
					<h2 className="mb-6 text-2xl sm:text-3xl" style={{ fontFamily: "Indie Flower, cursive" }}>
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
						<Select value={formData.status} onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}>
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
						<div className="space-y-2">
							<Label>Start Date</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button type="button" variant="outline" className="w-full justify-start font-normal">
										<CalendarDays className="mr-2 h-4 w-4" />
										{formatDate(formData.startDate)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<DatePicker
										mode="single"
										selected={formData.startDate ? new Date(formData.startDate) : undefined}
										onSelect={(date) =>
											setFormData((prev) => ({
												...prev,
												startDate: date || null,
											}))
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>

						<div className="space-y-2">
							<Label>End Date</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button type="button" variant="outline" className="w-full justify-start font-normal">
										<CalendarDays className="mr-2 h-4 w-4" />
										{formatDate(formData.endDate)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<DatePicker
										mode="single"
										selected={formData.endDate ? new Date(formData.endDate) : undefined}
										onSelect={(date) =>
											setFormData((prev) => ({
												...prev,
												endDate: date || null,
											}))
										}
										initialFocus
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
