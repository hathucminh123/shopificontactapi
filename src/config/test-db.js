import sequelize from "../config/db.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected successfully to DB");
  } catch (error) {
    console.error("❌ Connection failed:", error);
  } finally {
    await sequelize.close();
  }
})();
