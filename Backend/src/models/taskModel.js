import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },

  description: String,

  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"]
  },

  status: {
    type: String,
    enum: ["todo", "in-progress", "completed"],
    default: "todo"
  },

  dueDate: Date

}, { timestamps: true });

export default mongoose.model("Task", taskSchema);