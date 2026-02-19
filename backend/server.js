const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
require('./config/db');
const authRoutes = require("./routes/authRoutes"); // ✅ ADD THIS

const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Routes
app.use("/api/auth", authRoutes); // ✅ ADD THIS

// Test route
app.get("/", (req, res) => {
  res.send("Food Ordering Backend is running");
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
