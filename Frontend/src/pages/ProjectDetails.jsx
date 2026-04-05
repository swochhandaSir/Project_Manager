import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TaskColumn } from "../components/TaskColumn";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ScrollArea } from "../components/ui/scroll-area";
import { Textarea } from "../components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Calendar as DatePicker } from "../components/ui/calendar";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { CalendarDays, MessageSquare, Plus, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { deleteProject, getProjectById, updateProject } from "../api/projectApi";
import { createTask, deleteTask, getProjectTasks, updateTask } from "../api/taskApi";
import { getUsers } from "../api/userApi";
import { createComment, deleteComment, getProjectComments } from "../api/commentApi";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [open, setOpen] = useState(false);
  const [membersOpen, setMembersOpen] = useState(false);
  const [savingMembers, setSavingMembers] = useState(false);
  const [selectedMemberIds, setSelectedMemberIds] = useState([]);
  const [projectComments, setProjectComments] = useState([]);
  const [projectCommentText, setProjectCommentText] = useState("");

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: null,
    assignedTo: null,
  });

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  const formatDate = (date) => {
    if (!date) return "Pick a due date";
    return new Date(date).toLocaleDateString();
  };

  const createPayload = useMemo(
    () => ({
      title: taskForm.title,
      description: taskForm.description,
      priority: taskForm.priority,
      dueDate: taskForm.dueDate ? new Date(taskForm.dueDate).toISOString() : undefined,
      projectId: id,
      assignedTo: taskForm.assignedTo ?? currentUser?._id,
      status: "todo",
    }),
    [taskForm, id, currentUser],
  );

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [projectData, projectTasks] = await Promise.all([
          getProjectById(id),
          getProjectTasks(id),
        ]);
        const pComments = await getProjectComments(id);
        setProject(projectData);
        setTasks(projectTasks);
        setProjectComments(pComments);
        setSelectedMemberIds((projectData?.members ?? []).map((m) => m?._id).filter(Boolean));
        setTaskForm((prev) => ({
          ...prev,
          assignedTo: currentUser?._id ?? null,
        }));
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await getUsers();
        setAllUsers(users);
      } catch (err) {
        console.error(err);
      }
    };

    loadUsers();
  }, []);

  const handleDrop = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t)),
      );
      toast.success("Task status updated");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      toast.success("Task deleted");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete task");
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!taskForm.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    try {
      setCreating(true);
      await createTask(createPayload);

      // If the API didn't populate, fetch tasks again to keep TaskCard consistent.
      const projectTasks = await getProjectTasks(id);
      setTasks(projectTasks);

      setTaskForm({ title: "", description: "", priority: "medium", dueDate: null, assignedTo: currentUser?._id ?? null });
      setOpen(false);
      toast.success("Task created");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create task");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #E8F4F8 0%, #D4E7ED 100%)",
        }}
      >
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #E8F4F8 0%, #D4E7ED 100%)",
        }}
      >
        Project not found.
      </div>
    );
  }

  const isOwner = String(project.owner?._id ?? project.owner) === String(currentUser?._id);
  const currentMembers = Array.isArray(project.members) ? project.members : [];
  const assigneeOptions = currentMembers.length ? currentMembers : (currentUser ? [currentUser] : []);

  const toggleMember = (userId) => {
    setSelectedMemberIds((prev) => {
      const idStr = String(userId);
      const set = new Set(prev.map(String));
      if (set.has(idStr)) set.delete(idStr);
      else set.add(idStr);
      return Array.from(set);
    });
  };

  const saveMembers = async () => {
    try {
      setSavingMembers(true);
      const updated = await updateProject(id, { members: selectedMemberIds });
      setProject(updated);
      setMembersOpen(false);
      toast.success("Members updated");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update members");
    } finally {
      setSavingMembers(false);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await deleteProject(id);
      toast.success("Project deleted");
      navigate("/projects");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete project");
    }
  };

  const submitProjectComment = async (e) => {
    e.preventDefault();
    if (!projectCommentText.trim()) return;
    try {
      const created = await createComment({
        projectId: id,
        message: projectCommentText,
      });
      setProjectComments((prev) => [created, ...prev]);
      setProjectCommentText("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add comment");
    }
  };

  const removeComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setProjectComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete comment");
    }
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{
        background: "linear-gradient(135deg, #E8F4F8 0%, #D4E7ED 100%)",
      }}
    >
      <div className="flex items-center justify-between mb-12">
        <div>
          <Button
            variant="ghost"
            className="mb-3"
            onClick={() => navigate("/projects")}
          >
            ← Back to Projects
          </Button>
          <h1
            className="text-5xl font-bold mb-2"
            style={{
              fontFamily: "Indie Flower, cursive",
              color: "#333",
            }}
          >
            {project.title}
          </h1>
          <p
            className="text-xl"
            style={{
              fontFamily: "Indie Flower, cursive",
              color: "#666",
            }}
          >
            {project.description || "No description"}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Created: {project.createdAt ? new Date(project.createdAt).toLocaleString() : "N/A"}
          </p>

          <div className="flex items-center gap-2 mt-4 text-sm text-gray-700">
            <Users className="w-4 h-4" />
            <span>{currentMembers.length} member{currentMembers.length === 1 ? "" : "s"}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Comments
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Project Comments</SheetTitle>
              </SheetHeader>
              <div className="px-4 pb-4 flex flex-col gap-3">
                <form onSubmit={submitProjectComment} className="flex gap-2">
                  <Input
                    value={projectCommentText}
                    onChange={(e) => setProjectCommentText(e.target.value)}
                    placeholder="Write a project comment..."
                  />
                  <Button type="submit">Post</Button>
                </form>
                <ScrollArea className="h-[70vh] pr-2">
                  <div className="space-y-2">
                    {projectComments.map((c) => (
                      <div
                        key={c._id}
                        className="p-3 rounded-sm border border-black/10 text-sm"
                        style={{
                          backgroundColor: "#FEFF9C",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)",
                        }}
                      >
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-7 h-7 border border-white">
                              <AvatarImage src={c.userId?.avatar} alt={c.userId?.name} />
                              <AvatarFallback className="text-xs">
                                {(c.userId?.name ?? "?").charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="leading-tight">
                              <p className="font-medium">{c.userId?.name ?? "User"}</p>
                              <p className="text-[11px] text-gray-600">
                                {c.createdAt ? new Date(c.createdAt).toLocaleString() : "just now"}
                              </p>
                            </div>
                          </div>
                          {String(c.userId?._id) === String(currentUser?._id) && (
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 " onClick={() => removeComment(c._id)}>
                              <Trash2 className="w-4 h-4 mr-1" />
                            </Button>
                          )}
                        </div>
                        <p className="text-[15px]" style={{ fontFamily: "Indie Flower, cursive" }}>{c.message}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </SheetContent>
          </Sheet>
          <Dialog open={membersOpen} onOpenChange={setMembersOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="gap-2"
                disabled={!isOwner}
                title={isOwner ? "Manage members" : "Only the owner can manage members"}
                onClick={() => setSelectedMemberIds(currentMembers.map((m) => m?._id).filter(Boolean))}
              >
                <Users className="w-4 h-4" />
                Members
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manage Members</DialogTitle>
              </DialogHeader>

              <ScrollArea className="h-72 pr-2">
                <div className="space-y-3">
                  {allUsers.map((u) => {
                    const checked = selectedMemberIds.map(String).includes(String(u._id));
                    return (
                      <div key={u._id} className="flex items-center gap-3">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() => toggleMember(u._id)}
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{u.name}</span>
                          <span className="text-xs text-gray-500">{u.email}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setMembersOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={saveMembers} disabled={savingMembers}>
                  {savingMembers ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-blue-500 hover:bg-blue-600 text-white shadow-lg">
                <Plus className="w-4 h-4" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Task</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleCreateTask} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="taskTitle">Title</Label>
                <Input
                  id="taskTitle"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Task title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taskDesc">Description</Label>
                <Textarea
                  id="taskDesc"
                  value={taskForm.description}
                  onChange={(e) => setTaskForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="What needs to be done?"
                />
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={taskForm.priority}
                  onValueChange={(value) => setTaskForm((p) => ({ ...p, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Assign to</Label>
                <Select
                  value={taskForm.assignedTo ?? ""}
                  onValueChange={(value) => setTaskForm((p) => ({ ...p, assignedTo: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select member" />
                  </SelectTrigger>
                  <SelectContent>
                    {assigneeOptions.map((m) => (
                      <SelectItem key={m._id} value={m._id}>
                        {m.name} ({m.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="outline" className="w-full justify-start font-normal">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {formatDate(taskForm.dueDate)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <DatePicker
                      mode="single"
                      selected={taskForm.dueDate ? new Date(taskForm.dueDate) : undefined}
                      onSelect={(date) => setTaskForm((p) => ({ ...p, dueDate: date || null }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <DialogFooter>
                <Button type="submit" disabled={creating} className="bg-blue-500 hover:bg-blue-600 text-white">
                  {creating ? "Creating..." : "Create Task"}
                </Button>
              </DialogFooter>
            </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className="flex gap-0 overflow-x-auto">
          <TaskColumn
            title="To Do"
            status="todo"
            tasks={todoTasks}
            color="bg-gray-400"
            onDrop={handleDrop}
            onDeleteTask={handleDeleteTask}
          />

          <TaskColumn
            title="Doing"
            status="in-progress"
            tasks={inProgressTasks}
            color="bg-blue-500"
            onDrop={handleDrop}
            onDeleteTask={handleDeleteTask}
          />

          <TaskColumn
            title="Done"
            status="completed"
            tasks={completedTasks}
            color="bg-green-500"
            onDrop={handleDrop}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </DndProvider>

      <div className="mt-8 flex justify-end">
        <Button variant="destructive" className="gap-2" onClick={handleDeleteProject}>
          <Trash2 className="w-4 h-4" />
          Delete Project
        </Button>
      </div>
    </div>
  );
}

export { ProjectDetails };

