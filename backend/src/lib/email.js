import nodemailer from "nodemailer";
import { ENV } from "./env.js";

// Create transporter for Brevo SMTP
export const createTransporter = () => {
  const config = {
    host: ENV.EMAIL_HOST,
    port: parseInt(ENV.EMAIL_PORT) || 587,
    secure: ENV.EMAIL_SECURE === "true",
    auth: {
      user: ENV.EMAIL_USER,
      pass: ENV.EMAIL_PASS,
    },
  };

  return nodemailer.createTransport(config); // CHANGED: use createTransport, not createTransporter
};

// Test email configuration
export const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log("✅ Brevo SMTP configuration is valid");
    return true;
  } catch (error) {
    console.error("❌ Brevo SMTP configuration error:", error.message);
    return false;
  }
};
