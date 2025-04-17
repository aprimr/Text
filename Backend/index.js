// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDb from "./config/db.config.js";
import { app, server } from "./config/socket.config.js";

dotenv.config();

// Env Variables
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Middleware
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

// Connect to DB
connectDb();

// Routes
app.get("/keep-alive", (req, res) => {
  res.send("Hello Text! I am active.");
});

// Start Server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
