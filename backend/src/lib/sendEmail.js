import welcomeEmailTemplate from "../emails/welcomeEmail.js";
import { createTransporter } from "../lib/email.js";

import { ENV } from "./env.js";

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
  attachments = [],
}) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `${ENV.EMAIL_FROM_NAME} <${ENV.EMAIL_FROM}>`,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject,
      html,
      text,
      attachments,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent via Brevo:", info.messageId);
    return {
      success: true,
      messageId: info.messageId,
      response: info.response,
    };
  } catch (error) {
    console.error("❌ Error sending email via Brevo:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const sendWelcomeEmail = async (userEmail, userName) => {
  const result = await sendEmail({
    to: userEmail,
    subject: `Welcome to ${ENV.EMAIL_FROM_NAME}! 🎉`,
    html: welcomeEmailTemplate(userName),
    text: `Welcome to ${ENV.EMAIL_FROM_NAME}, ${userName}! We're excited to have you on board.`,
  });

  return result;
};
