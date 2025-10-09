import sequelize from "./src/config/db.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected successfully to Neon!");
  } catch (err) {
    console.error("❌ Failed to connect:", err);
  } finally {
    await sequelize.close();
  }
})();
