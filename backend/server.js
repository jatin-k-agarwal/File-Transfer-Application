// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import { handleSocket } from './socket/socketHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket ID Mapping
const userSocketMap = new Map(); // userId => socketId

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(helmet());
app.use("/uploads", express.static("uploads"));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

// Socket.io Logic
io.on("connection", (socket) => {
  console.log(`🟢 User connected: ${socket.id}`);

  // Register user ID to socket ID
  socket.on("register", (userId) => {
    userSocketMap.set(userId, socket.id);
    console.log(`✅ User registered: ${userId} -> ${socket.id}`);
  });

  // Pass to handler with socket mapping
  handleSocket(io, socket, userSocketMap);

  socket.on("disconnect", () => {
    console.log(`🔴 User disconnected: ${socket.id}`);
    for (let [userId, sid] of userSocketMap.entries()) {
      if (sid === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
