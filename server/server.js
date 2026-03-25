import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import drawRoutes from "./routes/drawRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js"; 

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ SOCKET SETUP
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your frontend
    methods: ["GET", "POST"],
  },
});

// Store io globally
export { io };

// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/draw", drawRoutes);
app.use("/api/scores", scoreRoutes);

// Socket connection
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});