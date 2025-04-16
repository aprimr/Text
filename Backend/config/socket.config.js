import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

import Message from "../model/message.model.js";

dotenv.config();
const app = express();

// Env variables
const FRONTEND_URL = process.env.FRONTEND_URL;

// Socket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  // fetching previous messages
  try {
    const messages = await Message.find().limit(200).sort({ createdAt: -1 });
    socket.emit("previous messages", messages.reverse());
  } catch (error) {
    console.log("Error fetching previous messages:", error);
  }

  // listening to new messages
  socket.on("message", async ({ username, userId, content }) => {
    try {
      const newMessage = await Message.create({
        username,
        userId,
        content,
      });

      io.emit("message", newMessage);
    } catch (error) {
      console.log("Error sending message:", error);
    }
  });
});

export { app, server };
