const mockUsers = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    createdAt: /* @__PURE__ */ new Date("2024-01-01"),
    updatedAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    role: "manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    createdAt: /* @__PURE__ */ new Date("2024-01-02"),
    updatedAt: /* @__PURE__ */ new Date("2024-01-02")
  },
  {
    _id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    password: "password123",
    role: "member",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    createdAt: /* @__PURE__ */ new Date("2024-01-03"),
    updatedAt: /* @__PURE__ */ new Date("2024-01-03")
  }
];
const mockProjects = [
  {
    _id: "p1",
    title: "Website Redesign",
    description: "Complete redesign of company website",
    owner: "1",
    members: ["1", "2", "3"],
    status: "active",
    startDate: /* @__PURE__ */ new Date("2024-02-01"),
    endDate: /* @__PURE__ */ new Date("2024-05-01"),
    createdAt: /* @__PURE__ */ new Date("2024-01-15")
  },
  {
    _id: "p2",
    title: "Mobile App Development",
    description: "Build native mobile application",
    owner: "2",
    members: ["2", "3"],
    status: "active",
    startDate: /* @__PURE__ */ new Date("2024-03-01"),
    endDate: /* @__PURE__ */ new Date("2024-08-01"),
    createdAt: /* @__PURE__ */ new Date("2024-02-20")
  },
  {
    _id: "p3",
    title: "Marketing Campaign",
    description: "Q2 Marketing initiatives",
    owner: "1",
    members: ["1", "2"],
    status: "completed",
    startDate: /* @__PURE__ */ new Date("2024-01-01"),
    endDate: /* @__PURE__ */ new Date("2024-03-31"),
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  }
];
const mockTasks = [
  {
    _id: "t1",
    title: "Design Homepage",
    description: "Create mockups for new homepage",
    projectId: "p1",
    assignedTo: "2",
    priority: "high",
    status: "in-progress",
    dueDate: /* @__PURE__ */ new Date("2024-03-15"),
    createdBy: "1",
    createdAt: /* @__PURE__ */ new Date("2024-02-01"),
    updatedAt: /* @__PURE__ */ new Date("2024-02-10")
  },
  {
    _id: "t2",
    title: "Setup Development Environment",
    description: "Configure dev tools and frameworks",
    projectId: "p1",
    assignedTo: "3",
    priority: "high",
    status: "completed",
    dueDate: /* @__PURE__ */ new Date("2024-02-20"),
    createdBy: "1",
    createdAt: /* @__PURE__ */ new Date("2024-02-01"),
    updatedAt: /* @__PURE__ */ new Date("2024-02-18")
  },
  {
    _id: "t3",
    title: "Write API Documentation",
    description: "Document all API endpoints",
    projectId: "p1",
    assignedTo: "3",
    priority: "medium",
    status: "todo",
    dueDate: /* @__PURE__ */ new Date("2024-04-01"),
    createdBy: "1",
    createdAt: /* @__PURE__ */ new Date("2024-02-05"),
    updatedAt: /* @__PURE__ */ new Date("2024-02-05")
  },
  {
    _id: "t4",
    title: "User Authentication",
    description: "Implement login and registration",
    projectId: "p2",
    assignedTo: "2",
    priority: "high",
    status: "in-progress",
    dueDate: /* @__PURE__ */ new Date("2024-04-10"),
    createdBy: "2",
    createdAt: /* @__PURE__ */ new Date("2024-03-01"),
    updatedAt: /* @__PURE__ */ new Date("2024-03-05")
  },
  {
    _id: "t5",
    title: "Push Notifications",
    description: "Add push notification support",
    projectId: "p2",
    assignedTo: "3",
    priority: "low",
    status: "todo",
    dueDate: /* @__PURE__ */ new Date("2024-06-01"),
    createdBy: "2",
    createdAt: /* @__PURE__ */ new Date("2024-03-02"),
    updatedAt: /* @__PURE__ */ new Date("2024-03-02")
  },
  {
    _id: "t6",
    title: "Social Media Strategy",
    description: "Plan social media posts",
    projectId: "p3",
    assignedTo: "1",
    priority: "medium",
    status: "completed",
    dueDate: /* @__PURE__ */ new Date("2024-03-15"),
    createdBy: "1",
    createdAt: /* @__PURE__ */ new Date("2024-01-05"),
    updatedAt: /* @__PURE__ */ new Date("2024-03-10")
  }
];
export {
  mockProjects,
  mockTasks,
  mockUsers
};
