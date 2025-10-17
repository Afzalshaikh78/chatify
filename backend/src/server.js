import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";
import { testEmailConfig } from "./lib/email.js";

const __dirname = path.resolve();
const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: "5mb" }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve frontend in production
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Startup: connect DB, test SMTP, then listen
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to database");

    const emailValid = await testEmailConfig();
    if (!emailValid) {
      console.warn("⚠️ Brevo SMTP configuration invalid");
    }

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port: ${PORT}`);
      if (emailValid) {
        console.log("📧 Brevo SMTP service is ready");
      }
    });
  } catch (error) {
    console.error("❌ Server startup error:", error);
    process.exit(1);
  }
};

startServer();
