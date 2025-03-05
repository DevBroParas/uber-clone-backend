import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import app from "./app.js";
import connectDB from "./db/db.config.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
  connectDB();
});
