import { Server as SocketIOServer } from "socket.io";
import { ChatService } from "./chat.service.js";

let io;

export const socketService = {
  init(server) {
    io = new SocketIOServer(server, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3002",
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
          const msg = await ChatService.sendMessage(data);
          io.to(`chat_${data.chat_id}`).emit("receive_message", msg);
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
