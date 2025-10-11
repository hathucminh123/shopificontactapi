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

// 🧩 Project-related models
import Project from "./project.model.js";
import ProjectTask from "./projectTask.model.js";
import ProjectTeam from "./projectTeam.model.js";
import ProjectResource from "./projectResource.model.js";

// 🧩 Đảm bảo import tất cả associations trước khi sync
const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established");

    // ⚡ Sequelize sẽ tự xử lý toàn bộ quan hệ nhờ các import ở trên
    await sequelize.sync({ alter: true }); // hoặc { force: true } nếu reset DB

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
  initDatabase,
};
