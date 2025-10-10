import dotenv from "dotenv";
import app from "./app.js";
import { initDatabase } from "./models/index.js";
// import "./jobs/sendScheduledEmails.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await initDatabase(); // 🧩 Tạo bảng / sync DB một lần duy nhất
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to initialize server:", error);
  }
})();
