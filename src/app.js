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
import { initDatabase } from "./models/index.js";
const app = express();
initDatabase(); 
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

//auth
app.use("/api/auth", authRoutes);

// mount API
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);

app.use("/api/blog-posts", blogRoutes);
app.use("/api/case-studies", caseRoutes);
app.use("/api/resources", resourceRoutes);

app.use("/api/contacts", contactRoutes);
app.use("/api/email-sequences", emailSequenceRoutes);
app.use("/api/resource-downloads", resourceDownloadRoutes);


// api resources
// api caseStudies

export default app;
