import sequelize from "../config/db.js";
import Role from "./role.model.js";
import User from "./users.model.js";
import BlogPost from "./blogPost.model.js";
import Resource from "./resource.model.js";
import CaseStudy from "./caseStudy.model.js";
import EmailSequence from "./emailSequence.model.js";
import ResourceDownload from "./resourceDownload.model.js";
import Contact from "./contact.model.js";

const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established");

    // ⚡ Thứ tự sync theo quan hệ
    await Role.sync({ alter: true });
    await User.sync({ alter: true });
    await BlogPost.sync({ alter: true });
    await Contact.sync({ alter: true });
    await EmailSequence.sync({ alter: true });
    await Resource.sync({ alter: true });
    await CaseStudy.sync({ alter: true });
    await ResourceDownload.sync({ alter: true });

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
