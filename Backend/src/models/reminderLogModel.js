import mongoose from "mongoose";

const reminderLogSchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ["task", "project"], required: true },
    refId: { type: mongoose.Schema.Types.ObjectId, required: true },
    /** Calendar day the reminder was for (YYYY-MM-DD) — avoids duplicate sends same day */
    dayKey: { type: String, required: true },
  },
  { timestamps: true },
);

reminderLogSchema.index({ kind: 1, refId: 1, dayKey: 1 }, { unique: true });

export default mongoose.model("ReminderLog", reminderLogSchema);
