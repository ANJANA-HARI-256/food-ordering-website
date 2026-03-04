// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes"); // Add this
const couponRoutes = require('./routes/couponRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
// server.js - Add this line with other routes
const restaurantRoutes = require('./routes/restaurantRoutes');

// Add this with other app.use statements
app.use('/api/restaurants', restaurantRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes); // Add this
app.use('/api/coupons', couponRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("Food Ordering Backend is Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});