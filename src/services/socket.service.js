// src/services/socket.service.js
import { Server as SocketIOServer } from "socket.io";
import { ChatService } from "./chat.service.js";

let io; // để giữ instance Socket.IO toàn cục

export const socketService = {
  /**
   * Khởi tạo Socket.IO và gắn event listeners
   * @param {http.Server} server - instance server HTTP từ server.js
   */
  init(server) {
    io = new SocketIOServer(server, {
      cors: {
        origin: process.env.FRONTEND_URL || "https://vsnr.com", // đổi lại domain thực tế nếu có
        methods: ["GET", "POST"],
      },
    });

    console.log("⚡ Socket.IO initialized");

    // 🎯 Bắt đầu lắng nghe sự kiện từ client
    io.on("connection", (socket) => {
      console.log(`✅ New socket connected: ${socket.id}`);

      // Khi user join vào 1 chat room
      socket.on("join_room", (chatId) => {
        socket.join(`chat_${chatId}`);
        console.log(`📥 ${socket.id} joined room chat_${chatId}`);

        // Optional: thông báo user khác rằng có người mới join
        socket.to(`chat_${chatId}`).emit("user_joined", { socketId: socket.id });
      });

      // Khi user gửi tin nhắn
      socket.on("send_message", async (data) => {
        try {
          // data = { chat_id, sender_type, sender_id, message, attachments? }
          const msg = await ChatService.sendMessage(data);

          // Phát tin nhắn cho tất cả user trong phòng
          io.to(`chat_${data.chat_id}`).emit("receive_message", msg);
        } catch (err) {
          console.error("❌ Error saving message:", err);
          socket.emit("error_message", { error: "Failed to send message" });
        }
      });

      // Đánh dấu đã đọc tin nhắn
      socket.on("mark_read", async ({ chat_id, message_ids }) => {
        try {
          // Update tất cả tin nhắn thành đã đọc
          await ChatService.markMessagesAsRead(chat_id, message_ids);
          io.to(`chat_${chat_id}`).emit("messages_read", { message_ids });
        } catch (err) {
          console.error("❌ Error marking messages as read:", err);
        }
      });

      // Khi user rời phòng chat
      socket.on("leave_room", (chatId) => {
        socket.leave(`chat_${chatId}`);
        console.log(`👋 ${socket.id} left room chat_${chatId}`);
      });

      // Khi user ngắt kết nối
      socket.on("disconnect", () => {
        console.log(`❌ Socket disconnected: ${socket.id}`);
      });
    });
  },

  /**
   * Truy cập đối tượng io từ nơi khác
   */
  getIO() {
    if (!io) throw new Error("❌ Socket.io not initialized!");
    return io;
  },
};
