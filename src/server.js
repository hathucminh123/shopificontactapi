import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import { initDatabase } from "./models/index.js";
import { socketService } from "./services/socket.service.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// ⚙️ Tạo HTTP server từ Express app
const server = http.createServer(app);

// ⚡ Khởi tạo Socket.IO (truyền vào server thật, không phải app)
socketService.init(server);

(async () => {
  try {
    await initDatabase(); // 🧩 Sync DB một lần
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log("⚡ Socket.IO service active");
    });
  } catch (error) {
    console.error("❌ Failed to initialize server:", error);
  }
})();
