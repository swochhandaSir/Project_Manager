import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    status: {
      type: String,
      enum: ["active", "completed", "archived"],
      default: "active"
    },

    startDate: {
      type: Date
    },

    endDate: {
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);