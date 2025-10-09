import sequelize from "../config/db.js";
import Role from "./role.model.js";
import User from "./users.model.js";
import BlogPost from "./blogPost.model.js";
import Resource from "./resource.model.js";
import CaseStudy from "./caseStudy.model.js";
import EmailSequence from "./emailSequence.model.js";
import ResourceDownload from "./resourceDownload.model.js";
import Contact from "./contact.model.js";

// 🧩 Đảm bảo import tất cả associations trước sync
const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established");

    // ⚡ Sequelize sẽ tự xử lý quan hệ nhờ đã import models ở trên
    await sequelize.sync({ alter: true }); // <-- chỉ cần 1 dòng này

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
  initDatabase,
};
