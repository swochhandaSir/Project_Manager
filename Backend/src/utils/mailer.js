import nodemailer from "nodemailer";

let transporter = null;

export function getMailer() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }
  return transporter;
}

export async function sendDueReminderEmail({ to, subject, html, text }) {
  const mail = getMailer();
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!mail || !from) {
    console.warn("[mailer] SMTP not configured; skipping email to", to);
    return false;
  }
  await mail.sendMail({ from, to, subject, html, text });
  return true;
}
