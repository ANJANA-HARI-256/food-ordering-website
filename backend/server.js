// // // server.js
// // require("dotenv").config();
// // const express = require("express");
// // const cors = require("cors");

// // const connectDB = require("./config/db");
// // const authRoutes = require("./routes/authRoutes");
// // const foodRoutes = require("./routes/foodRoutes");
// // const orderRoutes = require("./routes/orderRoutes");
// // const adminRoutes = require("./routes/adminRoutes"); // Add this
// // const couponRoutes = require('./routes/couponRoutes');
// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Connect Database
// // connectDB();

// // // Routes
// // // server.js - Add this line with other routes
// // const restaurantRoutes = require('./routes/restaurantRoutes');

// // // Add this with other app.use statements
// // app.use('/api/restaurants', restaurantRoutes);
// // app.use("/api/auth", authRoutes);
// // app.use("/api/foods", foodRoutes);
// // app.use("/api/orders", orderRoutes);
// // app.use("/api/admin", adminRoutes); // Add this
// // app.use('/api/coupons', couponRoutes);
// // // Test route
// // app.get("/", (req, res) => {
// //   res.send("Food Ordering Backend is Running");
// // });

// // const PORT = process.env.PORT || 5000;

// // app.listen(PORT, () => {
// //   console.log(` Server running on port ${PORT}`);
// // });
// // server.js
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");

// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const foodRoutes = require("./routes/foodRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const couponRoutes = require('./routes/couponRoutes');
// const restaurantRoutes = require('./routes/restaurantRoutes');

// const app = express();

// // ✅ Updated CORS configuration for production
// const corsOptions = {
//   origin: [
//     'http://localhost:5173',           // Local development
//     'http://localhost:3000',            // Alternative local port
//     'https://your-vercel-app.vercel.app' // Will replace with actual Vercel URL
//   ],
//   credentials: true,
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
// app.use(express.json());

// // Connect Database
// connectDB();

// // Routes
// app.use('/api/restaurants', restaurantRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/foods", foodRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/admin", adminRoutes);
// app.use('/api/coupons', couponRoutes);

// // Test route
// app.get("/", (req, res) => {
//   res.send("Food Ordering Backend is Running");
// });

// // Health check route for Render
// app.get("/api/health", (req, res) => {
//   res.status(200).json({ status: "OK", message: "Server is running" });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(` Server running on port ${PORT}`);
// });
// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const couponRoutes = require('./routes/couponRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');

const app = express();

// ✅ Updated CORS configuration with your actual Vercel URLs
const corsOptions = {
  origin: [
    'http://localhost:5173',                              // Local development
    'http://localhost:3000',                               // Alternative local port
    'https://food-ordering-website-blush.vercel.app',      // Your main production domain
    'https://food-ordering-website-git-main-anjanahari256-8938s-projects.vercel.app' // Git branch domain
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/api/restaurants', restaurantRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/coupons', couponRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Food Ordering Backend is Running");
});

// Health check route for Render
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});