import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import contactRoutes from "./routes/contact.routes.js";
import userRoutes from "./routes/user.routes.js";
import roleRoutes from "./routes/role.routes.js";
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blogPost.routes.js";
import caseRoutes from "./routes/caseStudy.routes.js";
import resourceRoutes from "./routes/resource.routes.js";
import emailSequenceRoutes from "./routes/emailSequence.routes.js";
import resourceDownloadRoutes from "./routes/resourceDownload.routes.js";
import projectRoutes from "./routes/project.routes.js";
import projectTaskRoutes from "./routes/projectTask.routes.js";
import projectTeamRoutes from "./routes/projectTeam.routes.js";
import projectResourceRoutes from "./routes/projectResource.routes.js";
import "./jobs/sendScheduledEmails.js";
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Health check
app.get("/health", (_req, res) => res.json({ ok: true }));

// Auth
app.use("/api/auth", authRoutes);

// API routes
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/blog-posts", blogRoutes);
app.use("/api/case-studies", caseRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/email-sequences", emailSequenceRoutes);
app.use("/api/resource-downloads", resourceDownloadRoutes);
// Project Tasks
app.use("/api/projects", projectRoutes);
app.use("/api", projectTaskRoutes);
app.use("/api/team", projectTeamRoutes);
app.use("/api/project-resources", projectResourceRoutes);

export default app;
