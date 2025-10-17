import { Server as SocketIOServer } from "socket.io";
import { ChatService } from "./chat.service.js";

let io;

export const socketService = {
  init(server) {
    io = new SocketIOServer(server, {
      cors: {
        origin:[ process.env.FRONTEND_URL || "http://localhost:3002","https://vsnr.com/",],
        methods: ["GET", "POST"],
      },
    });

    console.log("⚡ Socket.IO initialized");

    io.on("connection", (socket) => {
      console.log(`✅ New socket connected: ${socket.id}`);

      socket.on("join_room", (payload) => {
        const room =
          typeof payload === "object" && payload.room
            ? payload.room
            : `chat_${payload}`;
        socket.join(room);
        console.log(`📥 ${socket.id} joined room ${room}`);
      });

   socket.on("send_message", async (data) => {
  try {
    // Tạo tin nhắn mới trong cơ sở dữ liệu
    const msg = await ChatService.sendMessage(data);

    // Sau khi gửi tin nhắn thành công, cập nhật lại thời gian "updatedAt" của chat session
    const updatedChatSession = await ChatSession.findOne({
      where: { id: data.chat_id },
    });

    // Emit lại tin nhắn và thông tin cập nhật `updatedAt`
    io.to(`chat_${data.chat_id}`).emit("receive_message", {
      msg,
      updatedAt: updatedChatSession.updatedAt, // Thêm updatedAt để client có thông tin mới
    });
  } catch (err) {
    console.error("❌ Error saving message:", err);
    socket.emit("error_message", { error: "Failed to send message" });
  }
});


      socket.on("leave_room", (payload) => {
        const room =
          typeof payload === "object" && payload.room
            ? payload.room
            : `chat_${payload}`;
        socket.leave(room);
        console.log(`👋 ${socket.id} left room ${room}`);
      });

      socket.on("disconnect", () => {
        console.log(`❌ Socket disconnected: ${socket.id}`);
      });
    });
  },

  getIO() {
    if (!io) throw new Error("❌ Socket.io not initialized!");
    return io;
  },
};
