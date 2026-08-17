# Food Ordering Website

A full-stack food ordering web application built as part of a Fullstack Training program. Customers can browse restaurants and menus, place orders, and apply coupons, while admins manage orders and users from a separate dashboard.

**Live demo:** https://food-ordering-website-blush.vercel.app

## Features

**Customer**
- Signup / login with JWT-based authentication
- Browse restaurants and their menus
- Add items to cart and check out
- Apply coupons at checkout (with validity window and usage-limit checks)
- View past order history

**Admin**
- Role-based access, separate from the customer flow
- View and manage all orders and users
- Update order status

## Tech Stack

**Frontend:** React (Vite), React Router, Axios
**Backend:** Node.js, Express.js
**Database:** MongoDB with Mongoose
**Auth:** JWT, bcrypt for password hashing
**Deployment:** Vercel (frontend)

## Project Structure

```
backend/
  config/       # DB connection config
  middleware/   # auth & admin route protection
  models/       # User, Restaurant, Food, Order, Coupon
  routes/       # auth, restaurant, food, order, coupon, admin
  server.js

frontend/
  src/
    components/ # Navbar, Chat
    pages/      # Login, Signup, Restaurant, Menu, Cart, Checkout, OrderHistory, Admin, AdminOrders, Dashboard
    services/   # API client
```

## Getting Started

```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev
```

Create a `.env` file in `backend/` with your MongoDB URI and JWT secret:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Project Status

Core features complete: authentication, restaurant/menu browsing, cart & checkout, coupons, order history, and an admin dashboard for order/user management.
