import cron from "node-cron";
import Task from "../models/taskModel.js";
import Project from "../models/projectModel.js";
import User from "../models/userModel.js";
import ReminderLog from "../models/reminderLogModel.js";
import { sendDueReminderEmail } from "../utils/mailer.js";

function formatDayKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Start and end of *tomorrow* in local server time */
function getTomorrowLocalRange() {
  const now = new Date();
  const t = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59, 59, 999);
  return { start: t, end, dayKey: formatDayKey(t) };
}

async function alreadyLogged(kind, refId, dayKey) {
  const existing = await ReminderLog.findOne({ kind, refId, dayKey });
  return !!existing;
}

async function logSent(kind, refId, dayKey) {
  try {
    await ReminderLog.create({ kind, refId, dayKey });
  } catch (e) {
    if (e?.code === 11000) return;
    throw e;
  }
}

function taskEmailHtml(task, recipientName, projectTitle) {
  const due = task.dueDate ? new Date(task.dueDate).toLocaleString() : "N/A";
  return `
    <h2>Task due tomorrow</h2>
    <p>Hi ${recipientName || "there"},</p>
    <p>You have a task that is <strong>due tomorrow</strong>.</p>
    <ul>
      <li><strong>Title:</strong> ${escapeHtml(task.title)}</li>
      <li><strong>Description:</strong> ${escapeHtml(task.description || "—")}</li>
      <li><strong>Priority:</strong> ${escapeHtml(task.priority || "—")}</li>
      <li><strong>Status:</strong> ${escapeHtml(task.status || "—")}</li>
      <li><strong>Due date:</strong> ${escapeHtml(due)}</li>
      ${projectTitle ? `<li><strong>Project:</strong> ${escapeHtml(projectTitle)}</li>` : ""}
    </ul>
    <p>— ProjectHub</p>
  `;
}

function projectEmailHtml(project, recipientName) {
  const end = project.endDate ? new Date(project.endDate).toLocaleString() : "N/A";
  const start = project.startDate ? new Date(project.startDate).toLocaleString() : "N/A";
  return `
    <h2>Project due tomorrow</h2>
    <p>Hi ${recipientName || "there"},</p>
    <p>Your project has an <strong>end date tomorrow</strong>.</p>
    <ul>
      <li><strong>Title:</strong> ${escapeHtml(project.title)}</li>
      <li><strong>Description:</strong> ${escapeHtml(project.description || "—")}</li>
      <li><strong>Status:</strong> ${escapeHtml(project.status || "—")}</li>
      <li><strong>Start:</strong> ${escapeHtml(start)}</li>
      <li><strong>End (due):</strong> ${escapeHtml(end)}</li>
    </ul>
    <p>— ProjectHub</p>
  `;
}

function escapeHtml(s) {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function runDueRemindersOnce() {
  const { start, end, dayKey } = getTomorrowLocalRange();

  const tasks = await Task
    .find({
      dueDate: { $gte: start, $lte: end },
      status: { $ne: "completed" },
    })
    .populate("projectId", "title owner")
    .lean();

  for (const task of tasks) {
    if (await alreadyLogged("task", task._id, dayKey)) continue;

    let recipient = null;
    if (task.assignedTo) {
      recipient = await User.findById(task.assignedTo).select("email name").lean();
    }
    if (!recipient?.email && task.projectId?.owner) {
      recipient = await User.findById(task.projectId.owner).select("email name").lean();
    }
    if (!recipient?.email) continue;

    const projectTitle =
      task.projectId && typeof task.projectId === "object" ? task.projectId.title : null;

    const html = taskEmailHtml(task, recipient.name, projectTitle);
    const text = `Task due tomorrow: ${task.title}. Due: ${task.dueDate}. ${projectTitle ? `Project: ${projectTitle}` : ""}`;

    const ok = await sendDueReminderEmail({
      to: recipient.email,
      subject: `Reminder: task "${task.title}" is due tomorrow`,
      html,
      text,
    });
    if (ok) await logSent("task", task._id, dayKey);
  }

  const projects = await Project
    .find({
      endDate: { $gte: start, $lte: end },
      status: { $nin: ["completed", "archived"] },
    })
    .lean();

  for (const project of projects) {
    if (await alreadyLogged("project", project._id, dayKey)) continue;

    const owner = await User.findById(project.owner).select("email name").lean();
    if (!owner?.email) continue;

    const html = projectEmailHtml(project, owner.name);
    const text = `Project due tomorrow: ${project.title}. End date: ${project.endDate}.`;

    const ok = await sendDueReminderEmail({
      to: owner.email,
      subject: `Reminder: project "${project.title}" ends tomorrow`,
      html,
      text,
    });
    if (ok) await logSent("project", project._id, dayKey);
  }
}

/**
 * Schedules daily reminders. Cron in server local time (default 09:00).
 * Set REMINDER_CRON="0 9 * * *" to customize.
 */
export function startDueReminderCron() {
  const enabled = process.env.REMINDER_EMAILS_ENABLED !== "false";
  if (!enabled) {
    console.log("[dueReminders] REMINDER_EMAILS_ENABLED=false — cron not started");
    return;
  }

  const pattern = process.env.REMINDER_CRON || "0 9 * * *";
  cron.schedule(pattern, async () => {
    try {
      console.log("[dueReminders] Running daily due reminder job…");
      await runDueRemindersOnce();
      console.log("[dueReminders] Done.");
    } catch (err) {
      console.error("[dueReminders] Job failed:", err);
    }
  });
  console.log(`[dueReminders] Scheduled with pattern: ${pattern}`);
}
