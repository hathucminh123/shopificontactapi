import sequelize from "../config/db.js";

// 🧱 Core models
import Role from "./role.model.js";
import User from "./users.model.js";
import BlogPost from "./blogPost.model.js";
import Resource from "./resource.model.js";
import CaseStudy from "./caseStudy.model.js";
import EmailSequence from "./emailSequence.model.js";
import ResourceDownload from "./resourceDownload.model.js";
import Contact from "./contact.model.js";

// 🧩 Project-related
import Project from "./project.model.js";
import ProjectTask from "./projectTask.model.js";
import ProjectTeam from "./projectTeam.model.js";
import ProjectResource from "./projectResource.model.js";

// 💬 Chat-related
import ChatSession from "./chat_sessions.model.js";
import ChatMessage from "./chat_messages.model.js";

const initDatabase = async () => {
  try {
    console.log("🔗 Connecting to database...");
    await sequelize.authenticate();
    console.log("✅ Connection established successfully.");

    const isDev = process.env.NODE_ENV !== "production";
    console.log(`🧱 Syncing models (mode: ${isDev ? "alter" : "safe"})...`);

    await sequelize.sync({ alter: isDev }); // alter in dev only

    console.log("🧩 All models synchronized successfully!");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
  }
};

export {
  sequelize,
  Role,
  User,
  BlogPost,
  Resource,
  CaseStudy,
  EmailSequence,
  Contact,
  ResourceDownload,
  Project,
  ProjectTask,
  ProjectTeam,
  ProjectResource,
  ChatSession,
  ChatMessage,
  initDatabase,
};

export default {
  sequelize,
  Role,
  User,
  BlogPost,
  Resource,
  CaseStudy,
  EmailSequence,
  Contact,
  ResourceDownload,
  Project,
  ProjectTask,
  ProjectTeam,
  ProjectResource,
  ChatSession,
  ChatMessage,
  initDatabase,
};
